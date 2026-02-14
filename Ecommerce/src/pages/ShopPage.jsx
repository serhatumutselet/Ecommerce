import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronDown, ChevronRight, LayoutGrid, List } from 'lucide-react'
import apiClient from '../api/axios'
import editorsPickMen from '../assets/Editors Pick/Men.png'
import editorsPickWomen from '../assets/Editors Pick/Women.png'
import editorsPickAccessories from '../assets/Editors Pick/Accesories.png'
import editorsPickKids from '../assets/Editors Pick/Kids.png'
import bestsellerOne from '../assets/Bestseller Products/1.png'
import bestsellerTwo from '../assets/Bestseller Products/2.png'
import bestsellerThree from '../assets/Bestseller Products/3.png'
import bestsellerFour from '../assets/Bestseller Products/4.png'
import bestsellerFive from '../assets/Bestseller Products/5.png'
import bestsellerSix from '../assets/Bestseller Products/6.png'
import bestsellerSeven from '../assets/Bestseller Products/7.png'
import bestsellerEight from '../assets/Bestseller Products/8.png'
import hooliLogo from '../assets/Company Logos/hooli.png'
import lyftLogo from '../assets/Company Logos/lyft.png'
import leafLogo from '../assets/Company Logos/leaf.png'
import stripeLogo from '../assets/Company Logos/stripe.png'
import awsLogo from '../assets/Company Logos/aws.png'
import redditLogo from '../assets/Company Logos/reddit.png'
import { setFilter, setSort } from '../store/actions/productActions'
import { fetchCategoriesIfNeeded, fetchProducts } from '../store/thunks/productThunks'

