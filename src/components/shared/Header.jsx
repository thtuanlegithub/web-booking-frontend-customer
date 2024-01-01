import React from 'react';
import HeaderMenu from '../controls/HeaderMenu';
import { TextField, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function Header(props) {

    return (
        <div className='flex flex-row items-center p-2 align-middle'>
            <Link to='/'>
                <img className='h-12 ml-4' src="/images/travellogo.png" alt="Logo" />
            </Link>
            <HeaderMenu title="Gói du lịch" />
            <HeaderMenu title="Khuyến mãi" />
            <HeaderMenu title="Tin tức" />
            <HeaderMenu title="Liên hệ" />
            <div className='ml-auto mr-4 flex flex row'>
                <TextField className=' ml-auto' id="outlined-basic" label="Search" size="small" variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <FaSearch size={15} />
                            </IconButton>
                        ),
                    }} />
                <Avatar className='ml-4'><FaUser color='black' className='cursor-pointer' /></Avatar>

            </div>
        </div>
    );
}

export default Header;