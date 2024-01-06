import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTravelById } from '../../services/travelServices';
import { createBooking } from '../../services/bookingServices';
import dayjs from 'dayjs';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { isValidGmail } from '../../utils/isValidGmail';
function Booking(props) {
    let navigate = useNavigate();
    const [selectedTravel, setSelectedTravel] = useState(null);
    const { travelId } = useParams();
    const [numberOfTourist, setNumberOfTourist] = useState(1);
    const [touristList, setTouristList] = useState(['']);
    const handleNumberOfTouristChange = (event) => {
        const newNumberOfTourist = parseInt(event.target.value, 10);
        if (selectedTravel.remainTicket >= newNumberOfTourist) {
            setNumberOfTourist(newNumberOfTourist);
            setBookingPrice(selectedTravel.travelPrice * newNumberOfTourist);
            console.log(newNumberOfTourist);
            // Update touristList length
            setTouristList((prevList) => {
                const newList = [...prevList];
                while (newList.length < newNumberOfTourist) {
                    newList.push('');
                }
                return newList.slice(0, newNumberOfTourist);
            });
        }
        else if (newNumberOfTourist > 0) {
            setSnackbarMessage(`Số hành khách phải nhỏ hơn hoặc bằng số chỗ còn nhận: ${selectedTravel.remainTicket}`);
            setOpenSnackbar(true);
        }
        else {
            setSnackbarMessage("Số hành khách phải là số và lớn hơn 0");
            setOpenSnackbar(true);
        }
    };

    const handleTouristChange = (event, index) => {
        if (event.target.value.length > 30) {
            setSnackbarMessage('Tên tối đa 30 kí tự')
            setOpenSnackbar(true);
        }
        else {
            const newTouristName = event.target.value;

            setTouristList((prevList) => {
                const newList = [...prevList];
                newList[index] = newTouristName;
                return newList;
            });
        }
    };

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
            console.log("booking", res.data.DT);
            setSelectedTravel(res.data.DT);
            setBookingPrice(res.data.DT.travelPrice * numberOfTourist);
        }
    }
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const validateInput = () => {
        let invalidInput = false;
        if (customerPhone == '' || customerPhone == null) {
            setSnackbarMessage('Vui lòng nhập số điện thoại');
            setOpenSnackbar(true);
            return false;
        }
        if (customerName == '' || customerName == null) {
            setSnackbarMessage('Vui lòng nhập họ tên trong thông tin liên hệ');
            setOpenSnackbar(true);
            return false;
        }
        if (customerGmail == '' || customerGmail == null) {
            setSnackbarMessage('Vui lòng nhập gmail');
            setOpenSnackbar(true);
            return false;
        }
        if (!isValidGmail(customerGmail)) {
            setSnackbarMessage('Vui lòng nhập gmail hợp lệ');
            setOpenSnackbar(true);
            return false;
        }
        if (numberOfTourist < 1) {
            setSnackbarMessage('Số hành khách phải lớn hơn 0');
            setOpenSnackbar(true);
            return false;
        }
        touristList.forEach((touristItem, touristIndex) => {
            if (touristItem == '') {
                setSnackbarMessage(`Vui lòng nhập tên hành khách thứ ${touristIndex + 1}`);
                setOpenSnackbar(true);
                invalidInput = true;
                return false;
            }
        })
        if (invalidInput) {
            return false;
        }
        return true;
    }
    const [bookingPrice, setBookingPrice] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerGmail, setCustomerGmail] = useState('');
    const handleCustomerPhoneChange = (event) => {
        if (isNaN(event.target.value)) {
            setSnackbarMessage('Vui lòng nhập số điện thoại hợp lệ')
            setOpenSnackbar(true);
        }
        else {
            setCustomerPhone(event.target.value);
        }
    }
    const handleCustomerGmailChange = (event) => {
        setCustomerGmail(event.target.value);
    }
    const handleCustomerNameChange = (event) => {
        if (event.target.value.length > 30) {
            setSnackbarMessage('Tên tối đa 30 kí tự')
            setOpenSnackbar(true);
        }
        else {
            setCustomerName(event.target.value);
        }
    }
    const handleCreateBooking = async () => {
        if (validateInput()) {
            let bookingData = {
                exportInvoice: 0,
                bookingStatus: 'Unpaid',
                bookingPrice: bookingPrice,
                bookingDate: dayjs(new Date()).format('DD/MM/YYYY HH:mm'),
                customer: {
                    customerPhone: customerPhone,
                    customerName: customerName,
                    customerGmail: customerGmail,
                },
                touristList: touristList
                ,
                paymentNote: null,
                paymentImage: '/',
                travelId: selectedTravel.id
            }
            console.log(bookingData);
            let res = await createBooking(bookingData);
            if (res && res.data && res.data.EC === '0') {
                console.log(res.data.DT);
                if (res.data.DT && res.data.DT.id) {
                    localStorage.setItem('bookingId', res.data.DT.id);
                    alert("Đặt vé thành công!");
                    navigate('/payment');
                }
            }
        }
    }
    return (
        <>
            <Snackbar
                className='!z-50'
                open={openSnackbar}
                autoHideDuration={6000} // Thời gian hiển thị (milliseconds)
                onClose={handleCloseSnackbar}
            >
                <MuiAlert onClose={handleCloseSnackbar} severity="error" elevation={6} variant="filled">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
            <div className='mx-36 2xl:mx-60'>
                <div className='flex flex-row bg-blue-50 rounded-xl drop-shadow-md'>
                    {selectedTravel && selectedTravel.Tour && selectedTravel.Tour.mainImage &&
                        <>
                            <div className=' rounded-s-xl h-60' style={{
                                objectFit: 'cover',
                                backgroundImage: `url(${selectedTravel.Tour.mainImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                                width: '300px',
                            }}></div>
                            <div className='flex-1 ml-4 mt-4'>
                                <div className='text-xl font-bold text-blue-800'>{selectedTravel.Tour.tourName}</div>
                                <div className='mt-1'>
                                    <div className='inline'>Mã tour:</div>
                                    <div className='font-bold inline ml-2'>{selectedTravel.Tour.id}</div>
                                </div>
                                <div className='mt-1'>
                                    <div className='inline'>Ngày khởi hành:</div>
                                    <div className='font-bold inline ml-2'>{dayjs(selectedTravel.startDateTime).format("DD/MM/YYYY")}</div>
                                </div>
                                <div className='mt-1'>
                                    <div className='inline'>Thời gian:</div>
                                    <div className='font-bold inline ml-2'>{selectedTravel.Tour.totalDay}</div>
                                </div>
                                <div className='mt-1'>
                                    <div className='inline'>Số chỗ còn nhận:</div>
                                    <div className='font-bold inline ml-2'>{selectedTravel.remainTicket}</div>
                                </div>
                                <div className='text-xl font-bold mt-2 text-red-500 ml-2'>{formatCurrency(selectedTravel.travelPrice)} đ</div>
                                {
                                    selectedTravel.Discount &&
                                    <div className='absolute right-3 bottom-3 font-bold text-sm bg-yellow-400 rounded-lg p-2'>Giảm giá {selectedTravel.Discount.discountAmount}%</div>
                                }
                            </div>
                        </>
                    }
                </div>
                <div className='font-bold text-xl text-center my-4'>Nhập thông tin</div>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <div className='border rounded-lg px-8 pb-8'>
                        <div className='font-bold text-lg text-center my-4'>
                            Thông tin liên hệ
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            <TextField
                                value={customerPhone}
                                onChange={handleCustomerPhoneChange}
                                label='Số điện thoại'
                                required
                                fullWidth />
                            <TextField
                                value={customerName}
                                onChange={handleCustomerNameChange}
                                label='Họ tên'
                                required
                                fullWidth />
                            <TextField
                                value={customerGmail}
                                onChange={handleCustomerGmailChange}
                                label='Gmail'
                                required
                                fullWidth />
                        </div>
                    </div>
                    <div className='border rounded-lg px-8 pb-8'>
                        <div className='font-bold text-lg text-center mt-4'>
                            Thông tin hành khách
                        </div>
                        <TextField
                            value={numberOfTourist}
                            onChange={handleNumberOfTouristChange}
                            className='!mt-4'
                            label='Số lượng'
                            type='number'
                            inputProps={{
                                min: 1
                            }} />
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                            {touristList.map((touristName, index) => (
                                <TextField
                                    value={touristName}
                                    onChange={(event) => handleTouristChange(event, index)}
                                    fullWidth
                                    key={index}
                                    className='!mt-4 !mx-4'
                                    label={`Tên hành khách ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                {
                    selectedTravel
                    &&
                    <>
                        <div className='bg-yellow-50 rounded-lg p-8 mt-8'>
                            <div className='font-bold text-xl text-center'>Thông tin hóa đơn</div>
                            <div className='grid grid-cols-3 mt-4 border px-4 py-2'>
                                <div>
                                    <div>Đơn giá</div>
                                    <div className='font-semibold mt-1'>{formatCurrency(selectedTravel.travelPrice)}</div>
                                </div>
                                <div>
                                    <div>Số lượng</div>
                                    <div className='font-semibold mt-1'>x {numberOfTourist}</div>
                                </div>
                                <div>
                                    <div>Thành tiền</div>
                                    <div className='font-semibold mt-1'>{formatCurrency(selectedTravel.travelPrice * numberOfTourist)}</div>
                                </div>
                            </div>
                            <div className='text-right mt-4'>Tiền cần thanh toán:</div>
                            <div className='text-xl  text-right font-bold text-red-500 ml-2'>{formatCurrency(selectedTravel.travelPrice * numberOfTourist)} đ</div>
                        </div>
                    </>
                }
                <div className='flex float-right'>
                    <Button
                        onClick={handleCreateBooking}
                        className='!rounded-md !ml-2 !text-white !py-2 !px-4 !font-semibold !text-md !normal-case !bg-blue-500'><FaShoppingCart className='mr-2' /> Thanh toán</Button>
                </div>
            </div>
        </>
    );
}

export default Booking;