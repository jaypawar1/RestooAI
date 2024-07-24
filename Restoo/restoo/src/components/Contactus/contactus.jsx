import React from "react";
import Email from "../../../src/assets/contactus/mail.svg";
import Phone from "../../../src/assets/contactus/phone.svg";
import Location from "../../../src/assets/contactus/location.svg";
import Instagram from "../../../src/assets/contactus/instagram.svg";
import Facebook from "../../../src/assets/contactus/facebook.svg";
const ContactUs = () => {
  return (
    <div className="flex flex-col ">
      <span className="text-sm font-semibold mb-4">Contact Us:</span>
      <div className="border rounded-xl border-gray-500 w-full  px-4 py-3 items-center">
        <div className="flex items-center mb-3">
          <img src={Email} alt="Enquires" className="w-6 h-6" />
          <h3 className="ml-2 text-gray-500 text-xs font-medium">
            abc@gmail.com
          </h3>
        </div>
        <hr className="border border-zinc-300 my-2" />
        <div className="flex items-center mb-3">
          <img src={Phone} alt="Enquires" className="w-6 h-6" />
          <h3 className="ml-2 text-gray-500 text-xs font-medium">
            Whatsapp : +91xxxxxx-
          </h3>
        </div>
        <hr className="border border-zinc-300 my-2" />
        <div className="flex items-center">
          <img src={Location} alt="Enquires" className="w-6 h-6" />
          <h3 className="ml-2 text-gray-500 text-xs font-medium">
            asdfghjvbnm
          </h3>
        </div>
      </div>
      <span className="text-sm font-semibold mt-4">Follow Us:</span>
      <div className="flex items-center justify-center mt-2">
        <img src={Instagram} alt="Instagram" className="w-7 h-7" />
        <h3 className="ml-2 text-gray-500 text-xs font-medium">asdfghjkljsv</h3>

        <img src={Facebook} alt="Facebook" className="w-7 h-7 ml-10" />
        <h3 className="ml-2 text-gray-500 text-xs font-medium">asdfghjkljsv</h3>
      </div>
      <hr className="border border-zinc-300 my-3" />
    </div>
  );
};

export default ContactUs;
