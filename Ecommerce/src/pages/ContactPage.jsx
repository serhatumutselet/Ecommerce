import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Redo,
  Twitter,
} from 'lucide-react'
import contactBackground from '../assets/contact/Contact background.png'

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col">
      <section className="relative flex w-full justify-center overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute right-0 top-[117px] hidden h-[612px] w-[632px] md:block">
            <img
              src={contactBackground}
              alt="Technology"
              className="absolute left-[50px] top-[-200px] h-[826px] w-[571px] object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex w-full max-w-[1440px] justify-center px-4 py-16 md:h-[882px] md:px-0 md:py-0">
          <div className="flex w-full max-w-[1050px] flex-col gap-[80px] md:pt-[104px]">
            <div className="flex w-full flex-col gap-[35px] md:flex-row md:items-start md:gap-[30px]">
              <div className="flex w-full max-w-[599px] flex-col gap-[35px]">
                <h5 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                  CONTACT US
                </h5>
                <h1 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                  Get in touch today
                </h1>
                <p className="font-['Montserrat'] text-[20px] font-normal leading-[30px] text-[#737373]">
                  We know how large objects will act, but things on a small
                  scale.
                </p>

                <div className="flex flex-col gap-[20px]">
                  <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                    Phone : +451 215 215
                  </p>
                  <p className="font-['Montserrat'] text-[24px] font-bold leading-[32px] text-[#252B42]">
                    Fax : +451 215 215
                  </p>
                </div>

                <div className="flex items-center gap-[34px] text-[#252B42]">
                  <Twitter className="h-[24px] w-[30px]" />
                  <Facebook className="h-[30px] w-[30px]" />
                  <Instagram className="h-[30px] w-[30px]" />
                  <Linkedin className="h-[30px] w-[30px]" />
                </div>
              </div>

              <div className="hidden w-full max-w-[415px] md:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[112px]">
          <div className="flex w-full max-w-[1050px] flex-col items-center gap-[80px]">
            <div className="flex w-full max-w-[633px] flex-col items-center gap-[10px] text-center">
              <h6 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                VISIT OUR OFFICE
              </h6>
              <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                We help small businesses with big ideas
              </h2>
            </div>

            <div className="grid w-full gap-[30px] md:grid-cols-3">
              <div className="flex w-full min-h-[343px] flex-col items-center justify-between bg-white px-[40px] py-[50px] text-center shadow-[0_13px_19px_0_rgba(0,0,0,0.07)]">
                <Phone className="h-[72px] w-[72px] text-[#23A6F0]" />
                <div className="mt-[15px] flex flex-col items-center gap-[4px]">
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#252B42]">
                    georgia.young@example.com
                  </p>
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#252B42]">
                    georgia.young@company.com
                  </p>
                </div>
                <h5 className="mt-[15px] font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                  Get Support
                </h5>
                <button
                  type="button"
                  className="mt-[15px] flex h-[54px] w-[189px] items-center justify-center rounded-[37px] border border-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0]"
                >
                  Submit Request
                </button>
              </div>

              <div className="flex w-full min-h-[343px] flex-col items-center justify-between bg-[#252B42] px-[40px] py-[50px] text-center shadow-[0_13px_19px_0_rgba(0,0,0,0.07)]">
                <MapPin className="h-[72px] w-[72px] text-[#23A6F0]" />
                <div className="mt-[15px] flex flex-col items-center gap-[4px]">
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-white">
                    georgia.young@example.com
                  </p>
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-white">
                    georgia.young@company.com
                  </p>
                </div>
                <h5 className="mt-[15px] font-['Montserrat'] text-[16px] font-bold leading-[24px] text-white">
                  Get Support
                </h5>
                <button
                  type="button"
                  className="mt-[15px] flex h-[54px] w-[189px] items-center justify-center rounded-[37px] border border-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0]"
                >
                  Submit Request
                </button>
              </div>

              <div className="flex w-full min-h-[343px] flex-col items-center justify-between bg-white px-[40px] py-[50px] text-center shadow-[0_13px_19px_0_rgba(0,0,0,0.07)]">
                <Mail className="h-[72px] w-[72px] text-[#23A6F0]" />
                <div className="mt-[15px] flex flex-col items-center gap-[4px]">
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#252B42]">
                    georgia.young@example.com
                  </p>
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#252B42]">
                    georgia.young@company.com
                  </p>
                </div>
                <h5 className="mt-[15px] font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                  Get Support
                </h5>
                <button
                  type="button"
                  className="mt-[15px] flex h-[54px] w-[189px] items-center justify-center rounded-[37px] border border-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#23A6F0]"
                >
                  Submit Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[80px]">
          <div className="flex w-full max-w-[1050px] justify-center">
            <div className="flex w-full max-w-[607px] flex-col items-center gap-[36px] text-center">
              <div className="flex w-full flex-col items-center gap-[16px]">
                <div className="pointer-events-none text-[#23A6F0]">
                  <Redo className="h-[48px] w-[48px] rotate-90" />
                </div>
                <h6 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                  Still Have Questions?
                </h6>
                <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                  Let&apos;s Talk
                </h2>
              </div>
              <button
                type="button"
                className="flex h-[52px] w-[186px] items-center justify-center rounded-[5px] bg-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white"
              >
                Try it free now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

