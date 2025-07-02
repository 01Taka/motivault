// db.ts
import Dexie, { type Table } from 'dexie'

export interface InputCache {
  key: string
  value: any // string以外の型に対応
}

class MyAppDB extends Dexie {
  input!: Table<InputCache>

  constructor() {
    super('MyAppDB')
    this.version(1).stores({
      input: '&key',
    })
  }
}

export const db = new MyAppDB()
