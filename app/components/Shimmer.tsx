const Shimmer = () => {
  return (
    <div className="px-10 py-6">
      <div className="animate-pulse bg-gray-200 h-20 w-full rounded-lg mb-4"></div>
      
      <div className="my-2 shadow rounded-lg p-6 bg-white">
        <div className="animate-pulse bg-gray-300 h-6 w-1/3 rounded mb-2"></div>
        <div className="animate-pulse bg-gray-200 h-4 w-2/3 rounded"></div>
      </div>
      
      <div className="flex justify-between items-start gap-4">
        {/* Left Section - Cart Items */}
        <div className="flex flex-col gap-4 bg-white shadow rounded-md p-6 w-2/3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="animate-pulse bg-gray-200 h-24 w-24 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="animate-pulse bg-gray-300 h-5 w-2/3 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
                <div className="animate-pulse bg-gray-200 h-4 w-1/3 rounded"></div>
              </div>
              <div className="animate-pulse bg-gray-300 h-10 w-10 rounded"></div>
            </div>
          ))}
        </div>

        {/* Right Section - Price Details */}
        <div className="border rounded-lg p-6 space-y-4 bg-white shadow w-1/3 h-fit">
          <div className="animate-pulse bg-gray-300 h-5 w-1/3 rounded"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="animate-pulse bg-gray-200 h-4 w-1/2 rounded"></div>
              <div className="animate-pulse bg-gray-200 h-4 w-1/4 rounded"></div>
            </div>
          ))}
          <div className="animate-pulse bg-gray-300 h-6 w-full rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default Shimmer;