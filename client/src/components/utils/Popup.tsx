import { IconButton, Modal, Slide, Stack, type SxProps } from '@mui/material'
import { type FC, type ReactNode } from 'react'
import { KeyboardDoubleArrowDown } from '@mui/icons-material'
import { grey } from '@mui/material/colors'

interface PopupProps {
  open?: boolean
  children: ReactNode
  sx?: SxProps
  modalSx?: SxProps
  hideCloseButton?: boolean
  onClose?: () => void
  onExited?: () => void
}

const Popup: FC<PopupProps> = ({
  open = false,
  children,
  sx,
  modalSx,
  hideCloseButton = false,
  onClose,
  onExited,
}) => {
  const stackStyles: SxProps = {
    overflow: 'auto',
    borderRadius: 2,
    p: 2,
    ...sx,
  }

  return (
    <Modal
      open={open}
      onClose={() => {
        console.log('Modal closed')
        onClose?.()
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...modalSx,
      }}
    >
      <Slide
        direction="up"
        in={open}
        mountOnEnter
        unmountOnExit
        timeout={{ enter: 300, exit: 100 }}
        onExited={onExited}
      >
        <Stack sx={stackStyles}>
          {children}
          {!hideCloseButton && (
            <IconButton
              onClick={() => onClose?.()}
              size="large"
              color="inherit"
              disableRipple
              sx={{
                position: 'relative',
                bottom: 0,
              }}
            >
              <KeyboardDoubleArrowDown
                sx={{ color: grey[500], fontSize: '3rem' }}
              />
            </IconButton>
          )}
        </Stack>
      </Slide>
    </Modal>
  )
}

export default Popup
