import Header from "@/components/Common/Header";
import Loader from "@/components/Common/Loader/Loader";
import Title from "@/components/Common/Title";
import InstructorsContainer from "@/components/instructors/InstructorsContainer";
import { Suspense } from "react";
export const dynamic = "force-dynamic"
export default function page() {
  return (
    <div>
      <Header path="Instructors"/>
      <div className="container">
        <Title heading="Our Inastructors" tagline="instructions"/>
        <Suspense fallback={"loading"}>
        <InstructorsContainer/>
        </Suspense>
        
      </div>
    </div>
  )
}
