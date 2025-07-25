import type {
  AnimationControls,
  TargetAndTransition,
  VariantLabels,
  Transition,
} from 'framer-motion'

export interface RankAnimationSetting {
  animate: AnimationControls | TargetAndTransition | VariantLabels
  transition: Transition
}
