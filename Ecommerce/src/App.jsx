import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'
import { verifyTokenOnLoad } from './store/thunks/clientThunks'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(verifyTokenOnLoad())
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full flex-col bg-white text-slate-900">
        <Header />
        <PageContent />
        <Footer />
        <ToastContainer position="top-right" autoClose={4000} />
      </div>
    </BrowserRouter>
  )
}

export default App
