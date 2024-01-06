import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { DatePicker } from '@mui/x-date-pickers';
import { fetchTravelPagination } from '../../services/travelServices';
import TravelCard from '../controls/TravelCard';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { PACKAGE_ADDRESSES } from '../../lib/const/PackageAddresses';
function Search(props) {
    let navigate = useNavigate();
    const ADDRESS_LIST = [{ label: 'Đà Lạt', value: 'Đà Lạt' }]
    const [moneyValue, setMoneyValue] = useState(20000000);
    const [listTravel, setListTravel] = useState([]);
    const [listTravelFiltered, setListTravelFiltered] = useState([]);
    const [listTravelSearch, setListTravelSearch] = useState([]);
    const [tourKeyword, setTourKeyword] = useState(null);
    const [address, setAddress] = useState(null);
    const [startDateTime, setStartDateTime] = useState(null);
    const [totalDay, setTotalDay] = useState(null);
    const [numberPeople, setNumberPeople] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false);
    };
    const handleTourKeywordChange = (event) => {
        if (event.target.value.length > 100) {
            setSnackbarMessage("Tour name max length is 100");
            setOpenSnackbar(true);
        }
        else {
            setTourKeyword(event.target.value);
        }
    }
    const handleAddressChange = (event, newValue) => {
        setAddress(newValue);
    }
    const handleStartDateTimeChange = (newValue) => {
        setStartDateTime(dayjs(newValue));
    }
    const handleTotalDayChange = (event) => {
        setTotalDay(event.target.value);
    }
    const handleNumberOfPeopleChange = (event) => {
        setNumberPeople(event.target.value);
    }
    useEffect(() => {
        fetchListTravel()
    }, []);
    const fetchListTravel = async () => {
        let res = await fetchTravelPagination(0, 0);
        setListTravel(res.data.DT);
        console.log(listTravel);
        const filteredTravels = res.data.DT.filter((travel) => {
            const currentDate = new Date();
            const travelDate = new Date(travel.startDateTime);
            const travelRemainTicket = travel.remainTicket;
            return travelDate > currentDate && travelRemainTicket > 0;
        });
        setListTravelFiltered(filteredTravels);
    }
    function formatCurrency(value) {
        // Sử dụng toLocaleString để định dạng số với dấu phẩy
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleMoneyChange = (event) => {
        setMoneyValue(event.target.value);
    }
    const handleClear = () => {
        setStartDateTime(null);
        setListTravelSearch(listTravel);
        setTourKeyword(null);
        setAddress(null);
        setMoneyValue(20000000);
        setTotalDay(null);
        setNumberPeople(null);
    }
    const handleSearch = () => {
        const filteredList = listTravel.filter((travel) => {
            // Chuyển addressList thành mảng
            const addressArray = travel.Tour.addressList.split('|');

            // Lọc theo từ khoá tour
            const isTourNameMatched = !tourKeyword || travel.Tour.tourName.toLowerCase().includes(tourKeyword.toLowerCase());

            // Lọc theo địa điểm
            const isAddressMatched = !address || addressArray.includes(address.value);

            // Lọc theo ngày đi
            const isStartDateMatched = !startDateTime || dayjs(travel.startDateTime).format("DD/MM/YYYY") === dayjs(startDateTime).format("DD/MM/YYYY");

            // Lọc theo số ngày và số người
            const isTotalDayMatched = !totalDay || travel.Tour.totalDay === parseInt(totalDay, 10);
            const isNumberPeopleMatched = !numberPeople || travel.remainTicket >= parseInt(numberPeople, 10);
            const isMoneyMatched = travel.travelPrice <= moneyValue;

            // Kiểm tra tất cả điều kiện lọc
            return isTourNameMatched && isAddressMatched && isStartDateMatched && isTotalDayMatched && isNumberPeopleMatched && isMoneyMatched;
        });
        const filteredTravels = filteredList.filter((travel) => {
            const currentDate = new Date();
            const travelDate = new Date(travel.startDateTime);
            const travelRemainTicket = travel.remainTicket;
            return travelDate > currentDate && travelRemainTicket > 0;
        });
        setListTravelFiltered(filteredTravels);
    };

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
            <div className='flex flex-row mx-8'>
                <div className='bg-blue-50 h-full w-80 px-4 rounded-xl py-4 drop-shadow-lg'>
                    <div className='text-center text-lg font-semibold text-blue-800'>Tìm kiếm Tour</div>
                    <div className='mx-2 mt-2'>
                        <TextField
                            value={tourKeyword}
                            onChange={handleTourKeywordChange}
                            className='bg-white rounded-md'
                            label='Tour'
                            placeholder='Tìm kiếm từ khoá'
                            fullWidth
                        />

                        <Autocomplete
                            value={address}
                            onChange={handleAddressChange}
                            className='!mt-4 bg-white rounded-md'
                            options={PACKAGE_ADDRESSES}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label='Điểm đến'
                                />
                            )}
                        />
                        <DatePicker
                            format='DD/MM/YYYY'
                            value={startDateTime}
                            onChange={handleStartDateTimeChange}
                            label='Ngày khởi hành'
                            className='!mt-4 bg-white rounded-md w-full' />
                        <div className='ml-2 mr-2 flex flex-row'>
                            <div className='mt-4'>Giá: </div>
                            <Slider
                                onChange={handleMoneyChange}
                                label='Money'
                                className='ml-4 mt-4 box-border'
                                aria-label="Small steps"
                                defaultValue={1000000}
                                value={moneyValue}
                                valueLabelFormat={(value) => formatCurrency(value)}
                                step={500000}
                                marks
                                min={0}
                                max={20000000}
                                valueLabelDisplay="auto"
                            />
                        </div>
                        <TextField
                            value={totalDay}
                            onChange={handleTotalDayChange}
                            type='number'
                            className='!mt-4 bg-white rounded-md'
                            label='Số ngày'
                            inputProps={{
                                min: 1,
                                max: 10,
                            }}
                            fullWidth
                        />
                        <TextField
                            value={numberPeople}
                            onChange={handleNumberOfPeopleChange}
                            type='number'
                            className='!mt-4 bg-white rounded-md'
                            label='Số hành khách'
                            inputProps={{
                                min: 1,
                                max: 10,
                            }}
                            fullWidth
                        />
                    </div>
                    <div className='w-72'></div>

                    <Button onClick={handleSearch} className='!mt-4 !float-right !mr-2 !bg-blue-500 !normal-case !text-white !rounded-md'>Search</Button>
                    <Button onClick={handleClear} className='!mt-4 !float-right !mr-2 !bg-gray-500 !normal-case !text-white !rounded-md'>Clear</Button>
                </div>
                <div className='w-max grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-fit xl:grid-cols-3 2xl:grid-cols-4 gap-8 2xl:gap-4 mx-auto my-8'>
                    {listTravelFiltered.map((item) => (<TravelCard travel={item} />))}
                </div>
            </div>
        </>
    );
}

export default Search;