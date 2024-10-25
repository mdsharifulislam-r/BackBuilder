import Link from "next/link";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function EndpointBox({name,primary_id}:{name:string,primary_id:number}) {
  return (
    <div className="box w-full h-28 bg-white p-5 rounded-md shadow-lg relative">
        <div className="right-5 top-5 text-blue-600 cursor-pointer absolute">
            <FaInfoCircle/>
        </div>
        <Link href={""} className="block text-xl text-blue-500 hover:underline">/{name}</Link>
        <span className="text-sm font-extralight text-slate-500">Endpoints ID:{primary_id}</span>
    </div>
  );
}
