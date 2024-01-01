import React from 'react';

function Destination(props) {
    return (
        <div className='relative rounded-xl shadow hover:shadow-xl cursor-pointer bg-neutral-800	'>
            <img className='rounded-xl shadow-xl opacity-40' src="/images/destination1.jpg" />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                Đà Lạt
            </div>
        </div>
    );
}

export default Destination;