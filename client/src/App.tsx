import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from './components/pages/error/NotFound'
import HabitMateLayout from './techniques/habitMate/components/HabitMateLayout'
import HabitMateIndex from './techniques/habitMate/components/HabitMateIndex'
import HabitMateStartHabit from './techniques/habitMate/components/HabitMateStartHabit'
import HabitMateCreateHabit from './techniques/habitMate/components/HabitMateCreateHabit'
import useAbstractDataSync from './hooks/services/useAbstractDataSync'
import { useUserDataStore } from './features/user/services/stores/useUserDataStore'
import useTechniqueSessionManager from './features/technique/services/hooks/useTechniqueSessionManager'
import AppStartLayout from './features/start/components/AppStartLayout'
import AppStartIndex from './features/start/components/AppStartIndex'
import SelectAuthMethod from './features/start/components/auth/SelectAuthMethod'
import UserSetup from './features/start/components/userSetup/UserSetup'
import AppTutorial from './features/start/components/tutorial/AppTutorial'
import { useTechniqueMetadataDataStore } from './features/technique/services/stores/useTechniqueMetadataDataStore'
import MyTechniques from './features/home/components/techniques/myTechnique/MyTechniques'
import HomeLayout from './features/home/components/HomeLayout'
import TechniquesLayout from './features/technique/components/TechniquesLayout'
import { CssBaseline, ThemeProvider } from '@mui/material'
import baseTheme from './theme'

// Lazy imports for all pages and technique-related components
const SearchTechnique = lazy(
  () => import('./features/home/components/searchTechnique/SearchTechnique')
)
const PomodoroTimer = lazy(
  () => import('./techniques/pomodoro/components/PomodoroTimer')
)
const TimeBlocking = lazy(
  () => import('./techniques/timeBlocking/components/TimeBlocking')
)

// Feynman Technique related components
const FeynmanTechnique = lazy(
  () => import('./techniques/feynman/components/FeynmanTechnique')
)
const KnowledgeGap = lazy(
  () => import('./techniques/feynman/components/knowledgeGap/KnowledgeGap')
)
const FeynmanNotes = lazy(
  () => import('./techniques/feynman/components/notes/FeynmanNotes')
)
const NoteEditor = lazy(
  () => import('./techniques/feynman/components/noteEditor/NoteEditor')
)
const GapAnswerEditor = lazy(
  () =>
    import('./techniques/feynman/components/gapAnswerEditor/GapAnswerEditor')
)
const NoteRewriteEditor = lazy(
  () => import('./techniques/feynman/components/rewrite/NoteRewriteEditor')
)

// Other technique components
const TinySteps = lazy(
  () => import('./techniques/tinySteps/components/TinySteps')
)
const TaskPress = lazy(
  () => import('./techniques/taskPress/components/TaskPress')
)
const TaskPressLayout = lazy(
  () => import('./techniques/taskPress/components/TaskPressLayout')
)
const CreateTaskPress = lazy(
  () => import('./techniques/taskPress/components/create/CreateTaskPress')
)

function App() {
  useAbstractDataSync(useUserDataStore())
  useAbstractDataSync(useTechniqueMetadataDataStore())
  useTechniqueSessionManager()
  // useTechniqueXPSetup()

  const currentMode = 'light'
  const theme = baseTheme(currentMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<MyTechniques />} />
            <Route path="start" element={<AppStartLayout />}>
              <Route index element={<AppStartIndex />} />
              <Route path="select-auth-method" element={<SelectAuthMethod />} />
              <Route path="user-setup" element={<UserSetup />} />
              <Route path="tutorial" element={<AppTutorial />} />
            </Route>
            <Route path="search" element={<SearchTechnique />} />
          </Route>

          {/* Techniques */}
          <Route path="/techniques" element={<TechniquesLayout />}>
            <Route path="pomodoro" element={<PomodoroTimer />} />
            <Route path="time-blocking" element={<TimeBlocking />} />

            {/* Feynman Technique Layout */}
            <Route path="feynman" element={<FeynmanTechnique />}>
              <Route index element={<KnowledgeGap />} />
              <Route path="notes" element={<FeynmanNotes />} />
              <Route path="create" element={<NoteEditor />} />
              <Route path="rewrite/:id" element={<NoteRewriteEditor />} />
              <Route path="create-answer/:id" element={<GapAnswerEditor />} />
            </Route>

            <Route path="tiny-steps" element={<TinySteps />} />
            <Route path="task-press" element={<TaskPressLayout />}>
              <Route index element={<TaskPress />} />
              <Route path="create" element={<CreateTaskPress />} />
            </Route>
            <Route path="habit-mate" element={<HabitMateLayout />}>
              <Route index element={<HabitMateIndex />} />
              <Route path="start-habit" element={<HabitMateStartHabit />} />
              <Route path="create/:level" element={<HabitMateCreateHabit />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  )
}

export default App
