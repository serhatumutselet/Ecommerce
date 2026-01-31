import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import sliderImage from '../assets/slider/slider.jpg'
import featuredPostTwo from '../assets/Featured Posts/2.png'
import { Link } from 'react-router-dom'
const slides = [
  {
    image: sliderImage,
    title: 'NEW COLLECTION',
    subtitle: 'Summer 2020',
  },
  {
    image: featuredPostTwo,
    title: 'NEW COLLECTION',
    subtitle: 'Summer 2020',
  },
]

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="relative flex h-[753px] w-full overflow-hidden rounded-[5px] border border-[#DEDEDE] md:h-[716px] md:rounded-none md:border-0">
      <div
        className="flex h-full w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={`slide-${index}`} className="relative h-full w-full shrink-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative z-10 mx-auto flex h-full w-full max-w-[1044px] flex-col px-6 pt-[48px] text-white md:px-10 md:pt-[48px]">
              <div className="mt-[112px] flex w-full flex-col items-center gap-[30px] text-center md:items-start md:gap-[35px] md:text-left">
                <div className="flex w-full max-w-[599px] flex-col items-center gap-[35px] md:items-start">
                  <span className="text-base font-semibold uppercase tracking-[0.2em]">
                    {slide.subtitle}
                  </span>
                  <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">
                    {slide.title}
                  </h2>
                  <p className="text-[20px] leading-[30px] text-white/90">
                    We know how large objects will act,
                    <br />
                    but things on a small scale.
                  </p>
                  <Link to="/shop">
                    <button
                      type="button"
                      className="flex h-[62px] w-[221px] items-center justify-center rounded-[5px] bg-[#2DC071] font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-white"
                    >
                      SHOP NOW
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-[40px] top-[351px] flex h-[44.47px] w-[24px] items-center justify-center text-white cursor-pointer md:left-[40px] md:top-[283px]"
      >
        <ChevronLeft className="h-[44px] w-[24px]" />
      </button>
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-[31px] top-[351px] flex h-[44.47px] w-[24px] items-center justify-center text-white cursor-pointer md:right-[35px] md:top-[283px]"
      >
        <ChevronRight className="h-[44px] w-[24px]" />
      </button>

      <div className="absolute bottom-[48px] left-1/2 flex -translate-x-1/2 items-center gap-0 md:bottom-[49px]">
        {slides.map((_, index) => (
          <button
            key={`slide-indicator-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-[10px] ${
              index === 0 ? 'w-[62px]' : 'w-[63px]'
            } ${activeIndex === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  )
}

