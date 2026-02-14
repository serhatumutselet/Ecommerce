import apiClient, { setAuthToken } from '../../api/axios'
import { setRoles, setUser } from '../actions/clientActions'

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const { roles } = getState().client
  if (roles && roles.length > 0) {
    return
  }

  try {
    const response = await apiClient.get('/roles')
    dispatch(setRoles(response.data))
  } catch (error) {
    // Keep state unchanged; caller can decide to surface errors.
    console.error('Failed to fetch roles', error)
  }
}

export const loginUser = (credentials) => async (dispatch) => {
  const response = await apiClient.post('/login', credentials)
  const { token, user, ...rest } = response.data || {}
  const userInfo = user ?? rest
  if (token) {
    setAuthToken(token)
  }
  dispatch(setUser(userInfo))
  return { token, user: userInfo }
}

export const verifyTokenOnLoad = () => async (dispatch) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return { verified: false }
  }

  try {
    setAuthToken(token)
    const response = await apiClient.get('/verify')
    const { token: newToken, user, ...rest } = response.data || {}
    const userInfo = user ?? rest
    if (userInfo) {
      dispatch(setUser(userInfo))
    }
    const refreshedToken = newToken || token
    localStorage.setItem('token', refreshedToken)
    setAuthToken(refreshedToken)
    return { verified: true, user: userInfo }
  } catch (error) {
    localStorage.removeItem('token')
    setAuthToken('')
    return { verified: false, error }
  }
}

