import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../components/shared/Layout';
import Booking from '../components/pages/Booking';
import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import SignUp from '../components/pages/SignUp';
import Search from '../components/pages/Search';
function GuestRoutes(props) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />}></Route>
                        <Route path='booking' element={<Booking />}></Route>
                        <Route path='search' element={<Search />}></Route>
                    </Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/signup' element={<SignUp />}></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default GuestRoutes;