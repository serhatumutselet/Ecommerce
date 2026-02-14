import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import ProductCard from '../components/ProductCard'
import apiClient from '../api/axios'
import productImageOne from '../assets/Bestseller Products/1.png'
import productImageTwo from '../assets/Bestseller Products/2.png'
import productImageThree from '../assets/Bestseller Products/3.png'
import productImageFour from '../assets/Bestseller Products/4.png'
import productImageFive from '../assets/Bestseller Products/5.png'
import productImageSix from '../assets/Bestseller Products/6.png'
import productImageSeven from '../assets/Bestseller Products/7.png'
import productImageEight from '../assets/Bestseller Products/8.png'
import productDescriptionImage from '../assets/Featured Posts/1.png'
import hooliLogo from '../assets/Company Logos/hooli.png'
import lyftLogo from '../assets/Company Logos/lyft.png'
import leafLogo from '../assets/Company Logos/leaf.png'
import stripeLogo from '../assets/Company Logos/stripe.png'
import awsLogo from '../assets/Company Logos/aws.png'
import redditLogo from '../assets/Company Logos/reddit.png'
import { fetchProductById } from '../store/thunks/productThunks'
import { addToCart } from '../store/actions/shoppingCartActions'

const relatedProducts = [
  productImageOne,
  productImageTwo,
  productImageThree,
  productImageFour,
  productImageFive,
  productImageSix,
  productImageSeven,
  productImageEight,
].map((image, index) => ({
  id: `related-product-${index + 1}`,
  title: 'Graphic Design',
  category: 'English Department',
  oldPrice: '$16.48',
  price: '$6.48',
  image,
}))

const normalizeText = (value) =>
  String(value || '')
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

const buildProductLink = (product, category) => {
  const productName = product?.name || product?.title || 'product'
  const productSlug = toSlug(productName)
  const productId = product?.id ?? product?.product_id ?? product?.productId
  const categorySlug = toSlug(getCategoryName(category))
  const gender = getGenderSlug(category)
  const categoryId = getCategoryId(category) || 0
  return `/shop/${gender}/${categorySlug}/${categoryId}/${productSlug}/${productId}`
}

const formatPrice = (value) =>
  new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  }).format(Number(value) || 0)

const productGallery = [productImageOne, productImageTwo]

const clientLogos = [
  { src: hooliLogo, alt: 'Hooli', width: 103, height: 34 },
  { src: lyftLogo, alt: 'Lyft', width: 83, height: 59 },
  { src: leafLogo, alt: 'Leaf', width: 102, height: 75 },
  { src: stripeLogo, alt: 'Stripe', width: 103, height: 42 },
  { src: awsLogo, alt: 'AWS', width: 104, height: 62 },
  { src: redditLogo, alt: 'Reddit', width: 76, height: 72 },
]

