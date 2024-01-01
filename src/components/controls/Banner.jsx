import React from 'react';

function Banner(props) {
    return (
        <div className='h-96' style={{
            objectFit: 'cover',
            backgroundImage: `url(${'/images/banner2.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
        }}></div>
    );
}

export default Banner;