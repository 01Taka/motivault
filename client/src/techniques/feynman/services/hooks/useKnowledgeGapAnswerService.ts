import { useEffect } from 'react'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import { useFeynmanStore } from '../../store/feynmanStore'
import { useFeynmanStoreSetter } from '../../hooks/useFeynmanStoreSetter'
import { updateFeynmanKnowledgeGapAnswer } from '../functions/feynman-note-service'
import type { FeynmanNoteRead } from '../documents/feynman-note-documents'

export const useKnowledgeGapAnswerService = (id: string | null) => {
  const { uid } = useCurrentUserStore()
  const { answerTargetGap, setAnswerTargetGap } = useFeynmanStore()
  const { getKnowledgeGap } = useFeynmanStoreSetter()

  useEffect(() => {
    const loadGap = async () => {
      if (id) {
        const gap = await getKnowledgeGap(id)
        setAnswerTargetGap(gap)
      }
    }

    loadGap()
  }, [id, getKnowledgeGap, setAnswerTargetGap])

  const answeringKnowledgeGap = async (
    answer: string,
    noteId: string,
    targetId = id
  ) => {
    if (uid && targetId) {
      await updateFeynmanKnowledgeGapAnswer(uid, targetId, noteId, answer)
    }
  }
  return { answerTargetGap, answeringKnowledgeGap }
}
