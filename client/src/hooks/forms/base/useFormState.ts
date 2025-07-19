import { useState, useCallback, useMemo, useRef } from 'react' // useRef をインポート
import type {
  FormStateChangeAction,
  ArrayFieldChangeAction,
  KeyMirrorObject,
  ElementChangeEventMap,
  OnChangeHandlersMap,
  CheckOptions,
} from '../../../types/form/formState-types'

/**
 * @typedef {Object} FormStateChangeAction
 * @property {string} name - The name of the form field.
 * @property {any} value - The new value of the form field.
 */

/**
 * @typedef {'replace' | 'delete' | 'push' | 'set'} ArrayFieldOperation
 */

/**
 * @typedef {Object} ArrayFieldChangeAction
 * @property {ArrayFieldOperation} operation - The operation to perform on the array field.
 * @property {any} [value] - The value to use for 'replace', 'push', or 'set' operations.
 * @property {number} [index] - The index for 'replace' or 'delete' operations.
 */

/**
 * @typedef {Object.<keyof T, keyof T>} KeyMirrorObject
 * @template T
 */

/**
 * @typedef {Object} ElementChangeEventMap
 * @property {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} input
 * @property {React.SyntheticEvent<Element, Event> & { target: { value: unknown } }} tabs
 * @property {React.ChangeEvent<HTMLSelectElement>} muiSelect
 */

/**
 * @typedef {Object} OnChangeHandlersMap
 * @property {(event: ElementChangeEventMap['input']) => void} input
 * @property {(event: React.SyntheticEvent, value: unknown) => void} tabs
 * @property {(event: ElementChangeEventMap['muiSelect']) => void} muiSelect
 */

/**
 * A custom React hook for managing form state, including individual fields, array fields, and file inputs.
 * It provides utilities for updating, resetting, and checking the validity of form inputs.
 * It also allows for dynamic updates to the initial state.
 *
 * @template T - The type of the form state object.
 * @template ArrayType - The type for array fields within the form state. Defaults to a partial record of T.
 *
 * @param {T} initialFormValues - The initial state of the form when the hook is first used. This can be updated later using `updateInitialState`.
 * @returns {Object} An object containing form state, utility functions, and derived values.
 * @property {T} formState - The current state of the form.
 * @property {KeyMirrorObject<T>} names - An object mirroring the keys of the initial state, useful for preventing typos.
 * @property {Record<string, FileList | null>} files - A record of FileList objects for file inputs, keyed by input name.
 * @property {boolean} hasEmptyInput - A memoized boolean indicating if any top-level form field (excluding array and complex objects unless they are empty arrays) is empty (undefined, empty string, or empty array).
 * @property {React.Dispatch<React.SetStateAction<T>>} setFormState - The React state setter for the entire form state.
 * @property {(action: FormStateChangeAction) => void} onChangeFormState - A callback to update a single form field's state.
 * @property {<K extends keyof T>(name: K, action: ArrayFieldChangeAction<ArrayType[K]>, replaceObjectKey?: keyof ArrayType[K]) => void} onChangeArrayField - A callback to manage operations (replace, delete, push, set) on array fields within the form state.
 * @property {() => void} resetFormState - A callback to reset the form state to its initial values and clear file inputs.
 * @property {<E extends keyof ElementChangeEventMap>(name: keyof T, type?: E) => { value: any; name: string; onChange: OnChangeHandlersMap[E] }} createInputProps - A factory function to generate props for standard input elements (text, number, checkbox, file) and other UI components like Material-UI Tabs or Select.
 * @property {<K extends keyof T, E extends keyof ElementChangeEventMap>(name: K, index: number, replaceObjectKey?: keyof ArrayType[K], type?: E) => { value: any; name: string; onChange: OnChangeHandlersMap[E] }} createInputPropsInArray - A factory function to generate props for input elements within an array field, allowing specific item updates or properties within objects in the array.
 * @property {(options?: CheckOptions<T>) => boolean} checkHasEmptyInput - A function to check for empty inputs based on flexible inclusion/exclusion criteria.
 * @property {() => Partial<T>} getFormDiff - Calculates the difference between the current form state and the initial state.
 * @property {(options?: HasDiffOptions<T>) => boolean} hasFormDiff - Checks if there is any difference between the current form state and the initial state for specific properties.
 * @property {(newInitialState: T) => void} updateInitialState - Updates the stored initial state. This will affect future calls to `resetFormState`, `getFormDiff`, and `hasFormDiff`.
 */
