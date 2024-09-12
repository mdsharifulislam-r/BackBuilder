"use client"
import ReactPlayer from 'react-player'
import { YouTubeEmbed } from '@next/third-parties/google'
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks/Hooks';
import { getStudentInfoClient } from '@/lib/Helper/GetStudentInfoClient';
import { Student } from '@/lib/Types/Types';
import { UpdateStudentInfo } from '@/lib/Helper/UpdateStudentInfo';
import { UpdateStudentInfoObject } from '@/lib/Helper/UpdateStudentObject';
import toast from 'react-hot-toast';
import { ChangeVideoStatus } from '../SingleCourseDetails/Curriculum/ModuleLink';
import { Duplex } from 'stream';
import { setUpdateDiamon } from '../Common/Diamond/Diamond';
interface props{
  videoLinks:string | undefined,
  videoId:string
}

export default function Videoframe({videoLinks,videoId}:props) {
  const user = useAppSelector(state=>state.userReduicer.user)

  const splitNames = youtubeParser(videoLinks || "");
 
async function TakeTime(){
  const userData:Student|null= await getStudentInfoClient([],user?._id)
if(!userData?.completeVideos?.includes(videoId)){
  const videoIds = (userData?.completeVideos?.length ) ? [...userData?.completeVideos,videoId]:[videoId]
  const diamond = userData?.diamond? userData?.diamond+10 : 10
  const res = await UpdateStudentInfoObject({
    completeVideos:videoIds,
    diamond
  })

  if(!res.isOk){
    toast.error(res.massage)
  }
  setUpdateDiamon()
  ChangeVideoStatus()
}
}
const [hydred,setHydred]=useState(false)
useEffect(()=>{
  setHydred(true)
})


  return (
    <div className=" w-full py-3" onClick={TakeTime}>
    {/* <iframe
      className="h-full w-full rounded-lg"
      src={`https://www.youtube.com/embed/${splitNames && splitNames[1]}`}
      allowFullScreen
      title="YouTube Video"
    ></iframe> */}
   {hydred && <ReactPlayer url={videoLinks} controls={true} onEnded={TakeTime} width={"100%"}/>}
  </div>
  
  )
}


export function youtubeParser(url:string){
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match&&match[7].length==11)? match[7] : false;
}

function isComplete(time:number){
  if(new Date().getMinutes() == time+3){

  }
}