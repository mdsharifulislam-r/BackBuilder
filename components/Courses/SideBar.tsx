
import { Submit } from '@/lib/Helper/CourseFilter'
import Accordian from './SideBar/Accordian'
import Price from './SideBar/Price'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getInstructors } from '@/lib/Helper/getInstructors'
import { InstructorType } from '@/lib/Types/Types'

// import Price from './SideBar/Price'

export const instructor = ["Learn With Sumit","Jhankar Mahbub","Hitesh","Anisur Rahman","Procoder"]
export const catagories=["Business","Cooking","Digital Marketing","Fitness","Motivation","Online Art","Photography","Programming","Yoga"]
export const lavel = ["All Level","Beginner","Intermatiade","Expert"]
export default async function SideBar({type="courses",handle}:{type?:string,handle:(e: FormData) => Promise<never>}) {
const instructos:InstructorType[] = await getInstructors()

const data:string[] = instructos?.map(item=>item.name)||instructor



  
  return (
    <div className='w-full bg-white  shadow-xl p-7'>
       <form className='' action={handle} >
      <Accordian title='Catagories' data={catagories} />
      <Accordian title={type!='courses'?"Author":"Instructor"} data={data} />
      <Accordian title='Level' data={lavel} />
      <Price/>
      <div>
    <button type='submit' className='bg-primary text-white w-full py-4 rounded-md mt-3'>Apply Filter</button>
      </div>
      <div className='pt-3'>
      <Link type='reset' href={`/${type=='courses'?"courses":"book"}`} className='py-4 text-center w-full text-white rounded-md bg-secondary block'>Reset Filter</Link>
    </div>
    </form>
    
    </div>
   
  )
}
