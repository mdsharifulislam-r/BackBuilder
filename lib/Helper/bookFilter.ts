'use server'

import { redirect } from "next/navigation"



export async function BookFilter(e:FormData){
    
    const obj = Object.fromEntries(e.entries())
    let link:string = ""
    for(let i in obj){
        if(i.includes("$ACTION_ID")|| (i=='price') && parseInt(`${obj[i]}`)<=0){
            continue
        }
        link+=`${i}=${obj[i]}&`
    }
    
    
   return redirect(`/book?${link}`)
    
}