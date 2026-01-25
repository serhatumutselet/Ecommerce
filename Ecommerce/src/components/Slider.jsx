import { ChevronLeft, ChevronRight } from 'lucide-react'
import sliderImage from '../assets/slider/slider.jpg'

export default function Slider() {
  return (
    <div className="relative flex h-[716px] w-full overflow-hidden">
      <img
        src={sliderImage}
        alt="New Collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1044px] flex-col px-10 pt-[48px] text-white">
        <div className="mt-[112px] flex w-full flex-col gap-[35px]">
          <div className="flex w-full max-w-[599px] flex-col gap-[35px]">
            <span className="text-base font-semibold uppercase tracking-[0.2em]">
            Summer 2020
            </span>
            <h2 className="font-['Montserrat'] text-[58px] font-bold leading-[80px] tracking-[0.2px]">
              NEW COLLECTION
            </h2>
            <p className="text-xl leading-[30px] text-white/90">
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
        className="absolute left-[40px] top-[283px] flex h-[44.47px] w-[24px] items-center justify-center text-white"
      >
        <ChevronLeft className="h-[44px] w-[24px]" />
      </button>
      <button
        type="button"
        className="absolute right-[35px] top-[283px] flex h-[44.47px] w-[24px] items-center justify-center text-white"
      >
        <ChevronRight className="h-[44px] w-[24px]" />
      </button>

      <div className="absolute bottom-[49px] left-1/2 flex -translate-x-1/2 items-center gap-0">
        <span className="h-[10px] w-[62px] bg-white" />
        <span className="h-[10px] w-[63px] bg-white/50" />
      </div>
    </div>
  )
}

