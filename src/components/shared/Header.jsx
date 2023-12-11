import React from 'react';
import HeaderMenu from '../controls/HeaderMenu';
import { TextField } from '@mui/material';

function Header(props) {
    return (
        <div className='flex flex-row p-2 bg-blue-100 align-middle h-16'>
            <img className='h-full ml-4' src="/images/travellogo.png" alt="Logo" />
            <HeaderMenu />
            <HeaderMenu />
            <HeaderMenu />
            <HeaderMenu />
            <TextField id="outlined-basic" label="Search" variant="outlined" />
        </div>
    );
}

export default Header;