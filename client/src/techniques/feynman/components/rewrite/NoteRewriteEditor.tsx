import { useParams } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useNoteEditorLogic } from '../../hooks/useNoteEditorLogic'
import { useFeynmanStore } from '../../store/feynmanStore'
import NoteEditorLayout from '../noteEditor/NoteEditorLayout'

/**
 * NoteRewriteEditor Component
 *
 * This component allows users to rewrite an existing Feynman note. It retrieves
 * the note ID from the URL parameters, fetches the corresponding note from the
 * global store, and initializes the note editor with its content.
 */
const NoteRewriteEditor: React.FC = () => {
  // Destructure the note ID from the URL parameters
  const { id } = useParams<{ id: string }>()

  // Access the allFeynmanNotes from the Zustand store
  const { allFeynmanNotes } = useFeynmanStore()

  // Memoize the previous note to prevent unnecessary re-renders.
  // This hook efficiently finds the note only when 'id' or 'allFeynmanNotes' changes.
  const prevNote = useMemo(() => {
    // If no ID is present, or if the ID doesn't correspond to an existing note, return null.
    if (!id) {
      return null
    }
    return allFeynmanNotes.find((note) => note.docId === id) || null
  }, [id, allFeynmanNotes])

  // Initialize the note editor logic.
  // The 'edit' mode indicates that an existing note is being edited.
  const logic = useNoteEditorLogic('edit', undefined, prevNote ?? undefined)
  const { onChangeTitle } = logic

  // Effect hook to initialize the editor with the previous note's data.
  // This runs when the 'id' or 'prevNote' changes.
  useEffect(() => {
    if (prevNote) {
      // Set the title and initialize the content blocks of the editor.
      onChangeTitle(prevNote.title)
    }
  }, [id, prevNote, onChangeTitle]) // Added 'logic' to the dependency array as it's used inside the effect.

  // Display a message if the specified note does not exist.
  if (!prevNote) {
    return <div>指定されたノートが存在しません。</div>
  }

  // Render the NoteEditorLayout component, spreading all properties from 'logic'.
  return <NoteEditorLayout {...logic} />
}

export default NoteRewriteEditor