export default function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.product.product)
  const productFetchState = useSelector(
    (state) => state.product.productFetchState
  )
  const [bestsellerProducts, setBestsellerProducts] = useState(relatedProducts)

  useEffect(() => {
    dispatch(fetchProductById(productId))
  }, [dispatch, productId])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [productId])

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        const response = await apiClient.get('/products', {
          params: { limit: 100, offset: 0 },
        })
        const items = response.data?.products || []
        const sorted = [...items].sort(
          (first, second) => (second.rating || 0) - (first.rating || 0)
        )
        const topItems = sorted.slice(0, 8)
        if (topItems.length === 0) {
          return
        }
        const next = topItems.map((item, index) => {
          const category = item.category || {}
          const image =
            item?.images?.[0]?.url ||
            item?.image ||
            relatedProducts[index]?.image
          return {
            id: item.id ?? `related-product-${index + 1}`,
            title: item.name || 'Product',
            category: getCategoryName(category),
            oldPrice: '',
            price: formatPrice(item.price),
            image,
            to: buildProductLink(item, category),
          }
        })
        setBestsellerProducts(next)
      } catch (err) {
        console.error('Failed to fetch bestseller products', err)
      }
    }

    fetchBestsellers()
  }, [])

  const galleryImages = useMemo(() => {
    const images = product?.images?.map((image) => image.url) || []
    return images.length > 0 ? images : productGallery
  }, [product])

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [canAddToCart, setCanAddToCart] = useState(true)
  const addToCartTimerRef = useRef(null)
  const totalGalleryImages = galleryImages.length
  const currentImage = galleryImages[activeImageIndex]

  const handlePrevImage = () => {
    if (totalGalleryImages === 0) return
    setActiveImageIndex((prev) =>
      prev === 0 ? totalGalleryImages - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    if (totalGalleryImages === 0) return
    setActiveImageIndex((prev) =>
      prev === totalGalleryImages - 1 ? 0 : prev + 1
    )
  }

  const handleAddToCart = () => {
    if (!product || !canAddToCart) return
    dispatch(addToCart(product))
    toast.success('Sepete eklendi.')
    setCanAddToCart(false)
    if (addToCartTimerRef.current) {
      clearTimeout(addToCartTimerRef.current)
    }
    addToCartTimerRef.current = setTimeout(() => {
      setCanAddToCart(true)
    }, 500)
  }
  useEffect(() => {
    setActiveImageIndex(0)
  }, [productId, galleryImages.length])

  useEffect(() => {
    return () => {
      if (addToCartTimerRef.current) {
        clearTimeout(addToCartTimerRef.current)
      }
    }
  }, [])

  return (
    <div className="flex w-full flex-col">
      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-6 md:h-[92px] md:px-0 md:py-0">
          <div className="flex w-full md:h-[44px] md:w-[1033px]">
            <div className="flex w-full md:h-[44px] md:w-[509px]">
              <div className="flex items-center gap-[15px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="text-[#23A6F0] hover:text-[#1d8ad2]"
                >
                  Back
                </button>
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
        <div className="flex w-full max-w-[1440px] justify-center px-4 pb-10 pt-6 md:h-[598px] md:px-0 md:py-0">
          <div className="relative flex w-full flex-col gap-8 md:h-[598px] md:w-[1050px] md:flex-row md:items-center md:gap-[30px]">
            {productFetchState === 'FETCHING' && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                <span className="h-10 w-10 animate-spin rounded-full border-2 border-[#23A6F0] border-t-transparent" />
              </div>
            )}
            <div className="flex w-full flex-col gap-6 md:h-[550px] md:w-[510px] md:gap-0">
              <div className="relative h-[300px] w-full overflow-hidden rounded-[5px] bg-white md:h-[450px] md:w-[506px]">
                <img
                  src={currentImage}
                  alt="Single product"
                  className="h-full w-full object-contain transition-transform duration-500 ease-in-out"
                />
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-[16px] top-1/2 flex h-[44.47px] w-[24px] -translate-y-1/2 items-center justify-center text-white cursor-pointer md:left-[40px]"
                >
                  <ChevronLeft className="h-[44px] w-[24px]" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-[16px] top-1/2 flex h-[44.47px] w-[24px] -translate-y-1/2 items-center justify-center text-white cursor-pointer md:right-[35px]"
                >
                  <ChevronRight className="h-[44px] w-[24px]" />
                </button>
              </div>
              <div className="flex items-center gap-[19px] md:mt-[21px]">
                {galleryImages.map((image, index) => (
                  <button
                    key={`product-thumb-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                  className={`h-[75px] w-[100px] border cursor-pointer bg-white ${
                      activeImageIndex === index
                        ? 'border-[#23A6F0]'
                        : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Product thumbnail ${index + 1}`}
                    className="h-full w-full object-contain transition-transform duration-500 ease-in-out"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 md:h-[471px] md:w-[510px] md:pl-[24px]">
              <div className="flex flex-col gap-[12px]">
                <h4 className="font-['Montserrat'] text-[20px] font-normal leading-[30px] text-[#252B42]">
                  {product?.name || 'Product'}
                </h4>
                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-[5px] text-[#F3CD03]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={`rating-star-${index}`}
                        className={`h-[22px] w-[22px] ${
                          product?.rating && index < Math.round(product.rating)
                            ? 'fill-current'
                            : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#737373]">
                    {product?.rating ? product.rating.toFixed(2) : '0.00'} Rating
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-[5px]">
                <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                  ${product?.price ?? '--'}
                </p>
                <div className="flex items-center gap-[5px] font-['Montserrat'] text-[14px] font-bold leading-[24px]">
                  <span className="text-[#737373]">Availability :</span>
                  <span className="text-[#23A6F0]">
                    {product?.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#858585]">
                {product?.description || 'No description available.'}
              </p>

              <div className="h-[1px] w-full bg-[#BDBDBD]" />

              <div className="flex items-center gap-[10px]">
                <span className="h-[30px] w-[30px] rounded-full bg-[#23A6F0]" />
                <span className="h-[30px] w-[30px] rounded-full bg-[#2DC071]" />
                <span className="h-[30px] w-[30px] rounded-full bg-[#E77C40]" />
                <span className="h-[30px] w-[30px] rounded-full bg-[#252B42]" />
              </div>

              <div className="flex flex-wrap items-center gap-[10px] pt-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="flex h-[44px] items-center justify-center rounded-[5px] bg-[#23A6F0] px-[20px] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-white transition-colors hover:bg-[#1d8ad2] cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#E8E8E8] text-[#252B42]"
                >
                  <Heart className="h-[20px] w-[20px]" />
                </button>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!canAddToCart}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#E8E8E8] text-[#252B42] hover:border-[#23A6F0] transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <ShoppingCart className="h-[20px] w-[20px]" />
                </button>
                <button
                  type="button"
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#E8E8E8] text-[#252B42]"
                >
                  <Eye className="h-[20px] w-[20px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] flex-col md:h-[572px]">
          <div className="flex w-full justify-center border-b border-[#ECECEC] bg-white">
            <div className="flex w-full max-w-[1051px] flex-wrap items-center justify-center gap-6 px-4 py-6 md:h-[91px] md:gap-[24px] md:px-0 md:py-0">
              <button
                type="button"
                className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#737373]"
              >
                Description
              </button>
              <button
                type="button"
                className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#737373]"
              >
                Additional Information
              </button>
              <button
                type="button"
                className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#737373]"
              >
                Reviews (0)
              </button>
            </div>
          </div>

          <div className="flex w-full justify-center px-4 py-10 md:py-[108px]">
            <div className="flex w-full max-w-[1056px] flex-col gap-10 md:h-[499px] md:flex-row md:gap-[30px]">
              <div className="flex w-full items-center justify-center md:w-[332px] md:items-center md:justify-center">
                <div className="relative flex h-[340px] w-[290px] items-center justify-center rounded-[9px] bg-[#C4C4C4]/20 md:-mt-[250px] md:h-[392px] md:w-[337px]">
                  <img
                    src={productDescriptionImage}
                    alt="Product detail"
                    className="h-[320px] w-[270px] rounded-[6px] object-cover md:h-[372px] md:w-[316px]"
                  />
                </div>
              </div>

              <div className="flex w-full flex-col items-center gap-6 text-center md:-mt-[50px] md:w-[332px]">
                <h5 className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                  the quick fox jumps over
                </h5>
                <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do
                  met sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                  <br />
                  <br />
                  Met minim Mollie non desert Alamo est sit cliquey dolor do
                  met sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                  <br />
                  <br />
                  Met minim Mollie non desert Alamo est sit cliquey dolor do
                  met sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                </p>
              </div>

              <div className="flex w-full flex-col items-center gap-10 text-center md:-mt-[50px] md:w-[332px]">
                <div className="flex flex-col gap-6">
                  <h5 className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                    the quick fox jumps over
                  </h5>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'the quick fox jumps over the lazy dog',
                      'the quick fox jumps over the lazy dog',
                      'the quick fox jumps over the lazy dog',
                      'the quick fox jumps over the lazy dog',
                    ].map((text, index) => (
                      <div
                        key={`desc-list-${index}`}
                        className="flex items-center justify-center gap-[20px]"
                      >
                        <ChevronRight className="h-[16px] w-[9px] text-[#737373]" />
                        <span className="font-['Montserrat'] text-[14px] font-normal leading-[24px] text-[#737373]">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <h5 className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                    the quick fox jumps over
                  </h5>
                  <div className="flex flex-col gap-[10px]">
                    {[
                      'the quick fox jumps over the lazy dog',
                      'the quick fox jumps over the lazy dog',
                      'the quick fox jumps over the lazy dog',
                    ].map((text, index) => (
                      <div
                        key={`desc-list-bottom-${index}`}
                        className="flex items-center justify-center gap-[20px]"
                      >
                        <ChevronRight className="h-[16px] w-[9px] text-[#737373]" />
                        <span className="font-['Montserrat'] text-[14px] font-normal leading-[24px] text-[#737373]">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-10 md:h-[1086px] md:px-0 md:py-0">
          <div className="flex w-full flex-col gap-6 md:w-[1124px] md:py-[48px]">
            <div className="flex w-full items-center justify-center md:h-[32px]">
              <h3 className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42] md:text-left">
                BESTSELLER PRODUCTS
              </h3>
            </div>
            <div className="h-[2px] w-full bg-[#ECECEC]" />
            <div className="grid w-full gap-[30px] md:grid-cols-4">
              {bestsellerProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  variant="compact"
                />
              ))}
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

