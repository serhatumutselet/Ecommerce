import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ContactPage from '../pages/ContactPage'
import TeamPage from '../pages/TeamPage'
import AboutPage from '../pages/AboutPage'
export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </main>
  )
}

