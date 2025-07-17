import { Edit } from '@mui/icons-material'
import { Fab, type FabProps } from '@mui/material'
import { type ReactNode } from 'react'

interface CreateFabProps extends Omit<FabProps, 'children'> {
  icon?: ReactNode
  position?: {
    bottom?: number
    right?: number
    top?: number
    left?: number
  }
}

const defaultPosition = {
  bottom: 16,
  right: 16,
}

const CreateFab: React.FC<CreateFabProps> = ({
  icon = <Edit />,
  position = defaultPosition,
  sx,
  ...fabProps
}) => {
  return (
    <Fab
      sx={{
        position: 'fixed',
        ...position,
        ...sx,
      }}
      {...fabProps}
    >
      {icon}
    </Fab>
  )
}

export default CreateFab
