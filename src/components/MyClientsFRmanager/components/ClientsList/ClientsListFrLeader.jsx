import { useState, useEffect, useRef } from 'react';
import s from './ClientsList.module.scss';
import { ReactComponent as IconSearch } from '../../image/iconSearch.svg';
import { ReactComponent as IconSearchClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCloseSmall } from '../../image/clients/iconCloseSmall.svg';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { selectorMyClientsFr } from '../../store/reducer/MyClientsFr/selector';
import { selectorExperts } from '../../store/reducer/Experts/selector';
//slice
import {
    setNoTaskFrNextPage, setArchiveFrNextPage, setPlanFrNextPage, setZoomFrNextPage,
    setAnketaFrNextPage, setСontractFrNextPage, setPrepaidFrNextPage, setAddNoTaskFr,
    setAddArchiveFr, setAddPlanFr, setAddZoomFr, setAddAnketaFr, setAddСontractFr,
    setAddPrepaidFr, setLoadNoTaskFr, setNewNextPage, setCoursFrNextPage
} from '../../store/reducer/MyClientsFr/slice';
//components
import ClientsTableLeader from '../ClientTable/ClientsTableLeader';
import ClientTableSceleton from '../ClientTableSceleton/ClientTableSceleton';
import AnimEnd from '../../../FrClientWork/components/AnimEnd/AnimEnd';
import MonthSelect from '../MonthSelect/MonthSelect';
import SwitchDark from './Switch/SwitchDark';
import ManagerSelect from '../ManagerSelect/ManagerSelect';
//utils
import { handleFilterObject } from '../../utils/filter';
import { handleEndDayMonth } from '../../utils/dates';
//API 
import { getMyClientsPaginationLeader, SearchMyClientsLeader } from '../../Api/Api';

