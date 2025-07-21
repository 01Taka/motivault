// src/components/ProgressCircleBase.tsx
import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

interface ProgressCircleBaseProps {
  /** プログレスバーの完了度 (0-100) */
  percentage: number
  /** プログressバー内に表示するテキスト */
  displayText: string
  /** プログレスバーの色 */
  color?: string
  /** プログレスバーのサイズ (px) */
  size?: number
  /** プログレスバーの線の太さ */
  thickness?: number
  /** クリックイベントハンドラ */
  onClick?: () => void
  /** クリック可能かどうか */
  clickable?: boolean
}

/**
 * 円形プログレスバーの基本コンポーネント
 * @param percentage プログレスバーの完了度 (0-100)
 * @param displayText プログレスバー内に表示するテキスト
 * @param color プログレスバーの色 (デフォルト: primary)
 * @param size プログレスバーのサイズ (デフォルト: 80)
 * @param thickness プログレスバーの線の太さ (デフォルト: 4)
 * @param onClick クリックイベントハンドラ
 * @param clickable クリック可能かどうか
 */
const ProgressCircleBase: React.FC<ProgressCircleBaseProps> = ({
  percentage,
  displayText,
  color = 'primary',
  size = 80,
  thickness = 4,
  onClick,
  clickable = false,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-flex',
        cursor: clickable ? 'pointer' : 'default',
        '&:hover': {
          opacity: clickable ? 0.8 : 1,
        },
        transition: 'opacity 0.2s ease-in-out',
      }}
      onClick={clickable ? onClick : undefined}
    >
      <CircularProgress
        variant="determinate"
        value={percentage}
        size={size}
        thickness={thickness}
        sx={{ color: color }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column', // テキストが複数行になる可能性があるのでcolumnに
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
          sx={{ fontSize: size * 0.2, lineHeight: 1.2 }} // フォントサイズと行高を調整
        >
          {displayText.split('\n').map(
            (
              line,
              index // 改行対応
            ) => (
              <React.Fragment key={index}>
                {line}
                {index < displayText.split('\n').length - 1 && <br />}
              </React.Fragment>
            )
          )}
        </Typography>
      </Box>
    </Box>
  )
}

export default ProgressCircleBase
