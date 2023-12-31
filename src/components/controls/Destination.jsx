import React from 'react';

function Destination(props) {
    return (
        <div className='relative rounded-xl shadow hover:shadow-xl cursor-pointer bg-neutral-800	'>
            <img className='rounded-xl shadow-xl opacity-40' src={`${props.imgSrc}`} />
            <div className='text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white'>
                {props.address}
            </div>
        </div>
    );
}

export default Destination;