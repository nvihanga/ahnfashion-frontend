import React from 'react'
// import DashboardBoxes from '../../components/dahboardBoxes'
import { MdWavingHand } from "react-icons/md";
import image from '../../assets/images/first.jpg'
import ProductPerformance from '../../components/dashboard/ProductPerformance'

const SalesDashboard = () => {
  return (
    <>
      <div className='w-full p-3 border py-5 flex items-center gap-2 mb-5'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
      }}>
        
        <div className='info'>
          <h1 className='text-[40px] font-bold leading-none text-[#efefef]'>Welcome to Sales of AHN Fashion Pvt Ltd</h1><br/>
          <p>Here's what happening on your factory today. See the statistics at once.</p>
        </div>
        {/* <img src={image} className='w-[200px] rounded-full'/> */}
      </div>
      {/* <DashboardBoxes/> */}
      <div>
        <ProductPerformance/>
      </div>
    </>
  )
}

export default SalesDashboard