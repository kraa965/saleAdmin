import s from './Clients.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import ClientsListFrLeader from '../ClientsList/ClientsListFrLeader';
//API
import { getMyClientsLeader } from '../../Api/Api';
//slice

//utils
import { handleEndDayMonth } from '../../utils/dates';

const ClientsFrLeader = () => {
    const [firstLoad, setFirstLoad] = useState(true)
    const [anim, setAnim] = useState(false);
    const [activeTab, setActiveTab] = useState(2);
    const [db, setDb] = useState(JSON.parse(localStorage.getItem('addDb')) || []);
    const [dbNum, setDbNum] = useState(JSON.parse(localStorage.getItem('addDbNum')) || []);
    const [dbNextPage, setDbNextPage] = useState('');
    const [loadDb, setLoadDb] = useState(true);

    const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')) || []);
    const [loginNum, setLoginNum] = useState(JSON.parse(localStorage.getItem('loginNum')) || []);
    const [loginNextPage, setLoginNextPage] = useState('');
    const [loadLogin, setLoadLogin] = useState(true);

    const [lookContent, setLookContent] = useState(JSON.parse(localStorage.getItem('lookContent')) || []);
    const [lookContentNum, setLookContentnNum] = useState(JSON.parse(localStorage.getItem('lookContentNum')) || []);
    const [lookContentNextPage, setLookContentNextPage] = useState('');
    const [loadLookContent, setLoadLookContent] = useState(true);

    const [openPlan, setOpenPlan] = useState(JSON.parse(localStorage.getItem('openPlan')) || []);
    const [openPlanNum, setOpenPlanNum] = useState(JSON.parse(localStorage.getItem('openPlanNum')) || []);
    const [openPlanNextPage, setOpenPlanNextPage] = useState('');
    const [loadOpenPlan, setLoadOpenPlan] = useState(true);

    const [plan, setPlan] = useState(JSON.parse(localStorage.getItem('plan')) || []);
    const [planNum, setPlanNum] = useState(JSON.parse(localStorage.getItem('planNum')) || []);
    const [planNextPage, setPlanNextPage] = useState('');
    const [loadPlan, setLoadPlan] = useState(true);
    const [manager, setManager] = useState(0);
    const [sortAll, setSortAll] = useState('date');
    const [rejectFilter, setRejectFilter] = useState(localStorage.getItem('filterReject') || 0);
    const [date, setDate] = useState(JSON.parse(localStorage.getItem('dateSort')) || '');
    /*   const [planerLoader, setPlanerLoader] = useState(false); */
    /*    const planerLoad = useSelector(selectorPlaner).planerLoad; */
    const dispatch = useDispatch();
    console.log(rejectFilter)

    useEffect(() => {

        setTimeout(() => {
            setFirstLoad(false)
        }, 150)

    }, []);

    //получение списка моих клиентов
    useEffect(() => {
        (db.length == 0 || !firstLoad) ? setLoadDb(true) : setLoadDb(false);
        (login.length == 0 || !firstLoad) ? setLoadLogin(true) : setLoadLogin(false);
        (lookContent.length == 0 || !firstLoad) ? setLoadLookContent(true) : setLoadLookContent(false);
        (openPlan.length == 0 || !firstLoad) ? setLoadOpenPlan(true) : setLoadOpenPlan(false);
        (plan.length == 0 || !firstLoad) ? setLoadPlan(true) : setLoadPlan(false);

        if (!firstLoad) {
            setDb([]);
            setDbNum('');
            setLogin([]);
            setLoginNum('');
            setLookContent([]);
            setLookContentnNum('');
            setOpenPlan([]);
            setOpenPlanNum('');
            setPlan([]);
            setPlanNum('');
        }

        getMyClientsLeader('add_db', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('addDb', JSON.stringify(clients.slice(0, 50)))
                    localStorage.setItem('addDbNum', JSON.stringify(clientsNum))
                } catch (e) {
                    localStorage.removeItem('addDb')
                }


                setDb(clients);
                setDbNum(clientsNum);
                setDbNextPage(res.data.data.next_page_url)
                setTimeout(() => {
                    setLoadDb(false);
                }, 50)


            })
            .catch(err => console.log(err))

        getMyClientsLeader('login', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('login', JSON.stringify(clients.slice(0, 50)))
                    localStorage.setItem('loginNum', JSON.stringify(clientsNum))
                } catch (e) {
                    localStorage.removeItem('login')
                }
                setLogin(clients);
                setLoginNum(clientsNum);
                setLoginNextPage(res.data.data.next_page_url)
                setTimeout(() => {
                    setLoadLogin(false);
                }, 50)


            })
            .catch(err => console.log(err))

        getMyClientsLeader('look_content', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('lookContent', JSON.stringify(clients.slice(0, 50)))
                    localStorage.setItem('lookContentNum', JSON.stringify(clientsNum))
                } catch (e) {
                    localStorage.removeItem('lookContent')
                }
                setLookContent(clients);
                setLookContentnNum(clientsNum);
                setLookContentNextPage(res.data.data.next_page_url)
                setTimeout(() => {
                    setLoadLookContent(false);
                }, 50)


            })
            .catch(err => console.log(err))

        getMyClientsLeader('open_plan', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('openPlan', JSON.stringify(clients.slice(0, 50)))
                    localStorage.setItem('openPlanNum', JSON.stringify(clientsNum))
                } catch (e) {
                    localStorage.removeItem('openPlan')
                }
                setOpenPlan(clients);
                setOpenPlanNum(clientsNum);
                setOpenPlanNextPage(res.data.data.next_page_url)
                setTimeout(() => {
                    setLoadOpenPlan(false);
                }, 50)
            })
            .catch(err => console.log(err))

        getMyClientsLeader('plan', 'leader', manager, date, handleEndDayMonth(date), sortAll, rejectFilter)
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                try {
                    localStorage.setItem('plan', JSON.stringify(clients.slice(0, 50)))
                    localStorage.setItem('planNum', JSON.stringify(clientsNum))
                } catch (e) {
                    localStorage.removeItem('plan')
                }
                setPlan(clients);
                setPlanNum(clientsNum);
                setPlanNextPage(res.data.data.next_page_url)
                setTimeout(() => {
                    setLoadPlan(false);
                }, 50)
            })
            .catch(err => console.log(err))

    }, [manager, date, rejectFilter]);



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
            {(activeTab == 2 || activeTab == 3) && <ClientsListFrLeader activeTab={activeTab} db={db} setDb={setDb} dbNum={dbNum} dbNextPage={dbNextPage} setDbNextPage={setDbNextPage} loadDb={loadDb}
                login={login} setLogin={setLogin} loginNum={loginNum} loginNextPage={loginNextPage} setLoginNextPage={setLoginNextPage} loadLogin={loadLogin} lookContent={lookContent} setLookContent={setLookContent}
                lookContentNum={lookContentNum} lookContentNextPage={lookContentNextPage} setLookContentNextPage={setLookContentNextPage} loadLookContent={loadLookContent} openPlan={openPlan} setOpenPlan={setOpenPlan}
                openPlanNum={openPlanNum} openPlanNextPage={openPlanNextPage} setOpenPlanNextPage={setOpenPlanNextPage} loadOpenPlan={loadOpenPlan} plan={plan} setPlan={setPlan} planNum={planNum} planNextPage={planNextPage}
                setPlanNextPage={setPlanNextPage} loadPlan={loadPlan} setRejectFilter={setRejectFilter} rejectFilter={rejectFilter} setDate={setDate} sortAll={sortAll} manager={manager} setManager={setManager}/>}
        </div>
    )
};

export default ClientsFrLeader;