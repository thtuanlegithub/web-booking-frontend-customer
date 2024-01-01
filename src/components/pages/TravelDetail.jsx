import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTravelById } from '../../services/travelServices';
import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import dayjs from 'dayjs';
function TravelDetail(props) {
    const { travelId } = useParams();
    const [selectedTravel, setSelectedTravel] = useState(null);
    useEffect(() => {
        fetchSelectedTravel();
    }, [])
    function formatCurrency(value) {
        // Sử dụng toLocaleString để định dạng số với dấu phẩy
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const fetchSelectedTravel = async () => {
        let res = await fetchTravelById(travelId);
        if (res && res.data && res.data.EC) {
            console.log(res.data.DT);
            setSelectedTravel(res.data.DT);
        }
    }
    return (
        <>
            {selectedTravel && (
                <div className='mx-36 2xl:mx-48'>
                    <div className='flex flex-row mt-8'>
                        <div className='text-2xl font-semibold text-blue-800'>{selectedTravel.Tour.tourName}</div>
                        <div className='flex flex-col ml-auto'>
                            <div>
                                <div className='inline text-2xl font-bold mt-2 text-red-500 ml-2'>
                                    {formatCurrency(selectedTravel.travelPrice)} đ
                                </div>
                                <div className='inline'> /khách</div>
                                <Button className='!rounded-md !ml-2 !text-black !py-2 !px-4 !font-semibold !text-md !normal-case !bg-yellow-300'><FaShoppingCart className='mr-2' /> Đặt ngay</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <div className='h-96 flex-1 rounded-xl' style={{
                            objectFit: 'cover',
                            backgroundImage: `url(${selectedTravel.Tour.mainImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: 'auto',
                        }}></div>
                        <div className='flex flex-1 flex-col'>
                            <div className='flex flex-row'>
                                <div className='h-48 ml-2 flex-1 rounded-xl' style={{
                                    objectFit: 'cover',
                                    backgroundImage: `url(${selectedTravel.Tour.TourAdditionalImages[0].additionalImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: 'auto',
                                }}></div>
                                {
                                    selectedTravel.Tour.TourAdditionalImages[1] &&
                                    <div className='h-48 mx-2 flex-1 rounded-xl' style={{
                                        objectFit: 'cover',
                                        backgroundImage: `url(${selectedTravel.Tour.TourAdditionalImages[1].additionalImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        width: 'auto',
                                    }}></div>
                                }
                            </div>
                            {selectedTravel.Tour.TourAdditionalImages[2] &&
                                <div className='h-48 mx-2 mt-2 flex-1 rounded-xl' style={{
                                    objectFit: 'cover',
                                    backgroundImage: `url(${selectedTravel.Tour.TourAdditionalImages[2].additionalImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: 'auto',
                                }}></div>
                            }
                        </div>
                    </div>
                    <div className='flex flex-row mt-4'>
                        <div className='bg-blue-50 px-12 py-4 w-max rounded-xl'>
                            <div>
                                <div className='inline'>Nơi khởi hành: </div>
                                <div className='inline font-semibold'>{selectedTravel.startLocation}</div>
                            </div>
                            <div className='mt-2'>
                                <div className='inline'>Giờ khởi hành: </div>
                                <div className='inline font-semibold'>{dayjs(selectedTravel.startDateTime).format('HH:mm A')} - {dayjs(selectedTravel.startDateTime).format('DD/MM/YYYY')}</div>
                            </div>
                            <div className='mt-2'>
                                <div className='inline'>Thời gian: </div>
                                <div className='inline font-semibold'>{selectedTravel.Tour.totalDay} ngày</div>
                            </div>
                            <div className='mt-2'>
                                <div className='inline'>Số chỗ còn nhận: </div>
                                <div className='inline font-semibold'>{selectedTravel.remainTicket}</div>
                            </div>
                        </div>
                        <div className='flex-1'></div>
                    </div>
                    <div>
                        <div className='text-center text-xl font-bold mt-4'>Lịch trình</div>
                        <div className='flex flex-row'>
                            <div className='w-96 bg-blue-50 rounded-xl px-4 py-8'>
                                {selectedTravel.Tour.TourSchedules.map((item, index) => (
                                    <div className='mt-2'>
                                        <div className='inline font-semibold'>Ngày {index + 1}:</div>
                                        <div className='inline ml-2'>{item.daySummary}</div>
                                    </div>
                                ))}
                            </div>
                            <div className=''></div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

export default TravelDetail;