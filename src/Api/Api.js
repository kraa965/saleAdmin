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

export const getSales = (date) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/sales?date=${date}`);
}

export const postSum = (id, sum) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/requests/${id}/sum?sum=${sum}`);
}

export const postStudy = (id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/requests/${id}/training`);
}

export const postSumRecived= (id, date) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/requests/${id}/sum-confirmation?date=${date}`);
}

export const getSchedule = (start, end) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/schedule?date_start=${start}&date_end=${end}`);
}

export const addShift = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/leader/schedule/add?date=${date}&manager_id=${id}`);
}

export const deleteShift = (id) => {
    return instanceWithToken.delete(`https://api2.skilla.ru/api/leader/schedule/${id}/delete`);
}

export const addAdditionalShift = (date, id) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/leader/schedule/add?date=${date}&manager_id=${id}&additional=1`);
}

export const addEvent = (date, id, eventId) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/leader/events/add?date=${date}&manager_id=${id}&event_id=${eventId}`);
}

export const deleteEvent = (id) => {
    return instanceWithToken.delete(`https://api2.skilla.ru/api/leader/events/${id}/delete`);
}

export const getTimesheet = (date) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/timesheet?date=${date}`);
}
export const addShiftPlan = (date, id, plan) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/leader/schedule/plan/add?date=${date}&manager_id=${id}&shifts=${plan}`);
}