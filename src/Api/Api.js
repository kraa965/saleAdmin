import axios from 'axios'

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: `https://api2.skilla.ru/`
})

const token = document.getElementById('root_leader').getAttribute('token');

instanceWithToken.interceptors.request.use(config => {
    config.headers.Authorization = token
    return config
});

export const getDashbord = (date) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/dashboard?date=${date}`);
}