// src/styles/animations.ts

import { keyframes } from '@mui/system'

/**
 * 拡大縮小アニメーション (pulse) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.scaleAmount 拡大する割合 (デフォルト: 1.05)
 * @param options.duration アニメーションの総時間 (デフォルト: '2s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-in-out')
 * @param options.iterationCount アニメーションの繰り返し回数 (デフォルト: 'infinite' または 数値)
 */
export const createPulseAnimation = (options?: {
  scaleAmount?: number
  duration?: string
  timingFunction?: string
  iterationCount?: string
}) => {
  const {
    scaleAmount = 1.03,
    duration = '2s',
    timingFunction = 'ease-in-out',
    iterationCount = 'infinite',
  } = options || {} // デフォルト値を適用

  const pulseKeyframes = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(${scaleAmount});
    }
    100% {
      transform: scale(1);
    }
  `
  return `${pulseKeyframes} ${duration} ${timingFunction} ${iterationCount}`
}

/**
 * 浮遊アニメーション (float) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.translateYAmount 上下移動するピクセル数 (デフォルト: 3)
 * @param options.duration アニメーションの総時間 (デフォルト: '3s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-in-out')
 * @param options.iterationCount アニメーションの繰り返し回数 (デフォルト: 'infinite' または 数値)
 */
export const createFloatAnimation = (options?: {
  translateYAmount?: number
  duration?: string
  timingFunction?: string
  iterationCount?: string
}) => {
  const {
    translateYAmount = 3,
    duration = '3s',
    timingFunction = 'ease-in-out',
    iterationCount = 'infinite',
  } = options || {}

  const floatKeyframes = keyframes`
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-${translateYAmount}px);
    }
    100% {
      transform: translateY(0);
    }
  `
  return `${floatKeyframes} ${duration} ${timingFunction} ${iterationCount}`
}

/**
 * 下からフェードインアニメーション (fadeInFromBottom) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.translateYStartAmount 開始時の下からの移動量 (デフォルト: 20)
 * @param options.duration アニメーションの総時間 (デフォルト: '1s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-out')
 */
export const createFadeInFromBottomAnimation = (options?: {
  translateYStartAmount?: number
  duration?: string
  timingFunction?: string
}) => {
  const {
    translateYStartAmount = 20,
    duration = '1s',
    timingFunction = 'ease-out',
  } = options || {}

  const fadeInKeyframes = keyframes`
    0% {
      opacity: 0;
      transform: translateY(${translateYStartAmount}px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  `
  // `forwards` はアニメーション終了後に最終状態を維持するために必要
  return `${fadeInKeyframes} ${duration} ${timingFunction} forwards`
}

// グラデーションアニメーション (引数は不要なため関数化はしないが、必要であれば可能)
export const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

/**
 * フェードインアニメーション (fadeIn) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.duration アニメーションの総時間 (デフォルト: '0.5s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-out')
 */
export const createFadeInAnimation = (options?: {
  duration?: string
  timingFunction?: string
}) => {
  const { duration = '0.5s', timingFunction = 'ease-out' } = options || {}

  const fadeInKeyframes = keyframes`
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  `
  return `${fadeInKeyframes} ${duration} ${timingFunction} forwards`
}

/**
 * フェードアウトアニメーション (fadeOut) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.duration アニメーションの総時間 (デフォルト: '0.5s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-out')
 */
export const createFadeOutAnimation = (options?: {
  duration?: string
  timingFunction?: string
}) => {
  const {
    duration = '0.5s',
    timingFunction = 'ease-in', // 消える際はease-inが自然なことが多い
  } = options || {}

  const fadeOutKeyframes = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `
  return `${fadeOutKeyframes} ${duration} ${timingFunction} forwards`
}

/**
 * シェイクアニメーション (shake) を生成します。
 * 主にエラー表示や注意喚起に使用されます。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.distance 横に揺れる距離 (px) (デフォルト: 8)
 * @param options.duration アニメーションの総時間 (デフォルト: '0.4s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-in-out')
 * @param options.iterationCount アニメーションの繰り返し回数 (デフォルト: 1)
 */
export const createShakeAnimation = (options?: {
  distance?: number
  duration?: string
  timingFunction?: string
  iterationCount?: string | number
}) => {
  const {
    distance = 8,
    duration = '0.4s',
    timingFunction = 'ease-in-out',
    iterationCount = 1, // 通常は1回で十分
  } = options || {}

  const shakeKeyframes = keyframes`
    0%, 100% {
      transform: translateX(0);
    }
    10%, 30%, 50%, 70%, 90% {
      transform: translateX(-${distance}px);
    }
    20%, 40%, 60%, 80% {
      transform: translateX(${distance}px);
    }
  `
  return `${shakeKeyframes} ${duration} ${timingFunction} ${iterationCount}`
}

/**
 * 指定方向からスライドインするアニメーション (slideIn) を生成します。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.direction スライドインする方向 ('left', 'right', 'top', 'bottom') (デフォルト: 'left')
 * @param options.distance 移動距離 (px) (デフォルト: 100%)
 * @param options.duration アニメーションの総時間 (デフォルト: '0.5s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'ease-out')
 */
export const createSlideInAnimation = (options?: {
  direction?: 'left' | 'right' | 'top' | 'bottom'
  distance?: string // 例: '100px', '100%'
  duration?: string
  timingFunction?: string
}) => {
  const {
    direction = 'left',
    distance = '100%', // デフォルトは親要素の幅/高さ分移動
    duration = '0.5s',
    timingFunction = 'ease-out',
  } = options || {}

  let transformFrom: string
  switch (direction) {
    case 'left':
      transformFrom = `translateX(-${distance})`
      break
    case 'right':
      transformFrom = `translateX(${distance})`
      break
    case 'top':
      transformFrom = `translateY(-${distance})`
      break
    case 'bottom':
      transformFrom = `translateY(${distance})`
      break
    default:
      transformFrom = `translateX(-${distance})`
  }

  const slideInKeyframes = keyframes`
    0% {
      opacity: 0;
      transform: ${transformFrom};
    }
    100% {
      opacity: 1;
      transform: translateX(0) translateY(0); // 元の位置に戻る
    }
  `
  return `${slideInKeyframes} ${duration} ${timingFunction} forwards`
}

/**
 * 回転アニメーション (rotate) を生成します。
 * 主にローディングアイコンなどに使用されます。
 * @param options アニメーションのパラメータオブジェクト
 * @param options.duration アニメーションの総時間 (デフォルト: '1s')
 * @param options.timingFunction アニメーションの速度曲線 (デフォルト: 'linear')
 * @param options.iterationCount アニメーションの繰り返し回数 (デフォルト: 'infinite')
 */
export const createRotateAnimation = (options?: {
  duration?: string
  timingFunction?: string
  iterationCount?: string | number
}) => {
  const {
    duration = '1s',
    timingFunction = 'linear', // 線形だと途中で速度が変わらない
    iterationCount = 'infinite',
  } = options || {}

  const rotateKeyframes = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `
  return `${rotateKeyframes} ${duration} ${timingFunction} ${iterationCount}`
}
