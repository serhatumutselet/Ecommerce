import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const user = useSelector((state) => state.client.user)
  const isLoggedIn = Boolean(user?.email || user?.id)

  if (!token && !isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}

