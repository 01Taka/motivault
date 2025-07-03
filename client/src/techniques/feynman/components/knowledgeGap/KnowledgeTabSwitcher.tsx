import { Tabs, Tab, Box } from '@mui/material'

export type KnowledgeTab = 'unresolved' | 'resolved'

interface KnowledgeTabSwitcherProps {
  value: KnowledgeTab
  onChange: (value: KnowledgeTab) => void
}

export const KnowledgeTabSwitcher: React.FC<KnowledgeTabSwitcherProps> = ({
  value,
  onChange,
}) => {
  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    onChange(newValue as KnowledgeTab)
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
      <Tabs
        value={value}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab label="🧠 ホットな疑問" value="unresolved" />
        <Tab label="✅ 解決した疑問" value="resolved" />
      </Tabs>
    </Box>
  )
}
