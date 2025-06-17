import { useXpAchievementStore } from '../../../stores/achievement/xpAchievementStore'
import { useXpPopupStore } from '../../../stores/achievement/xpPopupStore'
import type { AchievementBadge } from '../../achievements/types/achievement-types'
import type { XpProvider } from '../types/provider-interfaces'

interface UseXpSystemOptions {
  provider: XpProvider
}

export const useXpSystem = ({ provider }: UseXpSystemOptions) => {
  const { incrementXp, addBadges } = useXpAchievementStore()

  const { openModal } = useXpPopupStore()

  /**
   * 一括適用処理：キャッシュから取得し、
   * - サーバー送信
   * - ポップアップ表示
   * 失敗したらキャッシュ保持。ポップアップは常に表示。
   */
  const applyXpAndBadges = async (
    id: string,
    title: string,
    startTotalXp: number
  ) => {
    const { entries, clearXpCache, clearBadgeCache } =
      useXpAchievementStore.getState()

    const increasedXp = entries[id].xp
    const newBadges = entries[id].badges

    // ポップアップは常に表示
    openModal({
      id,
      title,
      startXp: startTotalXp,
      endXp: startTotalXp + increasedXp,
      badges: newBadges,
    })

    let xpSuccess = false
    let badgeSuccess = false

    // サーバー送信処理（失敗してもキャッシュは消さない）
    try {
      if (increasedXp > 0) {
        await provider.incrementXp(id, increasedXp)
        xpSuccess = true
      }
    } catch (e) {
      console.warn('[XP送信失敗]', e)
    }

    try {
      if (newBadges.length > 0) {
        await provider.addAchievementBadges(
          id,
          newBadges.map((b) => b.id)
        )
        badgeSuccess = true
      }
    } catch (e) {
      console.warn('[Badge送信失敗]', e)
    }

    // 成功した側だけキャッシュを削除
    if (xpSuccess) clearXpCache(id)
    if (badgeSuccess) clearBadgeCache(id)
  }

  /**
   * XPの追加と実績の追加（アプリ内イベント時に呼び出す）
   */
  const updateCache = (id: string, xp: number, badges: AchievementBadge[]) => {
    if (xp > 0) incrementXp(id, xp)
    if (badges.length > 0) addBadges(id, badges)
  }

  return {
    applyXpAndBadges,
    updateCache,
  }
}
