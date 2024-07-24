// src/components/MobilePage.js
import React, { useContext } from "react";
import Header from "../components/Header/header.jsx";
import Searchbar from "../components/searchbar/searchbar.jsx";
import Hero from "../components/Hero/hero.jsx";
import Firstmenu from "../components/Firstmenu/menu.jsx";
import Options from "../components/Clicko/options.jsx";
import Cartmenu from "../components/Cartmenu/cartmenu.jsx";
import Location from "../components/Location/location.jsx";
import Company from "../components/Company/company.jsx";
import Hours from "../components/timinghours/hours.jsx";
import Contactus from "../components/Contactus/contactus.jsx";
import Footer from "../components/Footer/footer.jsx";
const menupage = () => {

  return (
    <div className="min-h-screen bg-white flex flex-col  p-4">
      <Header />
      <Searchbar />
      <Hero />
      <Firstmenu />
      <Options />
      <Cartmenu />
      <Location />
      <Company/>
      <Hours/>
      <Contactus/>
      <Footer/>
    </div>
  );
};

export default menupage;
