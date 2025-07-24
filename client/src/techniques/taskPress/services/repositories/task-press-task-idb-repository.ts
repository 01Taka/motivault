import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import type {
  TaskPressTaskRead,
  TaskPressTaskWrite,
} from '../documents/task-press-task-document'

/**
 * documentPath: [uid, taskId]
 */
export class TaskPressTaskIDBRepository extends IndexedDBService<
  TaskPressTaskRead,
  TaskPressTaskWrite
> {
  private uid: string

  constructor(uid: string) {
    super(['users', 'techniques', 'tasks'], {
      techniques: 'taskPress',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  private filterData<
    T extends TaskPressTaskWrite | Partial<TaskPressTaskWrite>,
  >(
    data: T
  ): T extends TaskPressTaskWrite
    ? TaskPressTaskWrite
    : Partial<TaskPressTaskWrite> {
    const {
      templateId,
      deadline,
      type,
      pages,
      completedPages,
      completedStepOrders,
    } = data

    if (
      type === 'problemSet' ||
      (type === undefined &&
        (pages !== undefined || completedPages !== undefined))
    ) {
      return {
        type,
        templateId,
        deadline,
        pages,
        completedPages,
      } as T extends TaskPressTaskWrite
        ? TaskPressTaskWrite
        : Partial<TaskPressTaskWrite>
    }

    if (
      type === 'report' ||
      (type === undefined && completedStepOrders !== undefined)
    ) {
      return {
        type,
        templateId,
        deadline,
        completedStepOrders,
      } as T extends TaskPressTaskWrite
        ? TaskPressTaskWrite
        : Partial<TaskPressTaskWrite>
    }

    return { templateId, deadline } as T extends TaskPressTaskWrite
      ? TaskPressTaskWrite
      : Partial<TaskPressTaskWrite>
  }

  protected filterWriteData(data: TaskPressTaskWrite): TaskPressTaskWrite {
    return this.filterData(data)
  }

  protected filterPartialWriteData(
    data: Partial<TaskPressTaskWrite>
  ): Partial<TaskPressTaskWrite> {
    return this.filterData(data)
  }
}
