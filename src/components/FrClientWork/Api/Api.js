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

export const getManagerInfo = () => {
    return instanceWithToken.get(`${baseUrl}api/profile`);
}

export const getCities = () => {
    return instanceWithToken.get(`${baseUrl}api/requests/cities`);
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

export const getPlaner = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/planner`);
}

export const getClientInformation = (id) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/detail/${id}`);
    
}

export const editClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/edit`,
        data: data,
    })
} 

export const deleteNumber = (phone) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/phone`,
        data: {phone},
    })
}

export const checkPhone = (phone) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/phone/check`,
        data: {phone},
    })
}

//звонок клиенту и последующая работа
export const callClient = (phone, id) => {
    return instanceWithToken.post(`${baseUrl}api/frmanager/clients/call_mango?phone=${phone}&id=${id}`);
}

export const sendComment = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/send_comment`,
        data: data,
    })
} 

export const sendPlanTime = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/plan_call`,
        data: data,
    })
} 


export const finishZoom = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/finish_zoom`,
        data: data,
    })
} 

export const rejectZoom = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject_zoom`,
        data: data,
    })
} 

export const rejectClient = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject`,
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

//анкета
export const getAnketa = (id) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/anketa/${id}`);
}

export const acceptAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/accept`,
        data: {id},
    })
}

export const rejectAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/reject`,
        data: {id},
    })
}

export const retryAnketa = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/anketa/retry`,
        data: {id},
    })
}

//отмена обучения
export const cancelTraning = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/clients/reject_train`,
        data: {id},
    })
}

export const getPartners = (client_id, city) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/info_companies?${client_id !== '' ? `id=${client_id}` : ''}${city !== '' ? `city=${city}` : ''}`);
}

export const getScenario = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/scripts`);
}
 

//whats up
export const getCurrentStateInstance = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/chat/instance/state`);
}

export const getRebootInstance = () => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/chat/instance/reboot`);
}

export const getMessageHistory = (phone, count) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/chat/history?phone=${phone}&count=${count}`);
}

//отправка сообщения

export const sendMessage = (phone, message) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/chat/send/message`,
        data: {phone, message},
    })
}


//Проверка номера на наличие whatsup
export const chatCheck = (phone) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/chat/check`,
        data: {phone},
    })
}

//Прочитать чат
export const chatRead = (phone, id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/chat/read`,
        data: {phone, message_id: null, client_id: String(id)},
    })
}

//отправить файлы

export const sendFile = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/frmanager/chat/send/file/upload`,
        data: data,
    })
}

//получить запись звонка
export const getCallRecord = (logId) => {
    return instanceWithToken.get(`${baseUrl}api/frmanager/clients/record_log?log_id=${logId}`);
}



