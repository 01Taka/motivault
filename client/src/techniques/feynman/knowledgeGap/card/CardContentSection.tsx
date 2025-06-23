import { Box, Stack, Typography } from '@mui/material'

interface CardContentSectionProps {
  title: string
  date: string
  content: string
}

const CardContentSection: React.FC<CardContentSectionProps> = ({
  title,
  date,
  content,
}) => (
  <Box>
    <Stack direction="row" justifyContent="space-between">
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {date}
      </Typography>
    </Stack>

    <Typography variant="body1" sx={{ mt: 1 }}>
      {content}
    </Typography>
  </Box>
)

export default CardContentSection
