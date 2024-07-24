import React from "react";
import SearchIcon from "../../../src/assets/search/search.svg";
const searchbar = () => {
  return (
    <div className="flex items-center justify-center w-full h-full rounded-lg border border-zinc-500 p-2">
      <img src={SearchIcon} alt="Search Icon" className="w-6 h-6" />
      <input
        type="text"
        placeholder="Search for item"
        className="ml-2 w-full h-full outline-none"
      />
    </div>
  );
};

export default searchbar;
