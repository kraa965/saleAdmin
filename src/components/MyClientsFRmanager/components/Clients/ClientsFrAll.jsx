import s from './Clients.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import ClientsListFr from '../ClientsList/ClientsListFr';
//API
import { getMyClients, getPlaner } from '../../Api/Api';
import {
    setNoTaskFrNum,
    setNoTaskFrNextPage,
    setLoadNoTaskFr,
    setArchiveFr,
    setArchiveFrNum,
    setArchiveFrNextPage,
    setLoadArchiveFr,
    setPlanFr,
    setPlanFrNum,
    setPlanFrNextPage,
    setLoadPlanFr,
    setZoomFr,
    setZoomFrNum,
    setZoomFrNextPage,
    setLoadZoomFr,
    setAnketaFr,
    setAnketaFrNum,
    setAnketaFrNextPage,
    setLoadAnketaFr,
    setСontractFr,
    setСontractFrNum,
    setСontractFrNextPage,
    setLoadContractFr,
    setPrepaidFr,
    setPrepaidFrNum,
    setPrepaidFrNextPage,
    setLoadPrepaidFr,
    setNewNextPage,
    setLoadNew
} from '../../store/reducer/MyClientsFr/slice';
//slice

//utils
import { handleEndDayMonth } from '../../utils/dates';

