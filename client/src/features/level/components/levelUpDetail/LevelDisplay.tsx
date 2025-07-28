// components/LevelDisplay.tsx
import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'

interface LevelDisplayProps {
  level: number
  color: string
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({ level, color }) => {
  const [displayLevel, setDisplayLevel] = useState(level)

  useEffect(() => {
    if (level !== displayLevel) {
      setDisplayLevel(level)
    }
  }, [level])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={level}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Typography variant="h5" fontWeight="bold" color={color}>
          Lv. {level}
        </Typography>
      </motion.div>
    </AnimatePresence>
  )
}

export default LevelDisplay
