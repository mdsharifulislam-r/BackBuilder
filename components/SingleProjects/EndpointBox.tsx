import { useAppDispatch } from "@/lib/hooks/hooks";
import { getEndPointId, setTempAccout } from "@/lib/Store/features/CartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function EndpointBox({name,primary_id,is_user}:{name:string,primary_id:number,is_user:boolean}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  function send(){
    dispatch(getEndPointId(primary_id))
    dispatch(setTempAccout(is_user?is_user:false))
    router.push(`/endpoints/${name}`)
  }
  return (
    <div onClick={send} className="box cursor-pointer w-full h-28 bg-white p-5 rounded-md shadow-lg relative">
        <div className="right-5 top-5 text-blue-600 cursor-pointer absolute">
            <FaInfoCircle/>
        </div>
        <Link href={""} className="block text-xl text-blue-500 hover:underline">/{name}</Link>
        <span className="text-sm font-extralight text-slate-500">Endpoints ID:{primary_id}</span>
    </div>
  );
}
