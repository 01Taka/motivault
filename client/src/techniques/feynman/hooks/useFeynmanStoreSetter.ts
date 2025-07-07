import { useCallback, useEffect } from 'react'
import { useCurrentUserStore } from '../../../stores/user/currentUserStore'
import { useFeynmanStore } from '../store/feynmanStore'
import {
  getAllFeynmanKnowledgeGap,
  getAllFeynmanNote,
  getFeynmanKnowledgeGap,
} from '../services/functions/feynman-note-service'
import { MAX_GAPS_DISPLAY } from '../constants/feynman-constants'
import type { FeynmanKnowledgeGapRead } from '../services/documents/feynman-knowledge-gap-documents'

export const useFeynmanStoreSetter = () => {
  const { uid } = useCurrentUserStore()
  const {
    loadedGaps,
    pushLoadedGaps,
    setRecentUnresolvedGaps,
    setPastUnresolvedGaps,
    setResolvedGaps,
    setAllFeynmanNotes,
  } = useFeynmanStore()

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const gaps = await getAllFeynmanKnowledgeGap(uid)
        const notes = await getAllFeynmanNote(uid)
        const unresolvedGaps = gaps.filter((gap) => gap.state === 'unresolved')
        const resolvedGaps = gaps.filter((gap) => gap.state === 'resolved')
        const recentUnresolvedGaps = unresolvedGaps.slice(0, MAX_GAPS_DISPLAY)
        const pastUnresolvedGaps = unresolvedGaps.slice(MAX_GAPS_DISPLAY)

        pushLoadedGaps(gaps)
        setRecentUnresolvedGaps(recentUnresolvedGaps)
        setPastUnresolvedGaps(pastUnresolvedGaps)
        setResolvedGaps(resolvedGaps)
        setAllFeynmanNotes(notes)
      }
    }
    fetchData()
  }, [uid])

  const getKnowledgeGap = useCallback(
    async (id: string): Promise<FeynmanKnowledgeGapRead | null> => {
      if (!uid) return null
      const cached = loadedGaps.find((g) => g.docId === id)
      if (cached) return cached
      const fetched = await getFeynmanKnowledgeGap(uid, id)
      if (fetched) pushLoadedGaps([fetched])
      return fetched ?? null
    },
    [uid, loadedGaps, pushLoadedGaps]
  )

  return { getKnowledgeGap }
}
