import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  FeynmanNoteRead,
  FeynmanNoteWrite,
} from '../documents/feynman-note-documents'

export class FeynmanNoteHistoryIDBRepository extends IndexedDBService<
  FeynmanNoteRead,
  FeynmanNoteWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'notes', 'histories'], {
      techniques: 'feynman',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends FeynmanNoteWrite | Partial<FeynmanNoteWrite>,
  >(data: T): T {
    // resolvedGapIds は意図的に削除中
    const { title, rewriteCount, contents } = data
    return {
      title,
      rewriteCount,
      contents,
    } as any
  }
}
