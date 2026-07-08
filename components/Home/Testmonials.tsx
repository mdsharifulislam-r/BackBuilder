'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper/modules"
import 'swiper/css';
import client1 from '@/assets/images/clinets/client 1.webp'
import client2 from '@/assets/images/clinets/client2.webp'
import client3 from '@/assets/images/clinets/client3.webp'
import SlideCard from './SlideCard';

const testimonials = [
  { image: client1, name: 'Rafiul Karim', role: 'Indie hacker', quote: 'Switching to BackBuilder cut my backend setup time from days to minutes — I just design the schema and start building the frontend.' },
  { image: client2, name: 'Anika Chowdhury', role: 'Frontend developer', quote: 'I needed an API for a hackathon project fast. BackBuilder gave me working CRUD endpoints without writing a single line of server code.' },
  { image: client3, name: 'Tanvir Ahmed', role: 'CS student', quote: 'The clearest way I\'ve found to prototype an app idea. Authentication, endpoints and a docs page — all handled for me.' },
]

export default function Testmonials() {
  return (
    <section className="py-14 bg-slate-50 border-y border-line">
      <div className="text-center mb-8">
        <span className="section-eyebrow">Testimonials</span>
        <h2 className="mt-3 text-2xl md:text-4xl font-bold text-ink">What builders are saying</h2>
      </div>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
      >
        {testimonials.map((t) => (
          <SwiperSlide key={t.name}>
            <SlideCard image={t.image} quote={t.quote} name={t.name} role={t.role} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
