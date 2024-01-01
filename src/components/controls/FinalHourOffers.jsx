import React, { useState, useEffect } from 'react';
import TravelCard from './TravelCard';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchTravelPagination } from '../../services/travelServices';
function FinalHourOffers(props) {
    const [listFinalTravel, getListFinalTravel] = useState([]);
    const [listTravel, setListTravel] = useState([]);
    useEffect(() => {
        fetchListTravel();
    }, [])
    const fetchListTravel = async () => {
        let res = await fetchTravelPagination(0, 0);
        if (res && res.data && res.data.EC) {
            setListTravel(res.data.DT);
        }
    }
    return (
        <div className='mx-12 md:mx-4 xl:mx-24 xl:mx-36 mt-8'>
            <div className='mx-8'>
                <div className='text-3xl font-bold'>Ưu đãi giờ chót</div>
                <div className='mt-4 grid 2xl:grid-cols-4 xl:grid-cols-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 xl:gap-12 2xl:gap-24 gap-8 flex-wrap'>
                    {listTravel.map((item) => (<TravelCard travel={item} />))}
                </div>
            </div>
            <Link to='/search'
                className='bg-blue-500 rounded-lg text-white py-2 px-4 mt-4 cursor-pointer inline float-right hover:shadow-lg'>
                Xem tất cả
                <FaArrowRight className='inline ml-2' />
            </Link>
        </div>
    );
}

export default FinalHourOffers;