import type { DBWriteTarget } from '../../../../types/db/db-service-interface'
import type { FeynmanKnowledgeGapWrite } from '../documents/feynman-knowledge-gap-documents'
import type {
  FeynmanNoteRead,
  FeynmanNoteTextLineBlock,
  FeynmanNoteWrite,
} from '../documents/feynman-note-documents'
import type { KnowledgeGapState } from '../documents/feynman-technique-types'
import { FeynmanKnowledgeGapIDBRepository } from '../repositories/feynman-knowledge-gap-repository'
import { FeynmanNoteHistoryIDBRepository } from '../repositories/feynman-note-history-repository'
import { FeynmanNoteIDBRepository } from '../repositories/feynman-note-repository'

type Repo = {
  noteRepo: FeynmanNoteIDBRepository
  noteHistoryRepo: FeynmanNoteHistoryIDBRepository
  knowledgeGapRepo: FeynmanKnowledgeGapIDBRepository
}

const repoCache = new Map<string, Repo>()

const getRepo = (uid: string): Repo => {
  if (repoCache.has(uid)) {
    return repoCache.get(uid)!
  }

  const repo = {
    noteRepo: new FeynmanNoteIDBRepository(uid),
    noteHistoryRepo: new FeynmanNoteHistoryIDBRepository(uid),
    knowledgeGapRepo: new FeynmanKnowledgeGapIDBRepository(uid),
  }

  repoCache.set(uid, repo)
  return repo
}

// ---------------------------

export const getFeynmanNote = async (
  uid: string,
  noteId: string
): Promise<FeynmanNoteRead | null> => {
  try {
    const { noteRepo } = getRepo(uid)
    return await noteRepo.read([uid, noteId])
  } catch (error) {
    console.error('Error in getFeynmanNote:', error)
    return null
  }
}

export const getAllFeynmanNote = async (
  uid: string
): Promise<FeynmanNoteRead[]> => {
  try {
    const { noteRepo } = getRepo(uid)
    return await noteRepo.getAll([uid])
  } catch (error) {
    console.error('Error in getAllFeynmanNote:', error)
    return []
  }
}

export const createFeynmanNote = async (
  uid: string,
  data: FeynmanNoteWrite
): Promise<DBWriteTarget | null> => {
  try {
    const { noteRepo } = getRepo(uid)
    return await noteRepo.create({ ...data, rewriteCount: 0 }, [uid])
  } catch (error) {
    console.error('Error in createFeynmanNote:', error)
    return null
  }
}

export const rewriteFeynmanNote = async (
  uid: string,
  noteId: string,
  contents: FeynmanNoteTextLineBlock[],
  title?: string
): Promise<DBWriteTarget | null> => {
  try {
    const { noteRepo, noteHistoryRepo } = getRepo(uid)

    const prevNote = await noteRepo.read([uid, noteId])
    if (!prevNote) {
      console.warn('Note not found for rewriting:', { uid, noteId })
      return null
    }

    await noteHistoryRepo.create(prevNote, [uid, noteId])
    const rewriteCount = (prevNote.rewriteCount ?? 0) + 1

    return await noteRepo.update({ contents, title, rewriteCount }, [
      uid,
      noteId,
    ])
  } catch (error) {
    console.error('Error in rewriteFeynmanNote:', error)
    return null
  }
}

export const createFeynmanKnowledgeGap = async (
  uid: string,
  noteId: string,
  noteTitle: string,
  contents: string,
  answer: string,
  state: KnowledgeGapState
) => {
  const { knowledgeGapRepo } = getRepo(uid)
  const data: FeynmanKnowledgeGapWrite = {
    noteId,
    noteTitle,
    contents,
    answer,
    state,
  }
  return await knowledgeGapRepo.createWithId(data, [uid])
}

export const getAllFeynmanKnowledgeGap = async (uid: string) => {
  const { knowledgeGapRepo } = getRepo(uid)
  return await knowledgeGapRepo.getAll([uid])
}

export const getFeynmanKnowledgeGap = async (
  uid: string,
  knowledgeGapId: string
) => {
  const { knowledgeGapRepo } = getRepo(uid)
  return await knowledgeGapRepo.read([uid, knowledgeGapId])
}

export const createNewGapBlocks = async (
  uid: string,
  data: Record<string, FeynmanKnowledgeGapWrite>
) => {
  const { knowledgeGapRepo } = getRepo(uid)

  const promises = Object.entries(data).map(([id, value]) => {
    return knowledgeGapRepo.createWithId(value, [uid, id])
  })

  await Promise.all(promises)
}

export const updateGapBlocks = async (
  uid: string,
  data: Record<string, Partial<FeynmanKnowledgeGapWrite>>
) => {
  const { knowledgeGapRepo } = getRepo(uid)

  const promises = Object.entries(data).map(([id, value]) => {
    return knowledgeGapRepo.update(value, [uid, id])
  })

  await Promise.all(promises)
}

export const updateFeynmanKnowledgeGapAnswer = async (
  uid: string,
  gapId: string,
  noteId: string,
  answer: string,
  state: KnowledgeGapState = 'resolved'
): Promise<void> => {
  const { knowledgeGapRepo, noteRepo } = getRepo(uid)

  await knowledgeGapRepo.update({ answer, state }, [uid, gapId])

  const isResolved = state === 'resolved'
  if (!isResolved) return

  const note = await noteRepo.read([uid, noteId])

  const prevResolvedGapIds = note?.resolvedGapIds ?? []
  if (note && !prevResolvedGapIds.includes(gapId)) {
    const updatedIds = [...prevResolvedGapIds, gapId]
    await noteRepo.update({ resolvedGapIds: updatedIds }, [uid, note.docId])
  }
}
