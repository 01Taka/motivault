// components/RankUpView.tsx
import React from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import type { TechniqueRank } from '../../types/data/level-rank-types'
import { getRankColor } from '../../../../functions/theme/rank-color-utils'
import RankIcon from './RankIcon'

interface RankUpViewProps {
  oldRank: string
  newRank: TechniqueRank
}

const RankUpView: React.FC<RankUpViewProps> = ({ oldRank, newRank }) => {
  const { palette } = useTheme()
  const newRankColor = getRankColor(newRank, palette)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.05, opacity: 1 }}
        exit={{ scale: 0.6, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            borderRadius: 4,
            bgcolor: 'rgba(0, 0, 0, 0.85)',
            border: `2px solid ${newRankColor?.light}`,
            boxShadow: `0 0 30px ${newRankColor?.light}`,
            width: '80vw',
            height: '60vh',
          }}
        >
          <Typography variant="h4" color={newRankColor?.main} gutterBottom>
            RANK UP!
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <motion.div
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <RankIcon rank={newRank} sx={{ fontSize: '6rem' }} />
            </motion.div>
          </Box>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Typography variant="h5" color={newRankColor?.main}>
              {oldRank.toUpperCase()} → {newRank.toUpperCase()}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Typography variant="subtitle1" sx={{ mt: 2 }} color="gray">
              新たなステージへようこそ
            </Typography>
          </motion.div>
        </Stack>
      </motion.div>
    </AnimatePresence>
  )
}

export default RankUpView
