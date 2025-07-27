import { achievementsStaticInfo } from '../../../constants/data/achievements-static-info-data'
import type { AchievementStaticInfo } from '../../../types/data/achievement-data-types'

// 一度だけ変換しておく
const achievementsStaticInfoMap = achievementsStaticInfo.reduce(
  (map, achievement) => {
    map[achievement.docId] = achievement
    return map
  },
  {} as Record<string, AchievementStaticInfo>
)

const getAchievementById = (docId: string) => {
  return achievementsStaticInfoMap[docId]
}

/**
 * 指定されたアチーブメントIDのリストに基づいて、対応するアチーブメントの静的情報を取得します。
 * Mapに変換済みのアチーブメントデータを使用するため、効率的です。
 * 存在しないIDに対応するデータ (undefined) は結果から除外されます。
 *
 * @param achievementIds 取得したいアチーブメントのID (docId) の配列
 * @returns 該当するAchievementStaticInfoオブジェクトの配列
 */
export const getAchievementsStaticInfoByIds = (
  achievementIds: string[]
): AchievementStaticInfo[] => {
  return achievementIds
    .map((id) => getAchievementById(id))
    .filter(
      (achievement): achievement is AchievementStaticInfo =>
        achievement !== undefined
    )
}
