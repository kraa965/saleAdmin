import { useEffect, useState } from 'react';
import s from './FrClientWork.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
//API
import { getCities, getClientInformation, getPartners, getScenario } from './Api/Api';
import { useDispatch } from 'react-redux';
import { setLoadPage } from './store/reducer/App/slice';
//selector
import { selectorClient } from './store/reducer/Client/selector';
import { selectorWork } from './store/reducer/Work/selector';
import { selectorApp } from './store/reducer/App/selector';
//slice
import { setCities } from './store/reducer/Work/slice';
import { setClientId } from './store/reducer/Client/slice';
import {
    setClientName,
    setClientSurname,
    setClientCity,
    setNumbersDefault,
    setClientMain,
    setButtonHiden,
    setFavorite,
    setClientUpdate,
    setTalkTime,
    setClientSource
} from './store/reducer/Client/slice';
import { setLoadClient, setLoadPartners } from './store/reducer/App/slice';
import { setComments, setDialog, setRoad, setNextConnect, setZoomStatus, setZoomConnect, setLastConnect } from './store/reducer/Work/slice';
import { setOffices, setCompanies } from './store/reducer/Partners/slice';
import { setCallStatus } from './store/reducer/App/slice';
//compontns
import Work from './components/Work/Work';
 
const FrClientWork = () => {
    const mangoToken = document.getElementById('root_leader').getAttribute('mango-token');
    const workInfoUpdate = useSelector(selectorWork).workInfoUpdate;
    const [scenario, setScenario] = useState([]);
    const client_id = useSelector(selectorClient).client_id; 
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const menuIdUpdate = useSelector(selectorClient).menuIdUpdate;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    console.log(client_id)

    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoadPage(false))
        }, 700)
    }, [])

    //Слушатель сокета статуса звонка
    useEffect(() => {
        const wsCall = new WebSocket(`wss://lk.skilla.ru:8001/?user=960966172649ab7e9d9338649ab7e9d936e`);
        wsCall.onopen = function (e) {
        };

        wsCall.addEventListener('message', (e) => {
            console.log(e.data)
            const data = JSON.parse(e.data);
            dispatch(setCallStatus(data));
            if (data.action == 'new_call_out') {
                const id = Number(data.client_id)
                dispatch(setClientId(id));
                localStorage.setItem('client_id', JSON.stringify(id))
                return
            }
        });
    }, []);




    //Получаем список подходящих городов
    useEffect(() => {
        getCities()
            .then(res => {
                console.log(res);
                dispatch(setCities(res.data.data));
            })
            .catch(err => console.log(err))
    }, []);


    //загружаем данные клиента
    useEffect(() => {
        dispatch(setLoadClient(true));
        dispatch(setButtonHiden(false));
        dispatch(setClientMain(''));
        dispatch(setNumbersDefault([]));
        dispatch(setComments([]));
        dispatch(setDialog([]));
        dispatch(setNextConnect('0000-00-00'));
        dispatch(setZoomStatus(-1));
        dispatch(setZoomConnect('0000-00-00'));

        client_id !== '' && getClientInformation(client_id)
            .then(res => {
                console.log(res)
                const client = res.data.client;
                const dialog = res.data.dialog;
                const road = res.data.road;
                const phone = [client.phone, client.phone2, client.phone3].filter(el => el !== '');
                //записыываем данные клиента
                dispatch(setClientName(client.name));
                dispatch(setClientSurname(client.surname));
                dispatch(setClientCity(client.city !== '' ? client.city : client.city_auto));
                dispatch(setNumbersDefault(phone));
                dispatch(setClientMain(phone[0]));
                dispatch(setFavorite(client.favorite));
                dispatch(setTalkTime(client.talk_time));
                dispatch(setClientSource(client.from_site));
                //записываем комментарии клиента
              /*   const lastComment = client.at(-1).auto_important == 1 ? client.at(-1) : false; */
                const comments = client?.partnership_client_logs?.filter(el => (el.is_manual == 1 && el.person_id !== 0 && el.comment !== '' && el.newsletter_id == 0 && el.is_sms == 0) || (el.type == 'change_manager')).reverse();
                /* lastComment ? dispatch(setComments([lastComment, ...comments])) : */ dispatch(setComments(comments));
                //Записываем скрипт
                dispatch(setDialog(dialog));
                //Записываем Road
                dispatch(setRoad(road));
                dispatch(setNextConnect(client.next_connect));
                dispatch(setLastConnect(client.last_connect));
                dispatch(setZoomStatus(client.zoom_status));
                dispatch(setZoomConnect(client.zoom_date));

                setTimeout(() => {
                    dispatch(setLoadClient(false));
                }, 250);
            })
            .catch(err => console.log(err));
    }, [client_id]);


    //обновляем Road
    useEffect(() => {
        client_id == clientUpdate && getClientInformation(client_id)
            .then(res => {
                console.log(res)
                const client = res.data.client;
                const dialog = res.data.dialog;
                const road = res.data.road;
                const phone = [client.phone, client.phone2, client.phone3].filter(el => el !== '');
                //записыываем данные клиента
                dispatch(setClientName(client.name));
                dispatch(setClientSurname(client.surname));
                dispatch(setClientCity(client.city !== '' ? client.city : client.city_auto));
                dispatch(setNumbersDefault(phone));
                dispatch(setClientMain(phone[0]));
                dispatch(setFavorite(client.favorite));
                  //записываем комментарии клиента
                  const comments = client?.partnership_client_logs?.filter(el => el.is_manual == 1 && el.person_id !== 0 && el.comment !== '' && el.newsletter_id == 0 && el.is_sms == 0).reverse();
                  dispatch(setComments(comments));
                //Записываем скрипт
                dispatch(setDialog(dialog));
                //Записываем Road
                dispatch(setRoad(road));
                dispatch(setNextConnect(client.next_connect));
                dispatch(setLastConnect(client.last_connect));
                dispatch(setZoomStatus(client.zoom_status));
                dispatch(setZoomConnect(client.zoom_date));

                dispatch(setClientUpdate(0));
                setTimeout(() => {

                    dispatch(setLoadClient(false));
                }, 150);
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    //Получение данных планера
    /* useEffect(() => {
        getPlaner()
            .then(res => {
                const data = res.data;
                dispatch(setPlaner(data));
                setTimeout(() => {
                    dispatch(setPlanerLoad(false))
                }, 100)
            })
            .catch(err => console.log(err))
    }, [clientUpdate]); */

    //Получаем данные партнерских офисов
    useEffect(() => {
        dispatch(setLoadPartners(true))
        getPartners(client_id)
            .then(res => {
                const offices = res.data.partner_offices;
                const companies = res.data.companies;
                //записываем информацию о партнерских оффисах и заказчиках
                dispatch(setOffices(offices));
                dispatch(setCompanies(companies));
                console.log(res);
                setTimeout(() => {
                    dispatch(setLoadPartners(false));
                }, 150);
            })
            .catch(err => console.log(err))
    }, [client_id, workInfoUpdate]);

    useEffect(() => {
        getScenario()
            .then(res => {
                console.log(res);
                const data = res.data.data;
                setScenario(data);
            })

            .catch(err => console.log(err))
    }, [])

    return (
        <div className={s.app}>
            <Work scenario={scenario} />
        </div>
    )
};

export default FrClientWork;