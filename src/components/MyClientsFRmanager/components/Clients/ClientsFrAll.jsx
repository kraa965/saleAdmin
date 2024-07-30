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
    setLoadPrepaidFr
} from '../../store/reducer/MyClientsFr/slice';
//slice

const ClientsFrAll = () => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(2);
    const [noTaskFr, setnNoTaskFr] = useState([]);
    const [archiveFr, setArchiveFr] = useState([]);
    const [planFr, setPlanFr] = useState([]);
    const [zoomFr, setZoomFr] = useState([]);
    const [anketaFr, setAnketaFr] = useState([]);
    const [contractFr, setContractFr] = useState([]);
    const [prepaidFr, setPrepaidFr] = useState([]);
    const [noTaskFrNum, setNoTaskFrNum] = useState([]);
    const [archiveFrNum, setArchiveFrNum] = useState([]);
    const [planFrNum, setPlanFrNum] = useState([]);
    const [zoomFrNum, setZoomFrNum] = useState([]);
    const [anketaFrNum, setAnketaFrNum] = useState([]);
    const [contractFrNum, setContractFrNum] = useState([]);
    const [prepaidFrNum, setPrepaidFrNum] = useState([]);
    const [manager, setManager] = useState(0);
    const [sortAll, setSortAll] = useState('bp_open');
    /*   const [planerLoader, setPlanerLoader] = useState(false); */
    /*    const planerLoad = useSelector(selectorPlaner).planerLoad; */
    const dispatch = useDispatch();

    //получение списка моих клиентов
    useEffect(() => {
        dispatch(setLoadNoTaskFr(true));
        dispatch(setLoadArchiveFr(true));
        dispatch(setLoadPlanFr(true));
        dispatch(setLoadZoomFr(true));
        dispatch(setLoadAnketaFr(true));
        dispatch(setLoadContractFr(true));
        dispatch(setLoadPrepaidFr(true));
        getMyClients('no_tasks', 'leader_expert', manager)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setnNoTaskFr(clients);
                setNoTaskFrNum(clientsNum);
                dispatch(setNoTaskFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadNoTaskFr(false));
                }, 50)
            })
            .catch(err => console.log(err))

        getMyClients('all', 'leader_expert', manager, sortAll)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setArchiveFr(clients);
                setArchiveFrNum(clientsNum);
                dispatch(setArchiveFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadArchiveFr(false));
                }, 50)
            })
            .catch(err => console.log(err))

        getMyClients('plan_meeting', 'leader_expert', manager)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setPlanFr(clients);
                setPlanFrNum(clientsNum);
                dispatch(setPlanFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPlanFr(false));
                }, 100)
            })
            .catch(err => console.log(err));

        getMyClients('zoom', 'leader_expert', manager)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setZoomFr(clients);
                setZoomFrNum(clientsNum);
                dispatch(setZoomFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadZoomFr(false));
                }, 100)
            })
            .catch(err => console.log(err))

        getMyClients('anketa', 'leader_expert', manager)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setAnketaFr(clients);
                setAnketaFrNum(clientsNum);
                dispatch(setAnketaFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadAnketaFr(false));
                }, 100)
            })
            .catch(err => console.log(err))

        getMyClients('contract', 'leader_expert', manager)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                console.log(res)
                setContractFr(clients);
                setContractFrNum(clientsNum);
                dispatch(setСontractFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadContractFr(false));
                }, 100)
            })
            .catch(err => console.log(err))

        getMyClients('prepaid', 'leader_expert', manager)
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                setPrepaidFr(clients);
                setPrepaidFrNum(clientsNum);
                dispatch(setPrepaidFrNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPrepaidFr(false));
                }, 100)
            })
            .catch(err => console.log(err))
    }, [manager]);




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
                sortAll={sortAll}
            />}
            {/* {activeTab == 1 && <Planer />} */}
            {/* {activeTab == 1 && planerLoader && <PlanerSceleton load={planerLoad} />} */}
        </div>
    )
};

export default ClientsFrAll;