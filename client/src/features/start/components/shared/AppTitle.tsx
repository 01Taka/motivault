// src/components/shared/AppTitle.tsx
import React from 'react'
import { Typography, styled, type TypographyProps } from '@mui/material'
import {
  createFadeInFromBottomAnimation,
  createFloatAnimation,
  gradientAnimation,
} from '../../../../animations/animations'

/**
 * @interface GradientTextProps
 * @extends {TypographyProps}
 * @property {'true' | 'false'} [enablefloatanimation] - 浮遊アニメーションを有効にするかどうか。'true'で有効。
 * @property {'true' | 'false'} [enablefadeinfrombottom] - 下から上に移動しながらフェードインするアニメーションを有効にするかどうか。'true'で有効。
 */
interface GradientTextProps extends TypographyProps {
  enablefloatanimation?: 'true' | 'false'
  enablefadeinfrombottom?: 'true' | 'false'
}

/**
 * グラデーションテキストとオプションのアニメーションを適用するStyled Typographyコンポーネント。
 * テキストはデフォルトで赤から青のグラデーションを持ち、透明なカラーでテキストに背景を適用します。
 * @param {GradientTextProps} props - コンポーネントに渡されるプロパティ。
 */
const GradientText = styled(Typography)<GradientTextProps>(
  ({ enablefloatanimation, enablefadeinfrombottom }) => ({
    fontSize: '60px',
    fontWeight: 'bold',
    textAlign: 'center',
    background: 'linear-gradient(45deg, red, blue)',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitBackgroundClip: 'text',

    animation: `
      ${gradientAnimation} 5s ease infinite
      ${enablefloatanimation === 'true' ? `, ${createFloatAnimation()}` : ''}
      ${enablefadeinfrombottom === 'true' ? `, ${createFadeInFromBottomAnimation()}` : ''}
    `,
  })
)

/**
 * @interface AppTitleProps
 * @extends {TypographyProps}
 * @property {boolean} [enableFloatAnimation=false] - 浮遊アニメーションを有効にするかどうか。
 * @property {boolean} [enableFadeInFromBottom=true] - 下から上に移動しながらフェードインするアニメーションを有効にするかどうか。
 */
interface AppTitleProps extends TypographyProps {
  enableFloatAnimation?: boolean
  enableFadeInFromBottom?: boolean
}

/**
 * アプリケーションのタイトルを表示するコンポーネント。
 * グラデーションテキストと、オプションで浮遊アニメーションやフェードインアニメーションを適用できます。
 * @param {AppTitleProps} props - コンポーネントに渡されるプロパティ。
 * @param {React.ReactNode} [props.children='MOTIVALT'] - 表示するテキストコンテンツ。指定がない場合は 'MOTIVALT' が表示されます。
 * @param {boolean} [props.enableFloatAnimation=false] - 浮遊アニメーションを有効にするか。
 * @param {boolean} [props.enableFadeInFromBottom=true] - 下からフェードインアニメーションを有効にするか。
 */
const AppTitle: React.FC<AppTitleProps> = ({
  enableFloatAnimation = false,
  enableFadeInFromBottom = true,
  children,
  ...otherTypographyProps
}) => {
  return (
    <GradientText
      // boolean型のenableFloatAnimation/enableFadeInFromBottomを'true'|'false'文字列に変換してstyledコンポーネントに渡す
      enablefloatanimation={enableFloatAnimation ? 'true' : 'false'}
      enablefadeinfrombottom={enableFadeInFromBottom ? 'true' : 'false'}
      {...otherTypographyProps}
    >
      {children || 'MOTIVALT'}{' '}
    </GradientText>
  )
}

export default AppTitle