const ClientsFrAll = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(2);
    const [noTaskFr, setnNoTaskFr] = useState(JSON.parse(localStorage.getItem('noTaskAll')) || []);
    const [archiveFr, setArchiveFr] = useState(JSON.parse(localStorage.getItem('clientsAll')) || []);
    const [planFr, setPlanFr] = useState(JSON.parse(localStorage.getItem('planAll')) || []);
    const [zoomFr, setZoomFr] = useState(JSON.parse(localStorage.getItem('zoomAll')) || []);
    const [anketaFr, setAnketaFr] = useState(JSON.parse(localStorage.getItem('anketaAll')) || []);
    const [contractFr, setContractFr] = useState(JSON.parse(localStorage.getItem('contractAll')) || []);
    const [prepaidFr, setPrepaidFr] = useState(JSON.parse(localStorage.getItem('prepaidAll')) || []);
    const [noTaskFrNum, setNoTaskFrNum] = useState(JSON.parse(localStorage.getItem('noTaskAllNum')) || []);
    const [archiveFrNum, setArchiveFrNum] = useState(JSON.parse(localStorage.getItem('clientsAllNum')) || []);
    const [planFrNum, setPlanFrNum] = useState(JSON.parse(localStorage.getItem('planAllNum')) || []);
    const [zoomFrNum, setZoomFrNum] = useState(JSON.parse(localStorage.getItem('zoomAllNum')) || []);
    const [anketaFrNum, setAnketaFrNum] = useState(JSON.parse(localStorage.getItem('anketaAllNum')) || []);
    const [contractFrNum, setContractFrNum] = useState(JSON.parse(localStorage.getItem('contractAllNum')) || []);
    const [prepaidFrNum, setPrepaidFrNum] = useState(JSON.parse(localStorage.getItem('prepaidAllNum')) || []);
    const [clientsNew, setClientsNew] = useState(JSON.parse(localStorage.getItem('newAll')) || []);
    const [clientsNewNum, setClientsNewNum] = useState(JSON.parse(localStorage.getItem('newAllNum')) || []);
    const [manager, setManager] = useState(JSON.parse(localStorage.getItem('expert')) || 0);
    const [sortAll, setSortAll] = useState('bp_open');
    const [rejectFilter, setRejectFilter] = useState(localStorage.getItem('filterReject') || 0);
    const [date, setDate] = useState(JSON.parse(localStorage.getItem('dateSort')) || '');
    /*   const [planerLoader, setPlanerLoader] = useState(false); */
    /*    const planerLoad = useSelector(selectorPlaner).planerLoad; */
    const dispatch = useDispatch();
    console.log(localStorage.getItem('expert'))

    useEffect(() => {
        
        setTimeout(() => {
            setFirstLoad(false)
        }, 150)
       
    }, []);

    //получение списка моих клиентов
    useEffect(() => {
        (noTaskFr.length == 0 || !firstLoad) ? dispatch(setLoadNoTaskFr(true)) : dispatch(setLoadNoTaskFr(false));
        (planFr.length == 0 || !firstLoad) ? dispatch(setLoadPlanFr(true)) : dispatch(setLoadPlanFr(false));
        (zoomFr.length == 0 || !firstLoad) ? dispatch(setLoadZoomFr(true)) : dispatch(setLoadZoomFr(false));
        (anketaFr.length == 0 || !firstLoad) ? dispatch(setLoadAnketaFr(true)) : dispatch(setLoadAnketaFr(false));
        (contractFr.length == 0 || !firstLoad) ? dispatch(setLoadContractFr(true)) : dispatch(setLoadContractFr(false));
        (prepaidFr.length == 0 || !firstLoad) ? dispatch(setLoadPrepaidFr(true)) : dispatch(setLoadPrepaidFr(false));

        !firstLoad && setArchiveFr([]);
        !firstLoad && setArchiveFrNum('')
        !firstLoad && setClientsNew([]);
        !firstLoad && setClientsNewNum('')
        !firstLoad && setnNoTaskFr([]);
        !firstLoad && setNoTaskFrNum('')
        !firstLoad && setPlanFr([]);
        !firstLoad && setPlanFrNum('')
        !firstLoad && setZoomFr([]);
        !firstLoad && setZoomFrNum('')
        !firstLoad && setAnketaFr([]);
        !firstLoad && setAnketaFrNum('')
        !firstLoad && setContractFr([]);
        !firstLoad && setContractFrNum('')
        !firstLoad && setPrepaidFr([]);
        !firstLoad && setPrepaidFrNum('')

        getMyClients('new', 'leader_expert')
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('newAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('newAll')
                }

                localStorage.setItem('newAllNum', JSON.stringify(clientsNum))
                setClientsNew(clients);
                setClientsNewNum(clientsNum);
                dispatch(setNewNextPage(res.data.data.next_page_url))
                dispatch(setLoadNew(false));
            })
            .catch(err => console.log(err));

        getMyClients('no_tasks', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('noTaskAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('noTaskAll')
                }

                localStorage.setItem('noTaskAllNum', JSON.stringify(clientsNum))
                setnNoTaskFr(clients);
                setNoTaskFrNum(clientsNum);
                dispatch(setNoTaskFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadNoTaskFr(false));
                }, 50)


            })
            .catch(err => console.log(err))

        getMyClients('plan_meeting', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('planAll', JSON.stringify(clients.slice(0, 50)))
                } catch (e) {
                    localStorage.removeItem('planAll')
                }

                localStorage.setItem('planAllNum', JSON.stringify(clientsNum))
                setPlanFr(clients);
                setPlanFrNum(clientsNum);

                dispatch(setPlanFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPlanFr(false));
                }, 100)


            })
            .catch(err => console.log(err));

        getMyClients('zoom', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('zoomAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('zoomAll')
                }

                localStorage.setItem('zoomAllNum', JSON.stringify(clientsNum))
                setZoomFr(clients);
                setZoomFrNum(clientsNum);

                dispatch(setZoomFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadZoomFr(false));
                }, 100)


            })
            .catch(err => console.log(err))

        getMyClients('anketa', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('anketaAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('anketaAll')
                }

                localStorage.setItem('anketaAllNum', JSON.stringify(clientsNum))
                setAnketaFr(clients);
                setAnketaFrNum(clientsNum);

                dispatch(setAnketaFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadAnketaFr(false));
                }, 100)


            })
            .catch(err => console.log(err))

        getMyClients('contract', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                console.log(res)
                try {
                    localStorage.setItem('contractAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('contractAll')
                }

                localStorage.setItem('contractAllNum', JSON.stringify(clientsNum))
                setContractFr(clients);
                setContractFrNum(clientsNum);

                dispatch(setСontractFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadContractFr(false));
                }, 100)


            })
            .catch(err => console.log(err))

        getMyClients('prepaid', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('prepaidAll', JSON.stringify(clients.slice(0, 10)))
                } catch (e) {
                    localStorage.removeItem('prepaidAll')
                }

                localStorage.setItem('prepaidAllNum', JSON.stringify(clientsNum))

                setPrepaidFr(clients);
                setPrepaidFrNum(clientsNum);
                dispatch(setPrepaidFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPrepaidFr(false));
                }, 100)


            })
            .catch(err => console.log(err))
    }, [manager, date, rejectFilter]);

