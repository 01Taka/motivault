import React from 'react'
import Block from './Block'
import { Divider, Stack, Typography } from '@mui/material'
import type { TimeBlockingTimeBlockComponentBlock } from '../../types/components/block-types'
import { MINUTES_IN_MS } from '../../../../constants/datetime-constants'
import { formatHhMm } from '../../functions/utils/hhmm-utils'
import { getSelectableColorById } from '../../../../features/color/functions/selectable-color-utils'

interface HourBlocksProps {
  timeBlocks: TimeBlockingTimeBlockComponentBlock[]
  onClick: (block: TimeBlockingTimeBlockComponentBlock) => void
}

const HourBlocks: React.FC<HourBlocksProps> = ({ timeBlocks, onClick }) => {
  return (
    <Stack spacing={0} alignItems="center">
      {timeBlocks.map((block, index) => {
        const isZeroMin = (block.timeMs / MINUTES_IN_MS) % 60 === 0
        return (
          <Stack alignItems="center" key={index}>
            {/* {isZeroMin && (
              <Divider
                sx={{ width: '90vw', border: 1, borderColor: 'GrayText' }}
              />
            )} */}
            <Stack direction="row">
              <Typography sx={{ width: 50, height: 0 }}>
                {isZeroMin && formatHhMm(block.time, 'H:mm')}
              </Typography>
              <Block
                connectTop={block.connectTop}
                connectBottom={block.connectBottom}
                color={
                  block.colorId
                    ? getSelectableColorById(block.colorId).background
                    : ''
                }
                borderColor={
                  block.colorId
                    ? getSelectableColorById(block.colorId).main
                    : ''
                }
                separateMargin={0.1}
                height={30}
                sx={{ width: '70vw' }}
                onClick={() => onClick(block)}
              />
            </Stack>
          </Stack>
        )
      })}
    </Stack>
  )
}

export default HourBlocks
