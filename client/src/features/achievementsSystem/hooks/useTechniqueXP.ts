// // src/hooks/useTechniqueXP.ts
// import { useTechniqueXPStore } from '../../../stores/achievement/techniqueXpStore'
// import { LocalStorageTechniqueXPProvider } from '../functions/providers/LocalStorageTechniqueXPProvider'
// import type { TechniqueXPProvider } from '../types/provider-interfaces'

// const useTechniqueXP = (
//   provider: TechniqueXPProvider = LocalStorageTechniqueXPProvider
// ) => {
//   const { updateXp } = useTechniqueXPStore()

//   const gainXP = (techniqueId: string, value: number) => {
//     if (
//       typeof techniqueId !== 'string' ||
//       typeof value !== 'number' ||
//       isNaN(value)
//     ) {
//       console.warn('Invalid arguments passed to gainXP:', {
//         techniqueId,
//         value,
//       })
//       return
//     }

//     try {
//       provider.incrementXP(techniqueId, value)
//       updateXp(techniqueId, provider.getXP(techniqueId) + value)
//     } catch (e) {
//       console.error('Error in gainXP:', e)
//     }
//   }

//   return {
//     gainXP,
//   }
// }

// export default useTechniqueXP|DEL|
