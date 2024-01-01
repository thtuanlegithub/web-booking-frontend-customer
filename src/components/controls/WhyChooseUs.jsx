import React from 'react';
import { FaWifi, FaMoneyBillWave, FaPhone, FaBuysellads, FaBuyNLarge, FaShopify } from 'react-icons/fa';
function WhyChooseUs(props) {
    return (
        <div className='container mx-auto mt-16'>
            <div className='text-3xl font-bold'>Vì sao nên chọn chúng tôi</div>
            <div className='flex flex-col'>
                <div className='flex flex-row mt-8'>
                    <div className='flex-1 text-center place-content-center text-blue-800'>
                        <FaWifi size={50} className='mx-auto text-blue-800' />
                        Ứng dụng công nghệ hiện đại <br></br>Cung cấp dịch vụ trực tuyến
                    </div>
                    <div className='flex-1 text-center place-content-center text-blue-800'>
                        <FaMoneyBillWave size={50} className='mx-auto text-blue-800' />
                        Giá cả hợp lý <br></br>Ưu đãi ngập tràn
                    </div>
                </div>
                <div className='flex flex-row mt-16'>
                    <div className='flex-1 text-center place-content-center text-blue-800'>
                        <FaShopify size={50} className='mx-auto text-blue-800' />
                        Đặt Tour dễ dàng, nhanh chóng <br></br>Chỉ trong 3 bước
                    </div>
                    <div className='flex-1 text-center place-content-center text-blue-800'>
                        <FaPhone size={50} className='mx-auto text-blue-800' />
                        Hỗ trợ <br></br> hotline & trực tuyến
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyChooseUs;