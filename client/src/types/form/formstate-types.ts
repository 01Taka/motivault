import type { SelectChangeEvent } from '@mui/material'
import type { ChangeEvent } from 'react'

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

export type ArrayFieldChangeAction<Value = any> =
  | ElementReplaceAction
  | ElementDeleteAction
  | ElementPushAction<Value>

export type FormInputEvent =
  | ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  | SelectChangeEvent<string>

export type CreateInputProps = (name: string) => {
  value: any
  name: string
  onChange: (e: FormInputEvent, ..._args: any[]) => void
}

export type KeyMirrorObject<T extends Record<string, any>> = {
  [K in keyof T]: K
}
