import { BrandHeader } from "ui-components"
import { BrandHero } from "ui-components"
import { BrandQuote } from "ui-components"

const BrandSection = () => {
  return (
    <aside className="hidden min-h-screen w-full items-center justify-center bg-primary px-6 py-8 text-white lg:flex lg:w-[45%] lg:px-8 lg:py-12">
      <div className="flex h-full w-full max-w-[560px] flex-col justify-between gap-10 rounded-[32px] border border-white/15 bg-white/10 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.28)] backdrop-blur-xl">
        <BrandHeader />
        <BrandHero />
        <BrandQuote />
      </div>
    </aside>
  )
}

export default BrandSection