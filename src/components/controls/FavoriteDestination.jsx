import React from 'react';
import Destination from './Destination';

function FavoriteDestination(props) {
    return (
        <div className='container mx-auto mt-16'>
            <div className='text-3xl font-bold'>Điểm đến yêu thích</div>
            <div className='flex flex-row gap-12 mt-4'>
                <Destination />
                <Destination />
                <Destination />
                <Destination />
            </div>
            <div className='flex flex-row gap-12 mt-8'>
                <Destination />
                <Destination />
                <Destination />
                <Destination />
            </div>
        </div>
    );
}

export default FavoriteDestination;