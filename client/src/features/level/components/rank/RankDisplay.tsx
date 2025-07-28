import React, { useEffect, useState } from 'react'
import { Stack, Typography, Divider } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import RankIcon from './RankIcon'
import type { TechniqueRank } from '../../types/data/level-rank-types'

interface RankDisplayProps {
  rank: TechniqueRank
  textColor: string
  dividerColor: string
}

const RankDisplay: React.FC<RankDisplayProps> = ({
  rank,
  textColor,
  dividerColor,
}) => {
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
          <RankIcon rank={rank} sx={{ fontSize: '6rem' }} />
        </motion.div>
      </AnimatePresence>

      <Divider
        orientation="horizontal"
        sx={{
          width: 120,
          borderBottomWidth: 3,
          borderColor: dividerColor,
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
          <Typography variant="h5" fontWeight="bold" color={textColor}>
            {rank.toUpperCase()}
          </Typography>
        </motion.div>
      </AnimatePresence>
    </Stack>
  )
}

export default RankDisplay
