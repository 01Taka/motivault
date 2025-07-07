import { useNoteEditorLogic } from '../../hooks/useNoteEditorLogic'
import NoteEditorLayout from './NoteEditorLayout'

const NoteEditor: React.FC = () => {
  const logic = useNoteEditorLogic('create', [])

  return <NoteEditorLayout {...logic} />
}
export default NoteEditor
