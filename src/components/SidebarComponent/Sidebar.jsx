import React, { useState, useContext } from "react";
import Button from "@mui/material/Button"
import AHNLogo from "../../assets/images/AHNLogo.png";
import { Link,NavLink,useLocation } from "react-router-dom";
import { Collapse } from "react-collapse";
import { FaAngleDown } from "react-icons/fa6";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { LuGrid3X3 } from "react-icons/lu";
import { CiBoxList } from "react-icons/ci";
import { IoShirtSharp } from "react-icons/io5";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { MdAssignmentAdd } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { IoBarChartSharp } from "react-icons/io5";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { GrTableAdd } from "react-icons/gr";
import { FaList } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import { IoPersonAdd } from "react-icons/io5";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import { BsCalendar2DayFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { BsBank2 } from "react-icons/bs";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { FaFileAlt } from "react-icons/fa";
import { FaFileCirclePlus } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BsFileEarmarkPlusFill } from "react-icons/bs";

import { BiSolidFilePlus } from "react-icons/bi";

import { HiDocumentPlus } from "react-icons/hi2";
import { FaRegListAlt } from "react-icons/fa";


import { TbArrowBigDownLinesFilled } from "react-icons/tb";
import { TbArrowBigUpLinesFilled } from "react-icons/tb";

