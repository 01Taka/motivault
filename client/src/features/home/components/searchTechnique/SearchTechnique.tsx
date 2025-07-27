import React, { useState } from 'react'
import TechniqueList from './TechniqueList'
import Popup from '../../../../components/utils/Popup'
import { getTechniquesStaticInfoById } from '../../../technique/functions/constantsHelper/technique-data-helper'
import type { TechniqueId } from '../../../technique/types/data/technique-id-types'
import { techniquesStaticInfo } from '../../../technique/constants/data/techniques-static-info-data'
import TechniqueDetail from './detail/TechniqueDetail'
import { useNavigate } from 'react-router-dom'
import { techniquePath } from '../../../technique/constants/data/technique-path-data'

interface SearchTechniqueProps {}

const SearchTechnique: React.FC<SearchTechniqueProps> = ({}) => {
  const navigate = useNavigate()
  const [openPopup, setOpenPopup] = useState(false)
  const [selectedTechniqueId, setSelectedTechniqueId] = useState<
    TechniqueId | ''
  >('')

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
            onTry={() =>
              navigate(`/techniques/${techniquePath[selectedTechniqueId]}`)
            }
            onClose={() => setOpenPopup(false)}
          />
        )}
      </Popup>
    </div>
  )
}

export default SearchTechnique
