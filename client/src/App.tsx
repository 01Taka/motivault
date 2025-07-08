import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from './components/pages/error/NotFound'
import HomePage from './components/pages/home/HomePage'
import MyTechniques from './features/home/components/techniques/myTechnique/MyTechniques'
import useTechniqueXPSetup from './features/achievementsSystem/hooks/useTechniqueXPSetup'
import { useSyncCurrentUser } from './hooks/initialization/useSyncCurrentUser'

// Lazy imports（ページ単位の初回読み込みコスト軽減）
const AuthPage = lazy(() => import('./components/pages/auth/AuthPage'))
const LoginPage = lazy(() => import('./components/organisms/Login'))
const UserSetupPage = lazy(() => import('./components/organisms/UserSetup'))
const SearchTechnique = lazy(
  () =>
    import(
      './features/home/components/techniques/searchTechnique/SearchTechnique'
    )
)
const PomodoroTimer = lazy(
  () => import('./techniques/pomodoro/components/PomodoroTimer')
)
const TimeBlocking = lazy(
  () => import('./techniques/timeBlocking/components/TimeBlocking')
)

// Feynman系は同技術内なので通常import
import FeynmanTechnique from './techniques/feynman/components/FeynmanTechnique'
import KnowledgeGap from './techniques/feynman/components/knowledgeGap/KnowledgeGap'
import FeynmanNotes from './techniques/feynman/components/notes/FeynmanNotes'
import NoteEditor from './techniques/feynman/components/noteEditor/NoteEditor'
import GapAnswerEditor from './techniques/feynman/components/gapAnswerEditor/GapAnswerEditor'
import NoteRewriteEditor from './techniques/feynman/components/rewrite/NoteRewriteEditor'
import TinySteps from './techniques/tinySteps/components/TinySteps'
import TaskPress from './techniques/taskPress/components/TaskPress'

function App() {
  useSyncCurrentUser()
  useTechniqueXPSetup()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Auth */}
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="setup" element={<UserSetupPage />} />
        </Route>

        {/* Home */}
        <Route path="/" element={<HomePage />}>
          <Route index element={<MyTechniques />} />
          <Route path="search" element={<SearchTechnique />} />
        </Route>

        {/* Techniques */}
        <Route path="/techniques">
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
          <Route path="task-press" element={<TaskPress />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
