import { useEffect, useState } from 'react'
import type { TaskPressTaskWrite } from '../documents/task-press-task-document'
import type { TaskPressTemplateWrite } from '../documents/task-press-template-document'
import { createNewTaskPressTask } from '../functions/task-press-crud'
import { useCurrentUserStore } from '../../../../stores/user/currentUserStore'
import type { TaskPressCreateFormState } from '../../types/formState/task-press-create-form-state'
import { getTaskPressRepo } from '../repositories/repositories'

const useCrudTaskPress = () => {
  const { uid } = useCurrentUserStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetch = async () => {
      const repo = getTaskPressRepo()
      if (uid && repo) {
        console.log(await repo.idbTask.getAll([uid]))
      }
    }
    fetch()
  }, [uid])

  const handleSubmit = async (formState: TaskPressCreateFormState) => {
    if (!uid) {
      setError('ログイン情報が見つかりません')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const task: TaskPressTaskWrite = {
      ...formState,
      completedPages: [],
      completedStepOrders: [],
    }

    const template: TaskPressTemplateWrite =
      formState.type === 'report'
        ? {
            ...formState,
            type: 'report',
            steps: formState.steps.map((step, index) => ({
              ...step,
              order: index,
            })),
          }
        : {
            ...formState,
            type: 'problemSet',
          }

    try {
      await createNewTaskPressTask(uid, task, template)
      // 成功時の後処理（例: モーダルを閉じる、トースト通知、リダイレクトなど）
    } catch (err) {
      console.error('タスク作成に失敗しました:', err)
      setError('タスクの作成中にエラーが発生しました。再試行してください。')
    } finally {
      setIsSubmitting(false)
    }
  }

  return { isSubmitting, error, handleSubmit }
}

export default useCrudTaskPress
