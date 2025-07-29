// hooks/useLocalStorage.ts
import { useState, useCallback } from 'react'

/**
 * ローカルストレージとの間で状態を永続化するカスタムフック。
 *
 * @template T 状態の型。
 * @param {string} key ローカルストレージに値を保存するためのキー。
 * @param {T} initialValue キーがローカルストレージに存在しない場合に設定される初期値。
 * @returns {[T, (value: T | ((prev: T) => T)) => void]} 現在の永続化された値と、その値を更新するための関数を返します。
 * 更新関数は、新しい値を直接渡すか、以前の値を引数とする関数を渡すことができます。
 */
function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value
        setStoredValue(valueToStore)
        localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(`Error writing localStorage key "${key}":`, error)
      }
    },
    [key, storedValue]
  )

  // オプション: 複数のタブ間でlocalStorageの変更を同期したい場合にコメント解除
  // useEffect(() => {
  //   const handleStorageChange = (event: StorageEvent) => {
  //     if (event.key === key && event.newValue) {
  //       try {
  //         setStoredValue(JSON.parse(event.newValue));
  //       } catch (error) {
  //         console.error(`Error parsing localStorage change for key "${key}":`, error);
  //       }
  //     }
  //   };
  //   window.addEventListener('storage', handleStorageChange);
  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange);
  //   };
  // }, [key]);

  return [storedValue, setValue]
}

export default useLocalStorage
