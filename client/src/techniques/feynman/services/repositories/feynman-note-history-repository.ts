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

  private filterData<T extends FeynmanNoteWrite | Partial<FeynmanNoteWrite>>(
    data: T
  ): T extends FeynmanNoteWrite ? FeynmanNoteWrite : Partial<FeynmanNoteWrite> {
    // resolvedGapIds は意図的に削除中
    const { title, rewriteCount, contents } = data
    return {
      title,
      rewriteCount,
      contents,
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
