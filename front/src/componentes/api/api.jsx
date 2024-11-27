import axios from "axios";

const api = axios.create({
    baseURL:'https://trabajo-final-ithu.onrender.com/api'
})

export default api