import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  Facebook,
  Heart,
  Instagram,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  Twitter,
  User,
  Youtube,
} from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="flex w-full flex-col">
      <div className="hidden h-[58px] w-full items-center bg-[#252B42] text-white md:flex">
        <div className="mx-auto flex h-[46px] w-full max-w-[1439px] items-center">
          <div className="flex w-[1438px] items-center justify-between pl-[24px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
            <div className="flex w-[415px] items-center gap-[10px]">
              <div className="flex h-[44px] items-center gap-[5px]">
                <Phone className="h-[16px] w-[16px]" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex h-[44px] items-center gap-[5px]">
                <Mail className="h-[16px] w-[16px]" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>
            <div className="flex w-[332px] items-center justify-center">
              <span>Follow Us and get a chance to win 80% off</span>
            </div>
            <div className="flex w-[233px] items-center gap-[10px]">
              <span>Follow Us :</span>
              <div className="flex h-[26px] w-[120px] items-center gap-[10px]">
                <Facebook className="h-[16px] w-[16px]" />
                <Instagram className="h-[16px] w-[16px]" />
                <Twitter className="h-[16px] w-[16px]" />
                <Youtube className="h-[16px] w-[16px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1439px] flex-col">
        <div className="flex h-[108px] w-full items-center md:h-[78px]">
          <div className="flex w-full items-center justify-between px-[35px] md:px-[38px]">
            <div className="flex w-[187px] items-center">
              <Link
                to="/"
                className="font-['Montserrat'] text-[24px] font-bold leading-[32px] tracking-[0.1px] text-[#252B42]"
              >
                Bandage
              </Link>
            </div>

            <nav className="hidden h-[78px] w-[361px] items-center gap-[15px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] text-[#737373] md:flex">
              <Link to="/">Home</Link>
              <Link to="/shop" className="flex items-center gap-[5px] text-[#252B42]">
                Shop
                <ChevronDown className="h-[10px] w-[6px]" />
              </Link>
              <Link to="/">About</Link>
              <Link to="/">Blog</Link>
              <Link to="/">Contact</Link>
              <Link to="/">Pages</Link>
            </nav>

            <div className="flex h-[54px] w-auto items-center justify-end gap-[24px] text-[#252B42] md:gap-[10px] md:text-[#23A6F0]">
              <Link
                to="/"
                className="hidden h-[54px] w-[166px] items-center justify-center gap-[5px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px] md:flex"
              >
                <User className="h-[12px] w-[12px]" />
                Login / Register
              </Link>
              <button
                type="button"
                className="flex h-[24px] w-[24px] items-center justify-center md:h-[46px] md:w-[46px]"
              >
                <Search className="h-[24px] w-[24px] md:h-[16px] md:w-[16px]" />
              </button>
              <button
                type="button"
                className="flex h-[24px] w-[24px] items-center justify-center md:h-[46px] md:w-[56px] md:gap-[5px]"
              >
                <ShoppingCart className="h-[22px] w-[24px] md:h-[16px] md:w-[16px]" />
                <span className="hidden text-xs font-semibold md:inline">1</span>
              </button>
              <button
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                className="flex h-[14px] w-[24px] items-center justify-center md:hidden"
              >
                <Menu className="h-[14px] w-[24px]" />
              </button>
              <button
                type="button"
                className="hidden h-[46px] w-[56px] items-center justify-center gap-[5px] md:flex"
              >
                <Heart className="h-[16px] w-[16px]" />
                <span className="text-xs font-semibold">1</span>
              </button>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`flex w-full justify-center overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            isMobileMenuOpen
              ? 'max-h-[400px] pb-[30px] opacity-100'
              : 'max-h-0 pb-0 opacity-0'
          }`}
        >
          <nav className="flex w-[123px] flex-col items-center gap-[30px] font-['Montserrat'] text-[30px] font-normal leading-[45px] text-[#737373]">
            <Link to="/">Home</Link>
            <Link to="/">Product</Link>
            <Link to="/">Pricing</Link>
            <Link to="/">Contact</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

