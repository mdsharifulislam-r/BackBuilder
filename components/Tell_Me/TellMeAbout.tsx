
import SidePart from '../Register/SidePart'
import InputBox from '../Common/InputBox'
import { FaHouse } from 'react-icons/fa6'
import SuggetionForm from './SuggetionForm'
import LoadingButton from '../Common/Button/Button'
import ButtonTest from './ButtonTest'
import { UpdateStudentIntrest } from '@/lib/Helper/updateStudentIntrest'
import { cookies } from 'next/headers'
import StudentForm from './StudentForm'
import man from "@/assets/Register/man.webp";
export default function TellMeAbout({type}:{type:string}) {
 
    
  return (
    <div>
      <div className="container flex w-full gap-4 place-items-center">
        <div className='w-full'>
            <h1 className='text-4xl font-bold text-primary'>Tell Us More <span className='text-secondary'>About You</span></h1>
            
            <StudentForm type={type}/>
        </div>
        <SidePart image={man}/>
      </div>
    </div>
  )
}
