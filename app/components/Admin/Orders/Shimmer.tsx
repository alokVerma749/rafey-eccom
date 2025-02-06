const Shimmer= () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="animate-pulse bg-gray-300 h-6 w-1/3 rounded mb-4"></div>
      
      {/* Table Header */}
      <div className="grid grid-cols-8 gap-4 py-2 border-b">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-gray-300 h-5 w-full rounded"></div>
        ))}
      </div>
      
      {/* Table Rows */}
      {[...Array(6)].map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-8 gap-4 py-4 border-b">
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="flex items-center gap-2">
            <div className="animate-pulse bg-gray-400 h-8 w-8 rounded-full"></div>
            <div className="animate-pulse bg-gray-200 h-5 w-24 rounded"></div>
          </div>
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-5 w-full rounded"></div>
          <div className="animate-pulse bg-gray-200 h-5 w-12 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
