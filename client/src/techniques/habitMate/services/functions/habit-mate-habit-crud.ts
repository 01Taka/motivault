import type { HabitMateHabitWrite } from '../documents/habit-mate-habit-document'
import type { HabitMateHabitRepository } from '../repositories/habit-mate-repositories'

export const createHabitMateHabit = async (
  repo: HabitMateHabitRepository,
  uid: string,
  data: HabitMateHabitWrite
) => {
  return await repo.create(data, [uid])
}
