import { useEffect, useMemo, useState } from 'react'
import md5 from 'blueimp-md5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'
import { setAuthToken } from '../api/axios'
import { setUser } from '../store/actions/clientActions'
import { setFilter } from '../store/actions/productActions'
import { fetchCategoriesIfNeeded } from '../store/thunks/productThunks'

const normalizeText = (value) =>
  value
    .toLowerCase()
    .replace(/[çÇ]/g, 'c')
    .replace(/[ğĞ]/g, 'g')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[şŞ]/g, 's')
    .replace(/[üÜ]/g, 'u')

const toSlug = (value) =>
  normalizeText(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const getCategoryName = (category) =>
  category?.title || category?.name || category?.category || 'Category'

const getCategoryId = (category) =>
  category?.id ?? category?.category_id ?? category?._id ?? ''

const getGenderSlug = (category) => {
  const raw = String(
    category?.gender ?? category?.gender_code ?? category?.code ?? ''
  ).toLowerCase()
  if (
    raw.includes('kadin') ||
    raw.includes('women') ||
    raw.includes('woman') ||
    raw === 'f' ||
    raw === 'female' ||
    raw === 'k' ||
    raw.startsWith('k:')
  ) {
    return 'kadin'
  }
  if (
    raw.includes('erkek') ||
    raw.includes('men') ||
    raw.includes('man') ||
    raw === 'm' ||
    raw === 'male' ||
    raw === 'e' ||
    raw.startsWith('e:')
  ) {
    return 'erkek'
  }
  return 'kadin'
}

const buildCategoryLink = (category) => {
  const name = getCategoryName(category)
  const slug = toSlug(name)
  const gender = getGenderSlug(category)
  const id = getCategoryId(category) || '0'
  return `/shop/${gender}/${slug}/${id}`
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.client.user)
  const categories = useSelector((state) => state.product.categories)
  const cart = useSelector((state) => state.shoppingCart.cart)
  const userEmail = user?.email?.trim()
  const userName = user?.name || userEmail
  const gravatarUrl = userEmail
    ? `https://www.gravatar.com/avatar/${md5(
        userEmail.toLowerCase()
      )}?s=48&d=identicon`
    : ''
  const handleLogout = () => {
    localStorage.removeItem('token')
    setAuthToken('')
    dispatch(setUser(null))
  }

  const runSearch = () => {
    dispatch(setFilter(searchValue.trim()))
    navigate('/shop')
    setIsSearchOpen(false)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    runSearch()
  }

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded())
  }, [dispatch])

  const groupedCategories = useMemo(() => {
    const fromApi = (gender) =>
      categories
        .filter((category) => getGenderSlug(category) === gender)
        .map((category) => ({
          name: getCategoryName(category),
          link: buildCategoryLink(category),
          rating: Number(category?.rating ?? 0),
        }))
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)

    return {
      kadin: fromApi('kadin'),
      erkek: fromApi('erkek'),
    }
  }, [categories])

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.count || 0), 0),
    [cart]
  )

  return (
    <header className="relative z-40 flex w-full flex-col">
      <div className="hidden h-[58px] w-full items-center bg-[#252B42] text-white md:flex">
        <div className="mx-auto flex h-[46px] w-full max-w-[1439px] items-center">
          <div className="flex w-[1438px] items-center justify-between pl-[24px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
            <div className="flex w-[415px] items-center gap-[10px]">
              <div className="flex h-[44px] items-center gap-[5px]">
                <Phone className="h-[16px] w-[16px]" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex h-[44px] items-center gap-[5px]">
                <Mail className="h-[16px] w-[16px]" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>
            <div className="flex w-[332px] items-center justify-center">
              <span>Follow Us and get a chance to win 80% off</span>
            </div>
            <div className="flex w-[233px] items-center gap-[10px]">
              <span>Follow Us :</span>
              <div className="flex h-[26px] w-[120px] items-center gap-[10px]">
                <Facebook className="h-[16px] w-[16px]" />
                <Instagram className="h-[16px] w-[16px]" />
                <Twitter className="h-[16px] w-[16px]" />
                <Youtube className="h-[16px] w-[16px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1439px] flex-col">
        <div className="flex h-[108px] w-full items-center md:h-[78px]">
          <div className="flex w-full items-center justify-between px-[35px] md:px-[38px]">
            <div className="flex w-[187px] items-center">
              <Link
                to="/"
                className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]"
              >
                Bandage
              </Link>
            </div>

            <nav className="hidden h-[78px] w-[361px] items-center gap-[15px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] md:flex">
              <Link to="/">Home</Link>
              <div className="group relative flex items-center">
                <Link
                  to="/shop"
                  className="flex items-center gap-[5px] text-[#252B42]"
                >
                  Shop
                  <ChevronDown className="h-[10px] w-[6px]" />
                </Link>
                <div className="invisible absolute left-0 top-full z-20 mt-0 min-w-[320px] rounded-[5px] border border-[#E6E6E6] bg-white p-[20px] opacity-0 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)] transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="flex gap-[32px]">
                    <div className="flex flex-col gap-[10px]">
                      <span className="text-sm font-bold text-[#252B42]">
                        Kadin
                      </span>
                      {groupedCategories.kadin.length === 0 ? (
                        <span className="text-sm text-[#737373]">
                          No categories
                        </span>
                      ) : (
                        groupedCategories.kadin.map((category, index) => (
                          <Link
                            key={`kadin-${index}`}
                            to={category.link}
                            className="text-sm text-[#737373] hover:text-[#23A6F0]"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                    <div className="flex flex-col gap-[10px]">
                      <span className="text-sm font-bold text-[#252B42]">
                        Erkek
                      </span>
                      {groupedCategories.erkek.length === 0 ? (
                        <span className="text-sm text-[#737373]">
                          No categories
                        </span>
                      ) : (
                        groupedCategories.erkek.map((category, index) => (
                          <Link
                            key={`erkek-${index}`}
                            to={category.link}
                            className="text-sm text-[#737373] hover:text-[#23A6F0]"
                          >
                            {category.name}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <Link to="/about">About</Link>
              <Link to="/">Blog</Link>
              <Link to="/contact">Contact</Link>
              <div className="group relative flex items-center">
                <div className="flex items-center gap-[5px] text-[#737373] group-hover:text-[#252B42]">
                  <span>Pages</span>
                  <ChevronDown className="h-[10px] w-[6px]" />
                </div>
                <div className="absolute left-0 top-full z-20 mt-[10px] w-[160px] rounded-[5px] border border-[#E6E6E6] bg-white py-[10px] opacity-0 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)] transition-opacity duration-200 group-hover:opacity-100">
                  <Link
                    to="/team"
                    className="flex w-full px-[16px] py-[8px] text-[#252B42] hover:text-[#23A6F0]"
                  >
                    Team
                  </Link>
                </div>
              </div>
            </nav>

            <div className="flex h-[54px] w-auto items-center justify-end gap-[24px] text-[#252B42] md:gap-[10px] md:text-[#23A6F0]">
              {userEmail ? (
                <div className="group relative hidden items-center md:flex">
                  <button
                    type="button"
                    className="flex items-center gap-3 text-left"
                  >
                    <img
                      src={gravatarUrl}
                      alt={userName || 'User'}
                      className="h-10 w-10 rounded-full border border-[#E6E6E6] object-cover"
                    />
                    <div className="flex flex-col text-left text-[#252B42]">
                      <span className="text-sm font-bold leading-[20px]">
                        {userName}
                      </span>
                      <span className="text-xs text-[#737373]">{userEmail}</span>
                    </div>
                  </button>
                  <div className="absolute left-0 top-full h-[12px] w-full" />
                  <div className="invisible absolute left-0 top-full z-30 mt-0 w-[180px] rounded-[6px] border border-[#E6E6E6] bg-white p-2 opacity-0 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)] transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                    <Link
                      to="/orders"
                      className="flex w-full items-center justify-start rounded-[6px] px-3 py-2 text-sm font-semibold text-[#252B42] hover:bg-[#F7F7F7]"
                    >
                      Siparişlerim
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-start rounded-[6px] px-3 py-2 text-sm font-semibold text-[#252B42] hover:bg-[#F7F7F7]"
                    >
                      Çıkış Yap
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="hidden h-[54px] w-[166px] items-center justify-center gap-[5px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] md:flex"
                >
                  <User className="h-[12px] w-[12px]" />
                  Login / Register
                </Link>
              )}
              <div className="relative hidden items-center md:flex">
                {isSearchOpen && (
                  <form
                    onSubmit={handleSearchSubmit}
                    className="absolute right-0 top-full z-50 mt-2 flex items-center"
                  >
                    <input
                      value={searchValue}
                      onChange={(event) => setSearchValue(event.target.value)}
                      placeholder="Search products"
                      className="h-[36px] w-[180px] rounded-[6px] border border-[#E6E6E6] bg-white px-3 text-sm text-[#252B42]"
                    />
                  </form>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (isSearchOpen && searchValue.trim()) {
                      runSearch()
                      return
                    }
                    setIsSearchOpen((prev) => !prev)
                  }}
                  className="flex h-[46px] w-[46px] items-center justify-center"
                >
                  <Search className="h-[16px] w-[16px]" />
                </button>
              </div>
              
              <div className="group relative hidden md:flex">
                <button
                  type="button"
                  className="flex h-[46px] w-[56px] items-center justify-center gap-[5px]"
                >
                  <ShoppingCart className="h-[16px] w-[16px]" />
                  <span className="text-xs font-semibold">{cartCount}</span>
                </button>
                <div className="invisible absolute right-0 top-full z-30 mt-0 w-[320px] rounded-[6px] border border-[#E6E6E6] bg-white p-[16px] opacity-0 shadow-[0_13px_19px_0_rgba(0,0,0,0.07)] transition-opacity duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="mb-3 text-sm font-semibold text-[#252B42]">
                    Sepetim ({cartCount} Ürün)
                  </div>
                  <div className="flex max-h-[280px] flex-col gap-[12px] overflow-auto">
                    {cart.length === 0 ? (
                      <div className="text-sm text-[#737373]">
                        Sepetiniz boş.
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div
                          key={item.product?.id}
                          className="flex items-center gap-[10px] border-b border-[#F0F0F0] pb-[10px] last:border-b-0 last:pb-0"
                        >
                          <div className="h-[60px] w-[60px] overflow-hidden rounded-[6px] border border-[#F0F0F0]">
                            <img
                              src={
                                item.product?.images?.[0]?.url ||
                                item.product?.image
                              }
                              alt={item.product?.name || 'Product'}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col gap-[4px] text-sm">
                            <span className="font-semibold text-[#252B42]">
                              {item.product?.name || 'Product'}
                            </span>
                            <span className="text-xs text-[#737373]">
                              Adet: {item.count}
                            </span>
                            <span className="text-xs font-semibold text-[#E77C40]">
                              {item.product?.price
                                ? `${item.product.price} TL`
                                : '--'}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="mt-4 flex items-center gap-[10px]">
                    <Link
                      to="/cart"
                      className="flex h-[36px] flex-1 items-center justify-center rounded-[6px] border border-[#E6E6E6] text-xs font-semibold text-[#252B42]"
                    >
                      Sepete Git
                    </Link>
                    <Link
                      to="/create-order"
                      className="flex h-[36px] flex-1 items-center justify-center rounded-[6px] bg-[#23A6F0] text-xs font-semibold text-white"
                    >
                      Siparişi Tamamla
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/cart"
                className="flex h-[24px] w-[24px] items-center justify-center md:hidden"
              >
                <ShoppingCart className="h-[22px] w-[24px]" />
              </Link>
              <button
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-[14px] w-[24px] items-center justify-center md:hidden"
              >
                <Menu className="h-[14px] w-[24px]" />
              </button>
              <button
                type="button"
                className="hidden h-[46px] w-[56px] items-center justify-center gap-[5px] md:flex"
              >
                <Heart className="h-[16px] w-[16px]" />
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`flex w-full justify-center overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'max-h-[520px] pb-[30px] opacity-100'
              : 'max-h-0 pb-0 opacity-0'
          }`}
        >
          <div className="flex w-full flex-col items-center gap-[20px]">
            <nav className="flex w-[200px] flex-col items-center gap-[18px] font-['Montserrat'] text-[24px] font-normal leading-[36px] text-[#737373]">
              <Link to="/">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About</Link>
              <Link to="/">Blog</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/team">Team</Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

