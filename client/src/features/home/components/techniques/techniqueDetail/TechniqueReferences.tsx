import { Box, Typography, Link } from '@mui/material'

interface TechniqueReferencesProps {
  references: { label: string; url: string }[]
}

const TechniqueReferences: React.FC<TechniqueReferencesProps> = ({
  references,
}) => (
  <Box
    sx={{
      backgroundColor: '#F0F4FF',
      p: 2,
      borderRadius: 2,
      mt: 3,
    }}
  >
    <Typography variant="subtitle2" fontWeight="medium" gutterBottom>
      🔗 参考サイト
    </Typography>
    {references.map((ref, idx) => (
      <Link
        key={idx}
        href={ref.url}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
        display="block"
        variant="body2"
        color="primary"
        sx={{ mb: 0.5 }}
      >
        {ref.label}
      </Link>
    ))}
  </Box>
)

export default TechniqueReferences
