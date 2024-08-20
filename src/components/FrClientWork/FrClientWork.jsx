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
import { setCities, setAnketaForm } from './store/reducer/Work/slice';
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
    setClientSource,
    setMissCall,
    setCallMe,
    setClientStatus,
    setDayWithoutMove,
    setClientManager,
    setManagerLast,
    setRejectComment,
    setCoursAnswer
} from './store/reducer/Client/slice';
import { setLoadClient, setLoadPartners } from './store/reducer/App/slice';
import { setComments, setDialog, setRoad, setNextConnect, setZoomStatus, setZoomConnect, setLastConnect } from './store/reducer/Work/slice';
import { setOffices, setCompanies, setCompaniesNum } from './store/reducer/Partners/slice';
import { setCallStatus } from './store/reducer/App/slice';
//compontns
import Work from './components/Work/Work';
//utils
import { handleDifDate } from './utils/dates';
 
const FrClientWork = () => {
    const [anim, setAnim] = useState(false);
    const [scenario, setScenario] = useState([]);
    const workInfoUpdate = useSelector(selectorWork).workInfoUpdate;
    const client_id = useSelector(selectorClient).client_id; 
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const menuIdUpdate = useSelector(selectorClient).menuIdUpdate;
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    console.log('id клиента', client_id)

    useEffect(() => {
        setAnim(true);
    }, []);

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
            const data = JSON.parse(e.data);
            dispatch(setCallStatus(data));
            if (data.action == 'new_call_out') {
                const id = Number(data.client_id)
                id == 0 ? dispatch(setClientId('')): dispatch(setClientId(id));
                return
            }
        });
    }, []);

    //Получаем список подходящих городов
    useEffect(() => {
        getCities()
            .then(res => {
                dispatch(setCities(res.data.data));
            })
            .catch(err => console.log(err))
    }, []);

    console.log(client_id)

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
        dispatch(setCoursAnswer([]));
        dispatch(setAnketaForm({}));

        client_id !== '' && getClientInformation(client_id)
            .then(res => {
                console.log(res)
                const client = res.data.client;
                const dialog = res.data.dialog;
                const road = res.data.road;
                const phone = [client.phone, client.phone2, client.phone3].filter(el => el !== '');
                dispatch(setClientName(''));
                dispatch(setClientSurname(''));
                dispatch(setClientCity(''));
                dispatch(setNumbersDefault(''));
                dispatch(setClientMain(''));
                dispatch(setFavorite(''));
                dispatch(setTalkTime(''));
                dispatch(setClientSource(''));
                dispatch(setClientManager({}));
                dispatch(setManagerLast(0));
                dispatch(setRejectComment(''));
                //записыываем данные клиента
                dispatch(setClientName(client.name));
                dispatch(setClientSurname(client.surname));
                dispatch(setClientCity(client.city !== '' ? client.city : client.city_auto));
                dispatch(setNumbersDefault(phone));
                dispatch(setClientMain(phone[0]));
                dispatch(setFavorite(client.favorite));
                dispatch(setTalkTime(client.talk_time));
                dispatch(setClientSource(client.from_site));
                dispatch(setClientManager(client.has_manager));
                dispatch(setManagerLast(client.manager_last));
                dispatch(setRejectComment(client.comment_reject));
                client.events_call !== 0 ? dispatch(setMissCall(true)) : dispatch(setMissCall(false));
                client.is_call_me !== 0 ? dispatch(setCallMe(true)) : dispatch(setCallMe(false));
                dispatch(setClientStatus(client.status));
               
                //записываем комментарии клиента
              /*   const lastComment = client.at(-1).auto_important == 1 ? client.at(-1) : false; */
                const comments = client?.partnership_client_logs?.filter(el => (el.is_manual == 1 && el.person_id !== 0 && el.comment !== '' && el.newsletter_id == 0 && el.is_sms == 0) || (el.type == 'change_manager') || el.is_record?.time).reverse();
                /* lastComment ? dispatch(setComments([lastComment, ...comments])) : */ dispatch(setComments(comments));
                //Записываем скрипт
                console.log(client?.partnership_client_logs)
                dispatch(setDialog(dialog));
                //Записываем Road
                dispatch(setRoad(road));
                dispatch(setNextConnect(client.next_connect));
                dispatch(setLastConnect(client.last_connect));
                dispatch(setZoomStatus(client.zoom_status));
                dispatch(setZoomConnect(client.zoom_date));

                setTimeout(() => {
                    dispatch(setLoadClient(false));
                }, 50);

                const lastMoves = Object.values(road).findLast((el, i) => el.status == 'finished' && i < 10);
                dispatch(setDayWithoutMove(handleDifDate(lastMoves.date)))

                client?.answer_intro_biz.length > 0 && dispatch(setCoursAnswer(JSON.parse(client?.answer_intro_biz)));
            })
            .catch(err => console.log(err));
    }, [client_id]);


    //обновляем Road
    useEffect(() => {
        client_id == clientUpdate && client_id !== '' && getClientInformation(client_id)
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
                });
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

     //Получаем данные партнерских офисов
     useEffect(() => {
        dispatch(setLoadPartners(true))
        client_id !== '' && getPartners(client_id, '')
            .then(res => {
                console.log(res)
                const data = res.data;
                const offices = data.partner_offices;
                const companies = data.companies_info.companies;
                const companiesNum = data.companies_info.total;
                //записываем информацию о партнерских оффисах и заказчиках
                dispatch(setOffices(offices));
                dispatch(setCompanies(companies));
                dispatch(setCompaniesNum(companiesNum));
                setTimeout(() => {
                    dispatch(setLoadPartners(false));
                }, 50);
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
        <div className={`${s.app} ${anim && s.anim}`}>
            <Work scenario={scenario} />
        </div>
    )
};

export default FrClientWork;