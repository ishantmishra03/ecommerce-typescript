import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
