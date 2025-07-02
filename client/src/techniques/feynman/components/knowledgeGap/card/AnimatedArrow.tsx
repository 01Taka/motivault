import { PlayArrow } from '@mui/icons-material'
import { motion } from 'framer-motion'

interface AnimatedArrowProps {
  index: number
}

const AnimatedArrow: React.FC<AnimatedArrowProps> = ({ index }) => (
  <motion.div
    animate={{ x: [0, 4, 0, -4, 0] }}
    transition={{
      repeat: Infinity,
      duration: 2,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      left: -10,
      top: '40%',
      transform: 'translateY(-50%)',
    }}
  >
    <PlayArrow
      sx={{ color: '#FF7043', fontSize: 40 }}
      titleAccess={`Item ${index}`}
    />
  </motion.div>
)

export default AnimatedArrow
