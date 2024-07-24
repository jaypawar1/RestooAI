import React from "react";
import locationicon from "../../assets/location/location.svg";
import locationimage from "../../assets/location/location2.svg";

const Location = () => {
  return (
    <div className="flex flex-col mt-4 mb-2">
      <div className=" flex ml-0 mb-1">
        <img src={locationicon} alt="Location Icon" className="w-6 h-6 mr-2" />
        <span className="text-sm font-semibold mr-2">Location</span>
      </div>
      <img src={locationimage} alt="Location Image" className="w-full h-auto" />
    </div>
  );
};

export default Location;
