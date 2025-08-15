import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, Pagination, Scrollbar, A11y, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CourseCard from './CourseCard'


const CourseSlider = ({ courses }) => {
    return (
        <div>
            {
                courses?.length > 0 && (
                    <Swiper
                        modules={[FreeMode, Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={3}
                        navigation
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        className="max-h-[30rem]"
                    >
                        {
                            courses.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <CourseCard course={course} Height={"h-[250px]"} />
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                )
            }
        </div>
    )
}

export default CourseSlider
