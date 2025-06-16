import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyTechniqueList from './MyTechniqueList'
import { techniques } from '../../../constants/technique/techniques'
import type { TechniqueAchievementBadge } from '../../../../achievements/types/achievement-types'
import { useTechniqueXPStore } from '../../../../../stores/achievement/techniqueXpStore'
import useTechniqueXP from '../../../../achievements/hooks/useTechniqueXP'
import { Button } from '@mui/material'
import Popup from '../../../../../components/utils/Popup'
import AchievementDetailView from '../../../../achievements/components/AchievementDetailView'
import AchievementAnimationsScreen from '../../../../achievements/components/AchievementAnimationsScreen'

const MyTechniquesPage: React.FC = () => {
  const navigate = useNavigate()
  const { levelInfoMap } = useTechniqueXPStore()
  const { gainXP } = useTechniqueXP()

  const badges: Record<string, TechniqueAchievementBadge[]> = {
    pomodoro: [
      {
        id: 'focus-master',
        title: '集中マスター',
        description: '25分間の集中を10回成功させた証',
        rarity: 'epic',
      },
      {
        id: 'early-bird',
        title: '早起き王',
        description: '午前6時前にポモドーロを3回実施',
        rarity: 'legendary',
      },
    ],
    feynman: [
      {
        id: 'explainer',
        title: '説明王',
        description: 'Feynman Techniqueで10件以上説明記録を作成',
        rarity: 'legendary',
      },
      {
        id: 'clarity',
        title: '明快さの探求者',
        description: '分かりやすさ評価で90点以上を獲得',
        rarity: 'epic',
      },
      {
        id: 'teaching',
        title: '教える力',
        description: '他者に説明して「理解できた」評価を受けた',
        rarity: 'common',
      },
    ],
    timeBlocking: [],
  }

  return (
    <>
      <Button onClick={() => gainXP('pomodoro', 100)}>Gain</Button>
      <MyTechniqueList
        techniques={techniques}
        levelInfo={levelInfoMap}
        badges={badges}
        onClickMyTechnique={(id) => navigate(`/techniques/${id}`)}
      />
      <Popup open>
        {/* <AchievementDetailView
          title={techniques[0]?.officialName ?? ''}
          currentLevel={levelInfoMap['pomodoro']?.currentLevel ?? 0}
          currentXP={levelInfoMap['pomodoro']?.currentLevelXp ?? 0}
          nextLevelXp={levelInfoMap['pomodoro']?.nextLevelXp ?? 0}
          currentRank={levelInfoMap['pomodoro']?.rank ?? 'iron'}
          badges={badges['pomodoro'] ?? []}
        /> */}
        <AchievementAnimationsScreen
          title="POMO"
          previousTotalXP={1000}
          currentTotalXP={1500}
          badges={badges['pomodoro'] ?? []}
        />
      </Popup>
    </>
  )
}

export default MyTechniquesPage