const useFormState = <
  T extends Record<string, any>,
  ArrayType extends Partial<Record<keyof T, unknown>> = Record<
    keyof T,
    unknown
  >,
>(
  initialFormValues: T // パラメータ名を変更
) => {
  const [formState, setFormState] = useState<T>(initialFormValues)
  const [files, setFiles] = useState<Record<string, FileList | null>>({})

  // useRef を使って初期状態を保持し、関数で更新できるようにする
  const initialStateRef = useRef<T>(initialFormValues)

  /**
   * Initializes or updates the internal `initialStateRef` with new values.
   * This function should be called when the "true" initial state of the form needs to be changed dynamically,
   * for instance, when loading data from an API to pre-fill the form.
   * Calling this will affect subsequent `resetFormState`, `getFormDiff`, and `hasFormDiff` calls.
   *
   * @param {T} newInitialState - The new state to set as the initial state.
   */
  const updateInitialState = useCallback((newInitialState: T) => {
    initialStateRef.current = newInitialState
    // 初期状態を更新した際に、フォームの状態もそれに合わせるかどうかはユースケースによる
    // ここでは、新しい初期状態でフォームの状態も更新する
    setFormState(newInitialState)
  }, [])

  /**
   * Generates a key-mirror object from the initial state's keys.
   * Useful for preventing typos when referring to form field names.
   * `useMemo`を使って、initialStateRef.currentが変更されたときにのみ再計算されるようにする
   * @type {KeyMirrorObject<T>}
   */
  const names = useMemo(
    () => keyMirror(initialStateRef.current),
    [initialStateRef.current]
  )

  /**
   * Updates a single form state field based on a provided action.
   * This callback is memoized to prevent unnecessary re-renders.
   *
   * @param {FormStateChangeAction} action - An object containing the name of the field and its new value.
   */
  const onChangeFormState = useCallback((action: FormStateChangeAction) => {
    setFormState((prev) => ({
      ...prev,
      [action.name]: action.value,
    }))
  }, [])

  /**
   * Resets the entire form state to its *current* initial values (stored in `initialStateRef`).
   * Also clears any selected files.
   * This callback is memoized to prevent unnecessary re-renders.
   */
  const resetFormState = useCallback(() => {
    setFormState({ ...initialStateRef.current }) // useRef の値を使用
    // ファイルの状態もリセット
    setFiles({})
  }, []) // initialStateRef.current は useCallback の依存配列に含めない

  /**
   * Manages operations (replace, delete, push, set) on array fields within the form state.
   * It ensures type safety and handles various array manipulations.
   * This callback is memoized to prevent unnecessary re-renders.
   *
   * @template K - The key of the array field in the form state.
   * @param {K} name - The name of the array field.
   * @param {ArrayFieldChangeAction<ArrayType[K]>} action - The action to perform on the array (e.g., 'replace', 'delete', 'push', 'set').
   * @param {keyof ArrayType[K]} [replaceObjectKey] - Optional. Used with 'replace' operation when updating a specific key within an object inside the array.
   */
  const onChangeArrayField = useCallback(
    <K extends keyof T>(
      name: K,
      action: ArrayFieldChangeAction<ArrayType[K]>,
      replaceObjectKey?: keyof ArrayType[K] // 'set' オペレーションでは通常使われないが、型定義上は残す
    ) => {
      setFormState((prev) => {
        const prevData = prev[name]

        if (action.operation !== 'set' && !Array.isArray(prevData)) {
          console.error(
            `Field ${String(name)} is not an array for operations other than 'set'.`
          )
          return prev
        }

        const newData =
          action.operation === 'set'
            ? action.value
            : [...(prevData as Array<any>)]

        switch (action.operation) {
          case 'replace':
            if (
              Array.isArray(newData) &&
              action.index !== undefined &&
              action.index >= 0 &&
              action.index < newData.length
            ) {
              if (replaceObjectKey && isPlainObject(newData[action.index])) {
                newData[action.index] = {
                  ...(newData[action.index] as object),
                  [replaceObjectKey]: action.value,
                }
              } else {
                newData[action.index] = action.value
              }
            }
            break
          case 'delete':
            if (
              Array.isArray(newData) &&
              action.index !== undefined &&
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

  /**
   * Handles the change event for various input types (text, number, checkbox, file).
   * It updates the form state or file state accordingly.
   *
   * @param {React.ChangeEvent<any>} event - The change event object from the input element.
   * @param {(fieldName: string, newValue: any) => void} updateCallback - The callback function to update the form state (e.g., `onChangeFormState`).
   * @param {string} [fileKey] - Optional. A specific key to use when storing file input data, defaults to `event.target.name`.
   */
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
      return
    } else if (inputType === 'number') {
      updateCallback(name, value === '' ? '' : parseFloat(value))
    } else {
      updateCallback(name, value)
    }
  }

  /**
   * Creates an appropriate onChange handler based on the specified element type.
   * This allows for consistent handling of different UI component's change events.
   *
   * @template E - The type of the element change event (e.g., 'input', 'tabs', 'muiSelect').
   * @param {string} name - The name of the form field.
   * @param {E} type - The type of the element triggering the change event.
   * @param {(fieldName: string, newValue: any) => void} updateCallback - The callback function to update the form state (e.g., `onChangeFormState`).
   * @param {string} [fileKey] - Optional. A specific key to use when storing file input data for file inputs.
   * @returns {OnChangeHandlersMap[E]} The appropriate onChange handler for the specified element type.
   * @throws {Error} If an unknown type is provided.
   */
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

  /**
   * Generates common props (value, name, onChange) for a standard input element.
   * This simplifies binding form state to input components.
   *
   * @template E - The type of the element change event (e.g., 'input', 'tabs', 'muiSelect').
   * @param {keyof T} name - The name of the form field.
   * @param {E} [type] - Optional. The type of the element, defaults to 'input'.
   * @returns {{ value: any; name: string; onChange: OnChangeHandlersMap[E] }} An object containing props for an input element.
   */
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

  /**
   * Generates common props (value, name, onChange) for an input element that is part of an array field.
   * It handles updating specific elements within an array or specific properties of objects within an array.
   *
   * @template K - The key of the array field in the form state.
   * @template E - The type of the element change event (e.g., 'input', 'tabs', 'muiSelect').
   * @param {K} name - The name of the array field.
   * @param {number} index - The index of the element within the array to be updated.
   * @param {keyof ArrayType[K]} [replaceObjectKey] - Optional. The key of the property to update if the array element is an object.
   * @param {E} [type] - Optional. The type of the element, defaults to 'input'.
   * @returns {{ value: any; name: string; onChange: OnChangeHandlersMap[E] }} An object containing props for an input element within an array.
   */
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

    if (!Array.isArray(arrayField) || index < 0 || index >= arrayField.length) {
      console.error(
        `Invalid access: Field ${String(name)} is not an array or index ${index} is out of bounds.`
      )
      return {
        value: '',
        name: String(name),
        onChange: () => {},
      } as {
        value: any
        name: string
        onChange: OnChangeHandlersMap[E]
      }
    }

    const value = replaceObjectKey
      ? (arrayField[index] as Record<string, any>)[replaceObjectKey as string]
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

  /**
   * @typedef {Object} CheckOptions
   * @property {(keyof T)[]} [include] - An array of field keys to explicitly include in the emptiness check.
   * @property {(keyof T)[]} [exclude] - An array of field keys to explicitly exclude from the emptiness check.
   * @property {'include' | 'exclude'} [priority='include'] - Determines priority if both 'include' and 'exclude' are provided.
   * - 'include' (default): Only checks fields in 'include' that are NOT in 'exclude'.
   * - 'exclude': Checks all fields NOT in 'exclude', even if they are not in 'include'.
   */

  /**
   * A memoized boolean indicating if any top-level form field (excluding array and complex objects unless they are empty arrays) is empty (undefined, empty string, or empty array).
   * @type {boolean}
   */
  const hasEmptyInput = useMemo(() => {
    return Object.values(formState).some(
      (value) =>
        value === undefined ||
        value === '' ||
        (Array.isArray(value) && value?.length === 0)
    )
  }, [formState])

  /**
   * Checks if any of the specified form fields are empty based on flexible inclusion/exclusion criteria.
   * An input is considered empty if its value is `undefined`, an empty string (after trimming for strings), or an empty array.
   *
   * @param {CheckOptions<T>} [options] - Optional. An object specifying which fields to include or exclude from the check, and priority if both are specified.
   * @returns {boolean} `true` if any of the checked fields are empty, `false` otherwise.
   */
  const checkHasEmptyInput = (options?: CheckOptions<T>): boolean => {
    const allFormKeys = Object.keys(formState) as (keyof T)[]
    let fieldsToCheck: (keyof T)[]

    if (!options || (!options.include && !options.exclude)) {
      fieldsToCheck = allFormKeys
    } else {
      const { include, exclude, priority = 'include' } = options

      if (include && exclude) {
        if (priority === 'include') {
          fieldsToCheck = include.filter((key) => !exclude.includes(key))
        } else {
          fieldsToCheck = allFormKeys.filter((key) => !exclude.includes(key))
        }
      } else if (include) {
        fieldsToCheck = include
      } else {
        fieldsToCheck = allFormKeys.filter((key) => !exclude!.includes(key))
      }
    }

    return fieldsToCheck.some(
      (key) =>
        formState[key] === undefined ||
        (typeof formState[key] === 'string' &&
          (formState[key] as string).trim() === '') ||
        (Array.isArray(formState[key]) && formState[key]?.length === 0)
    )
  }

  /**
   * Calculates the difference between the current form state and the initial state (stored in `initialStateRef`).
   * It returns an object containing only the properties that have changed,
   * including additions, modifications, and deletions.
   * For arrays, it checks if the array reference or its content has changed using JSON.stringify for deep comparison.
   * For objects within arrays or top-level objects, it performs a shallow comparison unless a deep comparison is explicitly needed.
   *
   * @returns {Partial<T>} An object representing the differences from the initial state.
   */
  const getFormDiff = useCallback((): Partial<T> => {
    const diff: Partial<T> = {}
    const initialState = initialStateRef.current // useRef の値を取得

    // Check for changes in existing properties and new properties in formState
    for (const key in formState) {
      if (Object.prototype.hasOwnProperty.call(formState, key)) {
        const initialValue = initialState[key]
        const currentValue = formState[key]

        if (Array.isArray(initialValue) && Array.isArray(currentValue)) {
          // Deep compare arrays
          if (JSON.stringify(initialValue) !== JSON.stringify(currentValue)) {
            diff[key] = currentValue
          }
        } else if (
          typeof initialValue === 'object' &&
          initialValue !== null &&
          typeof currentValue === 'object' &&
          currentValue !== null
        ) {
          // Shallow compare objects (for top-level object properties)
          // For deeper comparison, a dedicated deep diff utility would be needed
          if (JSON.stringify(initialValue) !== JSON.stringify(currentValue)) {
            diff[key] = currentValue
          }
        } else if (initialValue !== currentValue) {
          diff[key] = currentValue
        }
      }
    }

    // Check for properties present in initialState but removed from formState
    for (const key in initialState) {
      if (
        Object.prototype.hasOwnProperty.call(initialState, key) &&
        !Object.prototype.hasOwnProperty.call(formState, key)
      ) {
        diff[key] = undefined // Mark as removed or set to undefined
      }
    }

    return diff
  }, [formState]) // initialStateRef.current は useCallback の依存配列に含めない

  /**
   * @typedef {Object} HasDiffOptions
   * @property {(keyof T)[]} [include] - An array of field keys to explicitly include in the diff check.
   * @property {(keyof T)[]} [exclude] - An array of field keys to explicitly exclude from the diff check.
   * @property {'include' | 'exclude'} [priority='include'] - Determines priority if both 'include' and 'exclude' are provided.
   * - 'include' (default): Only checks fields in 'include' that are NOT in 'exclude'.
   * - 'exclude': Checks all fields NOT in 'exclude', even if they are not in 'include'.
   */

  /**
   * Checks if there is any difference between the current form state and the initial state (stored in `initialStateRef`)
   * for specific properties, based on flexible inclusion/exclusion criteria.
   * This is useful for enabling/disabling a "Save" button, for example.
   *
   * @param {CheckOptions<T>} [options] - Optional. An object specifying which fields to include or exclude from the check, and priority if both are specified.
   * @returns {boolean} `true` if a difference is found in the checked fields, `false` otherwise.
   */
  const hasFormDiff = useCallback(
    (options?: CheckOptions<T>): boolean => {
      const initialState = initialStateRef.current // useRef の値を取得
      const allFormKeys = Object.keys(initialState) as (keyof T)[]
      let fieldsToCheck: (keyof T)[]

      if (!options || (!options.include && !options.exclude)) {
        fieldsToCheck = allFormKeys
      } else {
        const { include, exclude, priority = 'include' } = options

        if (include && exclude) {
          if (priority === 'include') {
            fieldsToCheck = include.filter((key) => !exclude.includes(key))
          } else {
            fieldsToCheck = allFormKeys.filter((key) => !exclude.includes(key))
          }
        } else if (include) {
          fieldsToCheck = include
        } else {
          fieldsToCheck = allFormKeys.filter((key) => !exclude!.includes(key))
        }
      }

      return fieldsToCheck.some((key) => {
        const initialValue = initialState[key]
        const currentValue = formState[key]

        if (Array.isArray(initialValue) && Array.isArray(currentValue)) {
          return JSON.stringify(initialValue) !== JSON.stringify(currentValue)
        } else if (
          typeof initialValue === 'object' &&
          initialValue !== null &&
          typeof currentValue === 'object' &&
          currentValue !== null
        ) {
          return JSON.stringify(initialValue) !== JSON.stringify(currentValue)
        }
        return initialValue !== currentValue
      })
    },
    [formState] // initialStateRef.current は useCallback の依存配列に含めない
  )

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
    getFormDiff,
    hasFormDiff,
    updateInitialState, // 追加
  }
}

export default useFormState

/**
 * Creates a "key mirror" object from the keys of the input object.
 * The value of each property in the returned object is the same as its key.
 * This is useful for creating constants for object keys.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object from which to mirror keys.
 * @returns {KeyMirrorObject<T>} An object where keys are mirrored as their own values.
 */
const keyMirror = <T extends object>(obj: T): KeyMirrorObject<T> => {
  return Object.keys(obj).reduce((mirrored, key) => {
    mirrored[key as keyof T] = key as keyof T
    return mirrored
  }, {} as KeyMirrorObject<T>)
}

/**
 * Checks if a given value is a plain JavaScript object (i.e., an object created by `{}` or `new Object()`).
 *
 * @param {any} value - The value to check.
 * @returns {boolean} `true` if the value is a plain object, `false` otherwise.
 */
const isPlainObject = (value: any): boolean => {
  return (
    value !== null && typeof value === 'object' && value.constructor === Object
  )
}
