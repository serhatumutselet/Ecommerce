import { BrowserRouter } from 'react-router-dom'
import Header from './layout/Header'
import PageContent from './layout/PageContent'
import Footer from './layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen w-full flex-col bg-white text-slate-900">
        <Header />
        <PageContent />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
