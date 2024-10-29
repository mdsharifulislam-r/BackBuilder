'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay} from "swiper/modules"
// Import Swiper styles
import 'swiper/css';
import client1 from '@/assets/images/clinets/client 1.webp'
import client2 from '@/assets/images/clinets/client2.webp'
import client3 from '@/assets/images/clinets/client3.webp'
import SlideCard from './SlideCard';
export default function Testmonials() {
  return (
    <div>
      <div className='text-center py-3'><h1 className='text-3xl font-bold '>What Our Client Say</h1></div>
      <div className='container'>

    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      modules={[Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      <SwiperSlide>
        <SlideCard image={client1}/>
      </SwiperSlide>
      <SwiperSlide>
        <SlideCard image={client2}/>
      </SwiperSlide>
      <SwiperSlide>
        <SlideCard image={client3}/>
      </SwiperSlide>
    </Swiper>
      </div>
    </div>
  )
}
