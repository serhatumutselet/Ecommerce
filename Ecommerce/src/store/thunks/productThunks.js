import apiClient from '../../api/axios'
import {
  setCategories,
  setFetchState,
  setProduct,
  setProductFetchState,
  setProductList,
  setTotal,
} from '../actions/productActions'

export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const { categories } = getState().product
  if (categories && categories.length > 0) {
    return
  }

  try {
    const response = await apiClient.get('/categories')
    dispatch(setCategories(response.data))
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}

export const fetchProducts =
  ({ categoryId, filter, sort, limit = 25, offset = 0 } = {}) =>
  async (dispatch) => {
  dispatch(setFetchState('FETCHING'))

  const params = {}
  params.limit = limit
  params.offset = offset
  if (categoryId) {
    params.category = categoryId
  }
  if (filter) {
    params.filter = filter
  }
  if (sort) {
    params.sort = sort
  }

  try {
    const response = await apiClient.get('/products', { params })
    const { total = 0, products = [] } = response.data || {}
    dispatch(setTotal(total))
    dispatch(setProductList(products))
    dispatch(setFetchState('FETCHED'))
  } catch (error) {
    console.error('Failed to fetch products', error)
    dispatch(setFetchState('FAILED'))
  }
}

export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) {
    return
  }

  dispatch(setProductFetchState('FETCHING'))
  try {
    const response = await apiClient.get(`/products/${productId}`)
    dispatch(setProduct(response.data))
    dispatch(setProductFetchState('FETCHED'))
  } catch (error) {
    console.error('Failed to fetch product', error)
    dispatch(setProductFetchState('FAILED'))
  }
}

