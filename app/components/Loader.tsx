import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-[9999] flex justify-center items-center">
      <div className="w-[100px] h-[100px] rounded-full border-[10px] border-gray-300 border-t-orange-500 animate-spin"></div>
    </div>
  );
};

export default Loader;