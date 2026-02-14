import { Link } from 'react-router-dom'

export default function ProductCard({
  image,
  title,
  category,
  price,
  oldPrice,
  to,
  variant = 'default',
}) {
  const isCompact = variant === 'compact'
  const containerClass = isCompact
    ? 'flex h-[442px] w-full flex-col bg-white md:w-[239px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg'
    : 'flex h-[615px] w-[348px] flex-col bg-white md:h-[615px] md:w-[239px] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg'
  const imageClass = isCompact ? 'flex h-[280px] w-full' : 'flex h-[427px] w-full'
  const contentClass = isCompact
    ? 'flex h-[162px] w-full flex-col items-start gap-[10px] px-[25px] pt-[25px]'
    : 'flex h-[188px] w-full flex-col items-center gap-[10px] pt-[25px]'

  const content = (
    <>
      <div className={`${imageClass} bg-white`}>
        <img src={image} alt={title} className="h-full w-full object-contain" />
      </div>
      <div className={contentClass}>
        <p className="text-sm font-semibold text-[#252B42]">{title}</p>
        <p className="text-sm text-[#737373]">{category}</p>
        <div className="flex items-center gap-[5px] text-sm font-semibold">
          <span className="text-[#BDBDBD]">{price}</span>
          <span className="text-[#23856D]">{oldPrice}</span>
        </div>
        {!isCompact && (
          <div className="mt-[10px] flex items-center gap-[6.08px]">
            <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
            <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
            <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
            <span className="h-[16px] w-[16px] rounded-full bg-[#252B42]" />
          </div>
        )}
      </div>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={containerClass}>
        {content}
      </Link>
    )
  }

  return <div className={containerClass}>{content}</div>
}

