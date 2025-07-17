import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  TaskPressTemplateRead,
  TaskPressTemplateWrite,
} from '../documents/task-press-template-document'

/**
 * documentPath: [uid, templateId]
 */
export class TaskPressTemplateIDBRepository extends IndexedDBService<
  TaskPressTemplateRead,
  TaskPressTemplateWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'templates'], {
      techniques: 'taskPress',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData<
    T extends TaskPressTemplateWrite | Partial<TaskPressTemplateWrite>,
  >(data: T): T {
    const {
      title,
      subject,
      type,
      timePerPage,
      order,
      text,
      estimatedTime,
      steps,
    } = data

    return {
      title,
      subject,
      type,
      timePerPage,
      order,
      text,
      estimatedTime,
      steps,
    } as any
  }
}
