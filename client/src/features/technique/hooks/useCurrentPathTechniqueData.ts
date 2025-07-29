import { useLocation } from 'react-router-dom'
import { getCurrentTechniqueIdFromPathname } from '../functions/path-helper'
import { useMemo } from 'react'
import useFullTechniqueData from './useFullTechniqueData'

const useCurrentPathTechniqueData = () => {
  const location = useLocation()
  const techniqueId = useMemo(
    () => getCurrentTechniqueIdFromPathname(location.pathname),
    [location.pathname]
  )
  const techniques = useFullTechniqueData()
  const currentTechnique = useMemo(
    () => techniques.find((data) => data.techniqueId === techniqueId),
    [techniqueId, techniques]
  )

  return currentTechnique
}

export default useCurrentPathTechniqueData
