import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="flex w-full flex-col bg-white">
      <div className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex h-[142px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1050px] flex-col justify-center">
            <div className="flex h-[58px] w-full items-center justify-between">
              <div className="flex h-[58px] w-[187px] items-center">
                <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]">
                  Bandage
                </p>
              </div>
              <div className="flex h-[24px] w-[112px] items-center gap-[20px] text-[#23A6F0]">
                <Facebook className="h-[24px] w-[24px]" />
                <Instagram className="h-[24px] w-[24px]" />
                <Twitter className="h-[20px] w-[24px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto h-px w-[1057px] bg-[#E6E6E6]" />

      <div className="flex w-full justify-center bg-white">
        <div className="flex h-[272px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1050px] flex-col pt-[50px]">
            <div className="flex h-[170px] w-[1041px] gap-[30px]">
              <div className="flex w-[148px] flex-col gap-[20px]">
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
              <div className="flex w-[152px] flex-col gap-[20px]">
                <p className="text-base font-semibold text-[#252B42]">Legal</p>
                <div className="flex flex-col gap-[10px] text-sm text-[#737373]">
                  <p>About Us</p>
                  <p>Carrier</p>
                  <p>We are hiring</p>
                  <p>Blog</p>
                </div>
              </div>
              <div className="flex w-[148px] flex-col gap-[20px]">
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
              <div className="flex w-[152px] flex-col gap-[20px]">
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
              <div className="flex w-[321px] flex-col gap-[20px]">
                <p className="text-base font-semibold text-[#252B42]">
                  Get In Touch
                </p>
                <div className="flex h-[87px] w-[321px] flex-col gap-[1px]">
                  <div className="relative flex h-[58px] w-[321px] overflow-hidden rounded-[5px] border border-[#E6E6E6] bg-[#F9F9F9]">
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
        <div className="flex h-[74px] w-full max-w-[1440px] justify-center">
          <div className="flex h-full w-[1050px] items-center">
            <p className="text-sm text-[#737373]">
              Made With Love By Finland All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

