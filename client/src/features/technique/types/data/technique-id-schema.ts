import z from 'zod'

export const TechniqueIdSchema = z.enum([
  'habit-mate',
  'task-press',
  'tiny-steps',
])
