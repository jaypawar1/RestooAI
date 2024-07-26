import React, { useState, ChangeEvent, FormEvent } from "react";
import BG from './BG.svg';
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface InfoBoxProps {
  title: string;
  children: React.ReactNode;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col px-2 pb-2 text-base leading-6 rounded-xl shadow-md backdrop-blur-[31.233333587646484px] bg-blue-300 bg-opacity-10 text-neutral-600">
      <div className="flex flex-col p-2.5 rounded-lg">
        <div className="self-center text-2xl leading-9 text-red-600">{title}</div>
        <div className="mt-3.5 px-5">{children}</div>
      </div>
    </div>
  );
}

const WhatsAppForm: React.FC = () => {
  const navigator = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    restaurant: "",
    website: "",
    mobile: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {

    event.preventDefault();
    const businessData = {
      display_name: formData.name,
      email: formData.email,
      company: formData.restaurant,
      contact: formData.mobile,
      password: formData.password,
    };
    const token = localStorage.getItem("token");

    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const user = await axios.get(`${url}/api/user`, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
      })
      if (!user.data.businessId) {
        const response = await axios.post(`${url}/api/business/`, businessData, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });
        const response2 = await axios.post(`${url}/api/business/project`, { name: businessData.company }, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });
        console.log("Business created successfully:", response2.data);
        console.log("Business created successfully:", response.data);
      } else {
        const response2 = await axios.post(`${url}/api/business/project`, { name: businessData.company }, {
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `${token}`,
          },
        });
        console.log("Business created successfully:", response2.data);
      }
      navigator("/whatsapponboard")
      // Handle the response as needed, e.g., store the business ID
    } catch (error: any) {
      console.error("Error creating business:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex justify-center items-center px-16 w-full max-md:px-5 max-md:max-w-full" style={{ background: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <section className="flex flex-col mt-14 mb-20 w-full max-w-[1044px] max-md:my-10 max-md:max-w-full">
        <header className="self-center text-4xl font-semibold text-[#4BC500] max-md:max-w-full">
          WhatsApp API Registration Form
        </header>
        <form className="mt-16 max-md:mt-10 max-md:max-w-full" onSubmit={handleSubmit}>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow mt-6 text-xl leading-8 text-black max-md:mt-10 max-md:max-w-full">
                <label htmlFor="name" className="max-md:max-w-full">Name</label>
                <input id="name" value={formData.name} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <label htmlFor="email" className="mt-3 max-md:max-w-full">Email ID</label>
                <input id="email" value={formData.email} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <label htmlFor="restaurant" className="mt-3 max-md:max-w-full">Restaurant name</label>
                <input id="restaurant" value={formData.restaurant} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <label htmlFor="website" className="mt-3 max-md:max-w-full">Website name</label>
                <input id="website" value={formData.website} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <label htmlFor="mobile" className="mt-3 max-md:max-w-full">Mobile number</label>
                <input id="mobile" value={formData.mobile} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <label htmlFor="password" className="mt-3 max-md:max-w-full">Password</label>
                <input id="password" value={formData.password} onChange={handleInputChange} className="justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0" />
                <button type="submit" className="justify-center self-center px-4 py-2.5 mt-12 text-base font-medium text-white bg-[#4BC500] rounded-lg shadow-sm max-md:px-5 max-md:mt-10">Generate SignUp URL</button>
              </div>
            </section>
            <aside className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col font-medium max-md:mt-10">
                <InfoBox title="Warning !">
                  <p>Before proceeding please ensure that the following points are followed.</p>
                  <div className="w-full h-full px-7">
                    <ul className="list-disc text-gray-600 text-base font-inter font-normal leading-6 break-words">
                      <li>Phone number to be registered should not be in use with any WhatsApp account.</li>
                      <li>Your business entity is registered.</li>
                      <li>A verified Facebook Business Account.</li>
                      <li>You should have an active business website.</li>
                    </ul>
                  </div>
                </InfoBox>
                <div className="justify-center items-center px-16 pt-36 pb-28 mt-5 text-xs leading-5 text-black bg-gray-200 rounded-lg max-md:px-5 max-md:pt-10">information with image</div>
              </div>
            </aside>
          </div>
        </form>
      </section>
    </div>
  );
}

export default WhatsAppForm;
