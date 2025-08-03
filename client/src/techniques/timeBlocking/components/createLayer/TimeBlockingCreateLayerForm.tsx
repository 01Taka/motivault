import React, { useState, useCallback, useMemo } from 'react'
import HourBlocks from './HourBlocks'
import type { TimeBlockingBlock } from '../../types/data/time-blocking-block-data'
import { Box, Stack } from '@mui/material'
import useTimeBlock from '../../hooks/useTimeBlock'
import DynamicBottomPanel from '../utils/DynamicBottomPanel'
import TemplateBlockSelector from './TemplateBlockSelector'
import Popup from '../../../../components/utils/Popup'
import CreateNewBlockForm from './createBlock/CreateNewBlockForm'
import {
  formatMsAsHhMm,
  millisecondsToHhMm,
} from '../../functions/utils/hhmm-utils'
import {
  HOURS_IN_MS,
  MINUTES_IN_MS,
} from '../../../../constants/datetime-constants'
import { useTimeBlockingDataStore } from '../../services/stores/useTimeBlockingDataStore'
import type { TimeBlockingLayerType } from '../../types/data/time-blocking-layer-data'
import {
  TIME_BLOCKING_BLOCKS_MAP,
  TIME_BLOCKING_LOCATION_BLOCKS_MAP,
  TIME_BLOCKING_ROUTINE_BLOCKS_MAP,
} from '../../constants/data/block-setting-template-data'
import { getSelectableColorById } from '../../../../features/color/functions/selectable-color-utils'
import type { TimeBlockingBlockSetting } from '../../services/documents/time-blocking-block-setting-document'
import { BLOCK_NAME_MAP_JA } from '../../constants/data/block-name-map'
import type { TimeBlockingTimeBlockComponentBlock } from '../../types/components/block-types'

interface TimeBlockingCreateLayerFormProps {
  layerType: TimeBlockingLayerType
}

interface TimeBlockingCreateLayerFormStateBlock {
  name: string
  color: string
  startAt: number
  endAt: number
}

const TimeBlockingCreateLayerForm: React.FC<
  TimeBlockingCreateLayerFormProps
> = () => {
  const { templateLayers } = useTimeBlockingDataStore()
  const [addedNewBlocks, setAddedNewBlocks] = useState<TimeBlockingBlock[]>([])
  const [newBlock, setNewBlock] = useState<TimeBlockingBlock | null>(null)
  const [openTemplateSelect, setOpenTemplateSelect] = useState(false)
  const [openCreateForm, setOpenCreateForm] = useState(false)
  const [selectedTemplate, setSelectedTemplate] =
    useState<TimeBlockingBlockSetting | null>(null)

  // Combine initial blocks and added new blocks using useMemo

  const { data, message } = useTimeBlock(addedNewBlocks, 15)

  const templates = useMemo(
    () => Object.values(TIME_BLOCKING_ROUTINE_BLOCKS_MAP),
    []
  )

  // Memoize the color palette based on the selected template's colorId
  const colorPalette = useMemo(
    () => getSelectableColorById(selectedTemplate?.colorId ?? 'silver-gray'),
    [selectedTemplate]
  )

  const setBlockTime = useCallback((type: 'start' | 'end', timeMs: number) => {
    setNewBlock((prev) => {
      if (!prev) return null
      return type === 'start'
        ? { ...prev, startAt: timeMs }
        : { ...prev, endAt: timeMs }
    })
  }, [])

  const incrementBlockTime = useCallback(
    (type: 'start' | 'end', timeMs: number) => {
      setNewBlock((prev) => {
        if (!prev) return null
        return type === 'start'
          ? { ...prev, startAt: prev.startAt + timeMs }
          : { ...prev, endAt: prev.endAt + timeMs }
      })
    },
    []
  )

  const onCreateNewBlock = useCallback(
    (startTimeMs: number) => {
      setOpenCreateForm(true)
      const startTime = Math.floor(startTimeMs / HOURS_IN_MS) * HOURS_IN_MS
      setNewBlock({
        settingId: selectedTemplate?.docId ?? null,
        name: selectedTemplate?.name ?? '',
        startAt: startTime,
        endAt: startTime + HOURS_IN_MS,
        colorId: selectedTemplate?.colorId ?? 'silver-gray',
        duration: null,
      })
    },
    [selectedTemplate]
  )

  const onAddNewBlock = useCallback(() => {
    if (newBlock) {
      const formattedBlock = {
        ...newBlock,
        startAt: millisecondsToHhMm(newBlock.startAt),
        endAt: millisecondsToHhMm(newBlock.endAt),
      }
      setAddedNewBlocks((prev) => [...prev, formattedBlock])
    }
    setNewBlock(null)
    setOpenCreateForm(false)
  }, [newBlock])

  if (!data) {
    return <Box>{message}</Box>
  }

  return (
    <Stack spacing={0}>
      <Box>
        <HourBlocks
          timeBlocks={data}
          onClick={(block) => onCreateNewBlock(block.timeMs)}
        />
      </Box>
      <DynamicBottomPanel
        isOpen={openTemplateSelect}
        isVisible={true}
        onOpen={() => setOpenTemplateSelect(true)}
        onClose={() => setOpenTemplateSelect(false)}
      >
        <TemplateBlockSelector
          templates={templates}
          selectedId={selectedTemplate ? selectedTemplate.docId : ''}
          onClick={(template) => setSelectedTemplate(template)}
        />
      </DynamicBottomPanel>
      <Popup open={openCreateForm} onClose={() => setOpenCreateForm(false)}>
        <Box sx={{ width: '70vw' }}>
          {newBlock && (
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
              startAt={formatMsAsHhMm(newBlock.startAt, 'H:mm')}
              endAt={formatMsAsHhMm(newBlock.endAt, 'H:mm')}
              onIncrementStart={() =>
                incrementBlockTime('start', 15 * MINUTES_IN_MS)
              }
              onDecrementStart={() =>
                incrementBlockTime('start', -15 * MINUTES_IN_MS)
              }
              onIncrementEnd={() =>
                incrementBlockTime('end', 15 * MINUTES_IN_MS)
              }
              onDecrementEnd={() =>
                incrementBlockTime('end', -15 * MINUTES_IN_MS)
              }
              onEnter={onAddNewBlock}
              startAtLabel="開始時刻"
              endAtLabel="終了時刻"
            />
          )}
        </Box>
      </Popup>
    </Stack>
  )
}

export default TimeBlockingCreateLayerForm
