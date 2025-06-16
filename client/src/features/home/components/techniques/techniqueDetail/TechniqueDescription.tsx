import { Box, Stack, Typography } from '@mui/material'

interface TechniqueDescriptionProps {
  benefits: string
  reason: string
}

const TechniqueDescription: React.FC<TechniqueDescriptionProps> = ({
  benefits,
  reason,
}) => (
  <Stack spacing={3} sx={{ flexGrow: 1 }}>
    <Box>
      <Typography variant="subtitle1" fontWeight="medium" mb={1}>
        📌 何に役立つの？
      </Typography>
      <Typography variant="body1" mb={2}>
        {benefits}
      </Typography>
    </Box>
    <Box>
      <Typography variant="subtitle1" fontWeight="medium" mb={1}>
        💡 なぜ効果があるの？
      </Typography>
      <Typography variant="body1" mb={2}>
        {reason}
      </Typography>
    </Box>
  </Stack>
)

export default TechniqueDescription
