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

  protected filterWriteData<
    T extends TaskPressTaskWrite | Partial<TaskPressTaskWrite>,
  >(data: T): T {
    const {
      templateId,
      deadline,
      type,
      pages,
      completedPages,
      completedStepOrders,
    } = data

    return {
      templateId,
      deadline,
      type,
      pages,
      completedPages,
      completedStepOrders,
    } as any
  }
}
