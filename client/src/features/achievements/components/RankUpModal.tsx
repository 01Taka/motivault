// components/RankUpModal.tsx
import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import { getRankIcon } from '../constants/rank-icons'
import { rankStyles } from '../constants/rank-styles-constants'
import type { TechniqueRank } from '../types/achievement-types'
import Popup from '../../../components/utils/Popup'

interface RankUpModalProps {
  open: boolean
  oldRank: string
  newRank: TechniqueRank
  onClose: () => void
}

const RankUpModal: React.FC<RankUpModalProps> = ({
  open,
  oldRank,
  newRank,
  onClose,
}) => {
  const style = rankStyles[newRank as keyof typeof rankStyles]

  return (
    <AnimatePresence>
      {open && (
        <Popup
          open={open}
          sx={{
            zIndex: 1300,
            color: '#fff',
          }}
          onClose={onClose}
          hideCloseButton
        >
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
                border: `2px solid ${style.lightColor}`,
                boxShadow: `0 0 30px ${style.lightColor}`,
                width: '80vw',
                height: '60vh',
              }}
            >
              <Typography variant="h4" color={style.color} gutterBottom>
                RANK UP!
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <motion.div
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {getRankIcon(newRank, {
                    fontSize: '6rem',
                    color: style.lightColor,
                  })}
                </motion.div>
              </Box>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Typography variant="h5" color={style.color}>
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
        </Popup>
      )}
    </AnimatePresence>
  )
}

export default RankUpModal
