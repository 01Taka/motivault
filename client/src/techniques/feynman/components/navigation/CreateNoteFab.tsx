import { Edit } from '@mui/icons-material'
import { Fab } from '@mui/material'

interface CreateNoteFabProps {
  onClick: () => void
}

const CreateNoteFab: React.FC<CreateNoteFabProps> = ({ onClick }) => {
  return (
    <Fab
      color="primary"
      sx={{ position: 'fixed', bottom: 72, right: 16 }}
      onClick={onClick}
    >
      <Edit />
    </Fab>
  )
}

export default CreateNoteFab
