import s from './ClientsTable.module.scss';
import { ReactComponent as IconTop } from '../../image/clients/iconChewron.svg';
//components
import ClientItemAllLeader from './ClientItem/ClientItemAllLeader';
import { useEffect, useState, useRef } from 'react';

const ClientsTableLeader = ({ clients, activeTab, activeTabList, type }) => {
    const [startCursor, setStartCursor] = useState(0);
    const [endCursor, setEndCursor] = useState(50);
    const listRef = useRef();
    const timerDebounceRef = useRef();
    const [sortClients, setSortClients] = useState(clients);
    console.log(activeTabList, type)

    useEffect(() => {
        const clientSort = [...clients];

        clientSort.sort(function (a, b) {
            const callRequestA = a.last_comment?.auto_important;
            const callRequestB = b.last_comment?.auto_important;

            if (callRequestB > callRequestA) {
                return 1
            }

            if (callRequestB < callRequestA) {
                return -1
            }
        })


        clientSort.sort(function (a, b) {
            if (a.events_call < b.events_call) {
                return 1
            }

            if (a.events_call > b.events_call) {
                return -1
            }
        })


        type == 'fr' ? setSortClients(clients) : setSortClients(clients);
    }, [clients, type])


    useEffect(() => {
        window.addEventListener('scroll', handleDebounceScroll);
        return () => window.removeEventListener('scroll', handleDebounceScroll)
    }, [])

    const scrollLoad = () => {
        const loadBottom = listRef.current.getBoundingClientRect().bottom - window.innerHeight < 600;
        const loadTop = window.innerHeight - listRef.current.getBoundingClientRect().top < 800;
        loadBottom && setEndCursor(prevState => prevState + 50)
        loadTop && setEndCursor(50);

    }

    function handleDebounceScroll() {
        if (timerDebounceRef.current) {
            clearTimeout(timerDebounceRef.current);
        }

        timerDebounceRef.current = setTimeout(() => {
            scrollLoad()
        }, 200);
    }

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <>
            <div className={s.table}>
                <div className={s.header}>
                    <div className={`${s.empty} ${s.empty_all}`}></div>
                    <div className={s.data}>
                        <p>Дата</p>
                    </div>
                    <div className={`${s.client} ${s.client_all}`}>
                        <p>Клиент</p>
                    </div>
                    <div className={s.stage}>
                        <p>Зашел в ЛК</p>
                    </div>
                    <div className={s.stage}>
                        <p>Материалы</p>
                    </div>

                    <div className={s.stage2}>
                        <p>Сформирован БП</p>
                    </div>

                    <div className={s.stage2}>
                        <p>Просмотрен БП</p>
                    </div>

                    <div className={s.task_all}>
                        <p>Задача</p>
                    </div>
                    <div className={s.stage}>
                        <p>Коммуникация</p>
                    </div>
{/* 
                    <div className={`${s.comment} ${s.comment_small2}`}>
                        <p>Комментарий</p>
                    </div> */}

                    <div className={s.expert}>
                        <p>Консультант</p>
                    </div>

                    <div className={`${s.source} ${s.source_open}`}>
                            <p>Источник</p>
                        </div>
                        

                    <div className={s.stage2}>
                        <p>Отказ</p>
                    </div>

                </div>


                <ul ref={listRef} className={s.list}>
                    {clients.slice(0, endCursor).map(el => {
                        return <ClientItemAllLeader key={el.id} id={el.id} client={el} clients={clients} activeTab={activeTab} activeTabList={activeTabList} type={type} />
                    })}
                </ul>
            </div>

            <button onClick={handleScrollTop} className={`${s.button_scroll} ${endCursor > 55 && s.button_scroll_vis}`}><IconTop /></button>
        </>
    )
};

export default ClientsTableLeader;