import z from 'zod'

export const TechniqueIdSchema = z.enum([
  'habitMate',
  'taskPress',
  'tinySteps',
  'pomodoro',
  'feynman',
  'timeBlocking',
])
