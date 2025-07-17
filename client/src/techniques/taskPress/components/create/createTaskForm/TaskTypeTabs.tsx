import { Tabs, Tab } from '@mui/material'

interface Props {
  createInputProps: any
}

const TaskTypeTabs = ({ createInputProps }: Props) => {
  return (
    <Tabs sx={{ mb: 2 }} {...createInputProps('type', 'tabs')}>
      <Tab value="problemSet" label="問題集型" />
      <Tab value="report" label="レポート型" />
    </Tabs>
  )
}

export default TaskTypeTabs
