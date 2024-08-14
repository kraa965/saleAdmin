import axios from 'axios'


const instanceWithToken = axios.create({
    withCredentials: false,
})


export const getCordinate = (city) => {
    return instanceWithToken.get(`https://geocode-maps.yandex.ru/1.x/?apikey=76ade9cc-95ac-4852-a20f-6e53fefa307c&geocode=${city}&format=json`);
}

