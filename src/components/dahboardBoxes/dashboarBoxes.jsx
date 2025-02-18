import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { IoStatsChartSharp } from "react-icons/io5";
import { BsBank } from "react-icons/bs";
import { GiExpense } from "react-icons/gi";
import { BsGraphUpArrow } from "react-icons/bs";
import { GiGrowth } from "react-icons/gi";
import { RiExchangeDollarFill } from "react-icons/ri";
import { RiBankFill } from "react-icons/ri";



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
                slidesPerView={4}
                spaceBetween={10}
                navigation={true}
                modules={[Navigation]}
                className="dashboardBocesSlider"
            >
                <SwiperSlide>
                    <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <BsGraphUpArrow className='text-[40px] text-[#0096FF] ' />
                        <div className='info w-[70%]'>
                            <h3>Total Sales Revenue</h3>
                            <b>Rs.780 000</b>
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <GiExpense className='text-[40px] text-[#3F00FF]' />
                        <div className='info w-[70%]'>
                            <h3>Total Expenses</h3>
                            <b>Rs. 385 000</b>
                        </div>

                    </div>
                </SwiperSlide>


                <SwiperSlide>
                    <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <RiBankFill className='text-[40px] text-[#7928ca]' />
                        <div className='info w-[70%]'>
                            <div className='flex items-center gap-6'>
                                <h3>Cheque</h3>
                                <span className='bg-gray-100 rounded-full text-xs px-2 py-1' style={{ backgroundColor: "#f3f4f6" }}>
                                    To today
                                </span>
                            </div>
                            <b>Rs. 185 000</b>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className='box p-5 cursor-auto bg-white hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                        <RiExchangeDollarFill className='text-[40px] text-[#39e75f]' />
                        <div className='info w-[70%]'>
                            <div className='flex items-center gap-8'>
                                <h3>Credit</h3>
                                <span className='bg-gray-100 rounded-full text-xs px-2 py-1' style={{ backgroundColor: "#f3f4f6" }}>
                                    To today
                                </span>
                            </div>
                            <b>Rs. 180 000</b>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default DashboardBoxes