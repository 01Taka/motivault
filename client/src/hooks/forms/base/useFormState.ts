import { useState, useCallback, useMemo } from 'react'
import type {
  FormStateChangeAction,
  ArrayFieldChangeAction,
  KeyMirrorObject,
  ElementChangeEventMap,
  OnChangeHandlersMap,
} from '../../../types/form/formState-types'

const useFormState = <
  T extends Record<string, any>,
  ArrayType extends Partial<Record<keyof T, unknown>> = Record<
    keyof T,
    unknown
  >,
>(
  initialState: T
) => {
  const [formState, setFormState] = useState<T>(initialState)
  const [files, setFiles] = useState<Record<string, FileList | null>>({})

  // names オブジェクトを使用することで、タイポを防いでnameを使える
  const names = keyMirror(initialState)

  const onChangeFormState = useCallback((action: FormStateChangeAction) => {
    setFormState((prev) => ({
      ...prev,
      [action.name]: action.value,
    }))
  }, [])

  const resetFormState = useCallback(() => {
    setFormState({ ...initialState })
    // ファイルの状態もリセット
    setFiles({})
  }, [initialState])

  const onChangeArrayField = useCallback(
    <K extends keyof T>(
      name: K,
      action: ArrayFieldChangeAction<ArrayType[K]>,
      replaceObjectKey?: keyof ArrayType[K] // 'set' オペレーションでは通常使われないが、型定義上は残す
    ) => {
      setFormState((prev) => {
        const prevData = prev[name]

        // 'set' オペレーションの場合は、既存のprevDataが配列である必要はない
        // ただし、型安全性のためにArray.isArrayのチェックは残しておくか、
        // 'set' オペレーションではスキップするように変更する
        if (action.operation !== 'set' && !Array.isArray(prevData)) {
          console.error(
            `Field ${String(name)} is not an array for operations other than 'set'.`
          )
          return prev
        }

        // 'set' の場合は newData を action.value から直接取得
        const newData =
          action.operation === 'set' ? action.value : [...prevData]

        switch (action.operation) {
          case 'replace':
            if (
              Array.isArray(newData) &&
              action.index >= 0 &&
              action.index < newData.length
            ) {
              if (replaceObjectKey && isPlainObject(newData[action.index])) {
                // オブジェクトの特定のキーのみを更新
                newData[action.index] = {
                  ...(newData[action.index] as object),
                  [replaceObjectKey]: action.value,
                }
              } else {
                // 配列の要素を丸ごと置き換え
                newData[action.index] = action.value
              }
            }
            break
          case 'delete':
            if (
              Array.isArray(newData) &&
              action.index >= 0 &&
              action.index < newData.length
            ) {
              newData.splice(action.index, 1)
            }
            break
          case 'push':
            if (Array.isArray(newData)) {
              newData.push(action.value)
            }
            break
          case 'set':
            // newData は既に action.value (新しい配列) で初期化されているため、
            // ここでは追加の処理は不要。
            // もし prevData が配列でなかったとしても、ここでは新しい配列で上書きされる。
            break
          default:
            break
        }

        return {
          ...prev,
          [name]: newData,
        }
      })
    },
    []
  )

  const createInputOnChange = (
    event: React.ChangeEvent<any>,
    updateCallback: (fieldName: string, newValue: any) => void,
    fileKey?: string
  ) => {
    const { name, value } = event.target
    const inputType = 'type' in event.target ? event.target.type : ''

    if (inputType === 'checkbox') {
      updateCallback(name, (event.target as HTMLInputElement).checked)
    } else if (inputType === 'file') {
      const fileInput = event.target as HTMLInputElement
      setFiles((prev) => ({
        ...prev,
        [fileKey || name]: fileInput.files,
      }))
      // ファイル入力の場合はここで処理を終了
      return
    } else if (inputType === 'number') {
      // value が空文字列の場合、NaN になるため、空の場合は undefined をセットするなどの考慮も可能
      updateCallback(name, value === '' ? '' : parseFloat(value))
    } else {
      updateCallback(name, value)
    }
  }

  const createOnChange = <E extends keyof ElementChangeEventMap>(
    name: string,
    type: E,
    updateCallback: (fieldName: string, newValue: any) => void,
    fileKey?: string
  ): OnChangeHandlersMap[E] => {
    switch (type) {
      case 'input':
        return ((event: ElementChangeEventMap['input']) =>
          createInputOnChange(
            event,
            updateCallback,
            fileKey
          )) as OnChangeHandlersMap[E]
      case 'tabs':
        return ((_, value) => {
          updateCallback(name, value)
        }) as OnChangeHandlersMap[E]
      case 'muiSelect':
        return ((event: ElementChangeEventMap['muiSelect']) =>
          updateCallback(name, event.target.value)) as OnChangeHandlersMap[E]
      default:
        throw new Error(`Unknown Type: ${type}`)
    }
  }

  const createInputProps = <E extends keyof ElementChangeEventMap>(
    name: keyof T,
    type?: E
  ) => {
    return {
      value: formState[name] ?? '',
      name: String(name),
      onChange: createOnChange(
        String(name),
        type ?? 'input',
        (fieldName, newValue) =>
          onChangeFormState({ name: fieldName, value: newValue })
      ),
    } as {
      value: any
      name: string
      onChange: OnChangeHandlersMap[E]
    }
  }

  const createInputPropsInArray = <
    K extends keyof T,
    E extends keyof ElementChangeEventMap,
  >(
    name: K,
    index: number,
    replaceObjectKey?: keyof ArrayType[K],
    type?: E
  ) => {
    const arrayField = formState[name]

    // 配列でない、またはインデックスが無効な場合はエラーをスローして早期リターン
    if (!Array.isArray(arrayField) || index < 0 || index >= arrayField.length) {
      console.error(
        `Invalid access: Field ${String(name)} is not an array or index ${index} is out of bounds.`
      )
      // 適切なデフォルト値を返すか、null/undefined を返すことで、呼び出し元でハンドリングを強制する
      // ここでは、TypeScriptのエラーを避けるために、空のオブジェクトを返すのではなく、
      // 実行時エラーを防ぐための安全な値を返すように変更
      return {
        value: '', // デフォルト値を設定
        name: String(name),
        onChange: () => {}, // ダミーのonChangeハンドラ
      } as {
        value: any
        name: string
        onChange: OnChangeHandlersMap[E]
      }
    }

    const value = replaceObjectKey
      ? arrayField[index][replaceObjectKey]
      : arrayField[index]

    return {
      value: value ?? '',
      name: String(name),
      onChange: createOnChange(
        String(name),
        type ?? 'input',
        (fieldName, newValue) =>
          onChangeArrayField(
            fieldName as K,
            { operation: 'replace', value: newValue, index },
            replaceObjectKey
          ),
        `${String(name)}-${index}`
      ),
    }
  }

  const hasEmptyInput = useMemo(() => {
    return Object.values(formState).some(
      (value) =>
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value?.length === 0)
    )
  }, [formState])

  type CheckOptions<T> = {
    include?: (keyof T)[] // チェックに含めるフィールドの配列
    exclude?: (keyof T)[] // チェックから除外するフィールドの配列
    priority?: 'include' | 'exclude' // include と exclude が両方指定された場合の優先順位
  }

  const checkHasEmptyInput = (options?: CheckOptions<T>): boolean => {
    const allFormKeys = Object.keys(formState) as (keyof T)[]
    let fieldsToCheck: (keyof T)[]

    // オプションが指定されていない場合は、すべてのフィールドをチェック
    if (!options || (!options.include && !options.exclude)) {
      fieldsToCheck = allFormKeys
    } else {
      const { include, exclude, priority = 'include' } = options // デフォルトは 'include' 優先

      if (include && exclude) {
        // include と exclude が両方指定されている場合
        if (priority === 'include') {
          // include 優先: exclude に含まれるものは除外
          fieldsToCheck = include.filter((key) => !exclude.includes(key))
        } else {
          // exclude 優先: include に含まれないものも含めて、exclude に含まれるものを除外
          fieldsToCheck = allFormKeys.filter((key) => !exclude.includes(key))
        }
      } else if (include) {
        // include のみが指定されている場合
        fieldsToCheck = include
      } else {
        // exclude のみが指定されている場合
        fieldsToCheck = allFormKeys.filter((key) => !exclude!.includes(key))
      }
    }

    return fieldsToCheck.some(
      (key) =>
        formState[key] === undefined ||
        (typeof formState[key] === 'string' &&
          (formState[key] as string).trim() === '') || // 文字列の空もチェック
        (Array.isArray(formState[key]) && formState[key]?.length === 0)
    )
  }

  return {
    formState,
    names,
    files,
    hasEmptyInput,
    setFormState,
    onChangeFormState,
    onChangeArrayField,
    resetFormState,
    createInputProps,
    createInputPropsInArray,
    checkHasEmptyInput,
  }
}

export default useFormState

const keyMirror = <T extends object>(obj: T): KeyMirrorObject<T> => {
  return Object.keys(obj).reduce((mirrored, key) => {
    mirrored[key as keyof T] = key as keyof T
    return mirrored
  }, {} as KeyMirrorObject<T>)
}

const isPlainObject = (value: any): boolean => {
  return (
    value !== null && typeof value === 'object' && value.constructor === Object
  )
}
