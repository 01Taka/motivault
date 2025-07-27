import type { TechniqueStaticInfo } from '../../types/data/technique-static-info-types'

export const techniquesStaticInfo: TechniqueStaticInfo[] = [
  {
    docId: 'habitMate',
    version: 'v0.1.0',
    title: '習慣身に着け',
    officialName: 'HabitMate',
    tags: ['学習タスク管理'],
    imageUrl: '',
    slogan: 'やるべき課題を、ムダなく・ちょっとずつ・確実に。',
    overview:
      'このテクニックは、日々の学習やタスク管理を効率的に行い、習慣として定着させることを目指します。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '具体的な目標設定と日々の小さな達成を積み重ねることで、無理なく新しい習慣を身につけることができます。',
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            '達成したい習慣を具体的に設定する',
            '小さなステップに分解し、毎日実行できる量にする',
            '進捗を記録し、継続のモチベーションにする',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents:
            '毎日同じ時間に実施する、達成したらご褒美を設定するなど、自分に合った方法を見つけることが重要です。',
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            '新しい習慣を身につけたい人',
            '学習やタスクを継続するのが苦手な人',
            '日々の進捗を実感したい人',
          ],
        },
      ],
    },
  },
  {
    docId: 'taskPress',
    version: 'v0.1.0',
    title: '課題、圧してこ。',
    officialName: 'TaskPress',
    tags: ['学習タスク管理'],
    imageUrl:
      'https://cdn.pixabay.com/photo/2020/04/29/20/59/task-5112951_1280.png',
    slogan: 'やるべき課題を、ムダなく・ちょっとずつ・確実に。',
    overview:
      'TaskPressは、長期的な課題や大量の学習タスクを効率的に管理し、無理なく継続するためのテクニックです。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '期限ギリギリで焦るのはもう終わり。ページ単位・区切り単位で、今やるべき分がハッキリ見えるから、毎日ちょい進めでOK。',
        },
        {
          type: 'text',
          isHeaderId: true, // This header is custom, not from headerContent
          headerId: 'whyRecommended',
          contents:
            '長い課題も、分ければこわくない。タスクを分解して、今やるべき量と締切から逆算。スマホ感覚で進められるUIで、続けやすさに全振り。',
        },
        {
          type: 'ol',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            '課題を登録（問題集 or レポート）',
            'ページやステップごとに進捗管理',
            '毎日必要な分が自動で出てくる',
            '終わったらボタンでポチッと完了！',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents: '短い時間で集中して作業に取り組むためのヒント。', // Added placeholder content
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            '計画的に学習を進めたい学生',
            '長期的なプロジェクトに取り組む社会人',
            'タスクの多さに圧倒されがちな人',
          ],
        },
      ],
    },
  },
  {
    docId: 'tinySteps',
    version: 'v0.1.0',
    title: 'ちょこっと行動',
    officialName: 'TinySteps',
    tags: ['無気力サポート'],
    imageUrl:
      'https://thumb.ac-illust.com/fc/fc16f137af366df32bd8862fb9764795_t.jpeg',
    slogan:
      '何もやる気がでない？ガチャで今からやることを決めてもらおう！1分でできる！',
    overview:
      'TinyStepsは、やる気が出ない時でも、簡単な行動から始めて徐々に活動量を増やしていくためのテクニックです。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '「やる気が出ない」「何を始めたらいいか分からない」という状態でも、tinyStepsなら簡単な目標から始めて、少しずつ行動できるようになる。ガチャで決めるタスクが手軽で、やる気を少しずつ引き出してくれる。',
        },
        {
          type: 'text',
          isHeaderId: true, // This header is custom
          headerId: 'whyRecommended',
          contents:
            '無気力を感じているとき、大きな目標に取り掛かるのは難しい。でも、小さな目標をひとつずつクリアすることで、少しずつ気分が変わり、行動できるようになる。ガチャで目標を決めることで、迷わずに進むことができる。',
        },
        {
          type: 'ol',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            'ガチャを引いて目標を決める',
            '15分のタイマーで集中する',
            '終了後、できたかどうか簡単にフィードバック',
            '続けることで達成感を得られる',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents:
            'タスクは「1分でできること」など、極端に小さく設定すると始めやすいです。', // Added placeholder content
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            'なかなか行動に移せない人',
            '気分が落ち込んでいる時でも何かを始めたい人',
            '小さな成功体験を積み重ねたい人',
          ],
        },
      ],
    },
  },
  {
    docId: 'pomodoro',
    version: 'v0.1.0',
    title: '25分で全集中！',
    officialName: 'ポモドーロ・テクニック',
    tags: ['集中力アップ'],
    imageUrl:
      'https://thumb.ac-illust.com/cc/ccfb9c3ab8d4a49893982bc9323c03c9_t.jpeg',
    slogan: '集中が続かない？25分集中→5分休憩で効率が爆上がり！',
    overview:
      'ポモドーロ・テクニックは、25分間の集中と短い休憩を繰り返すことで、集中力を持続させ、生産性を向上させる時間管理術です。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '「やる気が出ない」「SNSをつい見ちゃう」人でも、25分という短時間なら集中しやすく、達成感も得やすい。繰り返すことで自然と集中力が育つ。',
        },
        {
          type: 'text',
          isHeaderId: true, // This header is custom
          headerId: 'whyRecommended',
          contents:
            '人間の脳は長時間集中に向いていない。短い集中と休憩を交互に挟むことで疲れにくくなり、結果的に作業効率が大きくアップする。',
        },
        {
          type: 'ol',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            'やることを1つ選ぶ',
            '25分集中＋5分休憩',
            '4セットごとに長めの休憩',
            '時間は自由に調整OK',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents:
            '休憩時間は完全に作業から離れ、脳をリフレッシュさせることが重要です。', // Added placeholder content
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            '集中力が続かないと感じる人',
            '作業の効率を上げたい人',
            '計画的に休憩を取りたい人',
          ],
        },
      ],
    },
  },
  {
    docId: 'feynman',
    version: 'v0.1.0',
    title: '説明できる＝本当の理解！',
    officialName: 'Feynmanテクニック',
    tags: ['理解力アップ'],
    imageUrl: 'https://web-sozai.com/wp-content/uploads/040019.png',
    slogan: '読んだだけで理解した気に？説明できると記憶が定着！',
    overview:
      'ファインマンテクニックは、学んだ内容を他人に説明することで、自身の理解度を深め、知識を定着させる学習法です。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '誰かに説明するつもりで学ぶと、自分の理解の曖昧な部分が一気に見えてくる。結果的に知識が深まり、テストでも応用が効くようになる。',
        },
        {
          type: 'text',
          isHeaderId: true, // This header is custom
          headerId: 'whyRecommended',
          contents:
            '本当に理解しているなら、自分の言葉で簡単に説明できるはず。説明できない部分こそが理解不足であり、そこを潰すことで本物の理解が身につく。',
        },
        {
          type: 'ol',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            'テーマを選ぶ',
            '自分の言葉で説明',
            '詰まる所は調べ直す',
            '小学生でもわかる言葉にする',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents:
            '難しい専門用語を使わず、簡単な言葉で説明できるように練習しましょう。', // Added placeholder content
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            '知識を深く定着させたい人',
            '学習した内容を忘れやすい人',
            'アウトプットを通じて理解を深めたい人',
          ],
        },
      ],
    },
  },
  {
    docId: 'timeBlocking',
    version: 'v0.1.0',
    title: '一日をブロックに分けて計画簡単！',
    officialName: 'タイムブロッキング',
    tags: ['習慣化・計画力'],
    imageUrl:
      'https://blogdh.any.do/wp-content/uploads/2020/10/Time-Blocks.png',
    slogan: '予定立てが苦手？ 一日を区切って迷いゼロに！',
    overview:
      'タイムブロッキングは、一日の時間をブロックに区切り、各ブロックに特定のタスクや活動を割り当てることで、効率的に時間を管理する手法です。',
    details: {
      paragraph: [
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'benefits',
          contents:
            '時間ごとにやることを決めておくと、迷わずすぐに取りかかれる。だらだらする隙も減り、1日の使い方に自信が持てるようになる。',
        },
        {
          type: 'text',
          isHeaderId: true, // This header is custom
          headerId: 'whyRecommended',
          contents:
            'やるべきことがあっても「いつやるか」が決まってないと後回しにしがち。予定を時間でブロックすることで、自動的に行動が生まれる。',
        },
        {
          type: 'ol',
          isHeaderId: true,
          headerId: 'howToStart', // Will be interpolated with `steps` if available
          contents: [
            'やることを決める',
            '時間で区切って予定に入れる',
            'その時間は1つに集中',
            'できなくてもリスケOK',
          ],
        },
        {
          type: 'text',
          isHeaderId: true,
          headerId: 'tips',
          contents:
            '休憩やリフレッシュの時間もブロックとして計画に含めることで、継続しやすくなります。', // Added placeholder content
        },
        {
          type: 'ul',
          isHeaderId: true,
          headerId: 'recommendedFor',
          contents: [
            '計画的に物事を進めたい人',
            '時間の使い方にムラがある人',
            '集中して作業に取り組みたい人',
          ],
        },
      ],
    },
  },
] as const // Keeping 'as const' for type safety
