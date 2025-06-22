import type { Technique } from '../../types/technique-types'

export const techniques: Technique[] = [
  {
    id: 'pomodoro',
    path: 'pomodoro',
    title: '25分で全集中！',
    officialName: 'ポモドーロ・テクニック',
    category: '集中力アップ',
    imageUrl:
      'https://thumb.ac-illust.com/cc/ccfb9c3ab8d4a49893982bc9323c03c9_t.jpeg',
    description: '集中が続かない？25分集中→5分休憩で効率が爆上がり！',
    benefits:
      '「やる気が出ない」「SNSをつい見ちゃう」人でも、25分という短時間なら集中しやすく、達成感も得やすい。繰り返すことで自然と集中力が育つ。',
    reason:
      '人間の脳は長時間集中に向いていない。短い集中と休憩を交互に挟むことで疲れにくくなり、結果的に作業効率が大きくアップする。',
    steps: [
      'やることを1つ選ぶ',
      '25分集中＋5分休憩',
      '4セットごとに長めの休憩',
      '時間は自由に調整OK',
    ],
    references: [
      {
        label: 'ポモドーロ・テクニックとは？｜Todoist公式',
        url: 'https://todoist.com/productivity-methods/pomodoro-technique',
      },
      {
        label: 'Lifehacker特集：ポモドーロ・テクニックの活用術',
        url: 'https://lifehacker.jp/feature/pomodoro/',
      },
    ],
  },
  {
    id: 'feynman',
    path: 'feynman',
    title: '説明できる＝本当の理解！',
    officialName: 'Feynmanテクニック',
    category: '理解力アップ',
    imageUrl: 'https://web-sozai.com/wp-content/uploads/040019.png',
    description: '読んだだけで理解した気に？説明できると記憶が定着！',
    benefits:
      '誰かに説明するつもりで学ぶと、自分の理解の曖昧な部分が一気に見えてくる。結果的に知識が深まり、テストでも応用が効くようになる。',
    reason:
      '本当に理解しているなら、自分の言葉で簡単に説明できるはず。説明できない部分こそが理解不足であり、そこを潰すことで本物の理解が身につく。',
    steps: [
      'テーマを選ぶ',
      '自分の言葉で説明',
      '詰まる所は調べ直す',
      '小学生でもわかる言葉にする',
    ],
    references: [
      {
        label: 'Feynman Techniqueの解説｜Farnam Street',
        url: 'https://fs.blog/feynman-technique/',
      },
      {
        label: '「説明できる＝理解している」は本当か？',
        url: 'https://lifehacker.jp/2018/04/understanding-feynman-technique.html',
      },
    ],
  },
  {
    id: 'timeBlocking',
    path: 'time-blocking',
    title: '一日をブロックに分けて計画簡単！',
    officialName: 'タイムブロッキング',
    category: '習慣化・計画力',
    imageUrl:
      'https://blogdh.any.do/wp-content/uploads/2020/10/Time-Blocks.png',
    description: '予定立てが苦手？ 一日を区切って迷いゼロに！',
    benefits:
      '時間ごとにやることを決めておくと、迷わずすぐに取りかかれる。だらだらする隙も減り、1日の使い方に自信が持てるようになる。',
    reason:
      'やるべきことがあっても「いつやるか」が決まってないと後回しにしがち。予定を時間でブロックすることで、自動的に行動が生まれる。',
    steps: [
      'やることを決める',
      '時間で区切って予定に入れる',
      'その時間は1つに集中',
      'できなくてもリスケOK',
    ],
    references: [
      {
        label: 'Time Blocking Method｜Todoist公式',
        url: 'https://todoist.com/productivity-methods/time-blocking',
      },
      {
        label: 'Cal Newport流・Deep Work実現の鍵',
        url: 'https://www.calnewport.com/blog/2021/10/26/the-importance-of-time-block-planning/',
      },
    ],
  },
] as const

const techniquesById = techniques.reduce(
  (acc, technique) => {
    acc[technique.id] = technique
    return acc
  },
  {} as Record<string, (typeof techniques)[number]>
)

export function getTechniqueById(id: string) {
  return techniquesById[id]
}
