export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        {/* Spinning ring */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary rounded-full animate-spin border-t-transparent"></div>
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 text-primary rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      <div className="text-gray-600 font-medium animate-pulse">Loading talent...</div>
    </div>
  )
}