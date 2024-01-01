import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchTravelById } from '../../services/travelServices';
import { Button } from '@mui/material';
import { FaBusAlt, FaCalendarCheck, FaClock, FaMapMarkerAlt, FaShoppingCart, FaTag, FaUserCheck } from 'react-icons/fa';
import { PiBowlFoodFill } from "react-icons/pi";
import { FaBusinessTime } from "react-icons/fa";

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
    const scheduleDate = (index) => {
        const currentDate = dayjs(selectedTravel.startDateTime);
        // Kiểm tra nếu currentDate là một đối tượng Day.js hợp lệ
        if (currentDate.isValid()) {
            // Số ngày muốn thêm vào
            const numberOfDaysToAdd = index;

            // Cộng thêm số ngày vào ngày hiện tại
            const newDate = currentDate.add(numberOfDaysToAdd, 'day');

            // Hiển thị kết quả
            const formattedDate = newDate.format('DD/MM/YYYY');
            return formattedDate;
        } else {
            console.log("Ngày không hợp lệ.");
            return null;
        }
    };

    return (
        <>
            {selectedTravel && (
                <div className='mx-36 2xl:mx-60'>
                    <div className='flex flex-wrap flex-row mt-8'>
                        <div className='text-2xl font-semibold text-blue-800'>{selectedTravel.Tour.tourName}</div>
                        <div className='flex flex-col ml-auto'>
                            <div>
                                <div className='inline text-2xl font-bold mt-2 text-red-500 ml-2'>
                                    {formatCurrency(selectedTravel.travelPrice)} đ
                                </div>
                                <div className='inline'> /khách</div>
                                <Link to={`/booking/${selectedTravel.id}`}>
                                    <Button className='!rounded-md !ml-2 !text-black !py-2 !px-4 !font-semibold !text-md !normal-case !bg-yellow-300'><FaShoppingCart className='mr-2' /> Đặt ngay</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row flex-wrap mt-4'>
                        <div className='h-96 flex-1 rounded-xl min-w-64' style={{
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
                                <FaMapMarkerAlt className='inline mr-2 mb-1' />
                                <div className='inline'>Nơi khởi hành: </div>
                                <div className='inline font-semibold'>{selectedTravel.startLocation}</div>
                            </div>
                            <div className='mt-2'>
                                <FaCalendarCheck className='inline mr-2 mb-1' />
                                <div className='inline'>Giờ khởi hành: </div>
                                <div className='inline font-semibold'>{dayjs(selectedTravel.startDateTime).format('HH:mm A')} - {dayjs(selectedTravel.startDateTime).format('DD/MM/YYYY')}</div>
                            </div>
                            <div className='mt-2'>
                                <FaClock className='inline mr-2 mb-1' />
                                <div className='inline'>Thời gian: </div>
                                <div className='inline font-semibold'>{selectedTravel.Tour.totalDay} ngày</div>
                            </div>
                            <div className='mt-2'>
                                <FaTag className='inline mr-2 mb-1' />
                                <div className='inline'>Số chỗ còn nhận: </div>
                                <div className='inline font-semibold'>{selectedTravel.remainTicket}</div>
                            </div>
                        </div>
                        <div className='flex-1 ml-4'>
                            <div className='bg-blue-50 px-16 py-4 rounded-xl flex flex-row justify-between'>
                                <div>
                                    <div className='h-32'>
                                        <div className='flex justify-center mb-2'>
                                            <FaBusAlt size={30} />
                                        </div>
                                        <div className='inline font-semibold'>Phương tiện du lịch: </div>
                                        <div className='inline'>Máy bay/ xe du lịch</div>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex justify-center mb-2'>
                                            <PiBowlFoodFill size={30} />
                                        </div>
                                        <div className='inline font-semibold'>Ẩm thực: </div>
                                        <div className='inline'>Theo thực đơn, nhà hàng, đặc sản địa phương</div>
                                    </div>
                                </div>
                                <div className='ml-4'>
                                    <div className='h-32'>
                                        <div className='flex justify-center mb-2'>
                                            <FaUserCheck size={30} />
                                        </div>
                                        <div className='inline font-semibold'>Đối tượng thích hợp: </div>
                                        <div className='inline'>Mọi đối tượng</div>
                                    </div>
                                    <div className='mt-2'>
                                        <div className='flex justify-center mb-2'>
                                            <FaBusinessTime size={30} />
                                        </div>
                                        <div className='inline font-semibold'>Thời gian lý tưởng: </div>
                                        <div className='inline'>Quanh năm</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='text-center text-xl font-bold mt-4'>Lịch trình</div>
                        <div className='flex flex-row'>
                            <div className='w-80 bg-gray-50 rounded-xl px-8 py-8'>
                                {selectedTravel.Tour.TourSchedules.map((item, index) => (
                                    <div className='mt-4'>
                                        <div className='inline font-semibold'>Ngày {index + 1}:</div>
                                        <div className='inline text-sm ml-2'>{scheduleDate(index)}</div>
                                        <div className='ml-10 font-semibold'>{item.daySummary}</div>
                                        <div className='border mt-4'></div>
                                    </div>
                                ))}
                            </div>
                            <div className='flex-1 ml-4 bg-blue-50 rounded-xl px-8 py-8'>
                                <div className=''>
                                    {selectedTravel.Tour.TourSchedules.map((item, index) => (
                                        <div className='mt-4'>
                                            <div className='inline font-semibold'>Ngày {index + 1}:</div>
                                            <div className='inline ml-2 font-semibold'>{item.daySummary}</div>
                                            {item.Packages && item.Packages.map((itemPackage) => (
                                                <div className='mt-2 ml-4'>
                                                    <div className='inline font-medium'>
                                                        • {itemPackage.packageName}
                                                    </div>
                                                    {itemPackage.packageDescription.length > 0 && <div className='inline font-medium'>:</div>}
                                                    <div className='inline ml-2'>{itemPackage.packageDescription}</div>
                                                </div>
                                            ))}
                                            <div className='border mt-4'></div>
                                        </div>
                                    ))}
                                    <div className='w-96'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );
}

export default TravelDetail;