import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-white">
      <div className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] justify-center py-[24px] md:h-[142px] md:py-0">
          <div className="flex w-full flex-col justify-center px-4 md:h-full md:w-[1050px] md:px-0">
            <div className="flex w-full flex-col items-center justify-between gap-[16px] md:h-[58px] md:flex-row">
              <div className="flex h-[58px] w-[187px] items-center justify-center md:justify-start">
                <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                  Bandage
                </p>
              </div>
              <div className="flex h-[24px] w-[112px] items-center justify-center gap-[20px] text-[#23A6F0]">
                <Facebook className="h-[24px] w-[24px]" />
                <Instagram className="h-[24px] w-[24px]" />
                <Twitter className="h-[20px] w-[24px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-px w-full max-w-[1057px] bg-[#E6E6E6]" />

      <div className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center py-[40px] md:h-[272px] md:py-0">
          <div className="flex w-full flex-col px-4 md:h-full md:w-[1050px] md:px-0 md:pt-[50px]">
            <div className="flex w-full flex-col gap-[24px] md:h-[170px] md:w-[1041px] md:flex-row md:gap-[30px]">
              <div className="flex w-full flex-col gap-[20px] md:w-[148px]">
                <p className="text-base font-semibold text-[#252B42]">
                  Company Info
                </p>
                <div className="flex flex-col gap-[10px] text-sm text-[#737373]">
                  <p>About Us</p>
                  <p>Carrier</p>
                  <p>We are hiring</p>
                  <p>Blog</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[20px] md:w-[152px]">
                <p className="text-base font-semibold text-[#252B42]">Legal</p>
                <div className="flex flex-col gap-[10px] text-sm text-[#737373]">
                  <p>About Us</p>
                  <p>Carrier</p>
                  <p>We are hiring</p>
                  <p>Blog</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[20px] md:w-[148px]">
                <p className="text-base font-semibold text-[#252B42]">
                  Features
                </p>
                <div className="flex flex-col gap-[10px] text-sm text-[#737373]">
                  <p>Business Marketing</p>
                  <p>User Analytic</p>
                  <p>Live Chat</p>
                  <p>Unlimited Support</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[20px] md:w-[152px]">
                <p className="text-base font-semibold text-[#252B42]">
                  Resources
                </p>
                <div className="flex flex-col gap-[10px] text-sm text-[#737373]">
                  <p>iOS & Android</p>
                  <p>Watch a Demo</p>
                  <p>Customers</p>
                  <p>API</p>
                </div>
              </div>
              <div className="flex w-full flex-col gap-[20px] md:w-[321px]">
                <p className="text-base font-semibold text-[#252B42]">
                  Get In Touch
                </p>
                <div className="flex w-full flex-col gap-[1px] md:h-[87px] md:w-[321px]">
                  <div className="relative flex h-[58px] w-full overflow-hidden rounded-[5px] border border-[#E6E6E6] bg-[#F9F9F9] md:w-[321px]">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="h-full w-full bg-transparent pl-[20px] text-sm text-[#737373]"
                    />
                    <button
                      type="button"
                      className="absolute right-0 top-0 flex h-[58px] w-[117px] items-center justify-center border-l border-[#E6E6E6] bg-[#23A6F0] text-sm font-semibold text-white"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-sm text-[#737373]">Lorem ipsum dolor Amit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] justify-center py-[24px] md:h-[74px] md:py-0">
          <div className="flex h-full w-full items-center justify-center px-4 text-center md:w-[1050px] md:justify-start md:px-0">
            <p className="text-sm text-[#737373]">
              Made With Love By Finland All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

