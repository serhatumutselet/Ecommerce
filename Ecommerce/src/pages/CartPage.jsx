import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Trash2 } from 'lucide-react'
import { setCart } from '../store/actions/shoppingCartActions'

const formatPrice = (value) => {
  const amount = Number(value) || 0
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount)
}

export default function CartPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)

  const totals = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const price = Number(item.product?.price) || 0
        const lineTotal = price * (item.count || 0)
        if (item.checked) {
          acc.amount += lineTotal
          acc.count += item.count || 0
        }
        return acc
      },
      { amount: 0, count: 0 }
    )
  }, [cart])

  const updateCart = (nextCart) => dispatch(setCart(nextCart))
  const baseShipping = 29.99
  const shippingFee = totals.amount > 0 ? baseShipping : 0
  const shippingDiscount = totals.amount >= 150 ? shippingFee : 0
  const shippingPay = shippingFee - shippingDiscount
  const grandTotal = totals.amount + shippingPay

  const handleToggleChecked = (productId) => {
    updateCart(
      cart.map((item) =>
        item.product?.id === productId
          ? { ...item, checked: !item.checked }
          : item
      )
    )
  }

  const handleCountChange = (productId, delta) => {
    updateCart(
      cart.map((item) => {
        if (item.product?.id !== productId) {
          return item
        }
        const nextCount = Math.max(1, (item.count || 1) + delta)
        return { ...item, count: nextCount }
      })
    )
  }

  const handleRemove = (productId) => {
    updateCart(cart.filter((item) => item.product?.id !== productId))
  }

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h1 className="text-2xl font-bold text-[#252B42]">
          Sepetim ({cart.length} Ürün)
        </h1>

        {cart.length === 0 ? (
          <div className="mt-8 rounded-[10px] border border-[#E6E6E6] bg-white p-6 text-[#737373]">
            Sepetiniz boş.
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-6 lg:flex-row">
            <div className="flex-1 overflow-hidden rounded-[10px] border border-[#E6E6E6] bg-white">
              <table className="w-full border-collapse text-sm">
                <thead className="bg-[#F7F7F7] text-left text-[#252B42]">
                  <tr>
                    <th className="w-[60px] px-4 py-3">Seç</th>
                    <th className="px-4 py-3">Ürün</th>
                    <th className="w-[160px] px-4 py-3 text-center">Adet</th>
                    <th className="w-[140px] px-4 py-3 text-right">Fiyat</th>
                    <th className="w-[80px] px-4 py-3 text-center">Sil</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const product = item.product || {}
                    const productId = product.id
                    const image =
                      product?.images?.[0]?.url || product?.image || ''
                    return (
                      <tr
                        key={productId}
                        className="border-t border-[#E6E6E6]"
                      >
                        <td className="px-4 py-4">
                          <input
                            type="checkbox"
                            checked={Boolean(item.checked)}
                            onChange={() => handleToggleChecked(productId)}
                            className="h-4 w-4 accent-[#23A6F0]"
                          />
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-4">
                            <div className="h-[72px] w-[72px] overflow-hidden rounded-[8px] border border-[#E6E6E6]">
                              {image ? (
                                <img
                                  src={image}
                                  alt={product.name || 'Product'}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-[#F7F7F7] text-xs text-[#737373]">
                                  Görsel Yok
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#252B42]">
                                {product.name || 'Product'}
                              </span>
                              <span className="text-xs text-[#737373]">
                                {product.description || ''}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleCountChange(productId, -1)}
                              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#E6E6E6] text-[#737373]"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-semibold text-[#252B42]">
                              {item.count}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCountChange(productId, 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#E6E6E6] text-[#23A6F0]"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-right font-semibold text-[#252B42]">
                          {formatPrice(product.price)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemove(productId)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] border border-[#E6E6E6] text-[#737373] hover:text-[#E77C40]"
                            aria-label="Ürünü sil"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="flex items-center justify-end gap-6 border-t border-[#E6E6E6] px-6 py-4">
                <span className="text-sm text-[#737373]">
                  Seçili ürün adedi: {totals.count}
                </span>
                <span className="text-lg font-semibold text-[#252B42]">
                  Toplam: {formatPrice(totals.amount)}
                </span>
              </div>
            </div>
            <aside className="w-full max-w-full lg:w-[320px]">
              <div className="rounded-[10px] border border-[#E6E6E6] bg-white p-5">
                <h2 className="text-lg font-semibold text-[#252B42]">
                  Sipariş Özeti
                </h2>
                <div className="mt-4 flex flex-col gap-3 text-sm text-[#737373]">
                  <div className="flex items-center justify-between">
                    <span>Ürünlerin Toplamı</span>
                    <span className="font-semibold text-[#252B42]">
                      {formatPrice(totals.amount)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Kargo Toplam</span>
                    <span className="font-semibold text-[#252B42]">
                      {formatPrice(shippingFee)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>İndirim</span>
                    <span className="font-semibold text-[#E77C40]">
                      -{formatPrice(shippingDiscount)}
                    </span>
                  </div>
                  <div className="h-px w-full bg-[#E6E6E6]" />
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold text-[#252B42]">Toplam</span>
                    <span className="font-bold text-[#252B42]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/create-order"
                className="mt-4 flex w-full items-center justify-center rounded-[10px] bg-[#23A6F0] px-4 py-3 text-sm font-semibold text-white"
              >
                Create Order
              </Link>
            </aside>
          </div>
        )}
      </div>
    </section>
  )
}

