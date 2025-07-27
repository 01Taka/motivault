// src/components/AppStartStepper.tsx
import React from 'react'
import { Stepper, Step, StepLabel, Box } from '@mui/material'
import { styled } from '@mui/system'

// FloatingStepLabel: アクティブなステップのみに浮遊アニメーションを適用
interface CustomStepLabelProps {
  isactive?: 'true' | 'false' // styled-componentsでbooleanを渡すためのworkaround
}

const CustomStepLabel = styled(StepLabel)<CustomStepLabelProps>(
  ({ isactive }) => ({
    // デフォルトのStepLabelのスタイルを維持しつつ、アクティブ時のみアニメーション
    ...(isactive === 'true' && {
      animation: 'float 2s ease-in-out infinite', // アクティブなステップのみ浮遊アニメーション
    }),
    '@keyframes float': {
      '0%': {
        transform: 'translateY(0)',
      },
      '50%': {
        transform: 'translateY(-3px)',
      },
      '100%': {
        transform: 'translateY(0)',
      },
    },
  })
)

// StepperWrapper: ステッパーの全体配置 (AppStartStepper内部で定義)
const StepperWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '30px',
})

interface AppStartStepperProps {
  activeStep: number
  steps: string[]
}

const AppStartStepper: React.FC<AppStartStepperProps> = ({
  activeStep,
  steps,
}) => {
  return (
    <StepperWrapper>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <CustomStepLabel isactive={activeStep === index ? 'true' : 'false'}>
              {label}
            </CustomStepLabel>
          </Step>
        ))}
      </Stepper>
    </StepperWrapper>
  )
}

export default AppStartStepper
