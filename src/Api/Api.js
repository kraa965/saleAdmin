import axios from 'axios'

export const baseUrl = process.env.REACT_APP_API_URL;

const instanceWithToken = axios.create({
    withCredentials: false,
    baseURL: baseUrl
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

export const postSumRecived = (id, date) => {
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

export const getTeam = (data) => {
    return instanceWithToken.get(`${baseUrl}api/leader/managers?is_work=${data}`);
}

export const addManager = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/leader/managers`,
        data: data,
    })
}

export const editManager = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/leader/managers/edit`,
        data: data,
    })
}

export const firedManager = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/leader/managers/dismiss`,
        data: data,
    })
}


export const restoreManager = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/leader/managers/restore`,
        data: data,
    })
}

export const addPause = (id, time) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/leader/managers/pause?id=${id}&minutes=${time}`);
}


//метрики 
export const getMetricsSales = () => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/frmanager/metrics/sales`);
}

export const getMetricsSteps = () => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/frmanager/metrics/steps`);
}

//график качество оброботки трафика
export const getTraficStatistics = (date, managerId) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/frmanager/metrics/experts/traffic_quality?date=${date}&manager_id=${managerId}`);
}

export const getProfileStatistics = (id) => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/dashboard/statistics?manager_id=${id}`);
}

export const getLeaderProgress = () => {
    return instanceWithToken.get(`https://api2.skilla.ru/api/leader/dashboard/progress`);
}

export const refundPay = (id, date, sum) => {
    return instanceWithToken.post(`https://api2.skilla.ru/api/frmanager/clients/pay/refund?client_id=${id}&date=${date}&sum=${sum}`);
}



