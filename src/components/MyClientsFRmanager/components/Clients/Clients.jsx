import s from './Clients.module.scss';
import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//components
import ClientsList from '../ClientsList/ClientsList';
import Planer from '../Planer/Planer';
//API
import { getMyClients, getPlaner } from '../../Api/Api';
//slice
import {
    setClientsToday,
    setClientsNum,
    setClientsNewNum,
    setTodayNextPage,
    setNewNextPage,
    setClientsNew,
    setClientsNoTask,
    setClientsArchive,
    setPlanMeeting,
    setZoom,
    setAnketa,
    setContract,
    setPrepaid,
    setFavorite,
    setLoadToday,
    setLoadNew,
    setLoadNoTask,
    setLoadArchive,
    setLoadPlanMeeting,
    setLoadZoom,
    setLoadAnketa,
    setLoadContract,
    setLoadPrepaid,
    setLoadFavorite,
    setPlanNum,
    setPlanNextPage,
} from '../../store/reducer/MyClients/slice';

//selector
import { selectorClient } from '../../../FrClientWork/store/reducer/Client/selector';

const Clients = () => {
    const clientUpdate = useSelector(selectorClient).clientUpdate;
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const [activeTab, setActiveTab] = useState(2);
    const [planer, setPlaner] = useState({});
    const [planerLoader, setPlanerLoader] = useState(false);
    const [planerLoad, setPlanerLoad] = useState(true);
    const dispatch = useDispatch();
    //получение списка моих клиентов

    useMemo(() => {
        getMyClients('today', 'default')
            .then(res => {
                console.log(res)
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                /* const newClients = [...clients];
                newClients.sort(function (a, b) {
                    const dateA = new Date(a?.next_connect);
                    const dateB = new Date(b?.next_connect);
                    if (dateA > dateB) {
                        return 1
                    }

                    if (dateA < dateB) {
                        return -1
                    }
                }) */
                dispatch(setClientsToday(clients));
                dispatch(setClientsNum(clientsNum));
                dispatch(setTodayNextPage(res.data.data.next_page_url))
                dispatch(setLoadToday());
            })
            .catch(err => console.log(err))

        getMyClients('new', 'leader_expert')
            .then(res => {
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                dispatch(setClientsNew(clients));
                dispatch(setClientsNewNum(clientsNum));
                dispatch(setNewNextPage(res.data.data.next_page_url))
                dispatch(setLoadNew(false));
            })
            .catch(err => console.log(err));

    }, []);

    useEffect(() => {
        getMyClients('favorite', 'default')
            .then(res => {
                const clients = res.data.data.data
                dispatch(setFavorite(clients));
                setTimeout(() => {
                    dispatch(setLoadFavorite());
                }, 100)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        getMyClients('no_tasks', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setClientsNoTask(clients));
                setTimeout(() => {
                    dispatch(setLoadNoTask(false));
                })
            })
            .catch(err => console.log(err))

        getMyClients('archive', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setClientsArchive(clients));
                setTimeout(() => {
                    dispatch(setLoadArchive());
                })
            })
            .catch(err => console.log(err))

        getMyClients('plan_meeting', 'default')
            .then(res => {
                console.log('планирование ')
                const clients = res.data.data.data;
                const clientsNum = res.data.data.total;
                dispatch(setPlanMeeting(clients));
                dispatch(setPlanNum(clientsNum));
                dispatch(setPlanNextPage(res.data.data.next_page_url))
                setTimeout(() => {
                    dispatch(setLoadPlanMeeting());
                })
            })
            .catch(err => console.log(err));

        getMyClients('zoom', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setZoom(clients));
                dispatch(setLoadZoom());
                setTimeout(() => {
                    dispatch(setLoadZoom());
                })
            })
            .catch(err => console.log(err))

        getMyClients('anketa', 'default')
            .then(res => {
                const clients = res.data.data.data;
                console.log(clients)
                dispatch(setAnketa(clients));
                setTimeout(() => {
                    dispatch(setLoadAnketa());
                })
            })
            .catch(err => console.log(err))

        getMyClients('contract', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setContract(clients));
                setTimeout(() => {
                    dispatch(setLoadContract());
                })
            })
            .catch(err => console.log(err))

        getMyClients('prepaid', 'default')
            .then(res => {
                const clients = res.data.data.data;
                dispatch(setPrepaid(clients));
                setTimeout(() => {
                    dispatch(setLoadPrepaid());
                })
            })
            .catch(err => console.log(err))
    }, []);


    //Лоадер инфо о клиенте
    /*  useEffect(() => {
         if (!loadPage && !loadClient) {
             setLoadVisible(false)
             setTimeout(() => {
                 setLoadClose(false)
             }, 150)
         } else {
             setLoadClose(true)
         }
     }, [loadPage, loadClient]) */

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

    //Получение данных планера
    useEffect(() => {
        setPlanerLoad(true)
        getPlaner()
            .then(res => {
                const data = res.data;
                console.log('Планер', res)
                setPlaner(data);
                setTimeout(() => {
                    setPlanerLoad(false)
                }, 100)
            })
            .catch(err => console.log(err))
    }, [clientUpdate]);

    useEffect(() => {
        planerLoad ? setPlanerLoader(true) : setTimeout(() => {
            setPlanerLoader(false)
        }/* , 150 */)
    }, [planerLoad])

    const handleActiveTab = (e) => {
        const id = e.currentTarget.id;
        setActiveTab(id)
    }

    return (
        <div className={`${s.clients} ${anim && s.clients_anim}`}>
            <div className={s.header}>
                <h2 className={s.title}>Мои клиенты</h2>
                <div className={s.tabs}>
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
            {(activeTab == 2 || activeTab == 3) && <ClientsList activeTab={activeTab} />}
            {activeTab == 1 && <Planer planerLoad={planerLoad} planer={planer} />}

        </div>
    )
};

export default Clients;