import { IoIosSettings } from "react-icons/io";
import { IoPeople } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { AppContext } from "../../context/AppProvider";
import { ROUTES } from "../../config/routes";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const location = useLocation();
  const [submenuIndex, setSubmenuIndex] = useState(null);
  const { user } = useAuth();
  const isOpenSubMenu = (index) => {
    if (submenuIndex === index) {
      setSubmenuIndex(null);
    } else {
      setSubmenuIndex(index);
    }
  };

  const { isSidebarOpen } = useContext(AppContext);

  const menuConfig = {
    admin: [
      {
        type: "link",
        label: "Dashboard",
        icon: <RiDashboardHorizontalFill className="text-[13px]" />,
        path: ROUTES.PROTECTED.DASHBOARD.ADMIN,
        roles: ["admin"],
      },
      {
        type: "submenu",
        label: "Raw Materials",
        icon: <LuGrid3X3 className="text-[13px]" />,
        roles: ["admin", "inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.RAW_MATERIALS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add Raw Material",
            path: ROUTES.PROTECTED.RAW_MATERIALS.ADD,
            icon: <BsFillPlusCircleFill className="text-[13px]" />,
          },
          {
            label: "Stock In",
            path: ROUTES.PROTECTED.RAW_MATERIALS.STOCK_IN,
            icon: <TbArrowBigDownLinesFilled className="text-[13px]" />,
          },
          {
            label: "Stock Out",
            path: ROUTES.PROTECTED.RAW_MATERIALS.STOCK_OUT,
            icon: <TbArrowBigUpLinesFilled className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Finished Goods",
        icon: <IoShirtSharp className="text-[13px]" />,
        roles: ["admin", "inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.FINISHED_GOODS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add Finished Goods",
            path: ROUTES.PROTECTED.FINISHED_GOODS.ADD,
            icon: <BsFillPlusCircleFill className="text-[12px]" />,
          },
          {
            label: "Stock Add",
            path: ROUTES.PROTECTED.FINISHED_GOODS.STOCK_ADD,
            icon: <ImPlus className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Customers",
        icon: <MdPeopleAlt className="text-[13px]" />,
        roles: ["admin", "sales"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.CUSTOMERS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add New Customer",
            path: ROUTES.PROTECTED.CUSTOMERS.ADD,
            icon: <IoPersonAdd className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Suppliers",
        icon: <IoPeople className="text-[13px]" />,
        roles: ["admin", "inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.SUPPLIERS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add New Supplier",
            path: ROUTES.PROTECTED.SUPPLIERS.ADD,
            icon: <IoPersonAdd className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Sales Order",
        icon: <MdAssignmentAdd className="text-[13px]" />,
        roles: ["admin", "sales"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.SALES_ORDER.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add",
            path: ROUTES.PROTECTED.SALES_ORDER.ADD,
            icon: <HiDocumentPlus className="text-[18px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Purchase Order",
        icon: <FaClipboardList className="text-[13px]" />,
        roles: ["admin", "inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.ADD,
            icon: <HiDocumentPlus className="text-[18px]" />,
          },
          {
            label: "GRN List",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.GRN_LIST,
            icon: <FaRegListAlt className="text-[14px]" />,
          },
          {
            label: "Create GRN",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.CREATE_GRN,
            icon: <FaFileCirclePlus className="text-[15px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Reports",
        icon: <IoBarChartSharp className="text-[13px]" />,
        roles: ["admin", "sales"],
        subItems: [
          {
            label: "Daily",
            path: ROUTES.PROTECTED.REPORTS.DAILY,
            icon: <BsCalendar2DayFill className="text-[13px]" />,
          },
          {
            label: "Monthly",
            path: ROUTES.PROTECTED.REPORTS.MONTHLY,
            icon: <FaCalendarAlt className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Payment In",
        icon: <FaMoneyCheckDollar className="text-[13px]" />,
        roles: ["admin"],
        subItems: [
          {
            label: "Cash",
            path: ROUTES.PROTECTED.PAYMENT_IN.CASH,
            icon: <FaHandHoldingDollar className="text-[13px]" />,
          },
          {
            label: "Credit",
            path: ROUTES.PROTECTED.PAYMENT_IN.CREDIT,
            icon: <BsBank2 className="text-[13px]" />,
          },
          {
            label: "Cheque",
            path: ROUTES.PROTECTED.PAYMENT_IN.CHEQUE,
            icon: <FaMoneyCheckDollar className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Payment Out",
        icon: <FaMoneyCheckDollar className="text-[13px]" />,
        roles: ["admin"],
        subItems: [
          {
            label: "Cash",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CASH,
            icon: <FaHandHoldingDollar className="text-[13px]" />,
          },
          {
            label: "Credit",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CREDIT,
            icon: <BsBank2 className="text-[13px]" />,
          },
          {
            label: "Cheque",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CHEQUE,
            icon: <FaMoneyCheckDollar className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Cash",
        icon: <FaHandHoldingDollar className="text-[13px]" />,
        roles: ["admin"],
        subItems: [
          {
            label: "Cashout",
            path: ROUTES.PROTECTED.CASH.CASHOUT,
            icon: <HiOutlineBanknotes className="text-[13px]" />,
          },
          {
            label: "List",
            path: ROUTES.PROTECTED.CASH.LIST,
            icon: <FaList className="text-[13px]" />,
          },
        ],
      },
      {
        type: "link",
        label: "Settings",
        icon: <IoIosSettings className="text-[13px]" />,
        path: ROUTES.PROTECTED.SETTING,
        roles: ["admin"],
      },
    ],
    inventory: [
      {
        type: "link",
        label: "Dashboard",
        icon: <RiDashboardHorizontalFill className="text-[13px]" />,
        path: ROUTES.PROTECTED.DASHBOARD.INVENTORY,
        roles: ["inventory"],
      },
      {
        type: "submenu",
        label: "Raw Materials",
        icon: <LuGrid3X3 className="text-[13px]" />,
        roles: ["inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.RAW_MATERIALS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add Raw Material",
            path: ROUTES.PROTECTED.RAW_MATERIALS.ADD,
            icon: <BsFillPlusCircleFill className="text-[13px]" />,
          },
          {
            label: "Stock In",
            path: ROUTES.PROTECTED.RAW_MATERIALS.STOCK_IN,
            icon: <TbArrowBigDownLinesFilled className="text-[13px]" />,
          },
          {
            label: "Stock Out",
            path: ROUTES.PROTECTED.RAW_MATERIALS.STOCK_OUT,
            icon: <TbArrowBigUpLinesFilled className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Finished Goods",
        icon: <IoShirtSharp className="text-[13px]" />,
        roles: ["inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.FINISHED_GOODS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add Finished Goods",
            path: ROUTES.PROTECTED.FINISHED_GOODS.ADD,
            icon: <BsFillPlusCircleFill className="text-[13px]" />,
          },
          {
            label: "Stock Add",
            path: ROUTES.PROTECTED.FINISHED_GOODS.STOCK_ADD,
            icon: <ImPlus className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Suppliers",
        icon: <IoPeople className="text-[13px]" />,
        roles: ["inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.SUPPLIERS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add New Supplier",
            path: ROUTES.PROTECTED.SUPPLIERS.ADD,
            icon: <IoPersonAdd className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Purchase Order",
        icon: <FaClipboardList className="text-[13px]" />,
        roles: ["admin", "inventory"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.ADD,
            icon: <HiDocumentPlus className="text-[18px]" />,
          },
          {
            label: "GRN List",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.GRN_LIST,
            icon: <FaRegListAlt className="text-[14px]" />,
          },
          {
            label: "Create GRN",
            path: ROUTES.PROTECTED.PURCHASE_ORDER.CREATE_GRN,
            icon: <FaFileCirclePlus className="text-[15px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Payment Out",
        icon: <FaMoneyCheckDollar className="text-[13px]" />,
        roles: ["admin"],
        subItems: [
          {
            label: "Cash",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CASH,
            icon: <FaHandHoldingDollar className="text-[13px]" />,
          },
          {
            label: "Credit",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CREDIT,
            icon: <BsBank2 className="text-[13px]" />,
          },
          {
            label: "Cheque",
            path: ROUTES.PROTECTED.PAYMENT_OUT.CHEQUE,
            icon: <FaMoneyCheckDollar className="text-[13px]" />,
          },
        ],
      },
    ],
    sales: [
      {
        type: "link",
        label: "Dashboard",
        icon: <RiDashboardHorizontalFill className="text-[13px]" />,
        path: ROUTES.PROTECTED.DASHBOARD.SALES,
        roles: ["sales"],
      },
      {
        type: "submenu",
        label: "Customers",
        icon: <MdPeopleAlt className="text-[13px]" />,
        roles: ["sales"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.CUSTOMERS.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add New Customer",
            path: ROUTES.PROTECTED.CUSTOMERS.ADD,
            icon: <IoPersonAdd className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Sales Order",
        icon: <MdAssignmentAdd className="text-[13px]" />,
        roles: ["sales"],
        subItems: [
          {
            label: "List",
            path: ROUTES.PROTECTED.SALES_ORDER.LIST,
            icon: <FaList className="text-[13px]" />,
          },
          {
            label: "Add",
            path: ROUTES.PROTECTED.SALES_ORDER.ADD,
            icon: <HiDocumentPlus className="text-[18px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Payment In",
        icon: <FaMoneyCheckDollar className="text-[13px]" />,
        roles: ["admin"],
        subItems: [
          {
            label: "Cash",
            path: ROUTES.PROTECTED.PAYMENT_IN.CASH,
            icon: <FaHandHoldingDollar className="text-[13px]" />,
          },
          {
            label: "Credit",
            path: ROUTES.PROTECTED.PAYMENT_IN.CREDIT,
            icon: <BsBank2 className="text-[13px]" />,
          },
          {
            label: "Cheque",
            path: ROUTES.PROTECTED.PAYMENT_IN.CHEQUE,
            icon: <FaMoneyCheckDollar className="text-[13px]" />,
          },
        ],
      },
      {
        type: "submenu",
        label: "Reports",
        icon: <IoBarChartSharp className="text-[13px]" />,
        roles: ["sales"],
        subItems: [
          {
            label: "Daily",
            path: ROUTES.PROTECTED.REPORTS.DAILY,
            icon: <BsCalendar2DayFill className="text-[13px]" />,
          },
          {
            label: "Monthly",
            path: ROUTES.PROTECTED.REPORTS.MONTHLY,
            icon: <FaCalendarAlt className="text-[13px]" />,
          },
        ],
      },
    ],
  };

  


  const getDashboardPath = () => {
    const rolePaths = {
      admin: ROUTES.PROTECTED.DASHBOARD.ADMIN,
      inventory: ROUTES.PROTECTED.DASHBOARD.INVENTORY,
      sales: ROUTES.PROTECTED.DASHBOARD.SALES,
    };
    return rolePaths[user?.role] || ROUTES.PUBLIC.LOGIN;
  };
  const hasPermission = (roles) => roles.includes(user?.role);

  const renderMenuItems = () => {
    
    const currentPath = location.pathname;
    const currentRoleConfig = menuConfig[user?.role] || [];
    return currentRoleConfig.map((item, index) => {
      if (!hasPermission(item.roles)) return null;

      if (item.type === "link") {
        const isActive = currentPath === item.path
        return (
          <li key={index}>
            <Link to={item.path}>
              <Button className={`w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] ${isActive ? '!bg-blue-100' : '' }`}>
                {item.icon}
                <span className="text-[13px]">{item.label}</span>
              </Button>
            </Link>
          </li>
        );
      }

      if (item.type === "submenu") {
        const hasActiveChild = item.subItems.some(sub => sub.path === currentPath)
        return (
          <li key={index}>
            <Button
              className={`w-full !capitalize !justify-start flex gap-3 text-[13px] !text-[rgba(0,0,0,0.8)] !font-[600] items-center !py-2 hover:!bg-[#e4e4e4]
                ${hasActiveChild ? '!bg-blue-100':''}`}
              onClick={() =>
                setSubmenuIndex((prev) => (prev === index ? null : index))
              }
            >
              {item.icon}
              <span className="text-[13px]">{item.label}</span>
              <span className="ml-auto">
                <FaAngleDown
                  className={`transition-all ${
                    submenuIndex === index ? "rotate-180" : ""
                  }`}
                />
              </span>
            </Button>

            <Collapse isOpened={submenuIndex === index || hasActiveChild}>
            <ul className="w-full">
              {item.subItems.map((subItem, subIndex) => {
                const isSubActive = currentPath === subItem.path;
                return (
                  <li key={subIndex} className="w-full">
                    <Link to={subItem.path}>
                      <Button className={`!text-[rgba(0,0,0,0.8)] !capitalize !justify-start !w-full gap-3 !font-[600] items-center !py-2 hover:!bg-[#e4e4e4] !pl-8 ${
                        isSubActive ? '!bg-blue-50 border-l-4 border-blue-200' : ''
                      }`}>
                        {subItem.icon}
                        <span className="text-[13px] font-[600]">
                          {subItem.label}
                        </span>
                      </Button>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Collapse>
          </li>
        );
      }

      return null;
    });
  };
  return (
    <>
      <style>
        {`
          .ReactCollapse--collapse {
            transition: height 500ms;
          }
         





        `}
      </style>
      <div
        className={`sidebar fixed top-0 left-0 z-50 bg-white h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4 overflow-y-auto ${
          isSidebarOpen ? "w-[200px] md:w-[240px] lg:w-[260px]" : "w-0"
        } transition-all duration-300 whitespace-nowrap`} 
      >
        <div className="py-2 w-full">
          <Link to={getDashboardPath()}>
            <img src={AHNLogo} className="w-[150px]" alt="Logo" />

          </Link>
        </div>
        <ul className="mt-4">{renderMenuItems()}</ul>
      </div>
    </>
  );
};

export default Sidebar;

