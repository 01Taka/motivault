import { EmojiObjectsOutlined } from '@mui/icons-material'
import { Button, Stack, Typography } from '@mui/material'

interface AllResolvedPresenterProps {
  message: string
  resolveMoreNumber: number
  onCreateExplanationClick: () => void
  onResolveMoreClick: () => void // オプション追加
}

export const AllResolvedPresenter: React.FC<AllResolvedPresenterProps> = ({
  message,
  resolveMoreNumber,
  onCreateExplanationClick,
  onResolveMoreClick,
}) => {
  return (
    <Stack
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        px: 4,
        py: 2,
        m: 2,
        textAlign: 'center',
        bgcolor: '#f1fbff',
        borderRadius: 4,
        boxShadow: 2,
      }}
    >
      {/* size={48} strokeWidth={1.5} */}
      <EmojiObjectsOutlined color="primary" fontSize="large" />
      <Stack spacing={1}>
        <Typography variant="h6" fontWeight="bold">
          ナイス！全ての疑問が解決されたよ！
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {message}
        </Typography>
      </Stack>

      <Button
        onClick={onCreateExplanationClick}
        variant="contained"
        color="primary"
        sx={{ borderRadius: 4, px: 4 }}
      >
        ✍️ 新しい説明を書く
      </Button>

      {onResolveMoreClick && (
        <Button
          onClick={onResolveMoreClick}
          variant="outlined"
          color="secondary"
          sx={{ borderRadius: 4, px: 4 }}
        >
          🔍 さらに{resolveMoreNumber}つの疑問に挑戦
        </Button>
      )}
    </Stack>
  )
}
