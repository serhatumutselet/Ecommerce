import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'

export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </main>
  )
}

