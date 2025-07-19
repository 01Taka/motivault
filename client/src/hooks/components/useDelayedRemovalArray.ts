import React, { useState, useRef, useCallback, useEffect } from 'react'

// 内部で管理するアイテムの型。必ずidを持つ。
interface InternalItem<T> {
  id: string | number // フックが自動生成するID
  data: T // ユーザーが渡す元のデータ
  delay: number // このアイテムが削除されるまでの遅延時間 (ミリ秒)
  deleteAt: Date // このアイテムが削除される予定の時刻
}

// 複数のアイテムを追加する際に使う、データと遅延時間の型
interface AddItemPayload<T> {
  data: T
  delay?: number // オプションで遅延時間を指定
}

/**
 * 指定した時間後に自動的に要素が削除される配列を管理するカスタムフック。
 * IDの管理はフック内部で完結します。
 * @template T - ユーザーがaddItemに渡す、IDを含まないデータの型。
 * @returns {Object}
 * - dataOnlyItems: IDや遅延情報を含まない、元のデータのみの配列
 * - detailItems: ID、元のデータ、遅延時間、削除予定時刻を含む配列
 * - addItem: IDを含まないデータを追加し、指定時間後に削除する関数
 * - addItems: 複数のアイテムを同時に追加し、指定時間後に削除する関数
 * - removeItem: アイテムのIDを指定して即座に削除する関数
 */
const useDelayedRemovalArray = <T extends any>() => {
  const [internalItems, setInternalItems] = useState<InternalItem<T>[]>([])
  const timeoutRefs = useRef<Record<string | number, NodeJS.Timeout>>({})

  // 外部に公開する詳細なアイテム配列 (ID、元のデータ、delay、deleteAtを含む)
  const detailItems = React.useMemo(
    () =>
      internalItems.map((item) => ({
        id: item.id,
        data: item.data,
        delay: item.delay,
        deleteAt: item.deleteAt,
      })),
    [internalItems]
  )

  // 元のデータのみの配列
  const dataOnlyItems = React.useMemo(
    () => internalItems.map((item) => item.data),
    [internalItems]
  )

  // 個別のアイテムを追加する関数
  const addItem = useCallback((data: T, delay: number = 3000) => {
    const newId =
      Date.now().toString() + Math.random().toString(36).substring(2, 9)
    const deleteAt = new Date(Date.now() + delay)

    const newItem: InternalItem<T> = { id: newId, data, delay, deleteAt }

    setInternalItems((prevItems) => [...prevItems, newItem])

    if (timeoutRefs.current[newItem.id]) {
      clearTimeout(timeoutRefs.current[newItem.id])
    }

    const timerId = setTimeout(() => {
      setInternalItems((prevItems) =>
        prevItems.filter((i) => i.id !== newItem.id)
      )
      delete timeoutRefs.current[newItem.id]
    }, delay)

    timeoutRefs.current[newItem.id] = timerId
  }, [])

  // 複数のアイテムを同時に追加する関数（オーバーロード）
  const addItems = useCallback(
    (itemsPayload: T[] | AddItemPayload<T>[], defaultDelay: number = 3000) => {
      const itemsToProcess: AddItemPayload<T>[] =
        Array.isArray(itemsPayload) &&
        itemsPayload.length > 0 &&
        // payloadsがT[]型の場合をチェック（最初の要素にdataプロパティがないか、あるいは直接T型の場合）
        !(itemsPayload[0] as AddItemPayload<T>).data
          ? (itemsPayload as T[]).map((data) => ({ data }))
          : (itemsPayload as AddItemPayload<T>[])

      const newItems: InternalItem<T>[] = []
      const newTimeouts: Record<string | number, NodeJS.Timeout> = {}

      itemsToProcess.forEach(({ data, delay }) => {
        const itemDelay = delay !== undefined ? delay : defaultDelay
        const newId =
          Date.now().toString() + Math.random().toString(36).substring(2, 9)
        const deleteAt = new Date(Date.now() + itemDelay)

        const newItem: InternalItem<T> = {
          id: newId,
          data,
          delay: itemDelay,
          deleteAt,
        }
        newItems.push(newItem)

        // 既存のタイマーがあればクリア（念のため）
        if (timeoutRefs.current[newItem.id]) {
          clearTimeout(timeoutRefs.current[newItem.id])
        }

        const timerId = setTimeout(() => {
          setInternalItems((prevItems) =>
            prevItems.filter((i) => i.id !== newItem.id)
          )
          delete timeoutRefs.current[newItem.id]
        }, itemDelay)

        newTimeouts[newItem.id] = timerId
      })

      setInternalItems((prevItems) => [...prevItems, ...newItems])
      // useRefに新しいタイマー参照を追加
      timeoutRefs.current = { ...timeoutRefs.current, ...newTimeouts }
    },
    []
  )

  const removeItem = useCallback((itemId: string | number) => {
    setInternalItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    )
    if (timeoutRefs.current[itemId]) {
      clearTimeout(timeoutRefs.current[itemId])
      delete timeoutRefs.current[itemId]
    }
  }, [])

  // コンポーネントがアンマウントされる際に、残っている全てのタイマーをクリア
  useEffect(() => {
    return () => {
      for (const id in timeoutRefs.current) {
        clearTimeout(timeoutRefs.current[id])
      }
    }
  }, [])

  return {
    items: dataOnlyItems, // 元のデータのみの配列
    detailItems, // ID、元のデータ、遅延時間、削除予定時刻を含む配列
    addItem,
    addItems, // 複数アイテム追加関数
    removeItem,
  }
}

export default useDelayedRemovalArray
