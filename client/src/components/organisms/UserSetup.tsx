// import { Box, Container, Paper, Typography } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useCurrentUserStore } from '../../stores/user/currentUserStore'
// import { submitUserSetup } from '../../features/auth/services/user-setup'
// import UserSetupForm from '../../features/auth/components/UserSetupForm'

// const UserSetupPage = () => {
//   const { uid, user } = useCurrentUserStore()
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (user) navigate('/')
//   }, [user])

//   const handleSubmit = async (formState: any) => {
//     if (uid) {
//       await submitUserSetup(uid, formState)
//       navigate('/')
//     }
//   }

//   return (
//     <Container maxWidth="sm">
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         minHeight="100vh"
//       >
//         <Paper elevation={3} sx={{ p: 4, borderRadius: 3, width: '100%' }}>
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             ユーザー情報の設定
//           </Typography>
//           <UserSetupForm onSubmit={handleSubmit} />
//         </Paper>
//       </Box>
//     </Container>
//   )
// }

// export default UserSetupPage |DEL|
