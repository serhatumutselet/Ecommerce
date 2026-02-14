import aboutHeroImage from '../assets/about us/about.png'
import aboutVideoImage from '../assets/Featured Posts/1.png'
import teamMemberOne from '../assets/Team/members/0a05d6ce0fd1eeff9355b162a7e7c01605dd3c55.jpg'
import teamMemberTwo from '../assets/Team/members/54268cf04ad0f612e9f8f311e9d1c6bbd31a03f3.jpg'
import teamMemberThree from '../assets/Team/members/24a6b8d9efd1b9c2401fb0702dc41f18a42ed89c.jpg'
import logoAws from '../assets/Company Logos/aws.png'
import logoHooli from '../assets/Company Logos/hooli.png'
import logoLeaf from '../assets/Company Logos/leaf.png'
import logoLyft from '../assets/Company Logos/lyft.png'
import logoReddit from '../assets/Company Logos/reddit.png'
import logoStripe from '../assets/Company Logos/stripe.png'
import testimonialImage from '../assets/Team/hero/5.jpg'

export default function AboutPage() {
  const teamMembers = [
    { name: 'Username', role: 'Profession', image: teamMemberOne },
    { name: 'Username', role: 'Profession', image: teamMemberTwo },
    { name: 'Username', role: 'Profession', image: teamMemberThree },
  ]
  const clientLogos = [
    { src: logoHooli, alt: 'Hooli' },
    { src: logoLyft, alt: 'Lyft' },
    { src: logoLeaf, alt: 'Leaf' },
    { src: logoStripe, alt: 'Stripe' },
    { src: logoAws, alt: 'AWS' },
    { src: logoReddit, alt: 'Reddit' },
  ]

  return (
    <div className="flex w-full flex-col">
      <section className="relative flex w-full justify-center overflow-hidden bg-white">
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          <div className="absolute right-0 top-[117px] h-[612px] w-[632px]">
            <img
              src={aboutHeroImage}
              alt="About us"
              className="absolute left-[10px] top-[-90px] h-[668px] w-[571px] object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex w-full max-w-[1440px] justify-center px-4 py-16 md:h-[729px] md:px-0 md:py-0">
          <div className="flex w-full max-w-[1050px] flex-col md:pt-[104px]">
            <div className="flex w-full flex-col gap-[30px] md:flex-row">
              <div className="flex w-full max-w-[599px] flex-col gap-[35px]">
                <h5 className="font-['Montserrat'] text-[16px] font-bold leading-[24px] text-[#252B42]">
                  ABOUT COMPANY
                </h5>
                <h1 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                  ABOUT US
                </h1>
                <p className="font-['Montserrat'] text-[20px] font-normal leading-[30px] text-[#737373]">
                  We know how large objects will act, but things on a small
                  scale.
                </p>
                <button
                  type="button"
                  className="flex h-[52px] w-[195px] items-center justify-center rounded-[5px] bg-[#23A6F0] font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white"
                >
                  Get Quote Now
                </button>
              </div>
              <div className="hidden w-full max-w-[415px] md:block" />
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-0">
          <div className="flex w-full max-w-[1018px] flex-col gap-10 md:flex-row md:items-center md:gap-[60px] md:py-[24px]">
            <div className="flex w-full max-w-[394px] flex-col gap-[24px]">
              <p className="font-['Montserrat'] text-[14px] font-bold leading-[20px] text-[#E74040]">
                Problems trying
              </p>
              <h2 className="font-['Montserrat'] text-[32px] font-bold leading-[48px] tracking-[0.2px] text-[#252B42]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met
                sent.
              </h2>
            </div>
            <div className="flex w-full max-w-[545px]">
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#737373]">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-12 md:px-0 md:py-0">
          <div className="flex w-full max-w-[1050px] justify-center md:py-[80px]">
            <div className="grid w-full grid-cols-2 gap-6 text-center md:grid-cols-4 md:gap-[30px]">
              {[
                { value: '15K', label: 'Happy Customers' },
                { value: '150K', label: 'Monthly Visitors' },
                { value: '15', label: 'Countries Worldwide' },
                { value: '100+', label: 'Top Partners' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
                    {stat.value}
                  </h2>
                  <p className="font-['Montserrat'] text-[14px] font-bold leading-[24px] text-[#737373]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[112px]">
          <div className="flex w-full max-w-[1050px] justify-center">
            <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] md:h-[540px] md:w-[989px]">
              <img
                src={aboutVideoImage}
                alt="About video"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[rgba(0,0,0,0.84)]" />
              <button
                type="button"
                className="absolute left-1/2 top-1/2 flex h-[92.6px] w-[92.6px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#23A6F0]"
              >
                <span className="ml-[3px] h-0 w-0 border-y-[11px] border-l-[19px] border-y-transparent border-l-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-white">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[112px]">
          <div className="flex w-full max-w-[1050px] flex-col items-center gap-[60px]">
            <div className="flex w-full max-w-[607px] flex-col items-center gap-[10px] text-center">
              <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                Meet Our Team
              </h2>
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#737373]">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics
              </p>
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
                      <span className="h-[24px] w-[24px]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.325 24h11.495v-9.294H9.691V11.01h3.129V8.309c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.716-1.796 1.766v2.317h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                        </svg>
                      </span>
                      <span className="h-[24px] w-[24px]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.9-7.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zm3.1 2.2c-.1-1.3-.4-2.5-1.4-3.5s-2.2-1.3-3.5-1.4c-1.4-.1-5.4-.1-6.8 0-1.3.1-2.5.4-3.5 1.4s-1.3 2.2-1.4 3.5c-.1 1.4-.1 5.4 0 6.8.1 1.3.4 2.5 1.4 3.5s2.2 1.3 3.5 1.4c1.4.1 5.4.1 6.8 0 1.3-.1 2.5-.4 3.5-1.4s1.3-2.2 1.4-3.5c.1-1.4.1-5.4 0-6.8zm-2 8.3a3.6 3.6 0 0 1-2 2c-1.4.6-4.7.5-7 .5s-5.6.1-7-.5a3.6 3.6 0 0 1-2-2c-.6-1.4-.5-4.7-.5-7s-.1-5.6.5-7a3.6 3.6 0 0 1 2-2c1.4-.6 4.7-.5 7-.5s5.6-.1 7 .5a3.6 3.6 0 0 1 2 2c.6 1.4.5 4.7.5 7s.1 5.6-.5 7z" />
                        </svg>
                      </span>
                      <span className="h-[24px] w-[24px]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path d="M24 4.557a9.8 9.8 0 0 1-2.828.775A4.93 4.93 0 0 0 23.337 3.6a9.86 9.86 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149a4.915 4.915 0 0 0 1.523 6.574 4.9 4.9 0 0 1-2.229-.616v.062a4.918 4.918 0 0 0 3.946 4.827 4.9 4.9 0 0 1-2.224.085 4.918 4.918 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 21.542a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.496 14.01-13.986 0-.21 0-.423-.015-.634A10.012 10.012 0 0 0 24 4.557z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-[#FAFAFA]">
        <div className="flex w-full max-w-[1440px] justify-center px-4 py-16 md:px-0 md:py-[80px]">
          <div className="flex w-full max-w-[1050px] flex-col items-center gap-[40px]">
            <div className="flex w-full max-w-[864px] flex-col items-center gap-[30px] text-center">
              <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                Big Companies Are Here
              </h2>
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px] text-[#737373]">
                Problems trying to resolve the conflict between the two major
                realms of Classical physics: Newtonian mechanics
              </p>
            </div>
            <div className="grid w-full grid-cols-2 items-center gap-6 md:grid-cols-6 md:gap-[30px]">
              {clientLogos.map((logo) => (
                <div
                  key={logo.alt}
                  className="flex h-[72px] items-center justify-center"
                >
                  <img src={logo.src} alt={logo.alt} className="h-full w-auto" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full justify-center bg-[#2A7CC7]">
        <div className="flex w-full max-w-[1440px] flex-col md:flex-row">
          <div className="flex w-full flex-col justify-center px-6 py-16 md:w-[850px] md:px-[195px] md:py-0">
            <div className="flex w-full max-w-[438px] flex-col gap-[24px] text-white">
              <h5 className="font-['Montserrat'] text-[16px] font-bold leading-[24px]">
                WORK WITH US
              </h5>
              <h2 className="font-['Montserrat'] text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">
                Now Let&apos;s grow Yours
              </h2>
              <p className="font-['Montserrat'] text-[14px] font-normal leading-[20px]">
                The gradual accumulation of information about atomic and
                small-scale behavior during the first quarter of the 20th
                century.
              </p>
              <button
                type="button"
                className="flex h-[52px] w-[130px] items-center justify-center rounded-[5px] border border-white font-['Montserrat'] text-[14px] font-bold leading-[22px] tracking-[0.2px] text-white"
              >
                Button
              </button>
            </div>
          </div>
          <div className="hidden w-full md:block md:h-[636px] md:w-[590px]">
            <img
              src={testimonialImage}
              alt="Testimonial"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}

