import { useEffect, useMemo, useState } from 'react'
import apiClient, { setAuthToken } from '../api/axios'

const formatPrice = (value) => {
  const amount = Number(value) || 0
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount)
}

const formatDate = (value) => {
  if (!value) {
    return '-'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return String(value)
  }
  return date.toLocaleString('tr-TR')
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true)
      setError('')
      try {
        const response = await apiClient.get('/order')
        const payload = response.data
        const data = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.orders)
            ? payload.orders
            : Array.isArray(payload?.data)
              ? payload.data
              : []
        setOrders(data)
      } catch (err) {
        console.error('Failed to fetch orders', err)
        setError('Siparişler alınamadı.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const orderRows = useMemo(() => {
    const normalized = orders.map((order, index) => ({
      ...order,
      _key: order.id ?? order.order_id ?? `order-${index}`,
    }))

    return normalized.sort((first, second) => {
      const firstTime = new Date(first.order_date).getTime()
      const secondTime = new Date(second.order_date).getTime()
      if (Number.isNaN(firstTime) || Number.isNaN(secondTime)) {
        return 0
      }
      return secondTime - firstTime
    })
  }, [orders])

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h1 className="text-2xl font-bold text-[#252B42]">
          Önceki Siparişlerim
        </h1>

        {error ? (
          <div className="mt-6 rounded-[8px] border border-[#FFE0E0] bg-[#FFF5F5] px-4 py-3 text-sm text-[#D64545]">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-6 text-sm text-[#737373]">Yükleniyor...</div>
        ) : orderRows.length === 0 ? (
          <div className="mt-6 rounded-[10px] border border-[#E6E6E6] bg-white p-6 text-sm text-[#737373]">
            Henüz sipariş bulunamadı.
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[#F7F7F7] text-left text-[#252B42]">
                <tr>
                  <th className="px-4 py-3">Sipariş</th>
                  <th className="px-4 py-3">Tarih</th>
                  <th className="px-4 py-3">Ürün Adedi</th>
                  <th className="px-4 py-3 text-right">Tutar</th>
                  <th className="w-[160px] px-4 py-3 text-right" />
                </tr>
              </thead>
              <tbody>
                {orderRows.map((order) => {
                  const products = Array.isArray(order.products)
                    ? order.products
                    : []
                  const totalCount = products.reduce(
                    (sum, item) => sum + (item.count || 0),
                    0
                  )
                  return (
                    <tr
                      key={order._key}
                      className="border-t border-[#E6E6E6]"
                    >
                      <td className="px-4 py-4 font-semibold text-[#252B42]">
                        #{order.id ?? order.order_id ?? '-'}
                      </td>
                      <td className="px-4 py-4 text-[#737373]">
                        {formatDate(order.order_date)}
                      </td>
                      <td className="px-4 py-4 text-[#737373]">
                        {totalCount}
                      </td>
                      <td className="px-4 py-4 text-right font-semibold text-[#252B42]">
                        {formatPrice(order.price)}
                      </td>
                      <td className="px-4 py-4 text-right" />
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}

