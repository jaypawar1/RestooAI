import React, { useEffect, useRef, useState } from "react";
import MenuIcon from "../../../src/assets/header/menu.svg";
import Restrau from "../../../src/assets/header/restrau.png";
import Profile from "../../../src/assets/header/profile.svg";
import Orders from "../../../src/assets/header/orders.svg";
import Enquiry from "../../../src/assets/header/inquires.svg";
import Address from "../../../src/assets/header/location.svg";
import Logout from "../../../src/assets/header/logout.svg";

const MenuOpen = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-50" ref={menuRef}>
      <div onClick={() => setOpen(!open)}>
        <img src={MenuIcon} alt="Menu Icon" className="cursor-pointer" />
      </div>
      {open && (
        <div className="fixed top-0 right-0 w-60 bg-white shadow-lg p-4 pt-10">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full border border-zinc-500"
              src={Restrau}
              alt="Logo"
            />
            <div className="ml-2">
              <div className="text-black font-medium">Good Graces,</div>
              <div className="text-black font-medium">modern brasseries</div>
            </div>
          </div>
          <hr className="border border-zinc-300 my-2" />
          <div className="text-lime-600 text-sm font-medium">Account Settings</div>
          <hr className="border border-zinc-300 my-2" />
          <div className="flex items-center mt-4">
            <img src={Profile} alt="Profile" className="w-7 h-7 rounded-full bg-zinc-300" />
            <div className="ml-2">
              <div className="text-zinc-900 font-medium">Jay Pawar</div>
              <div className="text-zinc-900 text-xs font-medium">6382467&30</div>
            </div>
          </div>
          <hr className="border border-zinc-300 my-2" />
          <div className="flex items-center mt-4">
            <img src={Orders} alt="Orders" className="w-4 h-4" />
            <div className="ml-2">
              <div className="text-zinc-900 text-xs font-medium">Orders</div>
            </div>
          </div>
          <hr className="border border-zinc-300 my-2" />
          <div className="flex items-center mt-4">
            <img src={Enquiry} alt="Enquires" className="w-4 h-4" />
            <div className="ml-2">
              <div className="text-zinc-900 text-xs font-medium">Enquires</div>
            </div>
          </div>
          <hr className="border border-zinc-300 my-2" />
          <div className="flex items-center mt-4">
            <img src={Address} alt="Address Book" className="w-4 h-4" />
            <div className="ml-2">
              <div className="text-zinc-900 text-xs font-medium">Address Book</div>
            </div>
          </div>
          <hr className="border border-zinc-300 my-2" />
          <div className="flex items-center mt-4">
            <img src={Logout} alt="Logout" className="w-4 h-4" />
            <div className="ml-2">
              <div className="text-rose-500 text-xs font-medium">Logout</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuOpen;
