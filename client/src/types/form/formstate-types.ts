import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  SelectChangeEvent,
} from '@mui/material'
import type { ChangeEvent, SyntheticEvent } from 'react'
import type { AutocompleteOption } from '../components/autocomplete-types'

export type FormStateChangeAction<T = any> = {
  name: string
  value: T
}

interface ElementReplaceAction {
  operation: 'replace'
  value: any
  index: number
}

interface ElementDeleteAction {
  operation: 'delete'
  index: number
}

interface ElementPushAction<Value = any> {
  operation: 'push'
  value: Value
}

interface ElementSetAction<Value extends any[] = any[]> {
  operation: 'set'
  value: Value
}

export type ArrayFieldChangeAction<Value = any> =
  | ElementReplaceAction
  | ElementDeleteAction
  | ElementPushAction<Value>
  | ElementSetAction<Value[]>

export type KeyMirrorObject<T extends Record<string, any>> = {
  [K in keyof T]: K
}

export type CheckOptions<T> = {
  include?: (keyof T)[] // チェックに含めるフィールドの配列
  exclude?: (keyof T)[] // チェックから除外するフィールドの配列
  priority?: 'include' | 'exclude' // include と exclude が両方指定された場合の優先順位
}

// 1. Centralized Event Map
// This map directly links a type key to its corresponding React ChangeEvent type.
export type ElementChangeEventMap = {
  input: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  muiSelect: SelectChangeEvent<string> // Renamed for clarity, assuming Material-UI
  checkbox: [SyntheticEvent, boolean]
  tabs: [SyntheticEvent, any] // Tab events often have a SyntheticEvent and a value
  autocomplete: [
    SyntheticEvent<Element, Event>,
    string | AutocompleteOption | null,
    AutocompleteChangeReason,
    AutocompleteChangeDetails<string | AutocompleteOption> | undefined,
  ]
}

// 2. Type for Generic Change Handlers
// This utility type generates the function signature for each specific change handler.
export type ChangeHandler<K extends keyof ElementChangeEventMap> = (
  event: ElementChangeEventMap[K]
) => void

// 3. Specific Change Handler Types (Optional, for explicit naming)
// If you prefer explicit type names for each handler, you can define them like this.
// Otherwise, `ChangeHandler<'input'>` is sufficient.
export type InputChangeEvent = ChangeHandler<'input'>
export type MuiSelectChangeEvent = ChangeHandler<'muiSelect'>

// For tabs, it's slightly different due to the tuple, so we can define it directly or adjust ChangeHandler.
// Given the tuple, it's clearer to define TabChangeEvent explicitly if the ChangeHandler utility isn't adapted for it.
export type CheckboxChangeEvent = (
  ...args: ElementChangeEventMap['checkbox']
) => void

export type TabChangeEvent = (...args: ElementChangeEventMap['tabs']) => void

export type AutocompleteChangeEvent = (
  ...args: ElementChangeEventMap['autocomplete']
) => void

// 4. Props Map for OnChange Handlers
// This maps a key to its corresponding `onChange` handler function type.
export type OnChangeHandlersMap = {
  [K in keyof ElementChangeEventMap]: ChangeHandler<K>
} & {
  // Override for tabs if its signature deviates from the generic ChangeHandler
  checkbox: CheckboxChangeEvent
  tabs: TabChangeEvent
  autocomplete: AutocompleteChangeEvent
}

// 5. CreateInputProps Function Type
// This type defines the signature for a function that generates input-like props.
export type CreateInputProps = <
  T extends keyof ElementChangeEventMap = 'input',
>(
  name: string,
  type?: T
) => T extends 'checkbox'
  ? {
      checked: boolean
      name: string
      onChange: OnChangeHandlersMap[T]
    }
  : {
      value: string
      name: string
      onChange: OnChangeHandlersMap[T]
    }

export type CreateInputPropsInArray = <
  T extends keyof ElementChangeEventMap = 'input',
>(
  name: string,
  index: number,
  replaceObjectKey?: string,
  type?: T
) => T extends 'checkbox'
  ? {
      checked: boolean
      name: string
      onChange: OnChangeHandlersMap[T]
    }
  : {
      value: string
      name: string
      onChange: OnChangeHandlersMap[T]
    }
