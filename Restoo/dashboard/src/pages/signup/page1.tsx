import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BG from "./BG.svg"; // Ensure BG.svg is placed in the src folder or adjust the path accordingly

interface CardProps {
  imgSrc: string;
  altText: string;
  children: React.ReactNode;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ imgSrc, altText, children, bgColor }) => (
  <div className={`self-center flex gap-4 px-4 py-2 mt-8 rounded-lg items-center ${bgColor} w-[500px] h-14`}>
    <img loading="lazy" src={imgSrc} alt={altText} className="shrink-0 aspect-[1.18] w-[50px]" />
    <div className="flex-auto text-xl font-semibold text-gray-600">{children}</div>
  </div>
);

interface TextInputProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, placeholder, type = "text", value, onChange }) => (
  <div className="mt-4 max-md:max-w-full">
    <label htmlFor={id} className="text-black font-medium pl-2">
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="block w-[100%] justify-center items-start px-3.5 py-5 mt-3 text-base whitespace-nowrap rounded-md border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full bg-transparent bg-opacity-0"
    />
  </div>
);

const RestooAI: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const url = import.meta.env.VITE_SERVER_URL;
      const response = await axios.post<{ token: string }>(`${url}/api/auth/signup`, formData);
      console.log("Signup successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      // Assuming successful signup response includes user data
      navigate("/onboarding");
    } catch (error: any) {
      console.error("Error during signup:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black border-solid shadow-sm" style={{ background: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex justify-center items-center py-16 w-full max-md:px-4 max-md:max-w-full">
        <div className="mt-12 mb-2.5 w-full max-w-[1200px] max-md:mt-8 max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <header className="flex flex-col items-center pb-2.5 mt-6 text-xl font-medium tracking-tight leading-8 text-zinc-700 max-md:mt-8 max-md:max-w-full">
                <h1 className="text-6xl font-semibold tracking-tighter text-center text-black max-md:text-3xl">Restoo<span className="text-[#4BC500]">AI</span></h1>
                <p className="self-stretch mt-7 text-3xl font-bold tracking-tight leading-8 text-center text-[#4BC500] max-md:max-w-full">
                  <span className="font-semibold text-stone-900 pb-4">60% of customers don’t come back</span><br />
                  <span className="font-semibold text-stone-900">after their first visit</span>, <span className="font-semibold text-[#4BC500]">let's change that</span>
                </p>
              </header>
              <Card imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/f0dcc66cfca1949a8795bd514219564184d4792c04a6642c6bef0292eac3b70a?apiKey=aa24bd8d60704a07990899bf4a9a0488&" altText="Relax icon" bgColor="bg-green-200">
                Relax, we will bring back your customer.
              </Card>
              <Card imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/5fee42ffcde11ee9d063b442be7fae6744f47a63925ead9d2e7e804ff0ee4717?apiKey=aa24bd8d60704a07990899bf4a9a0488&" altText="Increase reviews icon" bgColor="bg-blue-200">
                Increase google reviews automatically
              </Card>
              <Card imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/3884c0c134690e2cf609ceb3f51a3b8a8874bc036aab99d7c6e839ca7b248d68?apiKey=aa24bd8d60704a07990899bf4a9a0488&" altText="Revenue icon" bgColor="bg-purple-300">
                10x revenue with WhatsApp campaigns
              </Card>
            </section>
            <section className="flex flex-col ml-4 w-6/12 max-md:ml-0 max-md:w-full">
              <form onSubmit={handleSignUp} className="custom-shadow shadow-neutral-600 rounded-xl backdrop-blur-xl flex flex-col grow px-6 pt-8 pb-6 w-full text-lg leading-7 bg-blue-300 bg-opacity-10 text-zinc-500 max-md:px-4 max-md:mt-8 max-md:max-w-full">
                <h1 className="self-center text-3xl font-semibold tracking-tight text-center text-black max-md:max-w-full">
                  Let’s<span className="text-[#4BC500]"> grow your business</span> with us!
                </h1>
                <TextInput id="name" label="Name" placeholder="Full name" value={formData.name} onChange={handleInputChange} />
                <TextInput id="email" label="Email ID" placeholder="Enter email" type="email" value={formData.email} onChange={handleInputChange} />
                <TextInput id="mobile" label="Mobile number" placeholder="+91" value={formData.mobile} onChange={handleInputChange} />
                <TextInput id="password" label="Password" placeholder="Create a safe password" type="password" value={formData.password} onChange={handleInputChange} />
                <p className="mt-2 max-md:max-w-full">
                  At least 8 characters, but longer is better
                </p>
                <button
                  type="submit"
                  className="self-center px-4 py-2 mt-8 max-w-full font-medium text-white bg-[#4BC500] rounded-lg shadow-sm w-[250px] max-md:px-4 max-md:mt-8"
                >
                  Sign up today
                </button>
                <div className=" w-[100%] flex flex-col justify-center items-center">
                  <div>
                    or
                  </div>
                  <Link to="/login">
                    Login
                  </Link>
                </div>
                <p className="self-center mt-8 text-base leading-6 text-center text-blue-500 w-[300px]">
                  By clicking continue, you agree to our{" "}
                  <a href="#" className="text-blue-500 underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500 underline">
                    Privacy Policy
                  </a>
                </p>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestooAI;
