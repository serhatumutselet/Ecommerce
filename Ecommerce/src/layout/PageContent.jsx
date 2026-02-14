import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ShopPage from '../pages/ShopPage'
import ProductDetailPage from '../pages/ProductDetailPage'
import ContactPage from '../pages/ContactPage'
import TeamPage from '../pages/TeamPage'
import AboutPage from '../pages/AboutPage'
import SignupPage from '../pages/SignupPage'
import LoginPage from '../pages/LoginPage'
import CartPage from '../pages/CartPage'
import CreateOrderPage from '../pages/CreateOrderPage'
import OrdersPage from '../pages/OrdersPage'
import ProtectedRoute from '../routes/ProtectedRoute'
export default function PageContent() {
  return (
    <main className="flex w-full flex-1 flex-col">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:gender/:categoryName/:categoryId" element={<ShopPage />} />
        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<ProductDetailPage />}
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <CreateOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  )
}

