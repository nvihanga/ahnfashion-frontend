import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaRegBell } from 'react-icons/fa6';
import { IoMdLogOut } from 'react-icons/io';
import { AppContext } from '../../context/AppProvider';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
    const [anchorMyAcc, setAnchorMyAcc] = useState(null);
    const openMyAcc = Boolean(anchorMyAcc);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const context = useContext(AppContext);

    const handleClickMyAcc = (event) => {
        setAnchorMyAcc(event.currentTarget);
    };
    const handleCloseMyAcc = () => {
        setAnchorMyAcc(null);
    };

    const handleSignOut = () => {
        logout();
        navigate(ROUTES.PUBLIC.LOGIN);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-10 w-full py-2 px-5 bg-white shadow-md flex items-center justify-between transition-all duration-300 ${context.isSidebarOpen ? 'pl-[200px] md:pl-[240px] lg:pl-[260px]' : 'pl-5 md:pl-5 lg:pl-5'}`}>
            {/* Sidebar Toggle Button */}
            <Button className='!w-10 !h-10 !rounded-full' onClick={() => context.setIsSidebarOpen(!context.isSidebarOpen)}>
                {context.isSidebarOpen ? <AiOutlineMenuFold className='text-xl text-gray-800' /> : <AiOutlineMenuUnfold className='text-xl text-gray-800' />}
            </Button>

            {/* Right Side Controls */}
            <div className='flex items-center gap-4'>
                {/* Notification Bell */}
                <IconButton>
                    <Badge color='secondary' variant='dot'>
                        <FaRegBell className='text-xl text-gray-800' />
                    </Badge>
                </IconButton>
                
                {/* Profile Menu */}
                <div className='relative'>
                    <div className='w-10 h-10 rounded-full overflow-hidden cursor-pointer' onClick={handleClickMyAcc}>
                        <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile' className='w-full h-full object-cover' />
                    </div>
                    <Menu
                        anchorEl={anchorMyAcc}
                        open={openMyAcc}
                        onClose={handleCloseMyAcc}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        sx={{ mt: 1 }}
                    >
                        <MenuItem onClick={handleCloseMyAcc}>
                            <div className='flex items-center gap-3'>
                                <div className='w-9 h-9 rounded-full overflow-hidden'>
                                    <img src='https://www.w3schools.com/howto/img_avatar.png' alt='profile' className='w-full h-full object-cover' />
                                </div>
                                <div>
                                    <h3 className='text-sm font-medium'>John Doe</h3>
                                    <p className='text-xs text-gray-500'>Admin</p>
                                </div>
                            </div>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={handleSignOut} className='flex items-center gap-2'>
                            <IoMdLogOut className='text-lg' />
                            <span className='text-sm'>Sign Out</span>
                        </MenuItem>
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;
