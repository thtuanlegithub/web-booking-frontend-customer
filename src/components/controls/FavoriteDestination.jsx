import React from 'react';
import Destination from './Destination';
import { FAVORITE_DESTINATIONS } from '../../lib/const/FavoriteDestinations';
function FavoriteDestination(props) {
    return (
        <div className='container mx-auto mt-16'>
            <div className='text-3xl font-bold'>Điểm đến yêu thích</div>
            <div className='grid mx-4 md:grid-cols-2 lg:grid-cols-4 mt-4 gap-8'>
                {
                    FAVORITE_DESTINATIONS.map((item) => (
                        <Destination address={item.address} imgSrc={item.imgSrc} />
                    ))
                }
            </div>
        </div>
    );
}

export default FavoriteDestination;