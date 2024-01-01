import React from 'react';

function Footer(props) {
    return (
        <div className='container mx-auto flex flex-row mt-16'>
            <div className='contact flex-1 flex flex-col px-2'>
                <div className='text-xl font-semibold mb-2'>Liên hệ</div>
                <div className='text-sm py-1'>
                    190 Pasteur, Phường Võ Thị Sáu, Quận 3, TPHCM
                </div>
                <div className='text-sm py-1'>
                    (+84 28) 3822 8898
                </div>
                <div className='text-sm py-1'>
                    info@travel.com
                </div>
            </div>
            <div className='contact flex-1 flex flex-col px-4'>
                <div className='text-xl font-semibold mb-2'>Thông tin</div>
                <a href='#' className='text-sm py-1'>
                    Cẩm nang du lịch
                </a>
                <a href='#' className='text-sm py-1'>
                    Tin tức
                </a>
                <a href='#' className='text-sm py-1'>
                    Giấy phép kinh doanh
                </a>
            </div>
            <div className='contact flex-1 flex flex-col px-4'>
                <div className='text-xl font-semibold mb-2'>Chính sách</div>
                <a href='#' className='text-sm py-1'>
                    Chính sách hủy
                </a>
                <a href='#' className='text-sm py-1'>
                    Chính sách riêng tư
                </a>
                <a href='#' className='text-sm py-1'>
                    Thỏa thuận sử dụng
                </a>
                <a href='#' className='text-sm py-1'>
                    Bảo hiểm
                </a>
            </div>
        </div>
    );
}

export default Footer;