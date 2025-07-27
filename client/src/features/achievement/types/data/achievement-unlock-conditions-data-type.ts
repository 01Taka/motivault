import type { AchievementConditionParts } from './achievement-condition-parts-data-type'

/**
 * 個々の条件定義
 */
interface AchievementCondition {
  id: string // 論理式内で参照される、この条件の一意な識別子
  condition: AchievementConditionParts
}

/**
 * 論理演算子の種類
 */
type LogicalOperator = 'and' | 'or'

/**
 * 条件ロジックツリーのノード
 * 複数の条件をAND/ORで結合するために使用
 */
interface LogicNode {
  operator: LogicalOperator // このノードの論理演算子 ('and' または 'or')
  children: (string | LogicNode)[] // 論理式の要素。stringはAchievementConditionのid、LogicNodeはネストした論理式
}

/**
 * アチーブメントの解除条件全体を定義する構造
 */
export interface AchievementUnlockConditions {
  conditions: AchievementCondition[] // 個々の条件のリスト
  logic: LogicNode // これらの条件を組み合わせて評価するための論理ツリーのルート
}
