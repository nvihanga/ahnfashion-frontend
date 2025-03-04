import React, { useState,useContext } from 'react'
import { Routes, useNavigate,Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FaRegBell } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { IoMdLogOut } from "react-icons/io";
import { AppContext } from '../../context/AppProvider';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const [anchorMyAcc, setAnchorMyAcc] = React.useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const {logout} = useAuth();
    const navigate = useNavigate();
    const {user} = useAuth();
    const handleClickMyAcc = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMyAcc(null);
    };

    const context = useContext(AppContext);

    const handleSignOut = () => {
        logout();
        //navigate(ROUTES.PUBLIC.LOGIN);
    };

    

    return (
        <>
            <style>
                {`
          .MuiBadge-badge {
            background: red !important;
          }
            
        `}
            </style>
            <header className={`fixed top-0 left-0 right-0 z-10 w-full h-[auto] py-1 ${context.isSidebarOpen===true?'pl-[200px] md:pl-[240px] lg:pl-[260px]' : 'pl-5 md:pl-5 lg:pl-5'} pr-10 shadow-md bg-white flex items-center justify-between transition-all duration-300`}>
                <div className='part1'>
                    <Button 
                        className='!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]' onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}>
                            {
                                context.isSidebarOpen === true ? <AiOutlineMenuFold className='text-[20px] text-[rgba(0,0,0,0.8)]' /> : <AiOutlineMenuUnfold className='text-[20px] text-[rgba(0,0,0,0.8)]' />
                            }
                        
                    </Button>
                </div>

                <div className='part2 w-[40%] flex items-center justify-end gap-5'>
                    <IconButton aria-label="cart">
                        <Badge color="secondary" variant="dot">
                            <FaRegBell className='text-[20px] text-[rgba(0,0,0,0.8)]' />
                        </Badge>
                    </IconButton>
                    <div className='relative'>
                        <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer' onClick={handleClickMyAcc}>
                            <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" className='w-full h-full object-cover' />
                        </div>
                        <Menu
                            anchorEl={anchorMyAcc}
                            id="account-menu"
                            open={openMyAcc}
                            onClose={handleCloseMyAcc}
                            onClick={handleCloseMyAcc}
                            slotProps={{
                                paper: {
                                    elevation: 0,
                                    sx: {
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&::before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={handleCloseMyAcc} className='bg-white'>
                                <div className='flex items-center gap-3'>
                                    <div className='rounded-full w-[35px] h-[35px] overflow-hidden cursor-pointer'>
                                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" className='w-full h-full object-cover' />
                                    </div>
                                    <div className='info'>
                                        <h3 className='text-[14px] leading-5'>{user?.username || 'Guest'}</h3>
                                        <p className='text-[12px] opacity-60'>{user?.role?.toUpperCase() || 'User'}</p>
                                    </div>
                                </div>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleSignOut} className='flex items-center gap-3'>
                                <IoMdLogOut />
                                <span className='text-[12px]'>Sign Out</span>
                            </MenuItem>
                        </Menu>
                    </div>
                </div>

            </header>
        </>
    )
}

export default Header


