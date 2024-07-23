import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const EditFeedBack = () => {
  return (
    <>
    <DefaultLayout>
      <Breadcrumb pageName="Feedback Edit" />

      <div className="flex flex-col self-center mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 w-full leading-[150%] max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
          <div className="flex-auto self-start text-3xl font-semibold text-black">
            Let’s edit feedback flow
          </div>
          <div className="flex gap-5 text-base font-medium whitespace-nowrap">
            <div className="flex-wrap justify-center content-center px-4 py-2 bg-white rounded-lg border border-solid shadow-sm border-zinc-500 text-neutral-600 max-md:px-5">
              Back
            </div>
            <div className="flex-wrap justify-center content-center px-4 py-2 text-white bg-lime-600 rounded-lg shadow-sm max-md:px-5">
              Done
            </div>
          </div>
        </div>
        <div className="mt-12 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col max-md:mt-9 max-md:max-w-full">
                <div className="text-xl font-medium leading-8 text-black max-md:max-w-full">
                  Feedback question. (first message)
                </div>
                <input
                  type="text"
                  value="hello"
                  onChange={()=>{}}
                  className="justify-center items-start px-4 py-5 mt-8 text-sm font-medium leading-5 bg-white rounded-xl border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full"
                />
              </div>
              <div className="mt-9 text-xl font-medium leading-8 text-black max-md:max-w-full">
                Google review. (second message)
              </div>
              <input
                  type="text"
                  value="hello"
                  onChange={()=>{}}
                  className="justify-center items-start px-4 py-5 mt-8 text-sm font-medium leading-5 bg-white rounded-xl border border-solid border-zinc-500 text-zinc-500 max-md:pr-5 max-md:max-w-full"
                />
              <div className="flex gap-5 self-start mt-7">
                <label className="flex items-center gap-2 text-base font-medium leading-6 text-blue-500">
                  <input
                    type="radio"
                    name="feedback"
                    value="positive"
                    className="my-auto"
                  />
                  Positive Feedback
                </label>
                <label className="flex items-center gap-2 text-base font-medium leading-6 text-rose-500">
                  <input
                    type="radio"
                    name="feedback"
                    value="negative"
                    className="my-auto"
                  />
                  Negative Feedback
                </label>
              </div>
              <div className="mt-9 text-base font-medium leading-6 text-black max-md:max-w-full">
                Select Reward.
              </div>
              <div className="w-[578px] h-[186px] justify-start grid grid-cols-3 items-start gap-7 mt-7">
                <div className="w-[174px] h-[76px] relative ">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-gradient-to-l from-green-200 to-lime-600 rounded-[10px]" />
                  <div className="w-[91px] h-[29px] left-[15px] top-[16px] absolute text-white text-[32px] font-medium font-['Inter'] leading-[48px]">50 %</div>
                  <div className="w-[159px] h-[29px] left-[15px] top-[45px] absolute text-white text-sm font-medium font-['Inter'] leading-[21px]">On 200rs plus order</div>
                </div>
                <div className="w-[174px] h-[76px] relative">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500" />
                  <div className="w-14 h-[29px] left-[15px] top-[25px] absolute text-zinc-500 text-[32px] font-medium font-['Inter'] leading-[48px]">1+1</div>
                  <div className="w-[98px] h-[29px] left-[76px] top-[24px] absolute text-zinc-500 text-sm font-medium font-['Inter'] leading-[21px]">Buy one get on next order</div>
                </div>
                <div className="w-[174px] h-[76px] relative">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500" />
                  <div className="w-14 h-[29px] left-[15px] top-[25px] absolute text-zinc-500 text-[32px] font-medium font-['Inter'] leading-[48px]">1+1</div>
                  <div className="w-[98px] h-[29px] left-[76px] top-[24px] absolute text-zinc-500 text-sm font-medium font-['Inter'] leading-[21px]">Buy one get on next order</div>
                </div>
                <div className="w-[174px] h-[76px] relative">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500" />
                  <div className="w-[91px] h-[29px] left-[15px] top-[16px] absolute text-zinc-500 text-[32px] font-medium font-['Inter'] leading-[48px]">50 %</div>
                  <div className="w-[159px] h-[29px] left-[15px] top-[45px] absolute text-zinc-500 text-sm font-medium font-['Inter'] leading-[21px]">On 200rs plus order</div>
                </div>
                <div className="w-[174px] h-[76px] relative">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500" />
                  <div className="w-[91px] h-[29px] left-[15px] top-[16px] absolute text-zinc-500 text-[32px] font-medium font-['Inter'] leading-[48px]">50 %</div>
                  <div className="w-[159px] h-[29px] left-[15px] top-[45px] absolute text-zinc-500 text-sm font-medium font-['Inter'] leading-[21px]">On 200rs plus order</div>
                </div>
                <div className="w-[174px] h-[76px] relative ">
                  <div className="w-[173px] h-[76px] left-0 top-0 absolute bg-white rounded-[10px] border border-zinc-500" />
                  <div className="w-14 h-[29px] left-[15px] top-[25px] absolute text-zinc-500 text-[32px] font-medium font-['Inter'] leading-[48px]">1+1</div>
                  <div className="w-[98px] h-[29px] left-[76px] top-[24px] absolute text-zinc-500 text-sm font-medium font-['Inter'] leading-[21px]">Buy one get on next order</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[44%] max-md:ml-0 max-md:w-full">
              <div className="grow justify-center px-16 pt-80 pb-20 mt-4 w-full text-3xl font-medium leading-10 text-black bg-zinc-300 max-md:pt-10 max-md:pr-7 max-md:pl-7 max-md:mt-10 max-md:max-w-full">
                Image with explaining
              </div>
            </div>
          </div>
        </div>
      </div>
      </DefaultLayout>
    </>
  );
}

export default EditFeedBack;
