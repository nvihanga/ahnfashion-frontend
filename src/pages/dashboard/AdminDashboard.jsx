import React,{useEffect} from 'react'
import axios from 'axios';
import DashboardBoxes from '../../components/dahboardBoxes/dashboarBoxes'
import { MdWavingHand } from "react-icons/md";
import image from '../../assets/images/first.jpg'
import ProductPerformance from '../../components/dashboard/ProductPerformance';
import OutstandingBalances from '../../components/dashboard/OutstandingBalances';
import RawMaterialUsage from '../../components/dashboard/RawMaterialUsage';


const AdminDashboard = () => {  
  return (
    <>
          <div className='w-full rounded-xl p-6 border py-5 flex items-center gap-2 mb-5 bg-gray-900'
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: 'white',
          }}>
            
            <div className='text-white space-y-4'>
          <h1 className='text-2xl md:text-4xl font-bold'>Welcome to AHN Fashion Pvt Ltd</h1>
          <p className='text-sm md:text-base text-gray-200'>Here's what happening on your factory today. See the statistics at once.</p>
        </div>
            {/* <img src={image} className='w-[200px] rounded-full'/> */}
          </div>
          <DashboardBoxes/>
          <div className='py-20'>
          <ProductPerformance/>
          </div>
          
          {/* <div className='py-8'>
          <OutstandingBalances/>
          </div> */}
          <div className='py-10'>
          <RawMaterialUsage/>
          </div>
        </>
  )
}

export default AdminDashboard