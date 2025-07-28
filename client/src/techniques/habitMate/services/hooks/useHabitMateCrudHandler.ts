import { useCallback } from 'react'
import useMultipleAsyncHandler from '../../../../hooks/async-processing/useMultipleAsyncHandler'
import { getHabitLevelInfo } from '../../functions/constantHelpers/habit-level-data-helper'
import type { HabitMateCreateHabitFormState } from '../../types/form/habit-create-form'
import type { HabitMateHabitLevel } from '../../types/data/habit-level-types'
import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import {
  createHabitMateHabit,
  pushHabitMateHabitWorkedDate,
  removeHabitMateHabitWorkedDate,
  toggleHabitMateHabitWorkedDate,
  updateHabitMateHabitBaseData,
  updateHabitMateHabitNextTargetCount,
} from '../functions/habit-mate-habit-crud'
import type { HabitMateContinueHabitFormState } from '../../types/form/habit-continue-form'
import { useHabitMateDataStore } from '../stores/useHabitMateDataStore'
import { useTechniqueMetadataDataStore } from '../../../../features/technique/services/stores/useTechniqueMetadataDataStore'

const useHabitMateCrudHandler = () => {
  const { idbMetadata } = useTechniqueMetadataDataStore()
  const { idbHabit } = useHabitMateDataStore()
  const asyncKeys = [
    'createSubmit',
    'updateHabit',
    'pushWorkedDate',
    'removeWorkedDate',
    'toggleWorkedDate',
    'updateNextTargetCount',
  ] as const
  const { asyncStates, callAsyncFunction } = useMultipleAsyncHandler(asyncKeys)

  // Helper function to check for IndexedDB initialization
  // このヘルパー関数もuseCallbackで囲みます。
  const isIndexedDBReady = useCallback(
    <T>(dbInstance: T | null | undefined, dbName: string): boolean => {
      if (!dbInstance) {
        console.error(`${dbName} is not initialized. Cannot perform operation.`)
        throw new Error(`IndexedDB ${dbName} is not initialized.`)
      }
      return true
    },
    [] // 依存配列は空でOK、外のスコープの変数を参照しないため
  )

  const submitCreateHabit = useCallback(
    async (
      level: HabitMateHabitLevel,
      formState: HabitMateCreateHabitFormState,
      startedAt = Date.now()
    ) => {
      await callAsyncFunction(
        'createSubmit',
        async () => {
          isIndexedDBReady(idbMetadata, 'idbMetadata')
          isIndexedDBReady(idbHabit, 'idbHabit')

          const levelData = getHabitLevelInfo(level)

          const data: HabitMateHabitWrite = {
            level,
            levelVersion: levelData.version,
            ...formState,
            startedAt,
            workedDate: [],
            nextTargetCount: levelData.milestoneIntervalCount,
            isFailed: false,
            status: 'active',
            resetCount: 0,
          }
          return await createHabitMateHabit(idbMetadata!, idbHabit!, data)
        },
        [],
        '習慣の作成と登録に失敗しました。'
      )
    },
    [callAsyncFunction, idbMetadata, idbHabit, isIndexedDBReady] // 依存配列に含める
  )

  const pushWorkedDate = useCallback(
    async (habitId: string) => {
      await callAsyncFunction(
        'pushWorkedDate',
        async () => {
          isIndexedDBReady(idbHabit, 'idbHabit')
          return await pushHabitMateHabitWorkedDate(idbHabit!, habitId)
        },
        [],
        'ワーク日の追加に失敗しました。'
      )
    },
    [callAsyncFunction, idbHabit, isIndexedDBReady] // 依存配列に含める
  )

  const removeWorkedDate = useCallback(
    async (habitId: string) => {
      await callAsyncFunction(
        'removeWorkedDate',
        async () => {
          isIndexedDBReady(idbHabit, 'idbHabit')
          return await removeHabitMateHabitWorkedDate(idbHabit!, habitId)
        },
        [],
        'ワーク日の削除に失敗しました。'
      )
    },
    [callAsyncFunction, idbHabit, isIndexedDBReady] // 依存配列に含める
  )

  const toggleWorkedDate = useCallback(
    async (habitId: string) => {
      await callAsyncFunction(
        'toggleWorkedDate',
        async () => {
          isIndexedDBReady(idbHabit, 'idbHabit')
          return await toggleHabitMateHabitWorkedDate(idbHabit!, habitId)
        },
        [],
        'ワーク日の切り替えに失敗しました。'
      )
    },
    [callAsyncFunction, idbHabit, isIndexedDBReady] // 依存配列に含める
  )

  const updateNextTargetCount = useCallback(
    async (habitId: string, updateData?: HabitMateContinueHabitFormState) => {
      if (updateData) {
        const { success } = await callAsyncFunction(
          'updateHabit',
          async () => {
            isIndexedDBReady(idbHabit, 'idbHabit')
            return await updateHabitMateHabitBaseData(idbHabit!, habitId, {
              ...updateData,
            })
          },
          [],
          '習慣データの更新に失敗しました。'
        )
        if (!success) {
          return
        }
      }

      await callAsyncFunction(
        'updateNextTargetCount',
        async () => {
          isIndexedDBReady(idbHabit, 'idbHabit')
          return await updateHabitMateHabitNextTargetCount(idbHabit!, habitId)
        },
        [],
        '次の目標カウントの更新に失敗しました。'
      )
    },
    [callAsyncFunction, idbHabit, isIndexedDBReady] // 依存配列に含める
  )

  return {
    asyncStates,
    submitCreateHabit,
    pushWorkedDate,
    removeWorkedDate,
    toggleWorkedDate,
    updateNextTargetCount,
  }
}

export default useHabitMateCrudHandler
