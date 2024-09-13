import { Routes, Route } from 'react-router-dom'
import './globals.css';
import SignIn from './_auth/forms/SignIn'
import SignUp from './_auth/forms/SignUp'
import RootLayout from './_root/RootLayout'



import Layout from './_auth/Layout'
import { Home } from './_root/pages';
import { Toaster } from "@/components/ui/toaster"




const App = () => {
  return (

    
   <main className='flex h-screen'>
    <Routes>
      {/* public route */}
        <Route element ={<Layout/>}>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        </Route>

        {/* private route */}

        <Route element = {<RootLayout/>}>
        <Route index element={<Home/>}/>
        </Route>
    </Routes>

    <Toaster />
    </main>
   
  )
}

export default App