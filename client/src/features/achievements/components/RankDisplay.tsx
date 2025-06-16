import React, { useEffect, useState } from 'react'
import { Stack, Typography, Divider } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { getRankIcon } from '../constants/rank-icons'
import type { TechniqueRank } from '../types/achievement-types'

interface RankDisplayProps {
  rank: TechniqueRank
  style: {
    color: string
    lightColor: string
  }
}

export const RankDisplay: React.FC<RankDisplayProps> = ({ rank, style }) => {
  const [displayRank, setDisplayRank] = useState(rank)

  useEffect(() => {
    if (rank !== displayRank) {
      setDisplayRank(rank)
    }
  }, [rank])

  return (
    <Stack alignItems="center" mt={2}>
      <AnimatePresence mode="wait">
        <motion.div
          key={rank}
          initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
          transition={{ duration: 0.4 }}
        >
          {getRankIcon(rank, {
            fontSize: '5rem',
            color: style.lightColor,
          })}
        </motion.div>
      </AnimatePresence>

      <Divider
        orientation="horizontal"
        sx={{
          width: 120,
          borderBottomWidth: 3,
          borderColor: style.lightColor,
          mt: 0.5,
          mb: 1,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={`label-${rank}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Typography variant="h5" fontWeight="bold" color={style.color}>
            {rank.toUpperCase()}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Stack>
  )
}
