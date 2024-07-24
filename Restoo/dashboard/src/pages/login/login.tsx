import * as React from "react";
import { useState } from "react";
import BG from "../signup/BG.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  email: string;
  password: string;
}

function TextInput({ id, label, placeholder, type = "text", value, onChange }: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
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
}

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log(formData);
      const url =import.meta.env.VITE_SERVER_URL;
      const response = await axios.post(`${url}/api/auth/login`, formData);
      console.log("Login successful:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      navigate("/onboarding");
    } catch (error:any) {
      console.error("Error during login:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center border border-black border-solid shadow-sm" style={{ background: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="flex justify-center items-center py-16 w-full max-md:px-4 max-md:max-w-full">
        <div className="mt-12 mb-2.5 w-full max-w-[1200px] max-md:mt-8 max-md:max-w-full">
          <div className="flex gap-4 max-md:flex-col max-md:gap-0">
            <section className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
              <header className="flex flex-col items-center pb-2.5 mt-6 text-xl font-medium tracking-tight leading-8 text-zinc-700 max-md:mt-8 max-md:max-w-full">
                <h1 className="text-6xl font-semibold tracking-tighter mb-5 text-center text-black max-md:text-3xl">Restoo<span className="text-[#4BC500]">AI</span></h1>
              </header>
              <div className="w-[582px] h-[600px] bg-slate-400"></div>
            </section>
            <section className="flex justify-between flex-col ml-4 w-6/12 max-md:ml-0 max-md:w-full">
              <form className="custom-shadow shadow-neutral-600 rounded-xl backdrop-blur-xl flex flex-col grow px-6 pt-16 pb-16 w-full text-lg leading-7 bg-blue-300 bg-opacity-10 text-zinc-500 max-md:px-4 max-md:mt-8 max-md:max-w-full" onSubmit={handleLogin}>
                <h1 className="self-center text-4xl mb-9 font-bold tracking-tight text-center text-black max-md:max-w-full">
                  Welcome<span className="text-[#4BC500]"> back!</span> 
                </h1>
                <div className="justify-center flex flex-col">
                  <TextInput id="email" label="Email Id" placeholder="Email" value={formData.email} onChange={handleInputChange} />
                  <TextInput id="password" label="Password" placeholder="Enter Password" type="password" value={formData.password} onChange={handleInputChange} />
                  <p className="mt-2 max-md:max-w-full text-blue-400">
                    Forget password
                  </p>
                  <button
                    type="submit"
                    className="self-center px-4 py-2 mt-8 max-w-full font-medium text-white bg-[#4BC500] rounded-lg shadow-sm w-[250px] max-md:px-4 max-md:mt-8"
                  >
                    Login
                  </button>
                </div>
                <div className="self-center mt-8 text-base leading-6 text-center w-[300px]">
                  <p className="self-center mt-8 text-base leading-6 text-center w-[300px]">
                    By clicking continue, you agree to our{" "}
                    <a href="#" className="text-blue-500 underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-500 underline">
                      Privacy Policy
                    </a>
                  </p>
                </div>
                <div className="self-center mt-8 text-base leading-6 text-center w-[300px]">
                  <p>Don’t have account? <span className="text-blue-500 underline" onClick={() => navigate("/signup")}>Sign up</span></p>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
