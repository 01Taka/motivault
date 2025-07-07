// useFeynmanStore.ts
import { create } from 'zustand'
import type { FeynmanKnowledgeGapRead } from '../services/documents/feynman-knowledge-gap-documents'
import type { FeynmanNoteRead } from '../services/documents/feynman-note-documents'

interface FeynmanTechniqueState {
  loadedGaps: FeynmanKnowledgeGapRead[]
  recentUnresolvedGaps: FeynmanKnowledgeGapRead[]
  pastUnresolvedGaps: FeynmanKnowledgeGapRead[]
  resolvedGaps: FeynmanKnowledgeGapRead[]
  answerTargetGap: FeynmanKnowledgeGapRead | null
  allFeynmanNotes: FeynmanNoteRead[]

  // 初期ロード・更新用
  pushLoadedGaps: (gaps: FeynmanKnowledgeGapRead[]) => void
  setRecentUnresolvedGaps: (gaps: FeynmanKnowledgeGapRead[]) => void
  setPastUnresolvedGaps: (gaps: FeynmanKnowledgeGapRead[]) => void
  setResolvedGaps: (gaps: FeynmanKnowledgeGapRead[]) => void
  setAnswerTargetGap: (gap: FeynmanKnowledgeGapRead | null) => void
  setAllFeynmanNotes: (notes: FeynmanNoteRead[]) => void
}

export const useFeynmanStore = create<FeynmanTechniqueState>((set, get) => ({
  loadedGaps: [],
  recentUnresolvedGaps: [],
  pastUnresolvedGaps: [],
  resolvedGaps: [],
  answerTargetGap: null,
  allFeynmanNotes: [],

  pushLoadedGaps: (gaps: FeynmanKnowledgeGapRead[]) => {
    const gapIds = gaps.map((gap) => gap.docId)
    set({
      loadedGaps: [
        ...get().loadedGaps.filter((gap) => !gapIds.includes(gap.docId)),
        ...gaps,
      ],
    })
  },
  setRecentUnresolvedGaps: (gaps) => set({ recentUnresolvedGaps: gaps }),
  setPastUnresolvedGaps: (gaps) => set({ pastUnresolvedGaps: gaps }),
  setResolvedGaps: (gaps) => set({ resolvedGaps: gaps }),
  setAnswerTargetGap: (gap) => set({ answerTargetGap: gap }),
  setAllFeynmanNotes: (notes) => set({ allFeynmanNotes: notes }),
}))
