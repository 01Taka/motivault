import z from 'zod'

export const TaskPressTaskTypeSchema = z.enum(['problemSet', 'report'])
export type TaskPressTaskType = z.infer<typeof TaskPressTaskTypeSchema>
