import React, { useState } from 'react'
import TechniqueList from './TechniqueList'
import Popup from '../../../../../components/utils/Popup'
import TechniqueDetail from '../techniqueDetail/TechniqueDetail'
import { getTechniqueById } from '../../../constants/technique/techniques'
import { techniquesStaticInfo } from '../../../../technique/constants/data/techniques-static-info-data'

interface SearchTechniqueProps {}

const SearchTechnique: React.FC<SearchTechniqueProps> = ({}) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string>('')

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
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        hideCloseButton
      >
        <TechniqueDetail
          technique={getTechniqueById(selectedTechniqueId)}
          onClose={() => setOpenPopup(false)}
        />
      </Popup>
    </div>
  )
}

export default SearchTechnique
