import { Route, Routes } from 'react-router-dom'
import './index.css'
import SignIn from './_auth/forms/SignIn'
import { Home } from './_root/Pages'
import SignUp from './_auth/forms/SignUp'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  return (
    <main className='flex h-screen'>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        </Route>


        {/* Private Routes */}
        <Route element={<RootLayout />}>
        <Route index element={<Home />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  )
}

export default App