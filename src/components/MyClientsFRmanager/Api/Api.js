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

export const getMyClients = (type, category) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients?type=${type}&category=${category}`);
}

export const SearchMyClients = (type, category, search) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients?type=${type}&category=${category}&search=${search}`);
}

export const getMyClientsPagination = (path, type, category) => {
    return instanceWithToken.get(`${path}&type=${type}&category=${category}`);
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





