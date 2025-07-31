import CircularProgress, {
  type CircularProgressProps,
} from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface CircularProgressWithLabelProps extends CircularProgressProps {
  /**
   * プログレスの現在の値 (0-100)。
   */
  value: number
  /**
   * 進行していない部分の線の色。
   */
  trackColor?: string
  /**
   * 進行している部分の線の色。
   */
  variantColor?: string
  /**
   * 円形プログレスのサイズ。
   */
  size?: number | string
  sizeBySx?: number | string | Record<string, number | string>
  /**
   * 円形プログレスの線の太さ。
   */
  thickness?: number
  /**
   * 円形プログレスの端の形
   */
  strokeLinecap?: 'butt' | 'round' | 'square'
  /**
   * 円の中心に表示する内容。
   */
  children?: React.ReactNode
  backgroundColor?: string
  onClick?: () => void
}

const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({
  value,
  trackColor = '#e0e0e0', // デフォルトの進行していない部分の色
  variantColor, // デフォルトではMUIのプライマリカラー
  size,
  sizeBySx,
  thickness = 3.6,
  strokeLinecap,
  children,
  backgroundColor,
  onClick,
  ...props
}) => {
  return (
    <Box
      sx={{ position: 'relative', display: 'inline-flex' }}
      onClick={onClick}
    >
      <CircularProgress
        variant="determinate"
        sx={{
          color: trackColor, // 進行していない部分の色
          minWidth: !size ? sizeBySx : undefined,
          minHeight: !size ? sizeBySx : undefined,
        }}
        size={size}
        thickness={thickness}
        value={100} // 背景（トラック）として100%表示
        {...props}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: variantColor, // 進行している部分の色
          position: 'absolute',
          minWidth: !size ? sizeBySx : undefined,
          minHeight: !size ? sizeBySx : undefined,
          left: 0,
          '& circle': {
            strokeLinecap,
            // transition: 'stroke-dashoffset 0s ease-in-out',
          },
        }}
        size={size}
        thickness={thickness}
        value={value}
        {...props}
      />
      {/* childrenを中央に配置するBox */}
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: -10,
          borderRadius: 999,
          bgcolor: backgroundColor,
        }}
      >
        {children !== null &&
          (children ?? ( // childrenがない場合は従来のパーセンテージを表示
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >{`${Math.round(value)}%`}</Typography>
          ))}
      </Box>
    </Box>
  )
}

export default CircularProgressWithLabel
