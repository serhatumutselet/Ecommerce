import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronRight, LayoutGrid, List } from 'lucide-react'
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

const shopCategories = [
  {
    title: 'CLOTHS',
    count: '5 Items',
    image: editorsPickMen,
  },
  {
    title: 'CLOTHS',
    count: '5 Items',
    image: editorsPickWomen,
  },
  {
    title: 'CLOTHS',
    count: '5 Items',
    image: editorsPickAccessories,
  },
  {
    title: 'CLOTHS',
    count: '5 Items',
    image: editorsPickKids,
  },
  {
    title: 'CLOTHS',
    count: '5 Items',
    image: bestsellerOne,
  },
]

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

const clientLogos = [
  { src: hooliLogo, alt: 'Hooli', width: 103, height: 34 },
  { src: lyftLogo, alt: 'Lyft', width: 83, height: 59 },
  { src: leafLogo, alt: 'Leaf', width: 102, height: 75 },
  { src: stripeLogo, alt: 'Stripe', width: 103, height: 42 },
  { src: awsLogo, alt: 'AWS', width: 104, height: 62 },
  { src: redditLogo, alt: 'Reddit', width: 76, height: 72 },
]

export default function ShopPage() {
  const productsPerPage = 12
  const [currentPage, setCurrentPage] = useState(1)
  const shopProducts = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => {
        const image =
          productImages[Math.floor(Math.random() * productImages.length)]

        return {
          id: `product-${index}`,
          title: 'Graphic Design',
          category: 'English Department',
          oldPrice: '$16.48',
          price: '$6.48',
          image,
        }
      }),
    []
  )
  const totalPages = Math.ceil(shopProducts.length / productsPerPage)
  const paginatedProducts = shopProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  )

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

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
            {shopCategories.map((category) => (
              <div
                key={`${category.title}-${category.image}`}
                className="relative w-full overflow-hidden bg-white aspect-[205/223] md:h-[223px] md:w-[205px] md:aspect-auto"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#212121] opacity-25" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-[5px] text-white">
                  <span className="font-['Montserrat'] text-[16px] font-bold leading-[24px] tracking-[0.2px]">
                    {category.title}
                  </span>
                  <span className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px]">
                    {category.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] items-center justify-center px-4 py-6 md:h-[98px] md:px-0 md:py-0">
          <div className="flex w-full flex-col gap-4 md:h-[50px] md:w-[1049px] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="flex items-center font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373]">
              <span>Showing all 12 results</span>
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
              <div className="relative h-[50px] w-full md:w-[141px]">
                <select
                  className="h-[50px] w-full appearance-none rounded-[5px] border border-[#DDDDDD] bg-[#F9F9F9] px-[18px] pr-[34px] font-['Montserrat'] text-[14px] font-normal leading-[28px] text-[#737373]"
                  defaultValue="popularity"
                >
                  <option value="popularity">Popularity</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-[18px] top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-[#737373]" />
              </div>
              <button
                type="button"
                className="flex h-[50px] w-full items-center justify-center rounded-[5px] bg-[#23A6F0] px-[24px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-white md:w-[94px]"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-10 md:h-[1778px] md:px-0 md:py-0">
          <div className="grid w-full gap-8 md:w-[1124px] md:grid-cols-4 md:gap-x-[30px] md:gap-y-[48px] md:py-[48px]">
            {paginatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex w-full flex-col bg-white md:h-[488px]"
              >
                <div className="h-full w-full md:h-[300px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex h-full flex-col items-center gap-[10px] py-[25px] md:h-[188px] md:py-0">
                  <p className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                    {product.title}
                  </p>
                  <p className="font-['Montserrat'] text-[14px] font-normal leading-[24px] text-[#737373]">
                    {product.category}
                  </p>
                  <div className="flex items-center gap-[5px] font-['Montserrat'] text-[16px] font-bold leading-[24px]">
                    <span className="text-[#BDBDBD]">{product.oldPrice}</span>
                    <span className="text-[#23856D]">{product.price}</span>
                  </div>
                  <div className="flex items-center gap-[6.08px]">
                    <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
                    <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
                    <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
                    <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
                  </div>
                </div>
              </div>
            ))}

            <div className="col-span-full flex justify-center pt-4 md:pt-[0] md:pb-[48px]">
              <div className="flex h-[74px] w-[313px] overflow-hidden rounded-[6.73px] border border-[#BDBDBD] shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                <button
                  type="button"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={`flex h-full w-[84px] items-center justify-center border-r border-[#BDBDBD] bg-[#F3F3F3] font-['Montserrat'] text-[14px] font-bold leading-[24px] cursor-pointer disabled:cursor-not-allowed ${
                    currentPage === 1 ? 'text-[#BDBDBD]' : 'text-[#23A6F0]'
                  }`}
                >
                  First
                </button>
                {pageNumbers.map((page) => (
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
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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

