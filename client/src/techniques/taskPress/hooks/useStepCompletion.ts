import { useState, useCallback, useMemo } from 'react'
import { debounce } from 'lodash'
import { getNextStep } from '../functions/task-press-task-utils'
import type {
  MergedReportStep,
  TaskPressMergedTask,
} from '../types/task-press-merge-task-types'

const useStepCompletion = (
  task: TaskPressMergedTask,
  onCompleteStep: (steps: MergedReportStep[]) => void // 一度に複数のステップを返す
) => {
  const [completedStepOrders, setCompletedStepOrders] = useState<number[]>([])
  const [stepsInProgress, setStepsInProgress] = useState<MergedReportStep[]>([]) // 遅延中のステップを保存

  // 次に完了するべきステップを取得
  const nextStep = useMemo(() => {
    if (task.type === 'report') {
      return getNextStep(task.steps, [...completedStepOrders])
    }
    return null
  }, [task, completedStepOrders])

  // ステップ完了後の処理を遅延させて実行
  const debouncedCompleteStep = useCallback(
    debounce((steps: MergedReportStep[]) => {
      onCompleteStep(steps) // 複数のステップを一括で送信
    }, 1500), // 1.5秒遅延して送信
    [onCompleteStep]
  )

  // ステップが完了したときの処理
  const handleStepComplete = (delay: number) => {
    if (!nextStep) return

    setTimeout(() => {
      setCompletedStepOrders((prev) => {
        const updatedOrders = [...prev, nextStep.order]
        const newStepsInProgress = [...stepsInProgress, nextStep] // 遅延中のステップに追加
        setStepsInProgress(newStepsInProgress)

        // 完了したステップをdebounceで送信
        debouncedCompleteStep(newStepsInProgress)

        return updatedOrders
      })
    }, delay)
  }

  return {
    nextStep,
    completedStepOrders,
    stepsInProgress, // 遅延中のステップも返す
    handleStepComplete,
  }
}

export default useStepCompletion
