import React, { useState } from 'react'
import HourBlocks from './HourBlocks'
import type { TimeBlockingBlock } from '../../types/data/time-blocking-block-data'
import { Box, Stack } from '@mui/material'
import useTimeBlock from '../../hooks/useTimeBlock'
import DynamicBottomPanel from '../utils/DynamicBottomPanel'
import TemplateBlockSelector from './TemplateBlockSelector'
import Popup from '../../../../components/utils/Popup'
import CreateNewBlockForm from './createBlock/CreateNewBlockForm'
import { formatMsAsHhMm } from '../../functions/utils/hhmm-utils'
import {
  HOURS_IN_MS,
  MINUTES_IN_MS,
} from '../../../../constants/datetime-constants'
import { useTimeBlockingDataStore } from '../../services/stores/useTimeBlockingDataStore'
import type { TimeBlockingLayerType } from '../../types/data/time-blocking-layer-data'
import {
  TIME_BLOCKING_BLOCKS_MAP,
  TIME_BLOCKING_LOCATION_BLOCKS_MAP,
} from '../../constants/data/block-setting-template-data'
import { getSelectableColorById } from '../../../../features/color/functions/selectable-color-utils'
import type { TimeBlockingBlockSetting } from '../../services/documents/time-blocking-block-setting-document'
import { BLOCK_NAME_MAP_JA } from '../../constants/data/block-name-map'

interface TimeBlockingCreateLayerFormProps {
  layerType: TimeBlockingLayerType
}

interface TimeBlockingCreateLayerFormStateBlock {
  name: string
  color: string
  startAt: number
  endAt: number
}

const timeBlockingBlocks: TimeBlockingBlock[] = [
  {
    settingId: null,
    name: 'Morning Block',
    colorId: 'coral-red',
    startAt: 930,
    endAt: 1100,
    duration: null,
  },
  {
    settingId: null,
    name: 'Afternoon Block',
    colorId: 'cyan-blue',
    startAt: 1400,
    endAt: 1545,
    duration: null,
  },
  {
    settingId: null,
    name: 'Afternoon Block',
    colorId: 'cyan-blue',
    startAt: 1610,
    endAt: 1645,
    duration: null,
  },
]

const TimeBlockingCreateLayerForm: React.FC<
  TimeBlockingCreateLayerFormProps
> = ({}) => {
  const { templateLayers } = useTimeBlockingDataStore()
  const [openSelectTemplate, setOpenSelectTemplate] = useState(false)
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [selectedTemplate, setSelectedTemplate] =
    useState<TimeBlockingBlockSetting | null>(null)

  const [startTime, setStartTime] = useState(0)
  const [endTime, setEndTime] = useState(0)

  const blocks = [...timeBlockingBlocks]

  const { data, message } = useTimeBlock(blocks, 15)

  const templates = Object.values(TIME_BLOCKING_LOCATION_BLOCKS_MAP)

  if (!data) {
    return <Box>{message}</Box>
  }

  const colorPalette = getSelectableColorById(
    selectedTemplate?.colorId ?? 'silver-gray'
  )

  return (
    <Stack spacing={0}>
      <Box>
        <HourBlocks
          timeBlocks={data}
          onClick={(event) => {
            setOpenCreateForm(true)
            const startTime =
              Math.floor(event.timeMs / HOURS_IN_MS) * HOURS_IN_MS
            setStartTime(startTime)
            setEndTime(startTime + HOURS_IN_MS)
          }}
        />
      </Box>
      <DynamicBottomPanel
        isOpen={openSelectTemplate}
        isVisible={true}
        onOpen={() => setOpenSelectTemplate(true)}
        onClose={() => setOpenSelectTemplate(false)}
      >
        <TemplateBlockSelector
          templates={templates}
          selectedId={selectedTemplate ? selectedTemplate.docId : ''}
          onClick={(template) => setSelectedTemplate(template)}
        />
      </DynamicBottomPanel>
      <Popup open={openCreateForm} onClose={() => setOpenCreateForm(false)}>
        <Box sx={{ width: '70vw' }}>
          <CreateNewBlockForm
            name={
              selectedTemplate?.name &&
              selectedTemplate.name in BLOCK_NAME_MAP_JA
                ? BLOCK_NAME_MAP_JA[
                    selectedTemplate.name as keyof typeof BLOCK_NAME_MAP_JA
                  ]
                : ''
            }
            textColor={colorPalette.text}
            bgColor={colorPalette.background}
            enterButtonColor={colorPalette.main}
            startAt={formatMsAsHhMm(startTime, 'H:mm')}
            endAt={formatMsAsHhMm(endTime, 'H:mm')}
            onIncrementStart={() =>
              setStartTime((prev) => prev + 15 * MINUTES_IN_MS)
            }
            onDecrementStart={() =>
              setStartTime((prev) => prev - 15 * MINUTES_IN_MS)
            }
            onIncrementEnd={() =>
              setEndTime((prev) => prev + 15 * MINUTES_IN_MS)
            }
            onDecrementEnd={() =>
              setEndTime((prev) => prev - 15 * MINUTES_IN_MS)
            }
            onEnter={() => {}}
            startAtLabel="開始時刻"
            endAtLabel="終了時刻"
          />
        </Box>
      </Popup>
    </Stack>
  )
}

export default TimeBlockingCreateLayerForm
