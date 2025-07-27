import { useNavigate } from 'react-router-dom'
import { signInWithGoogle } from '../functions/google-auth-service'

export const useGoogleLogin = ({
  nextPageOnSuccess,
}: {
  nextPageOnSuccess: string
}) => {
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      await signInWithGoogle()
      navigate(nextPageOnSuccess)
    } catch (error) {
      console.error('ログインエラー:', error)
      alert('ログインに失敗しました')
    }
  }

  return { handleLogin }
}
