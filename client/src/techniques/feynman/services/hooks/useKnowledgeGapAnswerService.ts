import { useEffect } from 'react'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import { updateFeynmanKnowledgeGap } from '../functions/feynman-note-service'
import { useFeynmanStore } from '../../store/feynmanStore'
import { useFeynmanStoreSetter } from '../../hooks/useFeynmanStoreSetter'

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

  const answeringKnowledgeGap = async (answer: string, targetId = id) => {
    if (uid && targetId) {
      await updateFeynmanKnowledgeGap(uid, targetId, {
        answer,
        state: 'resolved',
      })
    }
  }
  return { answerTargetGap, answeringKnowledgeGap }
}
