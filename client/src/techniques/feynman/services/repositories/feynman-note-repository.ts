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

  private filterData<T extends FeynmanNoteWrite | Partial<FeynmanNoteWrite>>(
    data: T
  ): T extends FeynmanNoteWrite ? FeynmanNoteWrite : Partial<FeynmanNoteWrite> {
    const { title, rewriteCount, contents, resolvedGapIds } = data
    return {
      title,
      rewriteCount,
      contents,
      resolvedGapIds,
    } as T extends FeynmanNoteWrite
      ? FeynmanNoteWrite
      : Partial<FeynmanNoteWrite>
  }

  protected filterWriteData(data: FeynmanNoteWrite): FeynmanNoteWrite {
    return this.filterData(data)
  }

  protected filterPartialWriteData(
    data: Partial<FeynmanNoteWrite>
  ): Partial<FeynmanNoteWrite> {
    return this.filterData(data)
  }
}
