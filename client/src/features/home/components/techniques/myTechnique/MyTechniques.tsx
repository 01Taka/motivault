import React from 'react'
import useTechniqueMetadataCrudHandler from '../../../../technique/services/hooks/useTechniqueMetadataCrudHandler'
import MyTechniqueList from './MyTechniqueList'
import { useNavigate } from 'react-router-dom'

interface MyTechniquesProps {}

const MyTechniques: React.FC<MyTechniquesProps> = ({}) => {
  const navigate = useNavigate()
  const { fullTechniquesData } = useTechniqueMetadataCrudHandler()

  return (
    <div>
      <MyTechniqueList
        techniques={fullTechniquesData}
        onClickMyTechnique={(id) => navigate(`/techniques/${id}`)}
      />
    </div>
  )
}

export default MyTechniques
