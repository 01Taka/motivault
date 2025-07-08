import React, { useEffect } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  AppBar,
  Toolbar,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useKnowledgeGapAnswerService } from '../../services/hooks/useKnowledgeGapAnswerService'
import { usePersistedState } from '../../../../hooks/utils/usePersistedState'

interface GapAnswerEditorProps {}

const GapAnswerEditor: React.FC<GapAnswerEditorProps> = ({}) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { answerTargetGap, answeringKnowledgeGap } =
    useKnowledgeGapAnswerService(id ?? null)

  const [answer, setAnswer, deleteKey] = usePersistedState<string>({
    key: `feynmanCreateGapAnswer/${id ?? ''}`,
    initialValue: '',
    debounceMs: 500,
  })

  useEffect(() => {
    if (answerTargetGap?.answer) {
      setAnswer((answer) => answer || answerTargetGap.answer)
    }
  }, [answerTargetGap?.answer])

  const handleSubmit = () => {
    if (answer.trim() && answerTargetGap?.noteId) {
      answeringKnowledgeGap(answer, answerTargetGap.noteId)
      deleteKey()
      navigate('/techniques/feynman')
    }
  }

  if (!answerTargetGap) {
    return null
  }

  return (
    <Box sx={{ height: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* 固定Topバー */}
      <AppBar position="fixed" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">疑問への回答</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={!answer.trim()}
          >
            完了
          </Button>
        </Toolbar>
      </AppBar>

      {/* コンテンツエリア */}
      <Box
        sx={{
          pt: 10,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        {/* 疑問の表示 */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            backgroundColor: '#FFF9F2',
            border: '2px solid #FF7043',
          }}
        >
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            疑問
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {answerTargetGap.contents}
          </Typography>
        </Box>

        {/* 回答入力欄 */}
        <TextField
          label="この疑問に対する説明や回答を記入"
          placeholder="例: この概念は〇〇の仕組みに似ていて..."
          multiline
          minRows={6}
          maxRows={15}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          fullWidth
          variant="outlined"
        />
      </Box>
    </Box>
  )
}

export default GapAnswerEditor
