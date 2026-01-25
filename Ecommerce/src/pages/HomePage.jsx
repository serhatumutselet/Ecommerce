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
        <div className="flex h-[770px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1050px] flex-col items-center gap-[48px]">
            <div className="mt-[80px] flex h-[62px] w-[607px] flex-col items-center gap-[10px] text-center">
              <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                EDITOR&apos;S PICK
              </p>
                <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373]">
                Problems trying to resolve the conflict between
              </p>
            </div>

            <div className="flex h-[500px] w-full gap-[30px]">
              <div className="relative flex h-[500px] w-[510px] overflow-hidden bg-white">
                <img
                  src={editorsPickMen}
                  alt="Men"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-[31px] top-[426px] flex h-[48px] w-[170px] items-center justify-center bg-white">
                  <span className="text-sm font-semibold text-[#252B42]">
                    MEN
                  </span>
                </div>
              </div>

              <div className="relative flex h-[500px] w-[240px] overflow-hidden bg-white">
                <img
                  src={editorsPickWomen}
                  alt="Women"
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-[21px] top-[434px] flex h-[48px] w-[136px] items-center justify-center bg-white">
                  <span className="text-sm font-semibold text-[#252B42]">
                    WOMEN
                  </span>
                </div>
              </div>

              <div className="flex h-[500px] w-[240px] flex-col gap-[16px]">
                <div className="relative flex h-[242px] w-[240px] overflow-hidden bg-white">
                  <img
                    src={editorsPickAccessories}
                    alt="Accessories"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-[14px] top-[171px] flex h-[48px] w-[170px] items-center justify-center bg-white">
                    <span className="text-sm font-semibold text-[#252B42]">
                      ACCESSORIES
                    </span>
                  </div>
                </div>
                <div className="relative flex h-[242px] w-[240px] overflow-hidden bg-white">
                  <img
                    src={editorsPickKids}
                    alt="Kids"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-[18px] top-[176px] flex h-[48px] w-[120px] items-center justify-center bg-white">
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
        <div className="flex h-[1652px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1124px] flex-col items-center gap-[80px]">
            <div className="mt-[80px] flex h-[102px] w-[691px] flex-col items-center gap-[10px] text-center">
              <p className="text-xl text-[#737373]">Featured Products</p>
              <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                BESTSELLER PRODUCTS
              </p>
                <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px] text-[#737373]">
                Problems trying to resolve the conflict between
              </p>
            </div>

            <div className="flex h-[615px] w-[1049px] gap-[30px]">
              {products.slice(0, 4).map((product, index) => (
                <ProductCard key={`${product.title}-top-${index}`} {...product} />
              ))}
            </div>

            <div className="flex h-[615px] w-[1049px] gap-[30px]">
              {products.slice(4, 8).map((product, index) => (
                <ProductCard key={`${product.title}-bottom-${index}`} {...product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="relative flex h-[709px] w-full max-w-[1440px] items-center justify-center overflow-hidden rounded-[5px] border border-[#DEDEDE] bg-[#23856D]">
          <div className="flex h-full w-[1036px] flex-col pt-[112px] text-white">
            <div className="flex h-[599px] w-[1049px] gap-[30px]">
              <div className="flex h-[432px] w-[509px] flex-col gap-[30px] pt-[60px]">
                <p className="h-[30px] font-['Montserrat'] text-[20px] font-normal leading-[30px] tracking-[0.2px]">
                  SUMMER 2020
                </p>
                <h3 className="h-[160px] font-['Montserrat'] text-[58px] font-bold leading-[80px] tracking-[0.2px]">
                  Vita Classic
                  <span className="block">Product</span>
                </h3>
                <p className="h-[40px] w-[341px] font-['Montserrat'] text-[14px] font-normal leading-[20px] tracking-[0.2px]">
                  We know how large objects will act, but we know how are
                  objects will act, but we know
                </p>
                <div className="flex h-[52px] w-[295px] items-center gap-[34px]">
                  <span className="text-2xl font-semibold leading-[32px]">
                    $16.48
                  </span>
                  <button
                    type="button"
                    className="flex h-[52px] w-[184px] items-center justify-center rounded-[5px] bg-[#2DC071] text-base font-semibold leading-[22px] text-white"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="flex h-[685px] w-[510px] items-start pl-[33.5px]">
                <img
                  src={vitaClassicImage}
                  alt="Vita Classic Product"
                  className="h-[685px] w-[443px] object-contain"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="absolute left-[40px] top-[401px] flex h-[44.47px] w-[24px] items-center justify-center text-white"
          >
            <ChevronLeft className="h-[44px] w-[24px]" />
          </button>
          <button
            type="button"
            className="absolute right-[35px] top-[401px] flex h-[44.47px] w-[24px] items-center justify-center text-white"
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
        <div className="flex h-[682px] w-full max-w-[1440px] justify-center">
          <div className="flex h-[682px] w-[1439px] gap-[30px] px-[132px]">
            <div className="flex h-[682px] w-[704px] items-center justify-center">
              <img
                src={neuralUniverseImage}
                alt="Part of the Neural Universe"
                className="h-[682px] w-[704px] object-cover"
              />
            </div>

            <div className="mt-[178px] flex h-[326px] w-[573px] flex-col gap-[30px]">
              <p className="h-[24px] text-base font-semibold text-[#BDBDBD]">
                SUMMER 2020
              </p>
              <h3 className="h-[100px] w-[375px] text-[40px] font-bold leading-[50px] text-[#252B42]">
                Part of the Neural
                <span className="block">Universe</span>
              </h3>
              <p className="h-[60px] w-[376px] font-['Montserrat'] text-[20px] font-normal leading-[30px] tracking-[0.2px] text-[#737373]">
                We know how large objects will act, but things on a small scale.
              </p>
              <div className="flex h-[52px] w-[339px] items-center gap-[10px]">
                <button
                  type="button"
                  className="flex h-[52px] w-[156px] items-center justify-center rounded-[5px] bg-[#2DC071] text-base font-semibold leading-[22px] text-white"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  className="flex h-[52px] w-[173px] items-center justify-center rounded-[5px] border border-[#2DC071] text-base font-semibold leading-[22px] text-[#2DC071]"
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex h-[1044px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1050px] flex-col items-center gap-[80px]">
            <div className="mt-[112px] flex h-[134px] w-[691px] flex-col items-center gap-[10px] text-center">
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

            <div className="flex h-[606px] w-[1045px] gap-[30px]">
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
                  className="flex h-[606px] w-[348px] flex-col bg-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                >
                  <div className="relative flex h-[300px] w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt="Featured post"
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute left-[20px] top-[20px] flex h-[24px] w-[58px] items-center justify-center rounded-[3px] bg-[#E74040] text-xs font-semibold text-white shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
                      NEW
                    </span>
                  </div>
                  <div className="flex h-[306px] w-full flex-col gap-[10px] px-[25px] pt-[25px] text-[#737373]">
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

