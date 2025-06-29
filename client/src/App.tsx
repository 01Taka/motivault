import { Route, Routes } from 'react-router-dom'
import LoginPage from './components/organisms/Login'
import NotFound from './components/pages/error/NotFound'
import UserSetupPage from './components/organisms/UserSetup'
import AuthPage from './components/pages/auth/AuthPage'
import HomePage from './components/pages/home/HomePage'
import SearchTechnique from './features/home/components/techniques/searchTechnique/SearchTechnique'
import MyTechniques from './features/home/components/techniques/myTechnique/MyTechniques'
import PomodoroTimer from './techniques/pomodoro/components/PomodoroTimer'
import useTechniqueXPSetup from './features/achievementsSystem/hooks/useTechniqueXPSetup'
import TimeBlocking from './techniques/timeBlocking/components/TimeBlocking'
import FeynmanTechnique from './techniques/feynman/FeynmanTechnique'

function App() {
  useTechniqueXPSetup()

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<MyTechniques />} />
        <Route path="search" element={<SearchTechnique />} />
      </Route>

      <Route path="/techniques">
        <Route path="pomodoro" element={<PomodoroTimer />} />
        <Route path="time-blocking" element={<TimeBlocking />} />
        <Route path="feynman" element={<FeynmanTechnique />} />
      </Route>

      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="setup" element={<UserSetupPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
