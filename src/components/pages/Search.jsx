import { Autocomplete, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import { DatePicker } from '@mui/x-date-pickers';
import { fetchTravelPagination } from '../../services/travelServices';
import TravelCard from '../controls/TravelCard';
import { useNavigate } from 'react-router-dom';
function Search(props) {
    let navigate = useNavigate();
    const START_LOCATION = ['Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội'];
    const ADDRESS_LIST = [{ label: 'Đà Lạt', value: 'Đà Lạt' }]
    const [moneyValue, setMoneyValue] = useState(1000000);
    const [listTravel, setListTravel] = useState([]);
    useEffect(() => { fetchListTravel() }, []);
    const fetchListTravel = async () => {
        let res = await fetchTravelPagination(0, 0);
        console.log(res);
        setListTravel(res.data.DT);
    }
    function formatCurrency(value) {
        // Sử dụng toLocaleString để định dạng số với dấu phẩy
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleMoneyChange = (event) => {
        setMoneyValue(event.target.value);
    }
    const handleSelectTravel = () => {
        navigate('/travel');
    }
    return (
        <div className='flex flex-row mx-8'>
            <div className='bg-blue-50 h-full w-80 px-4 rounded-xl py-4 drop-shadow-lg'>
                <div className='text-center text-lg font-semibold text-blue-800'>Tìm kiếm Tour</div>
                <div className='mx-2 mt-2'>
                    <TextField
                        className='bg-white rounded-md'
                        label='Tour'
                        placeholder='Tìm kiếm từ khoá'
                        fullWidth
                    />

                    <Autocomplete
                        className='!mt-4 bg-white rounded-md'
                        options={START_LOCATION}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Điểm đi'
                            />
                        )}
                    />
                    <Autocomplete
                        className='!mt-4 bg-white rounded-md'
                        options={ADDRESS_LIST}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Điểm đến'
                            />
                        )}
                    />
                    <DatePicker
                        label='Ngày đi'
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
                            min={1000000}
                            max={20000000}
                            valueLabelDisplay="auto"
                        />
                    </div>
                    <TextField
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
                        type='number'
                        className='!mt-4 bg-white rounded-md'
                        label='Số người'
                        inputProps={{
                            min: 1,
                            max: 10,
                        }}
                        fullWidth
                    />
                </div>
                <div className='w-72'></div>
                <Button className='!mt-4 !float-right !mr-2 !bg-blue-500 !normal-case !text-white !rounded-md'>Search</Button>
            </div>
            <div className='w-max grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 h-fit xl:grid-cols-3 2xl:grid-cols-4 gap-8 2xl:gap-4 mx-auto my-8'>
                {listTravel.map((item) => (<TravelCard travel={item} />))}
            </div>
        </div>
    );
}

export default Search;