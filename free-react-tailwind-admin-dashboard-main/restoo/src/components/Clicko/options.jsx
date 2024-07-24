import React from "react";
import { FaCircle, FaStar } from "react-icons/fa";

const Options = () => {
  return (
    <div className="flex justify-start pt-4 gap-3">
      <div className="flex items-center justify-center h-8 w-20 border border-gray-400 rounded-lg gap-1">
        <FaCircle className="text-green-500 h-4 w-4 border border-green-500 rounded p-0.5" />
        <span className="text-sm">Veg</span>
      </div>
      <div className="flex items-center justify-center h-8 w-24 border border-gray-400 rounded-lg gap-1">
        <FaCircle className="text-red-500 h-4 w-4 border border-red-500 rounded p-0.5" />
        <span className="text-sm">Non Veg</span>
      </div>
      <div className="flex items-center justify-center h-8 w-28 border border-gray-400 rounded-lg gap-1">
        <FaStar className="text-purple-500 h-4 w-4 border border-purple-500 rounded p-0.5" />
        <span className="text-sm">Chef special</span>
      </div>
    </div>
  );
};

export default Options;
