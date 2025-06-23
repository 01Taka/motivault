import { Edit } from '@mui/icons-material'
import { Fab } from '@mui/material'

interface CreateNoteFabProps {}

const CreateNoteFab: React.FC<CreateNoteFabProps> = ({}) => {
  return (
    <Fab color="primary" sx={{ position: 'fixed', bottom: 72, right: 16 }}>
      <Edit />
    </Fab>
  )
}

export default CreateNoteFab
