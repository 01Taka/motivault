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

  private filterData<
    T extends TaskPressTemplateWrite | Partial<TaskPressTemplateWrite>,
  >(
    data: T
  ): T extends TaskPressTemplateWrite
    ? TaskPressTemplateWrite
    : Partial<TaskPressTemplateWrite> {
    const { title, subject, type } = data

    const timePerPage = type === 'problemSet' ? data.timePerPage : undefined
    const steps = type === 'report' ? data.steps : undefined

    if (
      type === 'problemSet' ||
      (type === undefined && timePerPage !== undefined)
    ) {
      return {
        type,
        title,
        subject,
        timePerPage,
      } as T extends TaskPressTemplateWrite
        ? TaskPressTemplateWrite
        : Partial<TaskPressTemplateWrite>
    }

    if (type === 'report' || (type === undefined && steps !== undefined)) {
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

  protected filterWriteData(
    data: TaskPressTemplateWrite
  ): TaskPressTemplateWrite {
    return this.filterData(data)
  }

  protected filterPartialWriteData(
    data: Partial<TaskPressTemplateWrite>
  ): Partial<TaskPressTemplateWrite> {
    return this.filterData(data)
  }
}
