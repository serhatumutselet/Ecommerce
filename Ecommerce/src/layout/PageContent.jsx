import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'

export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </main>
  )
}

