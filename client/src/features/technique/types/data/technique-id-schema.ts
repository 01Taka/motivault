import z from 'zod'

export const TechniqueIdSchema = z.enum([
  'habitMate',
  'taskPress',
  'tinySteps',
  'pomodoro',
  'feynman',
  'timeBlocking',
])

export const TechniquePathIdSchema = z.enum([
  'habit-mate',
  'task-press',
  'tiny-steps',
  'pomodoro',
  'feynman',
  'time-blocking',
])
