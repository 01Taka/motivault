import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  FeynmanNoteRead,
  FeynmanNoteWrite,
} from '../documents/feynman-note-documents'

/**
 * collectionPath: [uid] /
 * documentPath: [uid, noteId]
 */
export class FeynmanNoteIDBRepository extends IndexedDBService<
  FeynmanNoteRead,
  FeynmanNoteWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'notes'], { techniques: 'feynman' })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends FeynmanNoteWrite | Partial<FeynmanNoteWrite>,
  >(data: T): T {
    const { title, rewriteCount, contents, resolvedGapIds } = data
    return {
      title,
      rewriteCount,
      contents,
      resolvedGapIds,
    } as any
  }
}
