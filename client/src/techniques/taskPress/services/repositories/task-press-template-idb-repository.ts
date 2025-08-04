import { IndexedDBService } from '../../../../indexedDB/indexed-db-service'
import {
  PartialTaskPressTemplateWriteSchema,
  TaskPressTemplateWriteSchema,
  type TaskPressTemplateRead,
  type TaskPressTemplateWrite,
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
      users: uid,
      techniques: 'taskPress',
    })
    this.uid = uid
  }

  protected getCreatorUid(): string {
    return this.uid
  }
  protected filterWriteData(
    data: TaskPressTemplateWrite
  ): TaskPressTemplateWrite {
    return TaskPressTemplateWriteSchema.parse(data)
  }

  protected filterPartialWriteData(
    data: Partial<TaskPressTemplateWrite>
  ): Partial<TaskPressTemplateWrite> {
    console.log(data)

    const type =
      (data.type ?? ('pages' in data || 'completedPages' in data))
        ? 'problemSet'
        : 'completedStepOrders' in data
          ? 'report'
          : null

    if (!type) {
      throw new Error(`typeが推測できないデータが渡されました。data: ${data}`)
    }

    console.log({ ...data, type })
    return PartialTaskPressTemplateWriteSchema.parse(data)
  }
}
