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
  >(
    data: T
  ): T extends TaskPressTemplateWrite
    ? TaskPressTemplateWrite
    : Partial<TaskPressTemplateWrite> {
    const { title, subject, type, timePerPage, steps } = data

    if (type === 'problemSet' || timePerPage !== undefined) {
      return {
        type,
        title,
        subject,
        timePerPage,
      } as T extends TaskPressTemplateWrite
        ? TaskPressTemplateWrite
        : Partial<TaskPressTemplateWrite>
    }

    if (type === 'report' || steps !== undefined) {
      return {
        type,
        title,
        subject,
        steps,
      } as T extends TaskPressTemplateWrite
        ? TaskPressTemplateWrite
        : Partial<TaskPressTemplateWrite>
    }

    return { title, subject } as T extends TaskPressTemplateWrite
      ? TaskPressTemplateWrite
      : Partial<TaskPressTemplateWrite>
  }
}
