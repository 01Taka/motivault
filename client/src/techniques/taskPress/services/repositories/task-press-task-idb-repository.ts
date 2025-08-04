import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import {
  PartialTaskPressTaskWriteSchema,
  TaskPressTaskWriteSchema,
  type TaskPressTaskRead,
  type TaskPressTaskWrite,
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
      users: uid,
      techniques: 'taskPress',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }

  protected filterWriteData(data: TaskPressTaskWrite): TaskPressTaskWrite {
    return TaskPressTaskWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TaskPressTaskWrite>
  ): Partial<TaskPressTaskWrite> {
    const type =
      (data.type ?? ('pages' in data || 'completedPages' in data))
        ? 'problemSet'
        : 'completedStepOrders' in data
          ? 'report'
          : null

    if (!type) {
      throw new Error(`typeが推測できないデータが渡されました。data: ${data}`)
    }

    return PartialTaskPressTaskWriteSchema.parse({ ...data, type })
  }
}
