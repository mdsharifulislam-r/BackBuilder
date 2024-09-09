import { ModulePropsType } from "@/components/SingleCourseDetails/Curriculum/Module";

export function getVideoLinks(module:ModulePropsType[],completeVideos:string[]){
    let videoLinks:string[] = []
    let complete:string[] = []
    module?.forEach(data=>{
        data.data?.forEach(video=>{
            videoLinks?.push(video.videoId||"")
            const exist = completeVideos?.includes(video.videoId||"")
            if(exist){
                complete.push(video.videoId||"")
            }

        })
    })
    if(!videoLinks.length){
        return 0
    }
    const percent = 100/videoLinks.length
    const average = percent*complete.length

    
    
    return average
    

}