import React from 'react'
import MyTechniqueList from './MyTechniqueList'
import { useNavigate } from 'react-router-dom'
import useFullTechniqueData from '../../../../technique/hooks/useFullTechniqueData'
import { getTechniquePathById } from '../../../../technique/functions/path-helper'

interface MyTechniquesProps {}

const MyTechniques: React.FC<MyTechniquesProps> = ({}) => {
  const navigate = useNavigate()
  const fullTechniquesData = useFullTechniqueData()

  return (
    <div>
      <MyTechniqueList
        techniques={fullTechniquesData}
        onClickMyTechnique={(technique) =>
          navigate(getTechniquePathById(technique.docId))
        }
      />
    </div>
  )
}

export default MyTechniques
