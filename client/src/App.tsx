import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import NotFound from './components/pages/error/NotFound'
import HomePage from './components/pages/home/HomePage'
import MyTechniques from './features/home/components/techniques/myTechnique/MyTechniques'
import useTechniqueXPSetup from './features/achievementsSystem/hooks/useTechniqueXPSetup'
import { useSyncCurrentUser } from './hooks/initialization/useSyncCurrentUser'

const AuthPage = lazy(() => import('./components/pages/auth/AuthPage'))
const LoginPage = lazy(() => import('./components/organisms/Login'))
const UserSetupPage = lazy(() => import('./components/organisms/UserSetup'))

// Lazy imports（遅延読み込み）
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
const FeynmanTechnique = lazy(
  () => import('./techniques/feynman/FeynmanTechnique')
)

function App() {
  useSyncCurrentUser()
  useTechniqueXPSetup()

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/auth" element={<AuthPage />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="setup" element={<UserSetupPage />} />
        </Route>

        <Route path="/" element={<HomePage />}>
          <Route index element={<MyTechniques />} />
          <Route path="search" element={<SearchTechnique />} />
        </Route>

        <Route path="/techniques">
          <Route path="pomodoro" element={<PomodoroTimer />} />
          <Route path="time-blocking" element={<TimeBlocking />} />
          <Route path="feynman" element={<FeynmanTechnique />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

export default App
