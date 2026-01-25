import { ChevronLeft, ChevronRight } from 'lucide-react'
import sliderImage from '../assets/slider/slider.jpg'

export default function Slider() {
  return (
    <div className="relative flex h-[753px] w-full overflow-hidden rounded-[5px] border border-[#DEDEDE] md:h-[716px] md:rounded-none md:border-0">
      <img
        src={sliderImage}
        alt="New Collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1044px] flex-col px-6 pt-[48px] text-white md:px-10 md:pt-[48px]">
        <div className="mt-[112px] flex w-full flex-col items-center gap-[30px] text-center md:items-start md:gap-[35px] md:text-left">
          <div className="flex w-full max-w-[599px] flex-col items-center gap-[35px] md:items-start">
            <span className="text-base font-semibold uppercase tracking-[0.2em]">
              Summer 2020
            </span>
            <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">
              NEW COLLECTION
            </h2>
            <p className="text-[20px] leading-[30px] text-white/90">
              We know how large objects will act,
              <br />
              but things on a small scale.
            </p>
            <button
              type="button"
              className="flex h-[62px] w-[221px] items-center justify-center rounded-[5px] bg-[#2DC071] font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-white"
            >
              SHOP NOW
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="absolute left-[40px] top-[351px] flex h-[44.47px] w-[24px] items-center justify-center text-white md:left-[40px] md:top-[283px]"
      >
        <ChevronLeft className="h-[44px] w-[24px]" />
      </button>
      <button
        type="button"
        className="absolute right-[31px] top-[351px] flex h-[44.47px] w-[24px] items-center justify-center text-white md:right-[35px] md:top-[283px]"
      >
        <ChevronRight className="h-[44px] w-[24px]" />
      </button>

      <div className="absolute bottom-[48px] left-1/2 flex -translate-x-1/2 items-center gap-0 md:bottom-[49px]">
        <span className="h-[10px] w-[62px] bg-white" />
        <span className="h-[10px] w-[63px] bg-white/50" />
      </div>
    </div>
  )
}

