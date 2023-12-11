import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout(props) {
    return (
        <div className='flex-container'>
            <Header />
            <div className='content-container'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default Layout;
