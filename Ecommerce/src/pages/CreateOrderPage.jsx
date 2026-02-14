import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import apiClient, { setAuthToken } from '../api/axios'
import { setCart } from '../store/actions/shoppingCartActions'

const cityOptions = [
  'Adana',
  'Adiyaman',
  'Afyonkarahisar',
  'Agri',
  'Aksaray',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydin',
  'Balikesir',
  'Bartin',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingol',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Canakkale',
  'Cankiri',
  'Corum',
  'Denizli',
  'Diyarbakir',
  'Duzce',
  'Edirne',
  'Elazig',
  'Erzincan',
  'Erzurum',
  'Eskisehir',
  'Gaziantep',
  'Giresun',
  'Gumushane',
  'Hakkari',
  'Hatay',
  'Igdir',
  'Isparta',
  'Istanbul',
  'Izmir',
  'Kahramanmaras',
  'Karabuk',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kilis',
  'Kirikkale',
  'Kirklareli',
  'Kirsehir',
  'Kocaeli',
  'Konya',
  'Kutahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Mugla',
  'Mus',
  'Nevsehir',
  'Nigde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Sanliurfa',
  'Siirt',
  'Sinop',
  'Sirnak',
  'Sivas',
  'Tekirdag',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Usak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak',
]

const emptyForm = {
  title: '',
  name: '',
  surname: '',
  phone: '',
  city: '',
  district: '',
  neighborhood: '',
}

const emptyCardForm = {
  card_no: '',
  expire_month: '',
  expire_year: '',
  name_on_card: '',
}

const formatPrice = (value) => {
  const amount = Number(value) || 0
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(amount)
}

const maskCardNumber = (value = '') => {
  const digits = String(value).replace(/\D/g, '')
  if (digits.length < 8) {
    return digits
  }
  return `${digits.slice(0, 4)} **** **** ${digits.slice(-4)}`
}

