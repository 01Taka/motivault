import z from 'zod'
import { ISODateSchema } from '../../../../types/utils/datetime-schema'
import { FirestoreDocIdSchema } from '../../../../types/firebase/firestore/firestore-id-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

const BaseTaskSchema = z.object({
  templateId: FirestoreDocIdSchema,
  deadline: ISODateSchema, // ISO 8601形式の日付文字列を想定
})

// 問題集タスクのスキーマ
const TaskPressProblemSetTaskSchema = BaseTaskSchema.extend({
  type: z.literal('problemSet'),
  pages: z.array(z.number().int()),
  completedPages: z.array(z.number().int()),
})

// レポートタスクのスキーマ
const TaskPressReportTaskSchema = BaseTaskSchema.extend({
  type: z.literal('report'),
  completedStepOrders: z.array(z.number()),
})

export const TaskPressTaskSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTaskSchema,
  TaskPressReportTaskSchema,
])

export const TaskPressTaskReadSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTaskSchema.extend(DocumentReadSchema.shape),
  TaskPressReportTaskSchema.extend(DocumentReadSchema.shape),
])

export const TaskPressTaskWriteSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTaskSchema.extend(DocumentWriteSchema.shape),
  TaskPressReportTaskSchema.extend(DocumentWriteSchema.shape),
])

export const PartialTaskPressTaskReadSchema = z.union([
  TaskPressProblemSetTaskSchema.extend(DocumentReadSchema.shape).partial(),
  TaskPressReportTaskSchema.extend(DocumentReadSchema.shape).partial(),
])

export const PartialTaskPressTaskWriteSchema = z.union([
  TaskPressProblemSetTaskSchema.extend(DocumentWriteSchema.shape).partial(),
  TaskPressReportTaskSchema.extend(DocumentWriteSchema.shape).partial(),
])

export type TaskPressTask = z.infer<typeof TaskPressTaskSchema>
export type TaskPressTaskRead = z.infer<typeof TaskPressTaskReadSchema>
export type TaskPressTaskWrite = z.infer<typeof TaskPressTaskWriteSchema>
