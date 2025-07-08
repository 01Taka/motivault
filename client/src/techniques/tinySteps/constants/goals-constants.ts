import type { TinyStepsGoal, TinyStepsTag } from '../types/goal-types'

export const goals: TinyStepsGoal[] = [
  { id: 1, text: '水をコップ1杯（200ml）飲む', tagId: 1, level: 1 },
  { id: 2, text: '家の外に出て深呼吸を3回する', tagId: 1, level: 2 },
  { id: 3, text: 'タイマーを5分にセットして呼吸に集中', tagId: 1, level: 2 },
  { id: 4, text: '足首を10回回す', tagId: 2, level: 1 },
  { id: 5, text: '近所を5分だけ歩く', tagId: 2, level: 3 },
  { id: 6, text: '首・肩を軽く回すストレッチ1分', tagId: 2, level: 1 },
  { id: 7, text: '好きな本の1ページだけ読む', tagId: 3, level: 2 },
  { id: 8, text: '机の上のものを3つだけ片付ける', tagId: 3, level: 2 },
  { id: 9, text: 'スマホの写真を5枚だけ整理する', tagId: 4, level: 2 },
  { id: 10, text: '今日よかったことを1つノートに書く', tagId: 4, level: 2 },
  { id: 11, text: 'お気に入りの曲を1曲聴く', tagId: 3, level: 1 },
  { id: 12, text: '洗面所で顔を洗う', tagId: 1, level: 2 },
  { id: 13, text: '机の上を勉強できる状態に片付ける', tagId: 5, level: 3 },
  { id: 14, text: '問題集を1冊机に出す', tagId: 5, level: 1 },
  { id: 15, text: '勉強用の椅子に3分座る', tagId: 5, level: 2 },
  { id: 16, text: '教科書内の単元を一つ読み上げる', tagId: 5, level: 1 },
  {
    id: 17,
    text: '参考書の目次から面白そうな単元を一つ見つける',
    tagId: 5,
    level: 1,
  },
  { id: 18, text: 'シャーペンとノートを机に置く', tagId: 5, level: 1 },
  { id: 19, text: '最後に勉強に使ったノートを見返す', tagId: 5, level: 2 },
  {
    id: 20,
    text: '「今はやらない」と声に出してから深呼吸',
    tagId: 4,
    level: 1,
  },
  { id: 21, text: 'ベッドメイキングをする', tagId: 1, level: 2 },
  { id: 22, text: '「今日は〇〇をしてみる」と言葉にする', tagId: 4, level: 1 },
  { id: 23, text: 'アラームを10分後にセットして横になる', tagId: 1, level: 1 },
  { id: 24, text: '歯磨きをする', tagId: 1, level: 2 },
  { id: 25, text: '今日やりたいことを1つメモに書く', tagId: 4, level: 1 },
  { id: 26, text: '連絡したいと思う人の名前を紙に1人書く', tagId: 6, level: 1 },
  {
    id: 27,
    text: '感謝したい人の名前と理由を1つメモに書く',
    tagId: 6,
    level: 2,
  },
  {
    id: 28,
    text: '誰かに「ありがとう」と書いた短文を下書き保存',
    tagId: 6,
    level: 2,
  },
  {
    id: 29,
    text: 'LINEやメッセージアプリを開いて直近のトーク履歴を1つ読む',
    tagId: 6,
    level: 2,
  },
  {
    id: 30,
    text: '「元気？」の一言だけ誰かに送信してみる',
    tagId: 6,
    level: 3,
  },
  { id: 31, text: 'SNSで誰かの投稿にいいねを1つ押す', tagId: 6, level: 2 },
  {
    id: 32,
    text: '「話したい人リスト」を紙やスマホに3人書く',
    tagId: 6,
    level: 2,
  },
]

export const tags: Record<number, TinyStepsTag> = {
  1: { title: '健康', color: '#4CAF50', backgroundColor: '#E8F5E9' }, // Lightened from #A5D6A7
  2: { title: '運動', color: '#FF5722', backgroundColor: '#FBE9E7' }, // Lightened from #FFAB91
  3: { title: '趣味・楽しみ', color: '#6200EE', backgroundColor: '#F3E5F5' }, // Lightened from #D1C4E9
  4: { title: '心のケア', color: '#009688', backgroundColor: '#E0F2F1' }, // Lightened from #B2DFDB
  5: { title: '勉強', color: '#3F51B5', backgroundColor: '#E8EAF6' }, // Lightened from #C5CAE9
  6: { title: 'つながり', color: '#FF9800', backgroundColor: '#FFF3E0' }, // Lightened from #FFE0B2
}
