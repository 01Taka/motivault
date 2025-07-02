// import { Box } from '@mui/material'
// import KnowledgeGapBlock from './KnowledgeGapBlock'
// import TextBlock from './TextBlock'
// import type { NoteBlock } from '../../types/feynman-technique-types'

// interface NoteBlockDisplayProps {
//   blocks: NoteBlock[]
//   onTextChange: (index: number, newText: string) => void
//   onGapChange: (index: number, newText: string) => void
//   onKeyDown: (index: number, event: React.KeyboardEvent<HTMLDivElement>) => void
// }

// const NoteBlockDisplay: React.FC<NoteBlockDisplayProps> = ({
//   blocks,
//   onTextChange,
//   onGapChange,
//   onKeyDown,
// }) => {
//   return (
//     <Box sx={{ p: 2, pb: 10, backgroundColor: '#F4F5FF', minHeight: '100vh' }}>
//       {blocks.map((block, idx) =>
//         block.type === 'text' ? (
//           <TextBlock
//             key={idx}
//             text={block.text}
//             onChange={(text) => onTextChange(idx, text)}
//           />
//         ) : (
//           <KnowledgeGapBlock
//             key={idx}
//             content={block.content}
//             onChange={(content) => onGapChange(idx, content)}
//           />
//         )
//       )}
//     </Box>
//   )
// }

// export default NoteBlockDisplay
