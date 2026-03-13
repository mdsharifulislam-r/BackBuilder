"use client";

import { useEffect, useState } from "react";

export default async function AuthorizePage({ id }: { id: string }) {
  const [info, setInfo] = useState<Record<string, any>>({});
  useEffect(() => {
    async function authorize() {
      const infos = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/app/verify/${id}`,
      );
      const data = await infos.json();
      if (data.success) {
        setInfo(data.data);
      }
    }
    authorize();
  }, []);

  if (!info) {
    return <div>Loading...</div>;
  }

  async function accept() {
    const infos = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/app/verify/${info?.app?.app_id}`,
      {
        method: "POST",
      },
    );
    const data = await infos.json();
    if (data.success) {
      window.location.href = data.data?.url;
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        {/* Logo / Title */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded bg-blue-600 flex items-center justify-center text-white text-lg">
            B
          </div>
          <span className="text-2xl text-gray-800">Backbuilder</span>
        </div>

        {/* User Avatar */}
        <div className="flex justify-center mb-4">
          <div className="flex flex-col items-center">
            <img
              src={info?.app?.image}
              className="w-20 h-20 rounded-full border"
              alt="user"
            />
            <h1>{info?.user?.name}</h1>
          </div>
        </div>

        {/* Permission Text */}
        <div className="text-left text-gray-700 space-y-3 mb-6">
          <p>
            {info?.app?.app_name} Application would like to access some of your account
            information:
          </p>

          <ul className="list-disc pl-5 text-sm space-y-2">
            <li>Name, profile photo and account details</li>
            <li>The primary email address linked to your account</li>
          </ul>
        </div>

        {/* Footer Links */}
        <div className="text-sm text-gray-500 mb-5">
          <a href="#" className="text-blue-600 hover:underline">
            Not you?
          </a>
          <span className="mx-2">|</span>
          <a href="#" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 border border-gray-300 rounded-md py-2 hover:bg-gray-100">
            Cancel
          </button>

          <button onClick={accept} className="flex-1 bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700">
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}