const categoryImages = [
  editorsPickMen,
  editorsPickWomen,
  editorsPickAccessories,
  editorsPickKids,
  bestsellerOne,
]

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
  const values = [
    category?.gender,
    category?.gender_code,
    category?.code,
  ].map((value) => String(value || '').toLowerCase())
  const isFemale = values.some(
    (raw) =>
      raw.includes('kadin') ||
      raw.includes('women') ||
      raw.includes('woman') ||
      raw === 'f' ||
      raw === 'female' ||
      raw === 'k' ||
      raw.startsWith('k:')
  )
  if (isFemale) {
    return 'kadin'
  }
  const isMale = values.some(
    (raw) =>
      raw.includes('erkek') ||
      raw.includes('men') ||
      raw.includes('man') ||
      raw === 'm' ||
      raw === 'male' ||
      raw === 'e' ||
      raw.startsWith('e:')
  )
  if (isMale) {
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

const getProductCategoryId = (product) =>
  product?.category_id ?? product?.category?.id ?? product?.categoryId

const buildProductLink = (product, categories) => {
  const productName = product?.name || product?.title || 'product'
  const productSlug = toSlug(productName)
  const productId = product?.id ?? product?.product_id ?? product?.productId
  const categoryId = getProductCategoryId(product)
  const category =
    categories.find((item) => getCategoryId(item) === categoryId) || {}
  const categorySlug = toSlug(getCategoryName(category))
  const gender = getGenderSlug(category)

  return `/shop/${gender}/${categorySlug}/${categoryId || 0}/${productSlug}/${productId}`
}

const productImages = [
  bestsellerOne,
  bestsellerTwo,
  bestsellerThree,
  bestsellerFour,
  bestsellerFive,
  bestsellerSix,
  bestsellerSeven,
  bestsellerEight,
]

const getProductImage = (product, index) =>
  product?.images?.[0]?.url ||
  product?.image ||
  productImages[index % productImages.length]

const clientLogos = [
  { src: hooliLogo, alt: 'Hooli', width: 103, height: 34 },
  { src: lyftLogo, alt: 'Lyft', width: 83, height: 59 },
  { src: leafLogo, alt: 'Leaf', width: 102, height: 75 },
  { src: stripeLogo, alt: 'Stripe', width: 103, height: 42 },
  { src: awsLogo, alt: 'AWS', width: 104, height: 62 },
  { src: redditLogo, alt: 'Reddit', width: 76, height: 72 },
]

export default function ShopPage() {
  const { categoryId } = useParams()
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.product.categories)
  const productList = useSelector((state) => state.product.productList)
  const total = useSelector((state) => state.product.total)
  const fetchState = useSelector((state) => state.product.fetchState)
  const filterValue = useSelector((state) => state.product.filter)
  const sortValue = useSelector((state) => state.product.sort)
  const limit = useSelector((state) => state.product.limit)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortSelection, setSortSelection] = useState(sortValue || '')
  const [categoryCounts, setCategoryCounts] = useState({})
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const paginatedProducts = productList

  const visiblePages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages = [1]
    const left = Math.max(2, currentPage - 1)
    const right = Math.min(totalPages - 1, currentPage + 1)

    if (left > 2) {
      pages.push('ellipsis-left')
    }

    for (let page = left; page <= right; page += 1) {
      pages.push(page)
    }

    if (right < totalPages - 1) {
      pages.push('ellipsis-right')
    }

    pages.push(totalPages)
    return pages
  }, [currentPage, totalPages])

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded())
  }, [dispatch])

  useEffect(() => {
    setSortSelection(sortValue || '')
  }, [sortValue])

  useEffect(() => {
    const normalizedCategoryId =
      categoryId && categoryId !== '0' ? categoryId : ''
    const normalizedFilter = filterValue?.trim() || ''
    const normalizedSort = sortValue || ''
    const offset = (currentPage - 1) * limit

    dispatch(
      fetchProducts({
        categoryId: normalizedCategoryId,
        filter: normalizedFilter,
        sort: normalizedSort,
        limit,
        offset,
      })
    )
  }, [dispatch, categoryId, filterValue, sortValue, currentPage, limit])

  useEffect(() => {
    setCurrentPage(1)
  }, [categoryId, filterValue, sortValue, limit])

  const topCategories = useMemo(() => {
    const ranked = categories.map((category) => ({
      category,
      count: categoryCounts[getCategoryId(category)] || 0,
    }))
    ranked.sort((a, b) => b.count - a.count)
    return ranked.slice(0, 5).map((item) => item.category)
  }, [categories, categoryCounts])

  useEffect(() => {
    let isCancelled = false

    const fetchCategoryCounts = async () => {
      if (categories.length === 0) {
        setCategoryCounts({})
        return
      }
      try {
        const limit = 100
        let offset = 0
        let total = 0
        const counts = {}

        do {
          const response = await apiClient.get('/products', {
            params: { limit, offset },
          })
          const payload = response.data || {}
          const items = Array.isArray(payload.products) ? payload.products : []
          total = Number(payload.total) || items.length
          items.forEach((product) => {
            const categoryId = getProductCategoryId(product)
            if (!categoryId) {
              return
            }
            counts[categoryId] = (counts[categoryId] || 0) + 1
          })
          offset += limit
        } while (offset < total)

        if (!isCancelled) {
          setCategoryCounts(counts)
        }
      } catch (error) {
        console.error('Failed to fetch category counts', error)
      }
    }

    fetchCategoryCounts()

    return () => {
      isCancelled = true
    }
  }, [categories])

  return (
    <div className="flex w-full flex-col">
      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-6 md:h-[92px] md:px-0 md:py-0">
          <div className="flex w-full flex-col gap-4 md:h-[44px] md:w-[1049px] md:flex-row md:items-center md:justify-between md:gap-[30px]">
            <div className="flex w-full items-center md:h-[32px] md:w-[510px]">
              <h2 className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                Shop
              </h2>
            </div>
            <div className="flex w-full items-center md:h-[44px] md:w-[509px] md:justify-end">
              <div className="flex items-center gap-[15px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
                <Link className="text-[#252B42]" to="/">
                  Home
                </Link>
                <ChevronRight className="h-[16px] w-[9px] text-[#BDBDBD]" />
                <span className="text-[#BDBDBD]">Shop</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-8 md:h-[271px] md:px-0 md:py-0">
          <div className="grid w-full gap-4 md:flex md:h-[223px] md:w-[1088px] md:gap-[15px]">
            {topCategories.length === 0 ? (
              <div className="flex h-[223px] w-full items-center justify-center rounded-[5px] border border-[#E6E6E6] bg-white text-sm text-[#737373]">
                No categories available.
              </div>
            ) : (
              topCategories.map((category, index) => {
                const name = getCategoryName(category)
                const image = categoryImages[index % categoryImages.length]
                return (
                  <Link
                    key={getCategoryId(category) || `${name}-${index}`}
                    to={buildCategoryLink(category)}
                    className="relative w-full overflow-hidden bg-white aspect-[205/223] md:h-[223px] md:w-[205px] md:aspect-auto"
                  >
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#212121] opacity-25" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5px] text-white">
                      <span className="font-['Montserrat'] text-[16px] font-bold leading-[24px] tracking-[0.2px]">
                        {name}
                      </span>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-6 md:h-[98px] md:px-0 md:py-0">
          <div className="flex w-full flex-col gap-4 md:h-[50px] md:w-[1049px] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="flex items-center font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373]">
              <span>Showing all {total || productList.length} results</span>
            </div>
            <div className="flex items-center gap-[15px]">
              <span className="font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373]">
                Views:
              </span>
              <div className="flex items-center gap-[15px]">
                <button
                  type="button"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC]"
                >
                  <LayoutGrid className="h-[14px] w-[14px] text-[#252B42]" />
                </button>
                <button
                  type="button"
                  className="flex h-[46px] w-[46px] items-center justify-center rounded-[5px] border border-[#ECECEC]"
                >
                  <List className="h-[14px] w-[14px] text-[#737373]" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[15px]">
              <input
                type="text"
                value={filterValue}
                onChange={(event) => dispatch(setFilter(event.target.value))}
                placeholder="Filter products"
                className="h-[50px] w-full rounded-[5px] border border-[#DDDDDD] bg-white px-[18px] font-['Montserrat'] text-[14px] font-normal leading-[28px] text-[#737373] md:w-[180px]"
              />
              <div className="relative h-[50px] w-full md:w-[180px]">
                <select
                  className="h-[50px] w-full appearance-none rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] px-[18px] pr-[34px] font-['Montserrat'] text-[14px] font-normal leading-[28px] text-[#737373]"
                  value={sortSelection}
                  onChange={(event) => setSortSelection(event.target.value)}
                >
                  <option value="">Sort</option>
                  <option value="price:asc">price:asc</option>
                  <option value="price:desc">price:desc</option>
                  <option value="rating:asc">rating:asc</option>
                  <option value="rating:desc">rating:desc</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-[18px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#737373]" />
              </div>
              <button
                type="button"
                onClick={() => dispatch(setSort(sortSelection))}
                className="flex h-[50px] w-full items-center justify-center rounded-[5px] bg-[#23A6F0] px-[24px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-white md:w-[94px]"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-10 md:px-0 md:py-[48px]">
          <div className="relative w-full md:w-[1124px]">
            {fetchState === 'FETCHING' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#23A6F0] border-t-transparent" />
              </div>
            )}
            <div className="grid w-full gap-8 md:grid-cols-4 md:gap-x-[30px] md:gap-y-[48px] md:py-[48px]">
              {paginatedProducts.map((product, index) => (
                <Link
                  key={product.id || `product-${index}`}
                  to={buildProductLink(product, categories)}
                  className="flex w-full flex-col bg-white md:h-[488px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-full w-full md:h-[300px]">
                    <img
                      src={getProductImage(product, index)}
                      alt={product?.name || product?.title || 'Product'}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex h-full flex-col items-center gap-[10px] py-[25px] md:h-[188px] md:py-0">
                    <p className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                      {product?.name || product?.title || 'Product'}
                    </p>
                    <p className="font-['Montserrat'] text-[14px] font-normal leading-[24px] text-[#737373]">
                      {product?.category?.name ||
                        product?.category_name ||
                        product?.category ||
                        'Category'}
                    </p>
                    <div className="flex items-center gap-[5px] font-['Montserrat'] text-[16px] font-bold leading-[24px]">
                      <span className="text-[#252B42]">
                        ${product?.price ?? '--'}
                      </span>
                      {product?.discounted_price && (
                        <span className="text-[#252B42]">
                          ${product.discounted_price}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-[6.08px]">
                      <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
                      <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
                      <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
                      <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex justify-center pt-4 md:pt-[0] md:pb-[48px]">
              <div className="inline-flex h-[74px] w-fit overflow-hidden rounded-[6.73px] border border-[#BDBDBD] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex h-full w-[85px] items-center justify-center border-r border-[#BDBDBD] bg-[#F3F3F3] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0] disabled:text-[#BDBDBD] disabled:cursor-not-allowed"
                >
                  Prev
                </button>
                {visiblePages.map((page, index) =>
                  String(page).includes('ellipsis') ? (
                    <span
                      key={`page-ellipsis-${index}`}
                      className="flex h-full w-[49px] items-center justify-center border-r border-[#E9E9E9] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={`page-${page}`}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      aria-current={currentPage === page ? 'page' : undefined}
                      className={`flex h-full items-center justify-center border-r border-[#E9E9E9] font-['Montserrat'] text-[14px] font-bold leading-[24px] cursor-pointer ${
                        page === 1 ? 'w-[46px]' : 'w-[49px]'
                      } ${
                        currentPage === page
                          ? 'bg-[#23A6F0] text-white'
                          : 'text-[#23A6F0]'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="flex h-full w-[85px] items-center justify-center font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0] cursor-pointer disabled:text-[#BDBDBD] disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-10 md:h-[175px] md:px-0 md:py-0">
          <div className="flex w-full flex-wrap items-center justify-center gap-6 md:h-[175px] md:w-[1050px] md:justify-between md:gap-0">
            {clientLogos.map((logo) => (
              <div
                key={logo.alt}
                className="flex h-[72px] w-[151px] items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="object-contain"
                  style={{ width: logo.width, height: logo.height }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

