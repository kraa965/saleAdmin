import s from './ClientsTable.module.scss';
import { ReactComponent as IconTop } from '../../image/clients/iconChewron.svg';
//components
import ClientItem from './ClientItem/ClientItem';
import ClientItemAll from './ClientItem/ClientItemAll';
import { useEffect, useState, useRef } from 'react';

const ClientsTable = ({ clients, activeTab, activeTabList, type }) => {
    const [startCursor, setStartCursor] = useState(0);
    const [endCursor, setEndCursor] = useState(50);
    const listRef = useRef();
    const timerDebounceRef = useRef();
    const [sortClients, setSortClients] = useState(clients);
    console.log(activeTabList, type)

    useEffect(() => {
        const clientSort = [...clients];

        clientSort.sort(function (a, b) {
            const callRequestA = a.partnership_client_logs.at(-1).auto_important;
            const callRequestB = b.partnership_client_logs.at(-1).auto_important;

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
                {type == 'fr' && activeTabList !== '8' ?
                    <div className={s.header}>
                        <div className={`${s.empty} ${s.empty_all}`}></div>
                        <div className={s.stage}>
                            <p>БП</p>
                        </div>
                        <div className={`${s.client} ${s.client_all}`}>
                            <p>Клиент</p>
                        </div>
                        <div className={s.stage}>
                            <p>Зум</p>
                        </div>
                        <div className={s.stage}>
                            <p>Анкета</p>
                        </div>
                        <div className={s.stage}>
                            <p>Договор</p>
                        </div>

                        <div className={s.stage}>
                            <p>Предоплата</p>
                        </div>

                        <div className={s.task_all}>
                            <p>Задача</p>
                        </div>
                        <div className={s.stage}>
                            <p>Коммуникация</p>
                        </div>

                        <div className={`${s.comment} ${s.comment_small2}`}>
                            <p>Комментарий</p>
                        </div>

                        <div className={s.expert}>
                            <p>Эксперт</p>
                        </div>

                        <div className={s.stage}>
                            <p>Отказ</p>
                        </div>

                    </div>

                    :

                    <div className={s.header}>
                        <div className={s.empty}></div>
                        <div className={s.client}>
                            <p>Клиент</p>
                        </div>
                        <div className={s.task}>
                            <p>Задача</p>
                        </div>
                        <div className={s.task}>
                            <p>Коммуникация</p>
                        </div>
                        <div className={s.step}>
                            <p>Шаг</p>
                        </div>
                        {activeTabList == 8 && type == 'fr' && <div className={`${s.comment} ${s.comment_small}`}>
                            <p>Комментарий</p>
                        </div>
                        }

                        {activeTabList == 8 && type == 'fr' && <div className={`${s.source} ${s.source_open}`}>
                            <p>Источник</p>
                        </div>
                        }

                        <div className={s.favorite}></div>
                    </div>
                }

                <ul ref={listRef} className={s.list}>
                    {sortClients.slice(0, endCursor).map(el => {
                        return (type == 'fr' && activeTabList !== '8') ?
                            <ClientItemAll key={el.id} id={el.id} client={el} clients={clients} activeTab={activeTab} activeTabList={activeTabList} type={type} />
                            :
                            <ClientItem key={el.id} id={el.id} client={el} clients={clients} activeTab={activeTab} activeTabList={activeTabList} type={type} />
                    })}
                </ul>
            </div>

            <button onClick={handleScrollTop} className={`${s.button_scroll} ${endCursor > 55 && s.button_scroll_vis}`}><IconTop /></button>
        </>
    )
};

export default ClientsTable;