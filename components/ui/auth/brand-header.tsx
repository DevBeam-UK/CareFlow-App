const BrandHeader = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-base font-semibold text-white">
          CF
        </div>
        <div>
          <p className="text-3xl font-semibold text-white">CareFlow</p>
          <p className="text-xs text-gray-300">SPMC - Home Care Platform</p>
        </div>
      </div>
    </div>
  )
}

export default BrandHeader
