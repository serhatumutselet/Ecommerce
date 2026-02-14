import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://workintech-fe-ecommerce.onrender.com',
})

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = token
  } else {
    delete apiClient.defaults.headers.common.Authorization
  }
}

export default apiClient

