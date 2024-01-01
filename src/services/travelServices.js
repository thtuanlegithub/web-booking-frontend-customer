import axios from "axios";
const fetchTravelPagination = async (page, limit) => {
    try {
        return axios.get(`http://localhost:8080/api/travel/read?page=${page}&limit=${limit}`);
    } catch (error) {
        console.error("Error - fetchTravelPagination", error);
    }
}
const fetchTravelById = async (id) => {
    try {
        return axios.get(`http://localhost:8080/api/travel/read-by-id?id=${id}`);
    } catch (error) {
        console.error("Error - fetchTravelById", error);
    }
}
export { fetchTravelPagination, fetchTravelById }