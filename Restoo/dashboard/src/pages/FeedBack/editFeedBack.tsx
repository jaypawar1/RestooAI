import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';

const EditFeedBack = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [rewardType, setRewardType] = useState('');
  const [minPurchaseRequired, setMinPurchaseRequired] = useState(false);
  const [minPurchaseAmount, setMinPurchaseAmount] = useState('');

  const handleFeedbackTypeChange = (type) => {
    setFeedbackType(type);
  };

  const handleRewardTypeChange = (type) => {
    setRewardType(type);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col self-center -mt-5 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 w-full leading-[150%] max-md:flex-wrap max-md:pr-5 max-md:max-w-full p-5">
          <div className="flex-auto self-start text-2xl font-semibold text-black">
            Let’s edit feedback flow
          </div>
          <div className="flex gap-5 text-base font-medium whitespace-nowrap">
            <button className="flex-wrap justify-center content-center px-10 py-2 bg-white rounded-md border border-solid shadow-sm border-zinc-500 text-neutral-600 max-md:px-5">
              Back
            </button>
            <button className="flex-wrap justify-center content-center px-10 py-2 text-white bg-lime-600 rounded-md shadow-sm max-md:px-5">
              Done
            </button>
          </div>
        </div>
        <div className="-mt-3 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col max-md:mt-9 max-md:max-w-full p-5">
                <div className="font-semibold leading-8 text-black max-md:max-w-full">
                  Feedback question. (first message)
                </div>
                <textarea
                  type="text"
                  value="hello"
                  onChange={() => {}}
                  className="w-full mt-2 px-4 py-5 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                />
              </div>
              <div>
                <div className="mt-3 bg-zinc-200 p-5 rounded-lg">
                  <div className="flex gap-5 self-start mt-3">
                    <label className="flex items-center gap-2 text-base font-medium leading-6 text-blue-500">
                      <input
                        type="radio"
                        name="feedbackType"
                        value="positive"
                        checked={feedbackType === 'positive'}
                        onChange={() => handleFeedbackTypeChange('positive')}
                        className="my-auto"
                      />
                      Positive Feedback
                    </label>
                    <label className="flex items-center gap-2 text-base font-medium leading-6 text-rose-500">
                      <input
                        type="radio"
                        name="feedbackType"
                        value="negative"
                        checked={feedbackType === 'negative'}
                        onChange={() => handleFeedbackTypeChange('negative')}
                        className="my-auto"
                      />
                      Negative Feedback
                    </label>
                  </div>
                  <div className="mt-6 font-semibold leading-8 text-black">
                    {feedbackType === 'positive' ? 'Google review. (second message)' : 'Message to customer review. (second message)'}
                  </div>
                  <textarea
                    className="w-full mt-2 px-4 py-5 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                    rows="3"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder={
                      feedbackType === 'positive'
                        ? 'Welcome to restaurant reward program. Thank you for your order. Share feedback to help us serve you better.'
                        : 'We apologize for any inconvenience. Please let us know how we can improve.'
                    }
                  />
                  <div className="mt-4 font-semibold leading-8 text-black">
                    Select Reward type.
                  </div>
                  <div className="mt-7 space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="rewardType"
                        value="cash_discount"
                        checked={rewardType === 'cash_discount'}
                        onChange={() => handleRewardTypeChange('cash_discount')}
                        className="hidden peer"
                      />
                      <div className="peer-checked:border-blue-500 peer-checked:bg-blue-100 border border-gray-300 p-4 rounded-lg w-full font-bold">
                        ₹ Cash Discount
                        {rewardType === 'cash_discount' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="How many ₹ off"
                              className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                            />
                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                checked={minPurchaseRequired}
                                onChange={() => setMinPurchaseRequired(!minPurchaseRequired)}
                                className="mr-2"
                              />
                              Minimum purchase required for redemption
                            </label>
                            {minPurchaseRequired && (
                              <input
                                type="text"
                                placeholder="Minimum purchase amount"
                                value={minPurchaseAmount}
                                onChange={(e) => setMinPurchaseAmount(e.target.value)}
                                className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rewardType"
                        value="percentage_discount"
                        checked={rewardType === 'percentage_discount'}
                        onChange={() => handleRewardTypeChange('percentage_discount')}
                        className="hidden peer"
                      />
                      <div className="peer-checked:border-blue-500 peer-checked:bg-blue-100 border border-gray-300 p-4 rounded-lg w-full font-bold">
                        ₹ Percentage Discount
                        {rewardType === 'percentage_discount' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="How many ₹ off"
                              className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                            />
                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                checked={minPurchaseRequired}
                                onChange={() => setMinPurchaseRequired(!minPurchaseRequired)}
                                className="mr-2"
                              />
                              Minimum purchase required for redemption
                            </label>
                            {minPurchaseRequired && (
                              <input
                                type="text"
                                placeholder="Minimum purchase amount"
                                value={minPurchaseAmount}
                                onChange={(e) => setMinPurchaseAmount(e.target.value)}
                                className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rewardType"
                        value="free_item"
                        checked={rewardType === 'free_item'}
                        onChange={() => handleRewardTypeChange('free_item')}
                        className="hidden peer"
                      />
                      <div className="peer-checked:border-blue-500 peer-checked:bg-blue-100 border border-gray-300 p-4 rounded-lg w-full font-bold">
                        ₹ Free Item
                        {rewardType === 'free_item' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="How many ₹ off"
                              className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                            />
                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                checked={minPurchaseRequired}
                                onChange={() => setMinPurchaseRequired(!minPurchaseRequired)}
                                className="mr-2"
                              />
                              Minimum purchase required for redemption
                            </label>
                            {minPurchaseRequired && (
                              <input
                                type="text"
                                placeholder="Minimum purchase amount"
                                value={minPurchaseAmount}
                                onChange={(e) => setMinPurchaseAmount(e.target.value)}
                                className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="rewardType"
                        value="loyalty_bonus"
                        checked={rewardType === 'loyalty_bonus'}
                        onChange={() => handleRewardTypeChange('loyalty_bonus')}
                        className="hidden peer"
                      />
                      <div className="peer-checked:border-blue-500 peer-checked:bg-blue-100 border border-gray-300 p-4 rounded-lg w-full font-bold">
                        ₹ Loyalty Bonus
                        {rewardType === 'loyalty_bonus' && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="How many ₹ off"
                              className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                            />
                            <label className="flex items-center mt-2">
                              <input
                                type="checkbox"
                                checked={minPurchaseRequired}
                                onChange={() => setMinPurchaseRequired(!minPurchaseRequired)}
                                className="mr-2"
                              />
                              Minimum purchase required for redemption
                            </label>
                            {minPurchaseRequired && (
                              <input
                                type="text"
                                placeholder="Minimum purchase amount"
                                value={minPurchaseAmount}
                                onChange={(e) => setMinPurchaseAmount(e.target.value)}
                                className="w-full mt-2 px-4 py-2 text-sm font-medium leading-5 rounded-lg border border-solid border-slate-400 text-zinc-500"
                              />
                            )}
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
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
  );
}

export default EditFeedBack;
