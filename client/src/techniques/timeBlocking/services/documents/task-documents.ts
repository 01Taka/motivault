import type {
  BaseDocumentRead,
  BaseDocumentWrite,
} from '../../../../types/db/db-service-document-types'

export interface TimeBlockingTaskData {
  title: string
  startTime: number
  duration: number // minutes
  tagId: string
  completed: boolean
  repeat?: 'none' | 'daily' | 'weekly'
}

export type TimeBlockingTaskRead = BaseDocumentRead & TimeBlockingTaskData
export type TimeBlockingTaskWrite = BaseDocumentWrite & TimeBlockingTaskData
