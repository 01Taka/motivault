import { alpha, Box, Card, CardContent, Typography } from '@mui/material'

// 統計カードコンポーネント
interface StatCardProps {
  icon: React.ElementType
  label: string
  value: string
  color: string
  bgColor: string
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
}) => (
  <Card
    elevation={0}
    sx={{
      background: `linear-gradient(135deg, ${alpha(bgColor, 0.15)} 0%, ${alpha(bgColor, 0.05)} 100%)`,
      border: `2px solid ${alpha(color, 0.2)}`,
      borderRadius: 3,
      transition: 'all 0.2s ease',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 8px 25px ${alpha(color, 0.15)}`,
      },
    }}
  >
    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Icon sx={{ color, fontSize: 28 }} />
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: alpha(color, 0.8),
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color,
              fontWeight: 800,
              fontFamily: '"Roboto Mono", monospace',
              fontSize: '1.1rem',
            }}
          >
            {value}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
)

export default StatCard
