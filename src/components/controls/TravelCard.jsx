import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

function TravelCard(props) {
	const [daysRemaining, setDaysRemaining] = useState(0);
	useEffect(() => {
		// Tính số ngày còn lại khi props.travel.startDateTime thay đổi
		const startDate = dayjs(props.travel.startDateTime);
		const currentDate = dayjs();
		const remainingDays = startDate.diff(currentDate, 'day');

		// Cập nhật state với số ngày còn lại
		setDaysRemaining(remainingDays);
	}, [props.travel.startDateTime]);

	function formatCurrency(value) {
		// Sử dụng toLocaleString để định dạng số với dấu phẩy
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	return (
		<Link to={`/travel/${props.travel.id}`}>
			<div className='flex flex-col rounded-xl shadow-xl hover:shadow-2xl cursor-pointer w-max mx-auto'>
				<div className='h-48 rounded-t-xl' style={{
					objectFit: 'cover',
					backgroundImage: `url(${props.travel.Tour.mainImage})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					cursor: 'pointer',
					width: 'auto',
				}}></div>
				<div className='p-4 relative'>
					<div className='text-sm font-regular mt-2 inline'>{dayjs(props.travel.startDateTime).format('DD/MM/YYYY')}</div>
					<div className='text-sm font-regular mt-2 inline'> - còn {daysRemaining} ngày</div>
					<div className='texl-xl font-bold mt-2 h-10 w-72'>
						{props.travel.Tour.tourName}
					</div>
					<div className='text-md font-regular mt-4'>
						Mã Tour: #{props.travel.Tour.id}
					</div>
					<div className='text-md font-regular mt-2'>Nơi khởi hành: {props.travel.startLocation}</div>
					<div className='mt-2'>
						<div className='text-md font-regular mt-1 inline'>Giá: </div>
						<div className='text-md font-regular mt-1 inline line-through'>{formatCurrency(props.travel.Tour.tourPrice)} đ</div>
					</div>
					<div className='text-xl font-bold mt-2 text-red-500 ml-2'>{formatCurrency(props.travel.travelPrice)} đ</div>
					{props.travel.Discount && props.travel.Discount.discountType === 'Percentage' &&
						<div className='absolute right-3 bottom-3 font-bold text-sm bg-yellow-400 rounded-lg p-2'>Giảm giá {props.travel.Discount.discountAmount}%</div>
					}
				</div>
				<div className='px-4 pb-4'>
					<div className='text-md font-medium inline'>Số chỗ còn: </div>
					<div className='text-lg font-bold inline text-red-500'>{props.travel.remainTicket}</div>
				</div>
				<div className='w-72'></div>
			</div>
		</Link>
	);
}

export default TravelCard;