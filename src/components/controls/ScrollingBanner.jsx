import React, { useEffect, useState } from 'react';
import '../styles/ScrollingBanner.css';
const imageUrls = ['/images/banner1.jpg', './images/banner2.jpg', 'images/banner3.jpg'];

const ScrollingBanner = () => {
    const [currentImageUrlIndex, setCurrentImageUrlIndex] = useState(0);

    useEffect(() => {
        const bannerInterval = setInterval(() => {
            setCurrentImageUrlIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 5000); // Chuyển đổi ảnh mỗi 10 giây

        return () => clearInterval(bannerInterval);
    }, [imageUrls]);

    return (
        <div className="scrolling-banner h-96">
            {imageUrls.map((imageUrl, index) => (
                <img
                    key={index}
                    src={imageUrl}
                    alt={`Scrolling Banner ${index}`}
                    className={`slide ${index === currentImageUrlIndex ? 'visible' : 'hidden'}`}
                    style={{
                        transform: `translateX(${100 * (index - currentImageUrlIndex)}%)`,
                    }}
                />
            ))}
        </div>
    );
};

export default ScrollingBanner;