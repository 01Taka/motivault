// import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import MyTechniqueList from './MyTechniqueList'
// import { techniques } from '../../../constants/technique/techniques'
// import type { TechniqueAchievementBadge } from '../../../../achievements/types/achievement-types'
// import { useTechniqueXPStore } from '../../../../../stores/achievement/techniqueXpStore'
// import { Button } from '@mui/material'
// import Popup from '../../../../../components/utils/Popup'
// // import AchievementDetailView from '../../../../achievements/components/AchievementDetailView'
// // import AchievementAnimationsScreen from '../../../../achievements/components/AchievementAnimationsScreen'
// import { AchievementBadgeCard } from '../../../../achievements/components/badge/AchievementBadgeCard'
// import { LocalPolice } from '@mui/icons-material'
// import { useKeyPress } from '../../../../../hooks/test/useKeyPress'
// import { useXpSystem } from '../../../../achievementsSystem/hooks/useXpSystem'
// import { LocalStorageXpProvider } from '../../../../achievementsSystem/functions/providers/LocalStorageXpProvider'
// import AchievementModal from '../../../../achievementsSystem/components/AchievementModal'

// const MyTechniquesPage: React.FC = () => {
//   const navigate = useNavigate()
//   const { levelInfoMap, updateXp } = useTechniqueXPStore()

//   const { updateCache, applyXpAndBadges } = useXpSystem({
//     provider: new LocalStorageXpProvider(),
//   })

//   const badges: Record<string, TechniqueAchievementBadge[]> = {
//     pomodoro: [
//       {
//         id: 'focus-master',
//         title: '集中マスター',
//         description: '25分間の集中を10回成功させた証',
//         rarity: 'epic',
//       },
//       {
//         id: 'early-bird',
//         title: '早起き王',
//         description: '午前6時前にポモドーロを3回実施',
//         rarity: 'legendary',
//       },
//     ],
//     feynman: [
//       {
//         id: 'explainer',
//         title: '説明王',
//         description: 'Feynman Techniqueで10件以上説明記録を作成',
//         rarity: 'legendary',
//       },
//       {
//         id: 'clarity',
//         title: '明快さの探求者',
//         description: '分かりやすさ評価で90点以上を獲得',
//         rarity: 'epic',
//       },
//       {
//         id: 'teaching',
//         title: '教える力',
//         description: '他者に説明して「理解できた」評価を受けた',
//         rarity: 'common',
//       },
//     ],
//     timeBlocking: [],
//   }

//   const isEnterPressed = useKeyPress('Enter')

//   const gainAchievement = () => {
//     const provider = new LocalStorageXpProvider()
//     const id = 'pomodoro'

//     const gotXP = 100
//     updateCache(id, gotXP, [])
//     applyXpAndBadges(id, 'POMODORO', provider.getCurrentXp(id))

//     updateXp(id, provider.getCurrentXp(id))
//   }

//   useEffect(() => {
//     const provider = new LocalStorageXpProvider()
//     updateXp('pomodoro', provider.getCurrentXp('pomodoro'))
//   }, [])

//   return (
//     <>
//       <Button onClick={() => gainAchievement()}>Gain</Button>
//       <MyTechniqueList
//         techniques={techniques}
//         levelInfo={levelInfoMap}
//         badges={badges}
//         onClickMyTechnique={(id) => navigate(`/techniques/${id}`)}
//       />
//       <AchievementModal />
//       <Popup>
//         {/* <AchievementDetailView
//           title={techniques[0]?.officialName ?? ''}
//           currentLevel={levelInfoMap['pomodoro']?.currentLevel ?? 0}
//           currentXP={levelInfoMap['pomodoro']?.currentLevelXp ?? 0}
//           nextLevelXp={levelInfoMap['pomodoro']?.nextLevelXp ?? 0}
//           currentRank={levelInfoMap['pomodoro']?.rank ?? 'iron'}
//           badges={badges['pomodoro'] ?? []}
//         /> */}
//         {/* <AchievementAnimationsScreen
//           title="POMO"
//           previousTotalXP={1000}
//           currentTotalXP={1500}
//           badges={badges['pomodoro'] ?? []}
//         /> */}
//         <AchievementBadgeCard
//           title="Achieve Title"
//           icon={<LocalPolice sx={{ fontSize: '3rem' }} />}
//           rarity={'legendary'}
//           condition="10日連続でアクセスする"
//           isUnlocked={isEnterPressed}
//         />
//       </Popup>
//     </>
//   )
// }

// export default MyTechniquesPage
