import React, { useState } from "react";
import axios from "axios";
import BG from './BG.svg';

const WhatsAppOnboard: React.FC = () => {
  const [signupUrl, setSignupUrl] = useState<string | null>(null);
  const [migrationUrl, setMigrationUrl] = useState<string | null>(null);

  const handleSignupClick = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post<{ embeddedSignupURL: string }>(
        'https://apis.aisensy.com/partner-apis/v1/partner/65e9fcb8abfa6918944c960e/generate-waba-link',
        {
          
        },
        {
          headers: {
            "Authorization": `${token}`
          }
        }
      );
      setSignupUrl(response.data.embeddedSignupURL);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleMigrationClick = async () => {
    try {
      const response = await axios.post<{ embeddedMigrationURL: string }>(
        '/your-migration-api-endpoint',
        {}
      );
      setMigrationUrl(response.data.embeddedMigrationURL);
    } catch (error) {
      console.error('Error during migration:', error);
    }
  };

  return (
    <main 
      className="flex justify-center items-center px-16 py-20 w-full min-h-screen max-md:px-5 max-md:max-w-full" 
      style={{ background: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-col items-center max-w-full w-[648px] max-md:my-10">
        <header className="self-stretch text-3xl text-center font-semibold text-[#4BC500] max-md:max-w-full">
          WhatsApp API Registration Form
        </header>

        <section className="mt-10">
          <h2 className="text-base font-medium text-black">WhatsApp Business API Account SignUp URL</h2>
          <div className="flex gap-5 items-center pl-2.5 mt-6 rounded shadow-sm bg-zinc-100">
            <span className="z-10 grow self-stretch my-auto text-xs font-medium text-stone-300">
              {signupUrl ? signupUrl : "Generate the URL"}
            </span>
            {signupUrl ? (
              <a
                href={signupUrl}
                className="z-10 justify-center self-stretch px-5 py-3.5 my-auto text-sm font-semibold text-white bg-[#4BC500] rounded shadow-sm max-md:pl-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Link
              </a>
            ) : (
              <button
                onClick={handleSignupClick}
                className="z-10 justify-center self-stretch px-5 py-3.5 my-auto text-sm font-semibold text-white bg-[#4BC500] rounded shadow-sm max-md:pl-5"
              >
                Generate Link
              </button>
            )}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-base font-medium text-black">WhatsApp Business API Account Migration URL</h2>
          <div className="flex gap-5 items-center pl-2.5 mt-6 rounded shadow-sm bg-zinc-100">
            <span className="z-10 grow self-stretch my-auto text-xs font-medium text-stone-300">
              {migrationUrl ? migrationUrl : "Generate the URL"}
            </span>
            {migrationUrl ? (
              <a
                href={migrationUrl}
                className="z-10 justify-center self-stretch px-5 py-3.5 my-auto text-sm font-semibold text-white bg-[#4BC500] rounded shadow-sm max-md:pl-5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Link
              </a>
            ) : (
              <button
                onClick={handleMigrationClick}
                className="z-10 justify-center self-stretch px-5 py-3.5 my-auto text-sm font-semibold text-white bg-[#4BC500] rounded shadow-sm max-md:pl-5"
              >
                Generate Link
              </button>
            )}
          </div>
        </section>

        <section className="mt-11 text-base font-medium text-center text-zinc-500 max-md:mt-10">
          Complete your WhatsApp API registration process
        </section>

        <button className="justify-center px-7 py-2 mt-9 text-base font-medium text-white rounded-lg shadow-sm bg-zinc-300 max-md:px-5">
          Start your journey
        </button>
      </div>
    </main>
  );
}

export default WhatsAppOnboard;
