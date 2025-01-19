import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { IoStatsChartSharp } from "react-icons/io5";
import { BsBank } from "react-icons/bs";


const DashboardBoxes = () => {
  return (
    <>
        <style>
            {`
            body{font-family: "Roboto", serif;}
            }
            `}
        </style>
        <Swiper
        slidesPerView={3}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardBocesSlider"
      >
        <SwiperSlide>
            <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <div className='info w-[70%]'>
                    <h3>Raw Materials</h3>
                    <b>1560</b>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <BsBank className='text-[40px] text-[#7928ca]'/>
                <div className='info w-[70%]'>
                    <h3>Revenue</h3>
                    <b>Rs.780 000</b>
                </div>
                <IoStatsChartSharp className='text-[50px] text-[#7928ca]'/>
            </div>
        </SwiperSlide>
    
        <SwiperSlide>
            <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <div className='info w-[70%]'>
                    <h3>Raw Materials</h3>
                    <b>1560</b>
                </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default DashboardBoxes