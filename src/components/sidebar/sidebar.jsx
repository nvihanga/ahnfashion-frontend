import React, { useState,useContext } from 'react'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { Collapse } from 'react-collapse';
import { FaAngleDown } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { LuGrid3X3 } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { IoShirtSharp } from "react-icons/io5";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { MdAssignmentAdd } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GrTableAdd } from "react-icons/gr";
import { FaList } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { IoPersonAdd } from "react-icons/io5";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { BsCalendar2DayFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { MyContext } from '../../App';



const Sidebar = () => {

  const [submenuIndex, setSubmenuIndex] = useState(null);

  const isOpenSubMenu = (index) => {
    if(submenuIndex === index){
      setSubmenuIndex(null)
    }else{
      setSubmenuIndex(index)
    }
    
  }

  const context = useContext(MyContext);

  return (
    <>
      <style>
        {`
          .ReactCollapse--collapse {
            transition: height 500ms;
          }
        `}
      </style>

      <div className={`sidebar fixed top-0 left-0 bg-white h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 overflow-y-auto w-[${context.isSidebarOpen === true ? '22%' : '0px'}]`}>
        {/* px mean padding x of logo */}
        <div className='py-2 w-full'>
          <Link to="/"><img src={logo} className='w-[50px]' /></Link>
        </div>

        <ul className='mt-4'>

          <li>
            <Link to="/">
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]'>
            <RiDashboardHorizontalFill className='text-[13px]' /> <span className='text-[13px]'>Dashboard</span>
          </Button>
          </Link>
          </li>


          <li>
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(1)}>
            <LuGrid3X3 className='text-[13px]'/> <span className='text-[13px]'>Raw Materials</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 1 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                <Link to="/raw-materials/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                <Link to="/raw-materials/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <GrTableAdd className='text-[px]'/><span className='text-[13px] font-[600]'>Add Raw Material</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/raw-materials/stock-add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <ImPlus className='text-[px]'/><span className='text-[13px] font-[600]'>Stock Add</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(2)}>
            <IoShirtSharp className='text-[13px]'/> <span className='text-[13px]'>Finished Goods</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 2 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 2 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/finished-goods/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/finished-goods/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <GrTableAdd className='text-[px]'/><span className='text-[13px] font-[600]'>Add Finished Goods</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/finished-goods/stock-add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <ImPlus className='text-[px]'/><span className='text-[13px] font-[600]'>Stock Add</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(3)}>
            <MdPeopleAlt  className='text-[13px]'/> <span className='text-[13px]'>Customers</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 3 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 3 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/customers/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/customers/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <IoPersonAdd className='text-[px]'/><span className='text-[13px] font-[600]'>Add New Customer</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(4)}>
            <IoPeople  className='text-[13px]'/> <span className='text-[13px]'>Suppliers</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 4 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 4 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/suppliers/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/suppliers/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <IoPersonAdd className='text-[px]'/><span className='text-[13px] font-[600]'>Add New Customer</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(5)}>
            <MdAssignmentAdd   className='text-[13px]'/> <span className='text-[13px]'>Sales Order</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 5 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 5 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/sales-order/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/sales-order/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <NoteAddIcon className='text-[px]'/><span className='text-[13px] font-[600]'>Add</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(6)}>
            <FaClipboardList    className='text-[13px]'/> <span className='text-[13px]'>Purchase Order</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 6 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 6 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/purchase-order/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaList className='text-[13px]'/><span className=' text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/purchase-order/add">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <NoteAddIcon className='text-[px]'/><span className='text-[13px] font-[600]'>Add</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(7)}>
            <IoBarChartSharp     className='text-[13px]'/> <span className='text-[13px]'>Reports</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 7 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 7 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/reports/daily">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <BsCalendar2DayFill className='text-[13px]'/><span className=' text-[13px] font-[600]'>Daily</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/reports/monthly">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaCalendarAlt className='text-[px]'/><span className='text-[13px] font-[600]'>Monthly</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(8)}>
            <FaMoneyCheckDollar      className='text-[13px]'/> <span className='text-[13px]'>Payment</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 8 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 8 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/payment/cash">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaHandHoldingDollar className='text-[13px]'/><span className=' text-[13px] font-[600]'>Cash</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/payment/credit">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <BsBank2  className='text-[px]'/><span className='text-[13px] font-[600]'>Credit</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/payment/cheque">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <FaMoneyCheckDollar  className='text-[px]'/><span className='text-[13px] font-[600]'>Cheque</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>

          <li><Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]' onClick={() => isOpenSubMenu(9)}>
            <FaHandHoldingDollar       className='text-[13px]'/> <span className='text-[13px]'>Cash</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center' >
              <FaAngleDown className={`transition-all ${submenuIndex === 9 ? 'rotate-180' : ''}`}/>
              </span>
          </Button>

            <Collapse isOpened={submenuIndex === 9 ? true : false}>
              <ul className='w-full'>
                <li className='w-full'>
                  <Link to="/cash/cashout">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <HiOutlineBanknotes className='text-[13px]'/><span className=' text-[13px] font-[600]'>Cashout</span></Button>
                    </Link>
                </li>
                <li className='w-full'>
                  <Link to="/cash/list">
                  <Button className='!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8'>
                    <CiBoxList   className='text-[px]'/><span className='text-[13px] font-[600]'>List</span></Button>
                    </Link>
                </li>
              </ul>
            </Collapse>
          </li>
          
          <li>
            <Link to="/settings">
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]'>
            <IoIosSettings className='text-[13px]' /> <span className='text-[13px]'>Settings</span>
          </Button>
          </Link>
          </li>

          
          

        
        </ul>
      </div>
    </>
  )
}

export default Sidebar