/*     useEffect(() => {
        (archiveFr.length == 0 || !firstLoad) ? dispatch(setLoadArchiveFr(true)) : dispatch(setLoadArchiveFr(false));

        !firstLoad && setArchiveFr([]);
        !firstLoad && setArchiveFrNum('');
        !firstLoad && localStorage.removeItem('clientsAll');
      
        getMyClients('all', 'leader_expert', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {

                console.log('все клиенты', res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
              
                setArchiveFr(clients);
                setArchiveFrNum(clientsNum);

                dispatch(setArchiveFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadArchiveFr(false));
                }, 150)

                try {
                    localStorage.setItem('clientsAll', JSON.stringify(clients.slice(0, 50)))
                } catch (e) {
                    localStorage.removeItem('clientsAll')
                }


                localStorage.setItem('clientsAllNum', JSON.stringify(clientsNum))
            })
            .catch(err => console.log(err))
    }, [manager, date, rejectFilter]) */

    console.log(manager)


    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        })

    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);


    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTab(id)
    }

    return (
        <div className={`${s.clients} ${anim && s.clients_anim}`}>
            <div className={s.header}>
                <h2 className={s.title}>Клиенты</h2>
                <div style={{ visibility: 'hidden' }} className={s.tabs}>
                    <div onClick={handleActiveTab} id='1' className={`${s.tab} ${activeTab == 1 && s.tab_active}`}>
                        <p>Планер</p>
                    </div>

                    <div onClick={handleActiveTab} id='2' className={`${s.tab} ${activeTab == 2 && s.tab_active}`}>
                        <p>Клиенты</p>
                    </div>

                    <div onClick={handleActiveTab} id='3' className={`${s.tab} ${activeTab == 3 && s.tab_active}`}>
                        <p>Избранное</p>
                    </div>
                </div>
            </div>
            {(activeTab == 2 || activeTab == 3) && <ClientsListFr activeTab={activeTab} noTaskFr={noTaskFr} archiveFr={archiveFr} planFr={planFr} zoomFr={zoomFr} anketaFr={anketaFr} contractFr={contractFr} prepaidFr={prepaidFr}
                setnNoTaskFr={setnNoTaskFr} setArchiveFr={setArchiveFr} setPlanFr={setPlanFr} setZoomFr={setZoomFr} setAnketaFr={setAnketaFr} setContractFr={setContractFr} setPrepaidFr={setPrepaidFr}
                planFrNum={planFrNum} zoomFrNum={zoomFrNum} anketaFrNum={anketaFrNum} contractFrNum={contractFrNum} prepaidFrNum={prepaidFrNum} noTaskFrNum={noTaskFrNum} archiveFrNum={archiveFrNum} manager={manager} setManager={setManager}
                sortAll={sortAll} date={date} setDate={setDate} clientsNew={clientsNew} setClientsNew={setClientsNew} clientsNewNum={clientsNewNum} setRejectFilter={setRejectFilter} rejectFilter={rejectFilter}
            />}
            {/* {activeTab == 1 && <Planer />} */}
            {/* {activeTab == 1 && planerLoader && <PlanerSceleton load={planerLoad} />} */}
        </div>
    )
};

export default ClientsFrAll;