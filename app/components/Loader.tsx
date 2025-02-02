import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-gay-100 bg-opacity-30 z-[9999] h-[100vh]">
      <div className="w-[100px] h-[100px] rounded-full border-[10px] border-gray-300 border-t-orange-500 animate-spin"></div>
    </div>
  );
};

export default Loader;
