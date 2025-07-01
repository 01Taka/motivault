import React from 'react'
import FeynmanBottomNav from './navigation/FeynmanBottomNav'
import { NoteEditor } from './note/NoteEditor'
import CreateNoteFab from './navigation/CreateNoteFab'
import { KnowledgeGapList } from './knowledgeGap/KnowledgeGapList'

interface FeynmanTechniqueProps {}

// export const sampleKnowledgeGaps: KnowledgeGapRead[] = [
//   {
//     docId: 'A',
//     noteId: '00',
//     noteTitle: 'ニュートンの運動法則',
//     createdAt: Date.now(),
//     content:
//       '第1法則（慣性の法則）と第2法則（F=ma）の違いが明確に説明できない。' +
//       '\n例題を使って法則ごとの適用範囲を整理する必要がある。',
//   },
//   {
//     docId: 'B',
//     noteId: '01',
//     noteTitle: 'Photosynthesisの化学反応式',
//     createdAt: Date.now(),
//     content:
//       '光合成における反応式の詳細（特にATPとNADPHの役割）があやふや。' +
//       '\nダークリアクションとの関係性を調べ直す。',
//   },
//   {
//     docId: 'C',
//     noteId: '02',
//     noteTitle: 'TypeScriptのGenerics',
//     createdAt: Date.now(),
//     content:
//       '型パラメータを複数持つケース（例：<T, U>）の扱い方が理解できていない。' +
//       '\n特に条件付き型との組み合わせでエラーが発生する理由を調査。',
//   },
// ]

const FeynmanTechnique: React.FC<FeynmanTechniqueProps> = ({}) => {
  return (
    <div>
      <NoteEditor title="A" />
      <KnowledgeGapList gaps={[]} onShowMore={() => {}} />
      <FeynmanBottomNav />
      <CreateNoteFab />
    </div>
  )
}

export default FeynmanTechnique
