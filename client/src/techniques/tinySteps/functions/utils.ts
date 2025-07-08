// 配列からランダムな要素を取り出す関数
export const getRandomElement = <T, K>(arr: T[], defaultValue: K): T | K => {
  if (arr.length === 0) return defaultValue // 配列が空の場合
  const randomIndex = Math.floor(Math.random() * arr.length) // 0 から arr.length - 1 のランダムなインデックス
  return arr[randomIndex] // ランダムに選ばれた要素を返す
}
