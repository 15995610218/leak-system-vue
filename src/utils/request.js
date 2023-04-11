import axios from "axios";
const request = axios.create({
    // baseURL:'/api',
    baseURL:'http://localhost:7080'
})
export default request;