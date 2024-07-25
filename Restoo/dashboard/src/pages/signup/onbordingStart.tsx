import React, { useState } from "react";
import BG from "./BG.svg";
import { useNavigate } from "react-router-dom";

interface Requirement {
    iconSrc?: string;
    altText?: string;
    description: string;
    completed: boolean;
}

const RequirementItem: React.FC<Requirement & { onToggle: () => void }> = ({ iconSrc, altText, description, completed, onToggle }) => (
    <div className="flex items-center justify-start px-1.5 pl-3 py-1 mt-4 max-md:flex-wrap" onClick={onToggle}>
        <input
            type="checkbox"
            checked={completed}
            className="form-checkbox h-5 w-5 text-[#4BC500]"
            readOnly
        />
        {iconSrc && <img src={iconSrc} alt={altText} className="ml-3 h-6 w-6" />}
        <p className="ml-3 my-auto text-base font-medium leading-6 text-black">
            {description}
        </p>
    </div>
);

const Onboarding1: React.FC = () => {
    const navigate = useNavigate();
    const [requirements, setRequirements] = useState<Requirement[]>([
        {
            description: "Phone number to be registered should not be in use with any WhatsApp account.",
            completed: false,
        },
        {
            description: "Your business entity is registered.",
            completed: false,
        },
        {
            iconSrc: "https://cdn.builder.io/api/v1/image/assets/TEMP/752e9280-839e-422d-ab0b-ba7f6f135fd6?apiKey=aa24bd8d60704a07990899bf4a9a0488&",
            altText: "Facebook icon",
            description: "A verified Facebook Business Account.",
            completed: false,
        },
        {
            description: "You should have an active business website.",
            completed: false,
        },
    ]);

    const handleToggle = (index: number) => {
        const newRequirements = [...requirements];
        newRequirements[index].completed = !newRequirements[index].completed;
        setRequirements(newRequirements);
    };

    const allRequirementsMet = requirements.every(req => req.completed);

    return (
        <main className="flex justify-center items-center px-16 w-full max-md:px-5 max-md:max-w-full" style={{ background: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <section className="flex flex-col mt-32 mb-24 max-w-full w-[885px] max-md:my-10">
                <header className="self-center text-4xl font-medium text-center text-black leading-[54px] max-md:max-w-full">
                    <h1 className="text-6xl font-bold text-[#4BC500]">Welcome!</h1>
                    <h2 className="text-3xl">Let's start the onboarding process</h2>
                </header>
                <div className="mt-11 w-full border border-solid border-neutral-600 fill-zinc-300 stroke-[1px] stroke-neutral-600 max-md:mt-10 max-md:max-w-full"></div>
                <h3 className="mt-12 text-2xl font-medium leading-8  text-black max-md:mt-10 max-md:max-w-full">
                    Necessary Requirements
                </h3>
                <form>
                    {requirements.map((req, index) => (
                        <RequirementItem
                            key={index}
                            {...req}
                            onToggle={() => handleToggle(index)}
                        />
                    ))}
                </form>
                <button
                    className={`justify-center self-center px-4 py-2 mt-16 text-base font-medium leading-6 text-white rounded-lg shadow-sm max-md:mt-10 ${allRequirementsMet ? 'bg-[#4BC500]' : 'bg-gray-400 cursor-not-allowed'}`}
                    tabIndex={0}
                    onClick={() => { if (allRequirementsMet) navigate("/whatsappform"); }}
                    disabled={!allRequirementsMet}
                >
                    Start Onboarding Process
                </button>
            </section>
        </main>
    );
};

export default Onboarding1;
