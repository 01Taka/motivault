import { z } from 'zod'
import { FirestoreDocIdSchema } from '../../../../types/firebase/firestore/firestore-id-schema'
import {
  DocumentReadSchema,
  DocumentWriteSchema,
} from '../../../../types/db/db-service-document-schema'

// 共通テンプレートのスキーマ
const BaseTemplateSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です。'),
  // typeはdiscriminatorとして使用するため、ここでは定義しない
  dependsTaskIds: z.array(FirestoreDocIdSchema).default([]),
})

/* -------------------- ProblemSet -------------------- */

// 問題集テンプレートのスキーマ
const TaskPressProblemSetTemplateSchema = BaseTemplateSchema.extend({
  type: z.literal('problemSet'),
  timePerPage: z
    .number()
    .int()
    .min(1, '1ページあたりの想定時間は1以上である必要があります。'),
})

/* -------------------- Report -------------------- */

// レポートステップテンプレートのスキーマ
const TaskPressReportStepTemplateSchema = z.object({
  order: z.number().int().min(0),
  text: z.string().min(1, 'テキストは必須です。'),
  estimatedTime: z
    .number()
    .int()
    .min(1, 'ステップの想定時間は1以上である必要があります。'),
})

// レポートテンプレートのスキーマ
const TaskPressReportTemplateSchema = BaseTemplateSchema.extend({
  type: z.literal('report'),
  steps: z.array(TaskPressReportStepTemplateSchema),
})

// テンプレート全体のユニオンスキーマ
export const TaskPressTemplateSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTemplateSchema,
  TaskPressReportTemplateSchema,
])

export const TaskPressTemplateReadSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTemplateSchema.extend(DocumentReadSchema.shape),
  TaskPressReportTemplateSchema.extend(DocumentReadSchema.shape),
])

export const TaskPressTemplateWriteSchema = z.discriminatedUnion('type', [
  TaskPressProblemSetTemplateSchema.extend(DocumentWriteSchema.shape),
  TaskPressReportTemplateSchema.extend(DocumentWriteSchema.shape),
])

export const PartialTaskPressTemplateReadSchema = z.union([
  TaskPressProblemSetTemplateSchema.extend(DocumentReadSchema.shape).partial(),
  TaskPressReportTemplateSchema.extend(DocumentReadSchema.shape).partial(),
])

export const PartialTaskPressTemplateWriteSchema = z.union([
  TaskPressProblemSetTemplateSchema.extend(DocumentWriteSchema.shape).partial(),
  TaskPressReportTemplateSchema.extend(DocumentWriteSchema.shape).partial(),
])

// 型の自動生成
export type TaskPressTemplate = z.infer<typeof TaskPressTemplateSchema>
export type TaskPressTemplateRead = z.infer<typeof TaskPressTemplateReadSchema>
export type TaskPressTemplateWrite = z.infer<
  typeof TaskPressTemplateWriteSchema
>
