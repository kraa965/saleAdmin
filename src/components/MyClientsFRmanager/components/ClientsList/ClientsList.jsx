import { useState, useEffect, useRef } from 'react';
import s from './ClientsList.module.scss';
import { ReactComponent as IconSearch } from '../../image/iconSearch.svg';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { selectorMyClients } from '../../store/reducer/MyClients/selector';
//slice
import { setTodayNextPage, setClientsTodayAdd, setClientsNewAdd, setNewNextPage, setPlanMeetingAdd, setPlanNextPage, setLoadNew} from '../../store/reducer/MyClients/slice';
//components
import ClientTable from '../ClientTable/ClientsTable';
import ClientTableSceleton from '../ClientTableSceleton/ClientTableSceleton';
import AnimEnd from '../../../FrClientWork/components/AnimEnd/AnimEnd';
//utils
import { handleFilterObject } from '../../utils/filter';
//API 
import { getMyClientsPagination } from '../../Api/Api';

const ClientsList = ({ activeTab }) => {
    const myClients = useSelector(selectorMyClients);
    const clientsToday = myClients.today;
    const clientsTodayNum = myClients.todayNum;
    const clientsTodayPath = myClients.todayNextPage;
    const clientsNew = myClients.new;
    const clientsNewNum = myClients.newNum;
    const clientsNewPath = myClients.newNextPage;
    const noTask = myClients.no_task;
    const archive = myClients.archive;
    const planMeeting = myClients.plan_meeting;
    const planNum = myClients.planNum;
    const planNextPage = myClients.planNextPage;
    const zoom = myClients.zoom;
    const anketa = myClients.anketa;
    const contract = myClients.contract;
    const prepaid = myClients.prepaid;
    const favorite = myClients.favorite;
    const [anim, setAnim] = useState(false);
    const [clients, setClients] = useState(clientsToday || []);
    const [clientsPrev, setClientsPrev] = useState([]);
    const [activeTabList, setActiveTabList] = useState(2);
    const [load, setLoad] = useState(false);
    const [query, setQuery] = useState('');
    const timerDebounceRef = useRef();
    const listRef = useRef();
    const dispatch = useDispatch();

    console.log(clientsToday.length, activeTabList, clientsTodayPath)

    useEffect(() => {
        dispatch(setLoadNew(true))
        setTimeout(() => {
            setAnim(true)
        })
    }, [])


    useEffect(() => {
        if (activeTab == 3) {
            setClients(favorite);
            return
        }

        if (activeTabList == 1 && activeTab !== 3) {
            setClients(clientsNew);
            return
        }

        if (activeTabList == 2 && activeTab !== 3) {
            setClients(clientsToday);
            return
        }

        if (activeTabList == 3 && activeTab !== 3) {
            setClients(noTask);
            return
        }

        if (activeTabList == 4 && activeTab !== 3) {
            setClients(archive);
            return
        }

        if (activeTabList == 5 && activeTab !== 3) {
            setClients(planMeeting);
            return
        }

        if (activeTabList == 6 && activeTab !== 3) {
            setClients(zoom);
            return
        }

        if (activeTabList == 7 && activeTab !== 3) {
            setClients(anketa);
            return
        }

        if (activeTabList == 8 && activeTab !== 3) {
            setClients(contract);
            return
        }

        if (activeTabList == 9 && activeTab !== 3) {
            setClients(prepaid);
            return
        }

    }, [activeTabList, activeTab, clientsToday, clientsNew, noTask, archive, planMeeting, zoom, anketa, contract, prepaid, favorite]);


    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTabList(id);
        setQuery('');
    }

    const handleQuery = (e) => {
        const value = e.target.value;
        const result = handleFilterObject(value, clients);
        value.length == 0 ? setClients(clientsPrev) : setClients(result);
        setQuery(value);
    }

    const handleWritePrevState = () => {
        setClientsPrev(clients)
    }

    const handleNextPageLoad = () => {
        console.log('функция отработала', activeTabList, clientsTodayPath)
        if (activeTabList == 2 && clientsTodayPath && clientsTodayPath !== '') {
            console.log('условие выполнилось')
            setLoad(true);
            getMyClientsPagination(clientsTodayPath, 'today', 'default')
                .then(res => {
                    console.log(res);
                    const data = res.data.data;

                    dispatch(setTodayNextPage(data.next_page_url));
                    setTimeout(() => {
                        dispatch(setClientsTodayAdd(data.data));
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 1 && clientsNewPath && clientsNewPath !== '') {
            console.log('условие выполнилось')
            setLoad(true);
            getMyClientsPagination(clientsNewPath, 'new', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data.data;

                    dispatch(setNewNextPage(data.next_page_url));
                    setTimeout(() => {
                        dispatch(setClientsNewAdd(data.data));
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 5 && planNextPage && planNextPage !== '') {
            console.log('условие выполнилось')
            setLoad(true);
            getMyClientsPagination(planNextPage, 'plan_meeting', 'default')
                .then(res => {
                    console.log(res);
                    const data = res.data.data;

                    dispatch(setPlanNextPage(data.next_page_url));
                    setTimeout(() => {
                        dispatch(setPlanMeetingAdd(data.data));
                        setLoad(false);
                    }/* , 400 */)

                })
                .catch(err => console.log(err));
            return
        }
    }

    const scrollLoad = () => {
        const load = listRef?.current?.getBoundingClientRect()?.bottom - window.innerHeight < 800;
        load && handleNextPageLoad();
    }

    function handleDebounceScroll() {
        // Если ID таймена установлено - сбрасываем таймер
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }
        // Запускаем таймер, возвращаемое ID таймера
        // записываем в timerDebounceRef
        timerDebounceRef.current = setTimeout(() => {
            // Вызываем увеличение счётчика кол-ва
            // выполнения бизнес логики приложения с Debounce
            scrollLoad()
        }, 200);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [activeTabList, clientsTodayPath, clientsNewPath, planNextPage]);

    return (
        <>
            <div ref={listRef} className={`${s.clientsList} ${anim && s.clientsList_anim}`}>

                <div className={`${s.header} ${activeTab == 3 && s.header_hiden}`}>
                    <div className={s.search}>
                        <IconSearch />
                        <input onFocus={handleWritePrevState} onChange={handleQuery} type='text' value={query || ''} placeholder='Искать...'></input>
                    </div>
                    <div className={s.tabs}>
                       {/*  <div onClick={handleActiveTab} id='1' className={`${s.tab} ${activeTabList == 1 && s.tab_active} ${clientsNewNum == 0 && s.tab_disabled}`}>
                            <p>Новые</p><sup>{clientsNew.length == 0 ? '' : clientsNewNum}</sup>
                        </div> */}
                        <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTabList == 2 && s.tab_active} ${clientsTodayNum == 0 && s.tab_disabled}`}>
                            <p>Сегодня</p><sup>{clientsTodayNum == 0 ? '' : clientsTodayNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTabList == 3 && s.tab_active} ${noTask.length == 0 && s.tab_disabled}`}>
                            <p>Без задач</p><sup>{noTask.length == 0 ? '' : noTask.length}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='4' className={`${s.tab} ${activeTabList == 4 && s.tab_active} ${archive.length == 0 && s.tab_disabled}`}>
                            <p>В архив</p><sup>{archive.length == 0 ? '' : archive.length}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='5' className={`${s.tab} ${activeTabList == 5 && s.tab_active} ${planNum == 0 && s.tab_disabled}`}>
                            <p>Планирование встречи</p><sup>{planNum == 0 ? '' : planNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='6' className={`${s.tab} ${activeTabList == 6 && s.tab_active} ${zoom.length == 0 && s.tab_disabled}`}>
                            <p>Проведен Zoom</p><sup>{zoom.length == 0 ? '' : zoom.length}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='7' className={`${s.tab} ${activeTabList == 7 && s.tab_active} ${anketa.length == 0 && s.tab_disabled}`}>
                            <p>Заполнена анкета</p><sup>{anketa.length == 0 ? '' : anketa.length}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='8' className={`${s.tab} ${activeTabList == 8 && s.tab_active} ${contract.length == 0 && s.tab_disabled}`}>
                            <p>Подписан договор</p><sup>{contract.length == 0 ? '' : contract.length}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='9' className={`${s.tab} ${activeTabList == 9 && s.tab_active} ${prepaid.length == 0 && s.tab_disabled}`}>
                            <p>Предоплата</p><sup>{prepaid.length == 0 ? '' : prepaid.length}</sup>
                        </div>
                    </div>
                </div>
                <ClientTable clients={clients} activeTab={activeTab} activeTabList={activeTabList}/>
                {load && <AnimEnd />}
            </div>
            {activeTabList == 1 && <ClientTableSceleton load={myClients.loadNew} />}
            {activeTabList == 2 && <ClientTableSceleton load={myClients.loadToday} />}
            {activeTabList == 3 && <ClientTableSceleton load={myClients.loadNoTask} />}
            {activeTabList == 4 && <ClientTableSceleton load={myClients.loadArchive} />}
            {activeTabList == 5 && <ClientTableSceleton load={myClients.loadPlanMeeting} />}
            {activeTabList == 6 && <ClientTableSceleton load={myClients.loadZoom} />}
            {activeTabList == 7 && <ClientTableSceleton load={myClients.loadAnketa} />}
            {activeTabList == 8 && <ClientTableSceleton load={myClients.loadContract} />}
            {activeTabList == 9 && <ClientTableSceleton load={myClients.loadPrepaid} />}
            {activeTab == 3 && <ClientTableSceleton load={myClients.loadFavorite} />}
        </>
    )
};

export default ClientsList;