// import type {
//   TimeBlockingTaskRead,
//   TimeBlockingTaskWrite,
// } from './documents/task-documents'
// import type {
//   TimeBlockingRead,
//   TimeBlockingTag,
// } from './documents/time-blocking-document'

// const generateUniqueId = (existingIds: string[]): string => {
//   let id: string
//   do {
//     id = crypto.randomUUID().slice(0, 8)
//   } while (existingIds.includes(id))
//   return id
// }

// export const timeBlockingService = {
//   async initDocIfNeeded(uid: string): Promise<TimeBlockingRead | null> {
//     try {
//       const doc = await idb.timeBlocking.read([uid, 'timeBlocking'])
//       if (doc) return doc

//       const newDoc = { tags: {} }
//       await idb.timeBlocking.createWithId(newDoc, [uid, 'timeBlocking'])
//       return await idb.timeBlocking.read([uid, 'timeBlocking'])
//     } catch (e) {
//       console.error('initDocIfNeeded error:', e)
//       return null
//     }
//   },

//   async fetchTasks(uid: string): Promise<TimeBlockingTaskRead[]> {
//     return idb.timeBlockingTask.getAll([uid])
//   },

//   async createTask(uid: string, data: TimeBlockingTaskWrite) {
//     await idb.timeBlockingTask.create(data, [uid])
//   },

//   async updateTaskCompleted(uid: string, taskId: string, completed: boolean) {
//     await idb.timeBlockingTask.update({ completed }, [uid, taskId])
//   },

//   async createTag(uid: string, tag: TimeBlockingTag) {
//     const doc = await idb.timeBlocking.read([uid, 'timeBlocking'])
//     const tags = doc?.tags ?? {}
//     const id = generateUniqueId(Object.keys(tags))
//     const updatedTags = { ...tags, [id]: tag }

//     await idb.timeBlocking.update({ tags: updatedTags }, [uid, 'timeBlocking'])
//   },
// } |DEL/
