// src/hooks/useInfoModal.ts
import { useEffect, useState, useCallback } from 'react' // useState を追加
import { useInfoModalStore } from '../store/useInfoModalStore'

export const useInfoModal = () => {
  const { infoQueue, removeInfo, clearQueue } = useInfoModalStore()

  const [closePulse, setClosePulse] = useState(false) // closePulse ステートをフックに移動

  // closePulse が true になった後、指定時間で false に戻す
  useEffect(() => {
    if (closePulse) {
      const timer = setTimeout(() => {
        setClosePulse(false)
      }, 250) // モーダルの閉じるアニメーション時間に合わせて調整

      return () => clearTimeout(timer)
    }
  }, [closePulse])

  // モーダルの open プロップに直接渡す値
  // currentShowingModalInfo が存在し、かつ closePulse 中でない場合に true
  const isOpen = !!infoQueue.length && !closePulse

  // モーダルが閉じられたときに呼び出す関数
  // キューから要素を削除し、閉じるアニメーションを開始
  const handleModalClose = useCallback(() => {
    removeInfo() // キューから先頭の要素を削除
    setClosePulse(true) // 閉じるアニメーションを開始
  }, [removeInfo])

  return {
    // コンポーネントに渡すモーダル開閉状態
    isOpen: isOpen,
    // コンポーネントに渡すモーダル情報
    info: infoQueue.length > 0 ? infoQueue[0] : null,
    // コンポーネントに渡す閉じるハンドラー
    onClose: handleModalClose,

    // その他のストア操作関数（コンポーネント側で直接呼び出す場合）
    clearAllModalInfo: clearQueue,
    modalQueueLength: infoQueue.length,
  }
}
