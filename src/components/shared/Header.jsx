import React from 'react';
import HeaderMenu from '../controls/HeaderMenu';
import { TextField, IconButton, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header(props) {

    return (
        <div className='flex flex-row items-center p-2 align-middle'>
            <Link to='/'>
                <img className='h-12 ml-4' src="/images/travellogo.png" alt="Logo" />
            </Link>
            <Button className='!normal-case !font-semibold !text-md'>Gói du lịch</Button>
            <Button className='!normal-case !font-semibold !text-md'>Khuyến mãi</Button>
            <Button className='!normal-case !font-semibold !text-md'>Tin tức</Button>
            <Button className='!normal-case !font-semibold !text-md'>Liên hệ</Button>
            <div className='ml-auto mr-4 flex flex-row float-right'>
                <div className='inline mr-1 mt-0.5 text-lg font-semibold'>Hotline:</div>
                <div className='inline text-red-500 text-xl font-bold'>1900 1900</div>
            </div>
        </div>
    );
}

export default Header;