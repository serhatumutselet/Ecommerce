import { ChevronRight, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'
import teamHeroMain from '../assets/Team/hero/1.jpg'
import teamHeroTopLeft from '../assets/Team/hero/2.jpg'
import teamHeroTopRight from '../assets/Team/hero/3.jpg'
import teamHeroBottomLeft from '../assets/Team/hero/4.jpg'
import teamHeroBottomRight from '../assets/Team/hero/5.jpg'
import teamMemberOne from '../assets/Team/members/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg'
import teamMemberTwo from '../assets/Team/members/139086e5ca1b2a889adad8205d13222ab4105506.jpg'
import teamMemberThree from '../assets/Team/members/14788f70a6747b5e74aa8fc67a9e46c99f77543b.jpg'
import teamMemberFour from '../assets/Team/members/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg'
import teamMemberFive from '../assets/Team/members/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg'
import teamMemberSix from '../assets/Team/members/7e902282946c71109661dfcd96fe9458abbd0e5b.jpg'
import teamMemberSeven from '../assets/Team/members/98e76ada179d14c5b5b80c9862a7cf5f8bdf6437.jpg'
import teamMemberEight from '../assets/Team/members/ca3428bbb53263f3cb265f6e0a1129f5afc25e74.jpg'
import teamMemberNine from '../assets/Team/members/ded65d448bb85dbe4a56197785c542fd6e7e057f.jpg'

export default function TeamPage() {
  const teamMembers = [
    { name: 'Username', role: 'Profession', image: teamMemberOne },
    { name: 'Username', role: 'Profession', image: teamMemberTwo },
    { name: 'Username', role: 'Profession', image: teamMemberThree },
    { name: 'Username', role: 'Profession', image: teamMemberFour },
    { name: 'Username', role: 'Profession', image: teamMemberFive },
    { name: 'Username', role: 'Profession', image: teamMemberSix },
    { name: 'Username', role: 'Profession', image: teamMemberSeven },
    { name: 'Username', role: 'Profession', image: teamMemberEight },
    { name: 'Username', role: 'Profession', image: teamMemberNine },
  ]

  return (
    <div className="flex w-full flex-col">
      <section className="mt-8 flex w-full justify-center bg-white md:mt-16">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-12 md:px-0 md:py-0">
          <div className="flex w-full max-w-[870px] justify-center md:h-[280px]">
            <div className="flex w-full flex-col items-center justify-center gap-[16px] text-center md:h-[180px] md:w-[788px]">
              <h5 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#737373]">
                WHAT WE DO
              </h5>
              <h2 className="whitespace-normal font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:whitespace-nowrap md:text-[58px] md:leading-[80px]">
                Innovation tailored for you
              </h2>
              <div className="flex items-center gap-[15px] font-['Montserrat'] text-[14px] font-bold leading-[24px] tracking-[0.2px]">
                <Link className="text-[#252B42]" to="/">
                  Home
                </Link>
                <ChevronRight className="h-[16px] w-[9px] text-[#BDBDBD]" />
                <span className="text-[#737373]">Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] flex-col gap-[10px] px-4 pb-16 md:flex-row md:gap-[10px] md:px-0 md:pb-0">
          <div className="h-[260px] w-full overflow-hidden md:h-[530px] md:w-[700px]">
            <img
              src={teamHeroMain}
              alt="Team workspace"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-[10px] md:w-[740px] md:gap-[10px]">
            <div className="h-[160px] w-full overflow-hidden md:h-[260px]">
              <img
                src={teamHeroTopLeft}
                alt="Team collaboration"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[160px] w-full overflow-hidden md:h-[260px]">
              <img
                src={teamHeroTopRight}
                alt="Team planning"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[160px] w-full overflow-hidden md:h-[260px]">
              <img
                src={teamHeroBottomLeft}
                alt="Team discussion"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="h-[160px] w-full overflow-hidden md:h-[260px]">
              <img
                src={teamHeroBottomRight}
                alt="Team meeting"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-0">
          <div className="flex w-full max-w-[1050px] flex-col items-center gap-[80px] md:gap-[112px]">
            <div className="flex w-full max-w-[607px] justify-center text-center">
              <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:mt-10 md:text-[58px] md:leading-[80px]">
                Meet Our Team
              </h2>
            </div>

            <div className="grid w-full gap-[30px] md:grid-cols-3">
              {teamMembers.map((member, index) => (
                <div
                  key={`${member.name}-${index}`}
                  className="flex w-full flex-col bg-white"
                >
                  <div className="h-[231px] w-full overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex h-[152px] w-full flex-col items-center justify-center gap-[10px]">
                    <h5 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                      {member.name}
                    </h5>
                    <h6 className="font-['Montserrat'] text-[14px] font-normal leading-[24px] text-[#737373]">
                      {member.role}
                    </h6>
                    <div className="mt-[4px] flex items-center gap-[20px] text-[#23A6F0]">
                      <Facebook className="h-[24px] w-[24px]" />
                      <Instagram className="h-[24px] w-[24px]" />
                      <Twitter className="h-[20px] w-[24px]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-0">
          <div className="flex w-full max-w-[1050px] justify-center">
            <div className="flex w-full max-w-[607px] flex-col items-center gap-[36px] text-center md:py-[80px]">
              <div className="flex w-full flex-col items-center gap-[30px]">
                <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                  Start your 14 days free trial
                </h2>
                <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#737373]">
                  Met minim Mollie non desert Alamo est sit cliquey dolor do
                  met sent.
                </p>
              </div>
              <button
                type="button"
                className="flex h-[52px] w-[186px] items-center justify-center rounded-[5px] bg-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white"
              >
                Try it free now
              </button>
              <div className="flex items-center gap-[34px]">
                <Twitter className="h-[24px] w-[30px] text-[#55ACEE]" />
                <Facebook className="h-[30px] w-[30px] text-[#395185]" />
                <Instagram className="h-[30px] w-[30px] text-black" />
                <Linkedin className="h-[30px] w-[30px] text-[#0A66C2]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

