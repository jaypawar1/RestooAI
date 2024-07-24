import React from "react";
import Restrau from "../../../src/assets/header/restrau.png";
const company = () => {
  return (
    <div className="flex items-center flex-col p-3">
      <div className="flex items-center">
        <img
          className="w-12 h-11 rounded-[5px] border border-zinc-500"
          src={Restrau}
          alt="Logo"
        />
        <div className="flex flex-col ml-2">
          <span className="text-black text-base font-medium">
            Good Graces, modern brasseries
          </span>
          <span className="text-zinc-500 text-xs font-medium ">
            Continental | Italian | Chinese
          </span>
        </div>
      </div>
      <span className="text-gray-600 flex text-sm items-center border rounded-md shadow-sm p-1 mt-4  h-6  border-gray-400">
        Outdoor seating | Takeaway | Delivery
      </span>
      <span className="items-center flex text-xs font-semibold border rounded-md shadow-sm px-4 border-transparent mt-3 w-fit bg-lime-100">
        Average cost : for two people is INR 2000 (approx.)
      </span>
    </div>
  );
};

export default company;
