const AppLoader = () => {
  return (
    <div className="min-h-[100svh] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin size-6 border-2 border-gray-300 border-t-gray-900 rounded-full mx-auto mb-2"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default AppLoader;