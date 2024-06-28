import { useState, useEffect, useRef } from 'react';
import s from './ClientsList.module.scss';
import { ReactComponent as IconSearch } from '../../image/iconSearch.svg';
import { ReactComponent as IconSearchClose } from '../../image/iconClose.svg';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { selectorMyClientsFr } from '../../store/reducer/MyClientsFr/selector';
//slice
import {
    setNoTaskFrNextPage, setArchiveFrNextPage, setPlanFrNextPage, setZoomFrNextPage,
    setAnketaFrNextPage, setСontractFrNextPage, setPrepaidFrNextPage, setAddNoTaskFr,
    setAddArchiveFr, setAddPlanFr, setAddZoomFr, setAddAnketaFr, setAddСontractFr,
    setAddPrepaidFr, setLoadNoTaskFr
} from '../../store/reducer/MyClientsFr/slice';
//components
import ClientTable from '../ClientTable/ClientsTable';
import ClientTableSceleton from '../ClientTableSceleton/ClientTableSceleton';
import AnimEnd from '../../../FrClientWork/components/AnimEnd/AnimEnd';
//utils
import { handleFilterObject } from '../../utils/filter';
//API 
import { getMyClientsPagination, SearchMyClients } from '../../Api/Api';

const ClientsListFr = ({ activeTab, noTaskFr, archiveFr, planFr, zoomFr, anketaFr, contractFr, prepaidFr,
    setnNoTaskFr, setArchiveFr, setPlanFr, setZoomFr, setAnketaFr, setContractFr, setPrepaidFr,
    planFrNum, zoomFrNum, anketaFrNum, contractFrNum, prepaidFrNum, noTaskFrNum, archiveFrNum
}) => {
    const myClients = useSelector(selectorMyClientsFr);
    const noTaskFrNextPage = myClients.noTaskFrNextPage;
    const loadNoTaskFr = myClients.loadNoTaskFr;
    const archiveFrNextPage = myClients.archiveFrNextPage;
    const planFrNextPage = myClients.planFrNextPage;
    const zoomFrNextPage = myClients.zoomFrNextPage;
    const anketaFrNextPage = myClients.anketaFrNextPage;
    const contractFrNextPage = myClients.contractFrNextPage;
    const prepaidFrNextPage = myClients.prepaidFrNextPage;

    const [anim, setAnim] = useState(false);
    const [clients, setClients] = useState(noTaskFr || []);
    const [isSearch, setIsSearch] = useState(false);
    const [clientsSearch, setClientsSearch] = useState([]);
    const [loadSearch, setLoadSearch] = useState(false);
    const [clientsPrev, setClientsPrev] = useState([]);
    const [activeTabList, setActiveTabList] = useState(1);
    const [load, setLoad] = useState(false);

    const [query, setQuery] = useState('');
    const timerDebounceRef = useRef();
    const listRef = useRef();
    const dispatch = useDispatch();
    const refInput = useRef();
    console.log(planFr, planFr, activeTabList)



    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
            dispatch(setLoadNoTaskFr(true));
        })
    }, [])


    useEffect(() => {
        if (activeTabList == 1 && !isSearch) {
            setClients(noTaskFr);
            return
        }

        if (activeTabList == 2 && !isSearch) {
            setClients(archiveFr);
            return
        }

        if (activeTabList == 3 && !isSearch) {
            setClients(planFr);
            return
        }

        if (activeTabList == 4 && !isSearch) {
            setClients(zoomFr);
            return
        }

        if (activeTabList == 5 && !isSearch) {
            setClients(anketaFr);
            return
        }

        if (activeTabList == 6 && !isSearch) {
            setClients(contractFr);
            return
        }

        if (activeTabList == 7 && !isSearch) {
            setClients(prepaidFr);
            return
        }

        if (isSearch) {
            setClients(clientsSearch);
            return
        }

    }, [activeTabList, noTaskFr, archiveFr, planFr, zoomFr, anketaFr, contractFr, prepaidFr, clientsSearch, isSearch]);

    useEffect(() => {
        setIsSearch(false)
    }, [activeTabList]);


    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTabList(id);
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


    const handleFetchSearch = (type, search) => {
        setClientsSearch([]);
        SearchMyClients(type, 'leader_expert', search)
            .then(res => {
                console.log(res)
                const result = res.data.data;
                setClientsSearch(result);
                setLoadSearch(false);
            })
            .catch(err => console.log(err))
    }


    const handleSearch = () => {
        setIsSearch(true)
        setLoadSearch(true)

        if (activeTabList == 1) {
            handleFetchSearch('no_tasks', query);
            return
        }

        if (activeTabList == 2) {
            handleFetchSearch('archive', query);
            return
        }

        if (activeTabList == 3) {
            handleFetchSearch('plan_meeting', query);
            return
        }

        if (activeTabList == 4) {
            handleFetchSearch('zoom', query);
            return
        }

        if (activeTabList == 5) {
            handleFetchSearch('anketa', query);
            return
        }

        if (activeTabList == 6) {
            handleFetchSearch('contract', query);
            return
        }

        if (activeTabList == 7) {
            handleFetchSearch('prepaid', query);
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
        setClientsSearch([]);
    }

    const handleWritePrevState = () => {
        setClientsPrev(clients)
    }


    const handleNextPageLoad = () => {
        console.log(activeTabList, archiveFrNextPage)
        if (activeTabList == 1 && noTaskFrNextPage && noTaskFrNextPage !== '' && !isSearch) {
            console.log('функция отработал')
            setLoad(true);
            getMyClientsPagination(noTaskFrNextPage, 'no_tasks', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setNoTaskFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setnNoTaskFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 2 && archiveFrNextPage && archiveFrNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPagination(archiveFrNextPage, 'archive', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setArchiveFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setArchiveFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 3 && planFrNextPage && planFrNextPage !== '' && !isSearch) {
            console.log(activeTabList, planFrNextPage)
            setLoad(true);
            getMyClientsPagination(planFrNextPage, 'plan_meeting', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setPlanFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setPlanFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 4 && zoomFrNextPage && zoomFrNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPagination(zoomFrNextPage, 'zoom', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setZoomFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setZoomFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 5 && anketaFrNextPage && anketaFrNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPagination(anketaFrNextPage, 'anketa', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setAnketaFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setAnketaFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 6 && contractFrNextPage && contractFrNextPage !== '' && !isSearch) {
            setLoad(true);
            getMyClientsPagination(contractFrNextPage, 'contract', 'leader_expert')
                .then(res => {
                    console.log(res);
                    const data = res.data;
                    dispatch(setСontractFrNextPage(data.next_page_url));
                    setTimeout(() => {
                        setContractFr(prevState => [...prevState, ...data.data]);
                        setLoad(false);
                    }, 100)

                })
                .catch(err => console.log(err));
            return
        }

        if (activeTabList == 7 && prepaidFrNextPage && prepaidFrNextPage !== '' && !isSearch) {
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
        const load = listRef?.current?.getBoundingClientRect()?.bottom - window.innerHeight < 400;
        console.log(load)
        load && handleNextPageLoad();
    }

    function handleDebounceScroll() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }
        timerDebounceRef.current = setTimeout(() => {
            scrollLoad()
        }, 500);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [activeTabList, noTaskFrNextPage, archiveFrNextPage]);

    return (
        <>
            <div ref={listRef} className={`${s.clientsList} ${anim && s.clientsList_anim}`}>

                <div className={`${s.header} ${activeTab == 3 && s.header_hiden}`}>
                    <div className={s.search}>
                        <div  onClick={handleSearch} className={`${s.icon_search}`}>
                            <IconSearch />
                        </div>
                        <input onKeyDown={handleSearchEnter} ref={refInput} onFocus={handleWritePrevState} onChange={handleQuery} type='text' value={query || ''} placeholder='Искать...'></input>

                        <div className={`${s.icon_clean}  ${query.length > 0 && s.icon_clean_vis}`}>
                            <IconSearchClose onClick={handleCleanSearch} />
                        </div>
                    </div>
                    <div className={s.tabs}>
                        <div onClick={handleActiveTab} id='1' className={`${s.tab} ${activeTabList == 1 && s.tab_active} ${noTaskFrNum == 0 && s.tab_disabled}`}>
                            <p>Без задач</p><sup>{noTaskFrNum == 0 ? '' : noTaskFrNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTabList == 3 && s.tab_active} ${planFrNum == 0 && s.tab_disabled}`}>
                            <p>Планирование встречи</p><sup>{planFrNum == 0 ? '' : planFrNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='4' className={`${s.tab} ${activeTabList == 4 && s.tab_active} ${zoomFrNum == 0 && s.tab_disabled}`}>
                            <p>Проведен Zoom</p><sup>{zoomFrNum == 0 ? '' : zoomFrNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='5' className={`${s.tab} ${activeTabList == 5 && s.tab_active} ${anketaFrNum == 0 && s.tab_disabled}`}>
                            <p>Заполнена анкета</p><sup>{anketaFrNum == 0 ? '' : anketaFrNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='6' className={`${s.tab} ${activeTabList == 6 && s.tab_active} ${contractFrNum == 0 && s.tab_disabled}`}>
                            <p>Подписан договор</p><sup>{contractFrNum == 0 ? '' : contractFrNum}</sup>
                        </div>
                        <div onClick={handleActiveTab} id='7' className={`${s.tab} ${activeTabList == 7 && s.tab_active} ${prepaidFrNum == 0 && s.tab_disabled}`}>
                            <p>Предоплата</p><sup>{prepaidFrNum == 0 ? '' : prepaidFrNum}</sup>
                        </div>

                        <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTabList == 2 && s.tab_active} ${archiveFrNum == 0 && s.tab_disabled}`}>
                            <p>В архив</p><sup>{archiveFrNum == 0 ? '' : archiveFrNum}</sup>
                        </div>
                    </div>
                </div>
                <ClientTable clients={clients} activeTab={activeTab} activeTabList={activeTabList} type={'fr'} />
                {load && <AnimEnd />}
            </div>
            {activeTabList == 1 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 2 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 3 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 4 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 5 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 6 && <ClientTableSceleton load={loadNoTaskFr} />}
            {activeTabList == 7 && <ClientTableSceleton load={loadNoTaskFr} />}
            {isSearch && <ClientTableSceleton load={loadSearch} type={'search'}/>}
            {isSearch && clientsSearch.length == 0 && <p className={s.sub}>Ничего не найдено</p>}

        </>
    )
};

export default ClientsListFr;