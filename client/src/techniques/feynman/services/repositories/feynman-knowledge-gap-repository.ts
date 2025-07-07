import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  FeynmanKnowledgeGapRead,
  FeynmanKnowledgeGapWrite,
} from '../documents/feynman-knowledge-gap-documents'

/**
 * documentPath: [uid, knowledgeGapId]
 */
export class FeynmanKnowledgeGapIDBRepository extends IndexedDBService<
  FeynmanKnowledgeGapRead,
  FeynmanKnowledgeGapWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'knowledgeGaps'], {
      techniques: 'feynman',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends FeynmanKnowledgeGapWrite | Partial<FeynmanKnowledgeGapWrite>,
  >(data: T): T {
    const { noteId, noteTitle, contents, state, answer } = data
    return {
      noteId,
      noteTitle,
      contents,
      state,
      answer,
    } as any
  }
}
