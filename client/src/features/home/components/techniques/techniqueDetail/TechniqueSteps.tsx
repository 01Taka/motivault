import { Typography, Box } from '@mui/material'

interface TechniqueStepsProps {
  steps: string[]
}

const TechniqueSteps: React.FC<TechniqueStepsProps> = ({ steps }) => (
  <Box>
    <Typography variant="subtitle1" fontWeight="medium" mb={1}>
      🛠️ 具体的な使い方
    </Typography>
    <Box component="ol" sx={{ pl: 3, mb: 2 }}>
      {steps.map((step, idx) => (
        <Typography component="li" key={idx} variant="body2" lineHeight={1.8}>
          {step}
        </Typography>
      ))}
    </Box>
  </Box>
)

export default TechniqueSteps
