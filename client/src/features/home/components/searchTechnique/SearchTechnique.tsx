import React, { useEffect, useState } from 'react'
import TechniqueList from './TechniqueList'
import Popup from '../../../../components/utils/Popup'
import { getTechniquesStaticInfoById } from '../../../technique/functions/constantsHelper/technique-data-helper'
import type { TechniqueId } from '../../../technique/types/data/technique-id-types'
import { techniquesStaticInfo } from '../../../technique/constants/data/techniques-static-info-data'
import TechniqueDetail from './detail/TechniqueDetail'
import { useNavigate } from 'react-router-dom'
import { techniquePath } from '../../../technique/constants/data/technique-path-data'
import useTechniqueMetadataCrudHandler from '../../../technique/services/hooks/useTechniqueMetadataCrudHandler'

interface SearchTechniqueProps {}

const SearchTechnique: React.FC<SearchTechniqueProps> = ({}) => {
  const navigate = useNavigate()
  const { asyncStates, initializeMetadata } = useTechniqueMetadataCrudHandler()
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<
    TechniqueId | ''
  >('')

  const handleTryTechnique = () => {
    if (selectedTechniqueId) {
      const staticInfo = getTechniquesStaticInfoById(selectedTechniqueId)
      if (staticInfo) {
        initializeMetadata(selectedTechniqueId, staticInfo.version)
      }
    }
  }

  console.log(asyncStates)

  useEffect(() => {
    if (
      asyncStates.initializeMetadata?.status === 'success' &&
      selectedTechniqueId
    ) {
      navigate(`/techniques/${techniquePath[selectedTechniqueId]}`)
    }
  }, [asyncStates.initializeMetadata?.status])

  return (
    <div>
      <TechniqueList
        techniques={techniquesStaticInfo}
        onClickTechnique={(technique) => {
          setSelectedTechniqueId(technique.docId)
          setOpenPopup(true)
        }}
      />
      <Popup
        open={openPopup && !!selectedTechniqueId}
        onClose={() => setOpenPopup(false)}
        hideCloseButton
      >
        {selectedTechniqueId && (
          <TechniqueDetail
            technique={getTechniquesStaticInfoById(selectedTechniqueId)}
            onTry={handleTryTechnique}
            onClose={() => setOpenPopup(false)}
          />
        )}
      </Popup>
    </div>
  )
}

export default SearchTechnique