const ClientsListFr = ({ activeTab, db, setDb, dbNum, dbNextPage, setDbNextPage, loadDb,
    login, setLogin, loginNum, loginNextPage, setLoginNextPage, loadLogin,
    lookContent, setLookContent, lookContentNum, lookContentNextPage, setLookContentNextPage,
    loadLookContent, openPlan, setOpenPlan, openPlanNum, openPlanNextPage, setOpenPlanNextPage, loadOpenPlan,
    plan, setPlan, planNum, planNextPage, setPlanNextPage, loadPlan,
    manager, setManager, sortAll, date, setDate, setRejectFilter, rejectFilter,
}) => {
    const myClients = useSelector(selectorMyClientsFr);
    const [anim, setAnim] = useState(false);
    const [clients, setClients] = useState(db || []);
    const [isSearch, setIsSearch] = useState(false);
    const [clientsSearch, setClientsSearch] = useState([]);
    const [loadSearch, setLoadSearch] = useState(false);
    const [clientsPrev, setClientsPrev] = useState([]);
    const [activeTabList, setActiveTabList] = useState(1);
    const [disabledButton, setDisabledButton] = useState(false);
    const [load, setLoad] = useState(false);
    const [query, setQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);
    const timerDebounceRef = useRef();
    const listRef = useRef();
    const dispatch = useDispatch();
    const refInput = useRef();
    const modalRef = useRef();
    console.log(clients)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
            dispatch(setLoadNoTaskFr(true));
        })
    }, [])



    useEffect(() => {
        if (activeTabList == 1 && !isSearch) {
            setClients(db);
            return
        }

        if (activeTabList == 2 && !isSearch) {
            setClients(login);
            return
        }


        if (activeTabList == 3 && !isSearch) {
            setClients(lookContent);
            return
        }

        if (activeTabList == 4 && !isSearch) {
            setClients(openPlan);
            return
        }

        if (activeTabList == 5 && !isSearch) {
            setClients(plan);
            return
        }

        if (isSearch) {
            setClients(clientsSearch);
            return
        }

    }, [activeTabList, isSearch, db, login, lookContent, openPlan, plan, clientsSearch]);

    useEffect(() => {
        setIsSearch(false);
        setQuery('')
    }, [activeTabList, manager]);


    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTabList(id);
        localStorage.setItem('activeTabList', id)
        setQuery('');
    }

    const handleQuery = (e) => {
        const value = e.target.value;
        setQuery(value)

        if (value == '') {
            setClientsSearch([]);
            setIsSearch(false);
            return
        }
    }


    const handleFetchSearch = (type, search, sort) => {
        setClientsSearch([]);
        SearchMyClientsLeader(type, 'leader', search, manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const result = res.data.data.data;
                setClientsSearch(result);
                setLoadSearch(false);
            })
            .catch(err => console.log(err))
    }


    const handleSearch = () => {
        setIsSearch(true)
        setLoadSearch(true)

        if (activeTabList == 1) {
            handleFetchSearch('add_db', query);
            return
        }

        if (activeTabList == 2) {
            handleFetchSearch('login', query);
            return
        }

        if (activeTabList == 3) {
            handleFetchSearch('look_content', query);
            return
        }

        if (activeTabList == 4) {
            handleFetchSearch('open_plan', query);
            return
        }

        if (activeTabList == 5) {
            handleFetchSearch('plan', query);
            return
        }
    }

    const handleSearchEnter = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
            return
        }
    }

    const handleCleanSearch = () => {
        setQuery('');
        setIsSearch(false);
        setSearchOpen(false)
        setClientsSearch([]);
    }

    const handleWritePrevState = () => {
        setClientsPrev(clients)
    }


    const handleNextPageLoad = () => {
        if (activeTabList == 1 && dbNextPage && dbNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPaginationLeader(dbNextPage, 'add_db', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    setDbNextPage(data.next_page_url);
                    setTimeout(() => {
                        setDb(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }


        if (activeTabList == 2 && loginNextPage && loginNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPaginationLeader(loginNextPage, 'login', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    setLoginNextPage(data.next_page_url);
                    setTimeout(() => {
                        setLogin(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 3 && lookContentNextPage && lookContentNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPaginationLeader(lookContentNextPage, 'look_content', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    setLookContentNextPage(data.next_page_url);
                    setTimeout(() => {
                        setLookContent(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 4 && openPlanNextPage && openPlanNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPaginationLeader(openPlanNextPage, 'open_plan', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    setOpenPlanNextPage(data.next_page_url);
                    setTimeout(() => {
                        setOpenPlan(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 5 && planNextPage && planNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPaginationLeader(planNextPage, 'plan', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
                .then(res => {
                    console.log(res);
                    const data = res.data.data;
                    setPlanNextPage(data.next_page_url);
                    setTimeout(() => {
                        setPlan(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }










        /*   if (isSearch && prepaidFrNextPage && prepaidFrNextPage !== '') {
              setLoad(true);
              getMyClientsPagination(prepaidFrNextPage, 'prepaid', 'leader_expert')
                  .then(res => {
                      console.log(res);
                      const data = res.data;
                      dispatch(setPrepaidFrNextPage(data.next_page_url));
                      setTimeout(() => {
                          setPrepaidFr(prevState => [...prevState, ...data.data]);
                          setLoad(false);
                      }, 100)
     
                  })
                  .catch(err => console.log(err));
              return
          } */
    }


    const scrollLoad = () => {
        const loadScroll = listRef?.current?.getBoundingClientRect()?.bottom - window.innerHeight < 400;
        console.log(load)
        !load && loadScroll && handleNextPageLoad();
    }

    function handleDebounceScroll() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            scrollLoad()
        }, 200);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [activeTabList, load, dbNextPage,]);

    const handleChoseManager = (e) => {
        const id = e.currentTarget.id;
        setManager(id);
        localStorage.setItem('expert', JSON.stringify(id))
    }

    const handleReset = () => {
        setManager(0);
        localStorage.setItem('expert', JSON.stringify(0))
    }

    const handleOpenSearch = () => {
        setSearchOpen(true)
    }

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSearchOpen(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    return (
        <>
            <div ref={listRef} className={`${s.clientsList} ${anim && s.clientsList_anim}`}>

                <div className={`${s.header} ${activeTab == 3 && s.header_hiden}`}>

                     <div onClick={handleOpenSearch} ref={modalRef} className={`${s.search}`}>
                        <div onClick={handleSearch} className={`${s.icon_search}`}>
                            <IconSearch />
                        </div>

                        <input onKeyDown={handleSearchEnter} ref={refInput} onFocus={handleWritePrevState} onChange={handleQuery} type='text' value={query || ''} placeholder='Искать...'></input>

                        <div className={`${s.icon_clean}  ${(query.length > 0 && searchOpen) && s.icon_clean_vis}`}>
                            <IconSearchClose onClick={handleCleanSearch} />
                        </div>
                    </div>


                    <div className={s.tabs}>
                        <div onClick={handleActiveTab} id='1' className={`${s.tab} ${activeTabList == 1 && s.tab_active} ${dbNum == 0 && s.tab_disabled}`}>
                            <p>Добавлены в базу</p><sup>{dbNum == 0 ? '' : dbNum}</sup>
                        </div>

                        <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTabList == 2 && s.tab_active} ${loginNum == 0 && s.tab_disabled}`}>
                            <p>Зашел в ЛК</p><sup>{loginNum == 0 ? '' : loginNum}</sup>
                        </div>

                        <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTabList == 3 && s.tab_active} ${lookContentNum == 0 && s.tab_disabled}`}>
                            <p>Просмотрел материалы</p><sup>{lookContentNum == 0 ? '' : lookContentNum}</sup>
                        </div>

                        <div onClick={handleActiveTab} id='4' className={`${s.tab} ${activeTabList == 4 && s.tab_active} ${openPlanNum == 0 && s.tab_disabled}`}>
                            <p>Сформирован БП</p><sup>{openPlanNum == 0 ? '' : openPlanNum}</sup>
                        </div>

                        <div onClick={handleActiveTab} id='5' className={`${s.tab} ${activeTabList == 5 && s.tab_active} ${planNum == 0 && s.tab_disabled}`}>
                            <p>Просмотрен БП</p><sup>{planNum == 0 ? '' : planNum}</sup>
                        </div>





                    </div>
                    <MonthSelect date={date} setDate={setDate} hidden={activeTabList !== '2' ? true : false} />
                </div>

                <div className={s.header_bottom}>

                    <div className={s.reject}>
                        <p>Скрыть отказы</p>
                        <SwitchDark setRejectFilter={setRejectFilter} rejectFilter={rejectFilter} />
                    </div>
                    <ManagerSelect manager={manager} setManager={setManager}/>

                </div>


                <ClientsTableLeader clients={clients} activeTab={activeTab} activeTabList={activeTabList} type={'fr'} />
                {load && <div className={s.loader}><AnimEnd /></div>}
            </div>
            {activeTabList == 1 && <ClientTableSceleton load={loadDb} type={'all'} />}
            {activeTabList == 2 && <ClientTableSceleton load={loadLogin} type={'all'} />}
            {activeTabList == 3 && <ClientTableSceleton load={loadLookContent} type={'all'} />}
            {activeTabList == 4 && <ClientTableSceleton load={loadOpenPlan} type={'all'} />}
            {activeTabList == 5 && <ClientTableSceleton load={loadPlan} type={'all'} />}
            {isSearch && <ClientTableSceleton load={loadSearch} type={'search'} />}
            {isSearch && clientsSearch.length == 0 && <p className={s.sub}>Ничего не найдено</p>}

        </>
    )
};

export default ClientsListFr;