function CreateOrderPage() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.shoppingCart.cart)
  const [step, setStep] = useState(1)
  const [addresses, setAddresses] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [shippingAddressId, setShippingAddressId] = useState(null)
  const [receiptAddressId, setReceiptAddressId] = useState(null)
  const [cards, setCards] = useState([])
  const [cardError, setCardError] = useState('')
  const [cardLoading, setCardLoading] = useState(false)
  const [isCardFormOpen, setIsCardFormOpen] = useState(false)
  const [cardEditingId, setCardEditingId] = useState(null)
  const [cardForm, setCardForm] = useState(emptyCardForm)
  const [selectedCardId, setSelectedCardId] = useState(null)
  const [cardCcv, setCardCcv] = useState('')
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false)

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

  const baseShipping = 29.99
  const shippingFee = totals.amount > 0 ? baseShipping : 0
  const shippingDiscount = totals.amount >= 150 ? shippingFee : 0
  const shippingPay = shippingFee - shippingDiscount
  const grandTotal = totals.amount + shippingPay
  const selectedProducts = useMemo(
    () => cart.filter((item) => item.checked),
    [cart]
  )

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setAuthToken(token)
    }
  }, [])

  const fetchAddresses = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await apiClient.get('/user/address')
      const data = Array.isArray(response.data) ? response.data : []
      setAddresses(data)
      if (data.length > 0) {
        setShippingAddressId((prev) => prev ?? data[0].id)
        setReceiptAddressId((prev) => prev ?? data[0].id)
      }
    } catch (err) {
      console.error('Failed to fetch address list', err)
      setError('Adresler alınamadı.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchCards = async () => {
    setCardLoading(true)
    setCardError('')
    try {
      const response = await apiClient.get('/user/card')
      const data = Array.isArray(response.data) ? response.data : []
      setCards(data)
      if (data.length > 0) {
        setSelectedCardId((prev) => prev ?? data[0].id)
      }
    } catch (err) {
      console.error('Failed to fetch card list', err)
      setCardError('Kartlar alınamadı.')
    } finally {
      setCardLoading(false)
    }
  }

  useEffect(() => {
    fetchCards()
  }, [])

  const openNewForm = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setIsFormOpen(true)
  }

  const openEditForm = (address) => {
    setEditingId(address.id)
    setFormData({
      title: address.title || '',
      name: address.name || '',
      surname: address.surname || '',
      phone: address.phone || '',
      city: address.city || '',
      district: address.district || '',
      neighborhood: address.neighborhood || '',
    })
    setIsFormOpen(true)
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardChange = (event) => {
    const { name, value } = event.target
    setCardForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()
    setError('')
    try {
      if (editingId) {
        await apiClient.put('/user/address', { id: editingId, ...formData })
      } else {
        await apiClient.post('/user/address', formData)
      }
      setIsFormOpen(false)
      setEditingId(null)
      setFormData(emptyForm)
      fetchAddresses()
    } catch (err) {
      console.error('Failed to save address', err)
      setError('Adres kaydedilemedi.')
    }
  }

  const handleDelete = async (addressId) => {
    setError('')
    try {
      await apiClient.delete(`/user/address/${addressId}`)
      setAddresses((prev) => prev.filter((item) => item.id !== addressId))
      if (shippingAddressId === addressId) {
        setShippingAddressId(null)
      }
      if (receiptAddressId === addressId) {
        setReceiptAddressId(null)
      }
    } catch (err) {
      console.error('Failed to delete address', err)
      setError('Adres silinemedi.')
    }
  }

  const openNewCardForm = () => {
    setCardEditingId(null)
    setCardForm(emptyCardForm)
    setIsCardFormOpen(true)
  }

  const openEditCardForm = (card) => {
    setCardEditingId(card.id)
    setCardForm({
      card_no: card.card_no || '',
      expire_month: card.expire_month || '',
      expire_year: card.expire_year || '',
      name_on_card: card.name_on_card || '',
    })
    setIsCardFormOpen(true)
  }

  const handleCardSubmit = async (event) => {
    event.preventDefault()
    setCardError('')
    try {
      if (cardEditingId) {
        await apiClient.put('/user/card', {
          id: String(cardEditingId),
          card_no: cardForm.card_no,
          expire_month: Number(cardForm.expire_month),
          expire_year: Number(cardForm.expire_year),
          name_on_card: cardForm.name_on_card,
        })
      } else {
        await apiClient.post('/user/card', {
          card_no: cardForm.card_no,
          expire_month: Number(cardForm.expire_month),
          expire_year: Number(cardForm.expire_year),
          name_on_card: cardForm.name_on_card,
        })
      }
      setIsCardFormOpen(false)
      setCardEditingId(null)
      setCardForm(emptyCardForm)
      fetchCards()
    } catch (err) {
      console.error('Failed to save card', err)
      setCardError('Kart kaydedilemedi.')
    }
  }

  const handleDeleteCard = async (cardId) => {
    setCardError('')
    try {
      await apiClient.delete(`/user/card/${cardId}`)
      setCards((prev) => prev.filter((item) => item.id !== cardId))
      if (selectedCardId === cardId) {
        setSelectedCardId(null)
      }
    } catch (err) {
      console.error('Failed to delete card', err)
      setCardError('Kart silinemedi.')
    }
  }

  const handleCreateOrder = async () => {
    const selectedCard = cards.find((card) => card.id === selectedCardId)
    if (!shippingAddressId) {
      toast.error('Lütfen teslimat adresi seçin.')
      return
    }
    if (!selectedCard) {
      toast.error('Lütfen bir kart seçin.')
      return
    }
    if (!cardCcv) {
      toast.error('Lütfen kart güvenlik kodunu (CVV) girin.')
      return
    }
    if (selectedProducts.length === 0) {
      toast.error('Sipariş için en az bir ürün seçin.')
      return
    }

    const payload = {
      address_id: shippingAddressId,
      order_date: new Date().toISOString(),
      card_no: Number(selectedCard.card_no),
      card_name: selectedCard.name_on_card,
      card_expire_month: Number(selectedCard.expire_month),
      card_expire_year: Number(selectedCard.expire_year),
      card_ccv: Number(cardCcv),
      price: Number(grandTotal.toFixed(2)),
      products: selectedProducts.map((item) => ({
        product_id: item.product?.id,
        count: item.count,
        detail: item.product?.description || '',
      })),
    }

    setIsSubmittingOrder(true)
    try {
      await apiClient.post('/order', payload)
      toast.success('Siparişiniz oluşturuldu. Tebrikler!')
      dispatch(setCart([]))
      setSelectedCardId(null)
      setCardCcv('')
      setShippingAddressId(null)
      setReceiptAddressId(null)
    } catch (err) {
      console.error('Failed to create order', err)
      toast.error('Sipariş oluşturulamadı.')
    } finally {
      setIsSubmittingOrder(false)
    }
  }

  const handleContinueToPayment = () => {
    setStep(2)
  }

  const handleStepChange = (nextStep) => {
    setStep(nextStep)
  }

  return (
    <section className="w-full bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex-1">
            <div className="rounded-[10px] border border-[#E6E6E6] bg-white">
              <div className="flex items-center gap-4 border-b border-[#E6E6E6] px-6 py-4">
                <button
                  type="button"
                  onClick={() => handleStepChange(1)}
                  className={`flex items-center gap-2 transition-colors ${
                    step === 1 ? 'text-[#23A6F0]' : 'text-[#BDBDBD]'
                  }`}
                >
                  <span className="text-lg font-bold">1</span>
                  <span className="text-base font-semibold">
                    Adres Bilgileri
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleStepChange(2)}
                  className={`flex items-center gap-2 transition-colors ${
                    step === 2 ? 'text-[#23A6F0]' : 'text-[#BDBDBD]'
                  }`}
                >
                  <span className="text-lg font-bold">2</span>
                  <span className="text-base font-semibold">
                    Ödeme Seçenekleri
                  </span>
                </button>
              </div>

              <div
                className={`px-6 py-5 transition-opacity ${
                  step === 2 ? 'hidden' : 'block'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-[#252B42]">
                    Adresler
                  </h2>
                  <button
                    type="button"
                    onClick={openNewForm}
                    disabled={step === 2}
                    className="rounded-[8px] border border-[#23A6F0] px-4 py-2 text-sm font-semibold text-[#23A6F0]"
                  >
                    Add Address
                  </button>
                </div>

                {error ? (
                  <div className="mt-4 rounded-[8px] border border-[#FFE0E0] bg-[#FFF5F5] px-4 py-3 text-sm text-[#D64545]">
                    {error}
                  </div>
                ) : null}

                {isLoading ? (
                  <div className="mt-4 text-sm text-[#737373]">
                    Yükleniyor...
                  </div>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {addresses.length === 0 ? (
                      <div className="text-sm text-[#737373]">
                        Kayıtlı adres bulunamadı.
                      </div>
                    ) : (
                      addresses.map((address) => (
                        <div
                          key={address.id}
                          className="rounded-[10px] border border-[#E6E6E6] p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-semibold text-[#252B42]">
                                {address.title}
                              </div>
                              <div className="text-xs text-[#737373]">
                                {address.name} {address.surname}
                              </div>
                              <div className="text-xs text-[#737373]">
                                {address.phone}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <button
                                type="button"
                                onClick={() => openEditForm(address)}
                                className="text-[#23A6F0]"
                              >
                                Düzenle
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(address.id)}
                                className="text-[#E77C40]"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-[#737373]">
                            {address.city} / {address.district}
                          </div>
                          <div className="text-xs text-[#737373]">
                            {address.neighborhood}
                          </div>

                          <div className="mt-4 flex flex-col gap-2 text-xs text-[#737373]">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="shippingAddress"
                                checked={shippingAddressId === address.id}
                                onChange={() =>
                                  setShippingAddressId(address.id)
                                }
                                disabled={step === 2}
                              />
                              Teslimat adresi
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="receiptAddress"
                                checked={receiptAddressId === address.id}
                                onChange={() =>
                                  setReceiptAddressId(address.id)
                                }
                                disabled={step === 2}
                              />
                              Fatura adresi
                            </label>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {isFormOpen && step === 1 ? (
              <form
                className="mt-6 rounded-[10px] border border-[#E6E6E6] bg-white p-6"
                onSubmit={handleFormSubmit}
              >
                <h3 className="text-lg font-semibold text-[#252B42]">
                  {editingId ? 'Adres Güncelle' : 'Yeni Adres'}
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <label className="text-sm text-[#737373]">
                    Address Title
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      required
                    />
                  </label>
                  <label className="text-sm text-[#737373]">
                    Name & Surname
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      placeholder="Ad"
                      required
                    />
                  </label>
                  <label className="text-sm text-[#737373]">
                    Surname
                    <input
                      name="surname"
                      value={formData.surname}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      required
                    />
                  </label>
                  <label className="text-sm text-[#737373]">
                    Phone
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      placeholder="0537..."
                      required
                    />
                  </label>
                  <label className="text-sm text-[#737373]">
                    City (İl)
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      required
                    >
                      <option value="">Seçiniz</option>
                      {cityOptions.map((city) => (
                        <option key={city} value={city.toLowerCase()}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-sm text-[#737373]">
                    District (İlçe)
                    <input
                      name="district"
                      value={formData.district}
                      onChange={handleFormChange}
                      className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      required
                    />
                  </label>
                  <label className="text-sm text-[#737373] md:col-span-2">
                    Neighborhood (Mahalle) / Address
                    <textarea
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleFormChange}
                      className="mt-2 h-[110px] w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                      required
                    />
                  </label>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-[8px] bg-[#23A6F0] px-4 py-2 text-sm font-semibold text-white"
                  >
                    {editingId ? 'Update Address' : 'Save Address'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="rounded-[8px] border border-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#252B42]"
                  >
                    Vazgeç
                  </button>
                </div>
              </form>
            ) : null}

            {step === 2 ? (
              <div className="mt-6 rounded-[10px] border border-[#E6E6E6] bg-white p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#252B42]">
                    Ödeme Seçenekleri
                  </h3>
                  <button
                    type="button"
                    onClick={openNewCardForm}
                    className="rounded-[8px] border border-[#23A6F0] px-4 py-2 text-sm font-semibold text-[#23A6F0]"
                  >
                    Add New Card
                  </button>
                </div>

                {cardError ? (
                  <div className="mt-4 rounded-[8px] border border-[#FFE0E0] bg-[#FFF5F5] px-4 py-3 text-sm text-[#D64545]">
                    {cardError}
                  </div>
                ) : null}

                {cardLoading ? (
                  <div className="mt-4 text-sm text-[#737373]">
                    Yükleniyor...
                  </div>
                ) : (
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {cards.length === 0 ? (
                      <div className="text-sm text-[#737373]">
                        Kayıtlı kart bulunamadı.
                      </div>
                    ) : (
                      cards.map((card) => (
                        <label
                          key={card.id}
                          className="flex cursor-pointer flex-col gap-2 rounded-[10px] border border-[#E6E6E6] p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm font-semibold text-[#252B42]">
                              <input
                                type="radio"
                                name="selectedCard"
                                checked={selectedCardId === card.id}
                                onChange={() => setSelectedCardId(card.id)}
                              />
                              {card.name_on_card || 'Kart'}
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault()
                                  openEditCardForm(card)
                                }}
                                className="text-[#23A6F0]"
                              >
                                Düzenle
                              </button>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.preventDefault()
                                  handleDeleteCard(card.id)
                                }}
                                className="text-[#E77C40]"
                              >
                                Sil
                              </button>
                            </div>
                          </div>
                          <div className="text-sm text-[#252B42]">
                            {maskCardNumber(card.card_no)}
                          </div>
                          <div className="text-xs text-[#737373]">
                            {card.expire_month}/{card.expire_year}
                          </div>
                        </label>
                      ))
                    )}
                  </div>
                )}

                {isCardFormOpen ? (
                  <form
                    className="mt-6 rounded-[10px] border border-[#E6E6E6] bg-[#FAFAFA] p-5"
                    onSubmit={handleCardSubmit}
                  >
                    <h4 className="text-base font-semibold text-[#252B42]">
                      {cardEditingId ? 'Kart Güncelle' : 'Yeni Kart'}
                    </h4>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                      <label className="text-sm text-[#737373] md:col-span-2">
                        Kart Numarası
                        <input
                          name="card_no"
                          value={cardForm.card_no}
                          onChange={handleCardChange}
                          className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                          placeholder="1234123412341234"
                          required
                        />
                      </label>
                      <label className="text-sm text-[#737373] md:col-span-2">
                        Kart Üzerindeki İsim
                        <input
                          name="name_on_card"
                          value={cardForm.name_on_card}
                          onChange={handleCardChange}
                          className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                          required
                        />
                      </label>
                      <label className="text-sm text-[#737373]">
                        Ay
                        <input
                          name="expire_month"
                          value={cardForm.expire_month}
                          onChange={handleCardChange}
                          className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                          placeholder="12"
                          required
                        />
                      </label>
                      <label className="text-sm text-[#737373]">
                        Yıl
                        <input
                          name="expire_year"
                          value={cardForm.expire_year}
                          onChange={handleCardChange}
                          className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                          placeholder="2025"
                          required
                        />
                      </label>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="submit"
                        className="rounded-[8px] bg-[#23A6F0] px-4 py-2 text-sm font-semibold text-white"
                      >
                        {cardEditingId ? 'Update Card' : 'Save Card'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsCardFormOpen(false)}
                        className="rounded-[8px] border border-[#E6E6E6] px-4 py-2 text-sm font-semibold text-[#252B42]"
                      >
                        Vazgeç
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            ) : null}
          </div>

          <aside className="w-full max-w-full lg:w-[320px]">
            {step === 2 ? (
              <div className="mb-4 rounded-[10px] border border-[#E6E6E6] bg-white p-5">
                <h3 className="text-base font-semibold text-[#252B42]">
                  Kart Güvenliği
                </h3>
                <label className="mt-3 block text-sm text-[#737373]">
                  CVV
                  <input
                    value={cardCcv}
                    onChange={(event) => setCardCcv(event.target.value)}
                    className="mt-2 w-full rounded-[8px] border border-[#E6E6E6] px-3 py-2 text-sm text-[#252B42]"
                    placeholder="123"
                  />
                </label>
              </div>
            ) : null}
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
            <button
              type="button"
              onClick={step === 1 ? handleContinueToPayment : handleCreateOrder}
              disabled={step === 2 && isSubmittingOrder}
              className="mt-4 flex w-full items-center justify-center rounded-[10px] bg-[#23A6F0] px-4 py-3 text-sm font-semibold text-white disabled:opacity-60"
            >
              {step === 1 ? 'Kaydet ve Devam Et' : 'Ödeme Yap'}
            </button>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default CreateOrderPage

