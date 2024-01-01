import axios from "axios";
const createBooking = async (bookingData) => {
    try {
        return axios.post('http://localhost:8080/api/booking/create', bookingData);
    } catch (error) {
        console.error("Error - createBooking", error);
    }
}
const fetchBookingById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/booking/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchBookingById", error);
    }
}
export { createBooking, fetchBookingById }