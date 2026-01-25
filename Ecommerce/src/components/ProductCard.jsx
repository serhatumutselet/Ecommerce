export default function ProductCard({ image, title, category, price, oldPrice }) {
  return (
    <div className="flex h-[615px] w-[239px] flex-col bg-white">
      <div className="flex h-[427px] w-full">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>
      <div className="flex h-[188px] w-full flex-col items-center gap-[10px] pt-[25px]">
        <p className="text-sm font-semibold text-[#252B42]">{title}</p>
        <p className="text-sm text-[#737373]">{category}</p>
        <div className="flex items-center gap-[5px] text-sm font-semibold">
          <span className="text-[#BDBDBD]">{price}</span>
          <span className="text-[#23856D]">{oldPrice}</span>
        </div>
        <div className="mt-[10px] flex items-center gap-[6.08px]">
          <span className="h-[16px] w-[16px] rounded-full bg-[#23A6F0]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#23856D]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#E77C40]" />
          <span className="h-[16px] w-[16px] rounded-full bg-[#252B42]" />
        </div>
      </div>
    </div>
  )
}

