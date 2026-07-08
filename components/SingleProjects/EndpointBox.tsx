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
    <div onClick={send} className="box cursor-pointer w-full h-28 bg-white p-5 rounded-2xl border border-line shadow-card hover:shadow-soft hover:-translate-y-0.5 transition-all relative">
        <div className="right-5 top-5 text-primary cursor-pointer absolute">
            <FaInfoCircle/>
        </div>
        <Link href={""} className="block text-xl font-semibold text-ink hover:text-primary transition-colors">/{name}</Link>
        <span className="text-sm text-muted">Endpoint ID: {primary_id}</span>
    </div>
  );
}
