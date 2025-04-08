import React from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import { GiExpense } from "react-icons/gi";
import { RiBankFill, RiExchangeDollarFill } from "react-icons/ri";
import { useWebSocket } from '../../context/WebSocketContext';

const DashboardBoxes = () => {
    const { totalRevenue } = useWebSocket();
    return (
        <div className="px-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Box 1 - Total Sales Revenue */}
                <div className='p-4 bg-white hover:bg-gray-50 rounded-md border border-gray-200 flex items-center gap-3'>
                    <BsGraphUpArrow className='text-2xl text-[#0096FF]' />
                    <div className='info'>
                        <h3 className='text-sm text-gray-600'>Total Sales Revenue</h3>
                        <b className='text-lg font-semibold text-gray-900'>Rs.{isNaN(totalRevenue) ? '0' : totalRevenue.toLocaleString()}</b>
                    </div>
                </div>

                {/* Box 2 - Total Expenses */}
                <div className='p-4 bg-white hover:bg-gray-50 rounded-md border border-gray-200 flex items-center gap-3'>
                    <GiExpense className='text-2xl text-[#3F00FF]' />
                    <div className='info'>
                        <h3 className='text-sm text-gray-600'>Total Expenses</h3>
                        <b className='text-lg font-semibold text-gray-900'>Rs.385 000</b>
                    </div>
                </div>

                {/* Box 3 - Cheque */}
                <div className='p-4 bg-white hover:bg-gray-50 rounded-md border border-gray-200 flex items-center gap-3'>
                    <RiBankFill className='text-2xl text-[#7928ca]' />
                    <div className='info'>
                        <div className='flex items-center gap-2 mb-1'>
                            <h3 className='text-sm text-gray-600'>Cheque</h3>
                            <span className='bg-gray-100 rounded-full text-xs px-2 py-1'>
                                Today
                            </span>
                        </div>
                        <b className='text-lg font-semibold text-gray-900'>Rs.185 000</b>
                    </div>
                </div>

                {/* Box 4 - Credit */}
                <div className='p-4 bg-white hover:bg-gray-50 rounded-md border border-gray-200 flex items-center gap-3'>
                    <RiExchangeDollarFill className='text-2xl text-[#39e75f]' />
                    <div className='info'>
                        <div className='flex items-center gap-2 mb-1'>
                            <h3 className='text-sm text-gray-600'>Credit</h3>
                            <span className='bg-gray-100 rounded-full text-xs px-2 py-1'>
                                Today
                            </span>
                        </div>
                        <b className='text-lg font-semibold text-gray-900'>Rs.180 000</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardBoxes;