import type { AchievementStaticInfo } from '../../types/data/achievement-data-types'

export const ALL_POMODORO_ACHIEVEMENTS: AchievementStaticInfo[] = [
  // 集中力の持続
  {
    docId: 'Wa90OULqkXhJ1hi2ZHMH',
    order: 10,
    techniqueId: 'pomodoro',
    rarity: 'common',
    iconId: 'iconFirstPomodoro',
    name: 'はじめてのポモドーロ',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalCompletedSessions',
            borderValue: 1,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '最初のポモドーロセッションを完了する',
    description: 'ポモドーロテクニックの第一歩を踏み出しました。',
  },
  {
    docId: 'V1ldCdbg81T2zQh5QZim',
    order: 20,
    techniqueId: 'pomodoro',
    rarity: 'common',
    iconId: 'iconFivePomodoros',
    name: '集中！五つ星',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalCompletedSessions',
            borderValue: 5,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '5回のポモドーロセッションを完了する',
    description: '短い休憩を挟みながら、5回集中できました。',
  },
  {
    docId: 'rpi1QjaGuPBBFX9nFQ4h',
    order: 30,
    techniqueId: 'pomodoro',
    rarity: 'uncommon',
    iconId: 'iconTenPomodoros',
    name: '集中名人への道',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalCompletedSessions',
            borderValue: 10,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '10回のポモドーロセッションを完了する',
    description: '集中力を維持するコツを掴みつつあります。',
  },
  {
    docId: '1fPJMNpLI7O4BKr4o02n',
    order: 40,
    techniqueId: 'pomodoro',
    rarity: 'rare',
    iconId: 'iconPerfectFocus',
    name: '完全なる集中',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'consecutivePerfectSessions',
            borderValue: 3,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation:
      '休憩を挟まず連続で3回のポモドーロセッションを完了する',
    description: 'どんな邪魔も寄せ付けない集中力です。',
  },
  {
    docId: '26OCEl0OEyiRN0HOjl40',
    order: 50,
    techniqueId: 'pomodoro',
    rarity: 'epic',
    iconId: 'iconMarathonFocus',
    name: '集中力耐久王',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'maxCustomSessionMs',
            borderValue: 60 * 60 * 1000, // 60分をミリ秒で表現
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation:
      '60分以上のカスタムポモドーロセッションを完了する',
    description: '長時間集中できる能力を手に入れました。',
  },

  // 継続的な実践
  {
    docId: '01fWqNWzjXdXenDubXRj',
    order: 60,
    techniqueId: 'pomodoro',
    rarity: 'uncommon',
    iconId: 'iconDailyHabit',
    name: '毎日の習慣',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'consecutiveDaysCompleted',
            borderValue: 3,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '3日連続でポモドーロセッションを完了する',
    description: 'ポモドーロがあなたの日常の一部になりました。',
  },
  {
    docId: 'FDjd23pqg1aSs7tj2oLM',
    order: 70,
    techniqueId: 'pomodoro',
    rarity: 'rare',
    iconId: 'iconWeeklyStreak',
    name: '週間の挑戦者',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'consecutiveDaysCompleted',
            borderValue: 7,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '7日連続でポモドーロセッションを完了する',
    description: '一週間、毎日集中に取り組みました。素晴らしい！',
  },
  {
    docId: '3l2HorbXE6bnLTUqKY4O',
    order: 80,
    techniqueId: 'pomodoro',
    rarity: 'epic',
    iconId: 'iconMonthlyMaster',
    name: '月間集中マスター',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'consecutiveDaysCompleted',
            borderValue: 30,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '30日連続でポモドーロセッションを完了する',
    description: 'ポモドーロテクニックの継続的な実践者です。',
  },
  {
    docId: 'PoNmZOe6fgggN0B1M9dq',
    order: 90,
    techniqueId: 'pomodoro',
    rarity: 'rare',
    iconId: 'iconOneHundredPomodoros',
    name: '100回突破！',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalCompletedSessions',
            borderValue: 100,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '合計100回のポモドーロセッションを完了する',
    description: '100回の集中時間を積み重ねました。',
  },
  {
    docId: 'h1nFIPaPLdn5C5wIOoAv',
    order: 100,
    techniqueId: 'pomodoro',
    rarity: 'epic',
    iconId: 'iconFiveHundredPomodoros',
    name: '大いなる積み重ね',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalCompletedSessions',
            borderValue: 500,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '合計500回のポモドーロセッションを完了する',
    description: '圧倒的な集中時間の積み重ねです。',
  },

  // 特定の目標達成
  {
    docId: 'KQr4pcQBV1ZvaXLoMEv7',
    order: 110,
    techniqueId: 'pomodoro',
    rarity: 'uncommon',
    iconId: 'iconTaskDone',
    name: 'タスク完了の喜び',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalTasksCompletedWithPomodoro',
            borderValue: 1,
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '1つのタスクをポモドーロセッションで完了する',
    description: 'ポモドーロを使って、タスクを終わらせました。',
  },
  {
    docId: 'gkhtHtWGcfnrKEONnVWa',
    order: 120,
    techniqueId: 'pomodoro',
    rarity: 'rare',
    iconId: 'iconProjectProgress',
    name: 'プロジェクト前進！',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'totalFocusedMs',
            borderValue: 10 * 60 * 60 * 1000, // 10時間をミリ秒で表現
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: 'ポモドーロで合計10時間分の作業を完了する',
    description: '長期的なプロジェクトにポモドーロが貢献しました。',
  },
  {
    docId: 'gfJUttQxX1Ul6CrIt65w',
    order: 130,
    techniqueId: 'pomodoro',
    rarity: 'uncommon',
    iconId: 'iconEarlyBird',
    name: '朝活の達人',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'currentTimeOfDay',
            targetTimeMs: 9 * 60 * 60 * 1000, // 午前9時をミリ秒で表現
            operator: 'lt',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation:
      '午前9時より前にポモドーロセッションを完了する',
    description: '早朝から集中して一日をスタートさせました。',
  },
  {
    docId: '7Gmh7gHpGFkWAXJanCHR',
    order: 140,
    techniqueId: 'pomodoro',
    rarity: 'uncommon',
    iconId: 'iconNightOwl',
    name: '夜更かし集中者',
    unlockConditions: {
      conditions: [
        {
          id: 'c1',
          condition: {
            field: 'currentTimeOfDay',
            targetTimeMs: 22 * 60 * 60 * 1000, // 午後10時をミリ秒で表現
            operator: 'gte',
          },
        },
      ],
      logic: {
        operator: 'and',
        children: ['c1'],
      },
    },
    unlockConditionsExplanation: '午後10時以降にポモドーロセッションを完了する',
    description: '夜遅くまで集中力を保っています。',
  },
  {
    docId: 'ynuDZ0VqSLzJIwlhS6Iz',
    order: 150,
    techniqueId: 'pomodoro',
    rarity: 'legendary',
    iconId: 'iconPomodoroSensei',
    name: 'ポモドーロの師範',
    // This achievement's unlock condition will be handled programmatically,
    // as it depends on unlocking all other achievements.
    // The unlockConditionsExplanation should reflect this.
    unlockConditions: {
      conditions: [], // No conditions defined here, as it's a special case
      logic: {
        operator: 'and',
        children: [],
      },
    },
    unlockConditionsExplanation: '他の全てのアチーブメントを解除する',
    description: 'あなたはポモドーロテクニックの真の達人です！',
  },
] as const
