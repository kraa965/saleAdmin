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

export const getPurchases = (type) => {
    return instanceWithToken.get(`${baseUrl}api/purchases/list?perPage=${50}&type=${type}`);
}

export const getPurchasesCursor = (cursorNext, type) => {
    return instanceWithToken.get(`${cursorNext}&perPage=${30}&type=${type}`);
}

export const getPurchasesAction = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/list?type=action`);
}

export const getPurchase = (id) => {
    return instanceWithToken.get(`${baseUrl}api/purchases/detail/${id}`);
}

export const getSearchResult = (query) => {
    return instanceWithToken.get(`${baseUrl}api/purchases/list?perPage=${30}&search=${query}`);
}

export const getSearchCursor = (cursorNext, query) => {
    return instanceWithToken.get(`${cursorNext}&perPage=${30}&search=${query}`);
}

/* export const getVendors = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/vendors`);
}

export const getPayersList = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/payers`);
}

export const getCategories = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/categories`);
} */

export const addVendor = (name, inn, kpp) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        url: `${baseUrl}api/purchases/stock/vendors`,
        data: { name, inn, kpp }
    })
}


export const addContract = (formdata) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/stock/contracts`,
        data: formdata
    })
}

export const editContract = (formdata) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/stock/contracts/edit`,
        data: formdata
    })
}


export const getParameters = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/parameters`);
}

export const getItems = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/stock/settings/items`);
}

export const savePurchase = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/save`,
        data: data,
    })
}

export const createPurchase = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/agreement`,
        data: data,
    })
}

export const deletePurchase = (data) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/save`,
        data: data,
    })
}

export const createPurchaseAdmin = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/create_purchase`,
        data: data,
    })
}

export const createPurchaseLeader = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/for_payment`,
        data: data,
    })
}

export const recalPurchase = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/withdraw`,
        data: { id },
    })
}

export const deleteRejectPurchase = (id) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/reject/destroy`,
        data: { id },
    })
}


export const approveAdmin = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/approve_purchase`,
        data: data,
    })
}


export const approveLeader = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/for_payment_approval`,
        data: data,
    })
}

export const rejectPurchase = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/reject/purchase`,
        data: data,
    })
}


export const createPayment = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/create_payment`,
        data: data,
    })
}

export const confirmPayment = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/confirm_payment`,
        data: data,
    })
}

export const rejectPayment = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/reject/payment`,
        data: data,
    })
}

export const acceptPurchase = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/accept`,
        data: data,
    })
}

export const endPurchase = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/close`,
        data: data,
    })
}

export const loadCloseDoc = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/upload_close_doc`,
        data: data,
    })
}

export const deletePurchaseAdmin = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/destroy`,
        data: data,
    })
}

export const sendLog = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/send_comment`,
        data: data,
    })
}

//Orders
export const getOrder = (id) => {
    return instanceWithToken.get(`${baseUrl}api/purchases/orders/detail/${id}`);
}

export const getOrders = () => {
    return instanceWithToken.get(`${baseUrl}api/purchases/orders`);
}

export const createOrder = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/orders`,
        data: data,
    })
}


export const takeOrder = (data) => {
    return instanceWithToken({
        method: 'patch',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/orders`,
        data: data,
    })
}

export const createPurchaseFromOrder = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/orders/create_purchase`,
        data: data,
    })
}


export const deleteOrder = (data) => {
    return instanceWithToken({
        method: 'delete',
        mode: "cors",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/orders`,
        data: data,
    })
}

export const sendLogOrder = (data) => {
    return instanceWithToken({
        method: 'post',
        mode: "cors",
        headers: {
            "Content-type": "multipart/form-data",
            "Accept": "application/json"
        },
        url: `${baseUrl}api/purchases/orders/send_comment`,
        data: data,
    })
}



