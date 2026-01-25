import { ArrowRight, BarChart2, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import Slider from '../components/Slider'
import ProductCard from '../components/ProductCard'
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
import vitaClassicImage from '../assets/Vita Classic/col-md-6.png'
import neuralUniverseImage from '../assets/Neural Universe/col-md-6 (1).png'
import featuredPostOne from '../assets/Featured Posts/1.png'
import featuredPostTwo from '../assets/Featured Posts/2.png'
import featuredPostThree from '../assets/Featured Posts/3.png'

const products = [
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerOne,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerTwo,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerThree,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerFour,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerFive,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerSix,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerSeven,
  },
  {
    title: 'Graphic Design',
    category: 'English Department',
    price: '$16.48',
    oldPrice: '$6.48',
    image: bestsellerEight,
  },
]

export default function HomePage() {
  return (
    <div className="flex w-full flex-col">
      <section className="mx-auto flex w-full max-w-[1440px] flex-col">
        <Slider />
      </section>

      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] justify-center md:h-[770px]">
          <div className="flex w-full flex-col items-center gap-[48px] px-[40.5px] py-[80px] md:h-full md:w-[1050px] md:px-0 md:py-0">
            <div className="flex w-[333px] flex-col items-center gap-[10px] text-center md:mt-[80px] md:h-[62px] md:w-[607px]">
              <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                EDITOR&apos;S PICK
              </p>
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373] md:text-[14px]">
                Problems trying to resolve the conflict between
              </p>
            </div>

            <div className="flex w-[333px] flex-col gap-[30px] md:h-[500px] md:w-full md:flex-row md:gap-[30px]">
              <div className="relative flex h-[500px] w-[324px] overflow-hidden bg-white md:h-[500px] md:w-[510px]">
                <img
                  src={editorsPickMen}
                  alt="Men"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-[31px] top-[426px] flex h-[48px] w-[170px] items-center justify-center bg-white md:left-[31px] md:top-[426px]">
                  <span className="text-sm font-semibold text-[#252B42]">
                    MEN
                  </span>
                </div>
              </div>

              <div className="relative flex h-[500px] w-[325px] overflow-hidden bg-white md:h-[500px] md:w-[240px]">
                <img
                  src={editorsPickWomen}
                  alt="Women"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-[63.5px] top-[434px] flex h-[48px] w-[136px] items-center justify-center bg-white md:left-[21px] md:top-[434px]">
                  <span className="text-sm font-semibold text-[#252B42]">
                    WOMEN
                  </span>
                </div>
              </div>

              <div className="flex w-[325px] flex-col gap-[16px] md:h-[500px] md:w-[240px]">
                <div className="relative flex h-[242px] w-[325px] overflow-hidden bg-white md:h-[242px] md:w-[240px]">
                  <img
                    src={editorsPickAccessories}
                    alt="Accessories"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-[14px] top-[171px] flex h-[48px] w-[170px] items-center justify-center bg-white md:left-[14px] md:top-[171px]">
                    <span className="text-sm font-semibold text-[#252B42]">
                      ACCESSORIES
                    </span>
                  </div>
                </div>
                <div className="relative flex h-[242px] w-[325px] overflow-hidden bg-white md:h-[242px] md:w-[240px]">
                  <img
                    src={editorsPickKids}
                    alt="Kids"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-[18px] top-[176px] flex h-[48px] w-[120px] items-center justify-center bg-white md:left-[18px] md:top-[176px]">
                    <span className="text-sm font-semibold text-[#252B42]">
                      KIDS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center md:h-[1652px]">
          <div className="flex w-full flex-col items-center gap-[48px] px-[43px] py-[80px] md:h-full md:w-[1124px] md:px-0 md:py-0">
            <div className="flex w-[300px] flex-col items-center gap-[10px] text-center md:mt-[80px] md:h-[102px] md:w-[691px]">
              <p className="text-[20px] font-normal leading-[30px] text-[#737373]">
                Featured Products
              </p>
              <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                BESTSELLER PRODUCTS
              </p>
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373]">
                Problems trying to resolve the conflict between
              </p>
            </div>

            <div className="flex w-[328px] flex-col items-center gap-[30px] md:h-[615px] md:w-[1049px] md:flex-row md:gap-[30px]">
              {products.slice(0, 4).map((product, index) => (
                <ProductCard key={`${product.title}-top-${index}`} {...product} />
              ))}
            </div>

            <div className="flex w-[328px] flex-col items-center gap-[30px] md:h-[615px] md:w-[1049px] md:flex-row md:gap-[30px]">
              {products.slice(4, 8).map((product, index) => (
                <ProductCard key={`${product.title}-bottom-${index}`} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="relative flex h-[1230px] w-full max-w-[1440px] items-center justify-center overflow-hidden rounded-[5px] border border-[#DEDEDE] bg-[#23856D] md:h-[709px] md:rounded-[5px]">
          <div className="flex h-full w-full flex-col px-4 pt-[44px] text-white md:w-[1036px] md:px-0 md:pt-[112px]">
            <div className="flex h-full w-full flex-col gap-[30px] md:h-[599px] md:w-[1049px] md:flex-row">
              <div className="flex w-full flex-col items-center gap-[35px] text-center md:h-[432px] md:w-[509px] md:items-start md:gap-[30px] md:pt-[60px] md:text-left">
                <p className="text-base font-normal leading-[24px] tracking-[0.2px] md:h-[30px] md:text-[20px] md:leading-[30px]">
                  SUMMER 2020
                </p>
                <h3 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] md:h-[160px] md:text-[58px] md:leading-[80px]">
                  VITA CLASSIC
                  <span className="block">PRODUCT</span>
                </h3>
                <p className="w-[291px] font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] md:h-[40px] md:w-[341px]">
                  We know how large objects will act, but we know how are
                  objects will act, but we know
                </p>
                <button
                  type="button"
                  className="flex h-[62px] w-[221px] items-center justify-center rounded-[5px] bg-[#2DC071] font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-white md:h-[52px] md:w-[184px] md:text-base md:leading-[22px]"
                >
                  ADD TO CART
                </button>
              </div>
              <div className="flex w-full flex-1 items-center justify-center md:h-[685px] md:w-[510px] md:items-start md:pl-[33.5px]">
                <img
                  src={vitaClassicImage}
                  alt="Vita Classic Product"
                  className="h-[693px] w-[443px] object-contain md:h-[685px]"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute left-[40px] top-[589px] flex h-[44.47px] w-[24px] items-center justify-center text-white md:top-[401px]"
          >
            <ChevronLeft className="h-[44px] w-[24px]" />
          </button>
          <button
            type="button"
            className="absolute right-[31px] top-[589px] flex h-[44.47px] w-[24px] items-center justify-center text-white md:right-[35px] md:top-[401px]"
          >
            <ChevronRight className="h-[44px] w-[24px]" />
          </button>

          <div className="absolute bottom-[49px] left-1/2 flex -translate-x-1/2 items-center gap-0">
            <span className="h-[10px] w-[62px] bg-white" />
            <span className="h-[10px] w-[63px] bg-white/50" />
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center py-[48px] md:h-[682px] md:py-0">
          <div className="flex w-full flex-col gap-[32px] px-4 md:h-[682px] md:w-[1439px] md:flex-row md:gap-[30px] md:px-[132px]">
            <div className="flex h-[320px] w-full items-center justify-center md:h-[682px] md:w-[704px]">
              <img
                src={neuralUniverseImage}
                alt="Part of the Neural Universe"
                className="h-full w-full object-cover md:h-[682px] md:w-[704px]"
              />
            </div>

            <div className="flex h-auto w-full flex-col gap-[20px] md:mt-[178px] md:h-[326px] md:w-[573px] md:gap-[30px]">
              <p className="h-auto text-base font-semibold text-[#BDBDBD] md:h-[24px]">
                SUMMER 2020
              </p>
              <h3 className="h-auto w-full text-[28px] font-bold leading-[36px] text-[#252B42] md:h-[100px] md:w-[375px] md:text-[40px] md:leading-[50px]">
                Part of the Neural
                <span className="block">Universe</span>
              </h3>
              <p className="h-auto w-full font-['Montserrat'] text-[16px] font-normal leading-[24px] tracking-[0.2px] text-[#737373] md:h-[60px] md:w-[376px] md:text-[20px] md:leading-[30px]">
                We know how large objects will act, but things on a small scale.
              </p>
              <div className="flex w-full flex-col items-start gap-[10px] sm:flex-row sm:items-center md:h-[52px] md:w-[339px]">
                <button
                  type="button"
                  className="flex h-[48px] w-[156px] items-center justify-center rounded-[5px] bg-[#2DC071] text-sm font-semibold leading-[20px] text-white md:h-[52px] md:text-base md:leading-[22px]"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="flex h-[48px] w-[173px] items-center justify-center rounded-[5px] border border-[#2DC071] text-sm font-semibold leading-[20px] text-[#2DC071] md:h-[52px] md:text-base md:leading-[22px]"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center py-[64px] md:h-[1044px] md:py-0">
          <div className="flex w-full flex-col items-center gap-[40px] px-4 md:h-full md:w-[1050px] md:gap-[80px] md:px-0">
            <div className="flex w-full max-w-[691px] flex-col items-center gap-[10px] text-center md:mt-[112px] md:h-[134px]">
              <p className="text-base font-semibold text-[#23A6F0]">
                Practice Advice
              </p>
              <p className="text-[40px] font-bold leading-[50px] text-[#252B42]">
                Featured Posts
              </p>
                <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373]">
                  Problems trying to resolve the conflict between
                  <br />
                  the two major realms of Classical physics: Newtonian mechanics
                </p>
            </div>

            <div className="flex h-auto w-full flex-col gap-[20px] md:h-[606px] md:w-[1045px] md:flex-row md:gap-[30px]">
              {[
                {
                  image: featuredPostOne,
                },
                {
                  image: featuredPostTwo,
                },
                {
                  image: featuredPostThree,
                },
              ].map((post, index) => (
                <article
                  key={`post-${index}`}
                  className="flex h-auto w-full flex-col bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)] md:h-[606px] md:w-[348px]"
                >
                  <div className="relative flex h-[240px] w-full overflow-hidden md:h-[300px]">
                    <img
                      src={post.image}
                      alt="Featured post"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-[20px] top-[20px] flex h-[24px] w-[58px] items-center justify-center rounded-[3px] bg-[#E74040] text-xs font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                      NEW
                    </span>
                  </div>
                  <div className="flex h-auto w-full flex-col gap-[10px] px-[20px] pt-[20px] text-[#737373] md:h-[306px] md:px-[25px] md:pt-[25px]">
                    <div className="flex items-center gap-[15px] text-xs">
                      <span className="text-[#8EC2F2]">Google</span>
                      <span>Trending</span>
                      <span>New</span>
                    </div>
                    <p className="text-lg font-semibold leading-[30px] text-[#252B42]">
                      Loudest à la Madison #1 (L’intégral)
                    </p>
                    <p className="text-sm leading-[20px] text-[#737373]">
                      We focus on ergonomics and meeting you where you work.
                      It's only a keystroke away.
                    </p>
                    <div className="flex items-center justify-between pt-[10px] text-xs text-[#737373]">
                      <div className="flex items-center gap-[5px]">
                        <Calendar className="h-[16px] w-[16px] text-[#23A6F0]" />
                        <span>22 April 2021</span>
                      </div>
                      <div className="flex items-center gap-[5px]">
                        <BarChart2 className="h-[16px] w-[16px] text-[#23856D]" />
                        <span>10 comments</span>
                      </div>
                    </div>
                      <button
                        type="button"
                        className="mt-[10px] flex w-fit items-center gap-[10px] text-sm font-semibold text-[#737373]"
                      >
                        Learn More
                        <ArrowRight className="h-[14px] w-[14px] text-[#23A6F0]" />
                      </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

