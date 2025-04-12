import React from 'react';
import { BsGraphUpArrow } from "react-icons/bs";
import { GiExpense } from "react-icons/gi";
import { RiBankFill, RiExchangeDollarFill } from "react-icons/ri";
import { useWebSocket } from '../../context/WebSocketContext';

const DashboardBoxes = () => {
    const { totalRevenue, totalExpenses } = useWebSocket();
    return (
        <div className="px-4 mb-8">
            {/* First Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
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
                        <h3 className='text-sm text-gray-600'>Total External Expenses</h3>
                        <b className='text-lg font-semibold text-gray-900'>
                            Rs.{isNaN(totalExpenses) ? '0' : totalExpenses.toLocaleString()}
                        </b>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default DashboardBoxes;