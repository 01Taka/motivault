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
