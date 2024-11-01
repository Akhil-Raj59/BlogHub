import { useDispatch} from 'react-redux'
import { useState, useEffect } from 'react'
import authService from './appwrite/auth'
import { login,logout } from './Store/authSlice' 
import { Footer, Header } from './Componets'
import { Outlet } from 'react-router-dom'
import conf from './conf/config'


function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData: userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))

  },[])
  
  

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full flex flex-col items-center justify-center'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />

      </div>
    </div>
  ) : null
}

export default App
