import React, { useState } from 'react'
import TechniqueList from './TechniqueList'
import Popup from '../../../../../components/utils/Popup'
import TechniqueDetail from '../techniqueDetail/TechniqueDetail'
import {
  getTechniqueById,
  techniques,
} from '../../../constants/technique/techniques'

interface SearchTechniqueProps {}

const SearchTechnique: React.FC<SearchTechniqueProps> = ({}) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<string>('')

  return (
    <div>
      <TechniqueList
        techniques={techniques}
        onClickTechnique={(id) => {
          setSelectedTechniqueId(id)
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
