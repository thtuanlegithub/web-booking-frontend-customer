import React, { useEffect, useState } from 'react';
import { fetchBookingById } from '../../services/bookingServices';
import dayjs from 'dayjs';
import formatCurrency from '../../utils/formatCurrency';
function Payment(props) {
    const bookingId = localStorage.getItem('bookingId');
    const [selectedBooking, setSelectedBooking] = useState(null);
    useEffect(() => { fetchSelectedBooking() }, []);
    const fetchSelectedBooking = async () => {
        let res = await fetchBookingById(bookingId);
        if (res && res.data && res.data.EC === '0') {
            console.log(res.data.DT);
            setSelectedBooking(res.data.DT);
        }
    }
    return (
        <div className='mx-8 md:mx-20 lg:mx-40 xl:mx-60 2xl:mx-80'>
            <div className='text-center text-xl font-semibold mt-4'>
                Thanh toán
            </div>
            <div className='bg-blue-50 rounded-xl py-8'>
                <div className='flex justify-center'>
                    <div className='text-center inline mt-0.5'>Mã booking của bạn là</div>
                    <div className='inline text-xl font-bold ml-2'> {bookingId}</div>
                </div>
                <div className='text-center mt-2'>Thực hiện chuyển khoản theo thông tin bên dưới:</div>
                <img className='mx-auto w-72' src='./images/payment.png' />
                <div className='text-center mt-4'>Sau khi chuyển khoản, liên hệ nhân viên hỗ trợ qua hotline: <b className='text-red-500 text-lg'>1900 1900</b> để được hỗ trợ</div>
            </div>
            {
                selectedBooking
                && selectedBooking.Travel &&
                <>
                    <div className='bg-yellow-50 rounded-lg p-8 mt-8'>
                        <div className='font-bold text-xl text-center'>Thông tin hóa đơn</div>
                        <div className='grid grid-cols-3 mt-4 border px-4 py-2'>
                            <div>
                                <div>Đơn giá</div>
                                <div className='font-semibold mt-1'>{formatCurrency(selectedBooking.Travel.travelPrice)}</div>
                            </div>
                            <div>
                                <div>Số lượng</div>
                                <div className='font-semibold mt-1'>x {selectedBooking.Tourists.length}</div>
                            </div>
                            <div>
                                <div>Thành tiền</div>
                                <div className='font-semibold mt-1'>{formatCurrency(selectedBooking.Travel.travelPrice * selectedBooking.Tourists.length)}</div>
                            </div>
                        </div>
                        <div className='text-right mt-4'>Tiền cần thanh toán:</div>
                        <div className='text-xl  text-right font-bold text-red-500 ml-2'>{formatCurrency(selectedBooking.Travel.travelPrice * selectedBooking.Tourists.length)} đ</div>
                    </div>
                </>
            }
            <div className='text-center text-xl font-semibold mt-4'>
                Thông tin Travel của bạn:
            </div>
            <div className='flex flex-row bg-blue-50 rounded-xl drop-shadow-md'>
                {selectedBooking && selectedBooking.Travel.Tour && selectedBooking.Travel.Tour.mainImage &&
                    <>
                        <div className=' rounded-s-xl h-60' style={{
                            objectFit: 'cover',
                            backgroundImage: `url(${selectedBooking.Travel.Tour.mainImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            cursor: 'pointer',
                            width: '300px',
                        }}></div>
                        <div className='flex-1 ml-4 mt-4'>
                            <div className='text-xl font-bold text-blue-800'>{selectedBooking.Travel.Tour.tourName}</div>
                            <div className='mt-1'>
                                <div className='inline'>Mã tour:</div>
                                <div className='font-bold inline ml-2'>{selectedBooking.Travel.Tour.id}</div>
                            </div>
                            <div className='mt-1'>
                                <div className='inline'>Ngày khởi hành:</div>
                                <div className='font-bold inline ml-2'>{dayjs(selectedBooking.Travel.startDateTime).format("DD/MM/YYYY")}</div>
                            </div>
                            <div className='mt-1'>
                                <div className='inline'>Thời gian:</div>
                                <div className='font-bold inline ml-2'>{selectedBooking.Travel.Tour.totalDay}</div>
                            </div>
                            <div className='mt-1'>
                                <div className='inline'>Số chỗ còn nhận:</div>
                                <div className='font-bold inline ml-2'>{selectedBooking.Travel.remainTicket}</div>
                            </div>
                            <div className='text-xl font-bold mt-2 text-red-500 ml-2'>{formatCurrency(selectedBooking.Travel.travelPrice)} đ</div>
                            {
                                selectedBooking.Travel.Discount && selectedBooking.Travel.discountAmount &&
                                <div className='absolute right-3 bottom-3 font-bold text-sm bg-yellow-400 rounded-lg p-2'>Giảm giá {selectedBooking.Travel.Discount.discountAmount}%</div>
                            }
                        </div>
                    </>
                }
            </div>

        </div>
    );
}

export default Payment;