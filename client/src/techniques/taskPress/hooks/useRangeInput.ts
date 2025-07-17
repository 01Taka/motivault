import { useState } from 'react'

interface UseRangeInputOptions {
  maxRangeSize?: number // ex: 200
  minValue?: number // ex: 1
  maxValue?: number // ex: 300
  value?: number[]
  setValue?: React.Dispatch<React.SetStateAction<number[]>>
  onChangeCallback?: (value: number[]) => void
}

const messages = {
  notNumber: '数値を入力してください',
  tooSmall: (min: number) => `${min}以上の値を入力してください`,
  tooLarge: (max: number) => `${max}以下の値を入力してください`,
  invalidRange: '終了値は開始値以上にしてください',
  tooWide: (maxRange: number) =>
    `一度に追加できるのは最大${maxRange}個までです`,
} as const

export const useRangeInput = (options?: UseRangeInputOptions) => {
  const {
    maxRangeSize = Infinity,
    minValue = 1,
    maxValue = 999,
    value: externalValue,
    setValue: externalSetValue,
    onChangeCallback = () => {},
  } = options || {}

  const [internalValue, internalSetValue] = useState<number[]>([])
  const value = externalValue ?? internalValue
  const setValue = externalSetValue ?? internalSetValue

  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const resetInputs = () => {
    setStart('')
    setEnd('')
  }

  const validate = (): string | null => {
    const s = parseInt(start)
    const e = end ? parseInt(end) : s

    if (isNaN(s) || isNaN(e)) return messages.notNumber
    if (s < minValue || e < minValue) return messages.tooSmall(minValue)
    if (e > maxValue) return messages.tooLarge(maxValue)
    if (s > e) return messages.invalidRange

    const rangeLength = e - s + 1
    if (rangeLength > maxRangeSize) return messages.tooWide(maxRangeSize)

    return null
  }

  const addRange = () => {
    const s = parseInt(start)
    const e = end ? parseInt(end) : s

    if (validate()) {
      return
    }

    const newValues = Array.from({ length: e - s + 1 }, (_, i) => s + i)
    const merged = Array.from(new Set([...value, ...newValues])).sort(
      (a, b) => a - b
    )

    setValue(merged)
    onChangeCallback(merged)
    resetInputs()
  }

  const removeValue = (val: number) => {
    const newValue = value.filter((v) => v !== val)
    setValue(newValue)
    onChangeCallback(newValue)
  }

  const clearAll = () => {
    setValue([])
    onChangeCallback([])
  }

  const message = validate()
  const error = messages.notNumber !== message ? message : ''
  const isAddDisabled = !!message

  return {
    value,
    start,
    end,
    error,
    setStart,
    setEnd,
    addRange,
    removeValue,
    clearAll,
    isAddDisabled,
  }
}
