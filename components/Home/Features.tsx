import React from 'react'

export default function Features() {
  return (
    <>
  {/* Features */}
  <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    {/* Grid */}
    <div className="lg:grid container lg:grid-cols-12 lg:gap-16 lg:items-center">
      <div className="lg:col-span-7">
        {/* Grid */}
        <div className="grid grid-cols-12 gap-2 sm:gap-6 items-center lg:-translate-x-10">
          <div className="col-span-4">
            <img
              className="rounded-xl hover:scale-105 transition-all duration-500 cursor-pointer animate-bounce-up-down"
              src="https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
              alt="Features Image"
            />
          </div>
          {/* End Col */}
          <div className="col-span-3">
            <img
              className="rounded-xl hover:scale-105 transition-all duration-500 cursor-pointer animate-bounce-up-down"
              src="https://images.unsplash.com/photo-1605629921711-2f6b00c6bbf4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
              alt="Features Image"
            />
          </div>
          {/* End Col */}
          <div className="col-span-5">
            <img
              className="rounded-xl hover:scale-105 transition-all duration-500 cursor-pointer animate-bounce-up-down"
              src="https://images.unsplash.com/photo-1600194992440-50b26e0a0309?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=920&q=80"
              alt="Features Image"
            />
          </div>
          {/* End Col */}
        </div>
        {/* End Grid */}
      </div>
      {/* End Col */}
      <div className="mt-5 sm:mt-10 lg:mt-0 lg:col-span-5">
        <div className="space-y-6 sm:space-y-8">
          {/* Title */}
          <div className="space-y-2 md:space-y-4">
            <h2 className="font-bold text-3xl lg:text-4xl text-gray-800 eretext-neutral-200">
              Make your life easiar by <span className='text-orange'>BackBuilder</span>
            </h2>
            <p className="text-gray-500 eretext-neutral-500">
              Use our tools to explore your ideas and make your vision come
              true. Then share your work easily.
            </p>
          </div>
          {/* End Title */}
          {/* List */}
          <ul className="space-y-2 sm:space-y-4">
            <li className="flex gap-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 erebg-blue-800/30 eretext-blue-500">
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="grow">
                <span className="text-sm sm:text-base text-gray-500 eretext-neutral-500">
                  <span className="font-bold">Less routine</span> – more
                  Productivty
                </span>
              </div>
            </li>
            <li className="flex gap-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 erebg-blue-800/30 eretext-blue-500">
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="grow">
                <span className="text-sm sm:text-base text-gray-500 eretext-neutral-500">
                  Hundreds of thousands saved
                </span>
              </div>
            </li>
            <li className="flex gap-x-3">
              <span className="mt-0.5 size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600 erebg-blue-800/30 eretext-blue-500">
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="grow">
                <span className="text-sm sm:text-base text-gray-500 eretext-neutral-500">
                  Scale budgets <span className="font-bold">efficiently</span>
                </span>
              </div>
            </li>
          </ul>
          {/* End List */}
        </div>
      </div>
      {/* End Col */}
    </div>
    {/* End Grid */}
  </div>
  {/* End Features */}
</>

  )
}
