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

export const getMyClients = (type, category, manager, dateStart, dateEnd, sort, reject) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients?type=${type}&category=${category}${manager > 0 ? `&filter[manager]=${manager}` : ''}${dateStart !== '' && dateStart ? `&filter[bp_start]=${dateStart}&filter[bp_finish]=${dateEnd}` : ''}${sort ? `&sort=${sort}&sort_rev=${dateStart !== '' && dateStart ? 0 : 1}` : ''}${reject ? `&filter[reject_switch]=${reject}` : ''}`);
}

export const SearchMyClients = (type, category, search, manager, dateStart, dateEnd, sort, reject) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients?type=${type}&category=${category}&search=${search}${manager > 0 ? `&filter[manager]=${manager}` : ''}${dateStart !== '' && dateStart ? `&filter[bp_start]=${dateStart}&filter[bp_finish]=${dateEnd}` : ''}${sort ? `&sort=${sort}&sort_rev=${dateStart !== '' && dateStart ? 0 : 1}` : ''}${reject ? `&filter[reject_switch]=${reject}` : ''}`);
}

export const getMyClientsPagination = (path, type, category, manager, dateStart, dateEnd, sort, reject) => {
    return instanceWithToken.get(`${path}&type=${type}&category=${category}${manager > 0 ? `&filter[manager]=${manager}` : ''}${dateStart !== '' && dateStart ? `&filter[bp_start]=${dateStart}&filter[bp_finish]=${dateEnd}` : ''}${sort ? `&sort=${sort}&sort_rev=${dateStart !== '' && dateStart ? 0 : 1}` : ''}${reject ? `&filter[reject_switch]=${reject}` : ''}`);
}


export const addFavorite = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/favorite`,
        data: data,
    })
}

export const transferClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/transfer`,
        data: data,
    })
}

export const getPlaner = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/planner`);
}



/* export const addManager = (data) => {
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
} */





