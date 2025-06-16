import { useEffect } from 'react'
import { LocalStorageTechniqueXPProvider } from '../functions/providers/LocalStorageTechniqueXPProvider'
import type { TechniqueXPProvider } from '../types/achievement-types'
import { useTechniqueXPStore } from '../../../stores/achievement/techniqueXpStore'

const useTechniqueXPSetup = (
  provider: TechniqueXPProvider = LocalStorageTechniqueXPProvider
) => {
  const { setXp } = useTechniqueXPStore()
  useEffect(() => {
    const xps = provider.getAllXP()
    setXp(xps)
  }, [])
}
export default useTechniqueXPSetup
