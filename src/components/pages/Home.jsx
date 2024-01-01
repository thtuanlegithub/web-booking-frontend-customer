import React from 'react';
import ScrollingBanner from '../controls/ScrollingBanner';
import FinalHourOffers from '../controls/FinalHourOffers';
import FavoriteDestination from '../controls/FavoriteDestination';
import WhyChooseUs from '../controls/WhyChooseUs';
import Banner from '../controls/Banner';
function Home(props) {
    return (
        <div className='flex flex-col'>
            <Banner />
            <FinalHourOffers />
            <FavoriteDestination />
            <WhyChooseUs />
        </div>
    );
}

export default Home;