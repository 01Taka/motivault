import { Stack, Button, Box } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import StepItem from './StepItem'

interface Props {
  steps: { text: string; estimatedTime: number }[]
  onAddStep: () => void
  onRemoveStep: (index: number) => void
  createInputPropsInArray: any
  isUsingTemplate: boolean
}

const StepInputs = ({
  steps,
  onAddStep,
  onRemoveStep,
  createInputPropsInArray,
  isUsingTemplate,
}: Props) => {
  return (
    <Stack spacing={1}>
      {steps.map((step, index) => (
        <StepItem
          key={index}
          index={index}
          step={step}
          onRemove={() => onRemoveStep(index)}
          createInputPropsInArray={createInputPropsInArray}
          isUsingTemplate={isUsingTemplate}
        />
      ))}

      <Box textAlign="center">
        <Button
          variant="outlined"
          onClick={onAddStep}
          startIcon={<AddIcon />}
          disabled={isUsingTemplate}
          sx={{
            borderRadius: 999,
            px: 'auto',
            height: 40,
            width: '90%',
            mx: 'auto',
          }}
        >
          ステップを追加
        </Button>
      </Box>
    </Stack>
  )
}

export default StepInputs
