// src/components/Header/header.jsx
import React, { useContext } from "react";
import Restrau from "../../../src/assets/header/restrau.png";
import Menuopen from "../Menuopen/menuopen";
import { MenuContext } from '../../context/menuContext.jsx';

const Header = () => {
  const user = useContext(MenuContext);

  return (
    <div>
      <header className="flex items-center justify-between p-3">
        <div className="flex items-center">
          <img
            className="w-[78px] h-[72px] rounded-[5px] border border-zinc-500"
            src={user[0].logo}
            alt="Logo"
          />
          <div className="flex flex-col ml-2">
            <span className="text-black text-base font-medium">{user.RestorentName}</span>
            <span className="text-black text-base font-medium -mt-1">modern brasserie</span>
            <span className="text-zinc-500 text-xs font-medium">Continental | Italian |</span>
            <span className="text-zinc-500 text-xs font-medium">Chinese</span>
          </div>
        </div>
        <Menuopen />
      </header>
    </div>
  );
};

export default Header;
