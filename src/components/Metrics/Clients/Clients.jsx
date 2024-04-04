import s from './Clients.module.scss';
import GraphClient from '../../Graphs/GraphClients/GraphClients';
import { ReactComponent as IconChewron } from '../../../image/iconChewron.svg';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';
const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
const green = [20, 30, 45, 30, 25, 55, 90, 25, 54, 20, 30, 45, 30, 25, 55, 90, 25, 54, 74, 23, 43]
const blue = [30, 20, 65, 70, 15, 35, 60, 85, 34, 25, 30, 65, 20, 35, 85, 30, 75, 34, 44, 23, 53]
const consullist = ['Анна Шу', 'Фархат Мус', 'Матвей Неге', 'Анна Шу', 'Фархат Мус', 'Матвей Неге']
const expertList = ['Анна Шуляк', 'Фархат Муси', 'Матвей Негеев']

function Clients({ active }) {
    const [datGraph, setDataGraph] = useState([]);
    const [openListDate, setOpenListDate] = useState(false);
    const [openListManager, setOpenListManager] = useState(false);
    const [countListDate, setCountListDate] = useState(1);
    const [managerList, setManagerList] = useState('Общие показатели');
    const [anim, setAnim] = useState(false);
    const dark = useSelector(menuSelector).dark;
    const listRef = useRef();
    const managerRef = useRef();

    useEffect(() => {
        setAnim(true);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        let dataArr = [];
        day.forEach((el, index) => {
            dataArr.push({
                name: `пн ${el}`,
                uv: green[index],
                pv: blue[index],
                pl: 40,
            })
        })
        setDataGraph(dataArr)
    }, [])

    function handleOpenListDate() {
        if (openListDate) {
            setOpenListDate(false)
        } else {
            setOpenListDate(true)
        }
    }

    function handleOpenListManager() {
        if (openListManager) {
            setOpenListManager(false)
        } else {
            setOpenListManager(true)
        }
    }

    function handleChooseDate(e) {
        const id = Number(e.target.id);
        setCountListDate(id)
    }

    function handleChooseManager(e) {
        const value = e.target.textContent;
        setManagerList(value)
    }

    function closeModal(e) {
        e.stopPropagation()
        if(listRef.current && !listRef.current.contains(e.target)) {
            setOpenListDate(false);
        }
        if(managerRef.current && !managerRef.current.contains(e.target)) {
            setOpenListManager(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);


    return (
        <div className={`${s.clients} ${anim && s.clients_anim}`}>
            <div className={s.header}>
                <p className={s.title}>
                    {active === 2 && 'Шаги клиентов'}
                    {active === 3 && 'Работа с клиентами'}
                    {active === 4 && 'Сотрудники'}
                </p>
                <div className={s.container}>
                    <div ref={listRef} onClick={handleOpenListDate} className={`${s.date} ${dark && s.date_dark} ${openListDate && s.date_open}`}>
                        <p>
                            {countListDate === 1 && '3 недели'}
                            {countListDate === 3 && '3 месяца'}
                            {countListDate === 6 && '6 месяцев'}
                            {countListDate === 12 && '12 месяцев'}
                        </p>
                        <IconChewron />
                        <ul className={`${s.list} ${dark && s.list_dark} ${openListDate && s.list_open}`}>
                            <li onClick={handleChooseDate} id='1' className={`${countListDate === 1 && s.listactive} 
                                                                              ${countListDate === 1 && dark && s.listactive_dark}`}>3 недели</li>
                            <li onClick={handleChooseDate} id='3' className={`${countListDate === 3 && s.listactive}
                                                                              ${countListDate === 3 && dark && s.listactive_dark}`}>3 месяца</li>
                            <li onClick={handleChooseDate} id='6' className={`${countListDate === 6 && s.listactive}
                                                                              ${countListDate === 6 && dark && s.listactive_dark}`}>6 месяцев</li>
                            <li onClick={handleChooseDate} id='12' className={`${countListDate === 12 && s.listactive} 
                                                                               ${countListDate === 12 && dark && s.listactive_dark}`}>12 месяцев</li>
                        </ul>
                    </div>

                    {active !== 4 && <div ref={managerRef} onClick={handleOpenListManager} className={`${s.indicators} ${dark && s.indicators_dark} ${openListManager && s.indicators_open}`}>
                        <p>{managerList}</p>
                        <ul className={`${s.list}  ${dark && s.list_dark} ${s.list_manager} ${dark && s.list_manager_dark} ${openListManager && s.list_openm}`}>
                            <li onClick={handleChooseManager} id='1' className={`${managerList === 'Общие показатели' && !dark && s.listactive}  
                                                                                 ${managerList === 'Общие показатели' && dark && s.listactive_dark}
                                                                                `}>Общие показатели</li>
                            <li onClick={handleChooseManager} id='2' className={`${managerList === 'Только консультанты' && !dark && s.listactive}  
                                                                                 ${managerList === 'Только консультанты' && dark && s.listactive_dark}
                                                                                `}>Только консультанты</li>
                            <li onClick={handleChooseManager} id='3' className={`${managerList === 'Только эксперты' && !dark && s.listactive}  
                                                                                 ${managerList === 'Только эксперты' && dark && s.listactive_dark}
                                                                                `}>Только эксперты</li>
                            <p>Эксперты</p>
                            {expertList.map((el) => {
                                return  <li onClick={handleChooseManager} className={`${managerList === el && !dark && s.listactive} 
                                                                                      ${managerList === el && dark && s.listactive_dark}`}>{el}</li>
                            })}

                            <p>Бизнес консультанты</p>
                            {consullist.map((el) => {
                                return  <li onClick={handleChooseManager} className={`${managerList === el && !dark && s.listactive} 
                                ${managerList === el && dark && s.listactive_dark}`}>{el}</li>
                            })}
                        
                        </ul>
                        <IconChewron />
                    </div>
                    }
                </div>
            </div>
            {active === 2 && <div className={s.graphs}>
                <GraphClient data={datGraph} title={'Входы в личный кабинет'} ind1={{ name: 'Новые входы', num: 1777 }} ind2={{ name: 'Отправлено смс приглашений', num: 3245 }} />
                <GraphClient data={datGraph} title={'Открые бизнес-планы'} ind1={{ name: 'Открыто бизнес-планов', num: 1777 }} ind2={{ name: 'Сформировано бизнес-планов', num: 3245 }} />
                <GraphClient data={datGraph} title={'Zoom-встречи'} ind1={{ name: 'Состоявшиеся Zoom-встречи', num: 1777 }} ind2={{ name: 'Запланировано встреч', num: 3245 }} />
            </div>
            }

            {active === 3 && <div className={s.graphs}>
                <GraphClient data={datGraph} title={'Новые лиды в базе'} ind1={{ name: 'Новые входы', num: 1777 }} ind2={{ name: 'Отправлено смс приглашений', num: 3245 }} />
                <GraphClient data={datGraph} title={'Разговоры'} ind1={{ name: 'Открыто бизнес-планов', num: 1777 }} ind2={{ name: 'Сформировано бизнес-планов', num: 3245 }} />
                <GraphClient data={datGraph} title={'Дозвоны'} ind1={{ name: 'Состоявшиеся Zoom-встречи', num: 1777 }} ind2={{ name: 'Запланировано встреч', num: 3245 }} />
            </div>
            }

            {active === 4 && <div className={s.graphs}>
                <GraphClient data={datGraph} title={'Дневной штат бизнес-консультантов'} ind1={{ name: 'Новые входы', num: 1777 }} ind2={{ name: 'Отправлено смс приглашений', num: 3245 }} />
                <GraphClient data={datGraph} title={'Дневной штат экспертов'} ind1={{ name: 'Открыто бизнес-планов', num: 1777 }} ind2={{ name: 'Сформировано бизнес-планов', num: 3245 }} />
                <GraphClient data={datGraph} title={'Работающие по дням стажеры'} ind1={{ name: 'Состоявшиеся Zoom-встречи', num: 1777 }} ind2={{ name: 'Запланировано встреч', num: 3245 }} />
            </div>
            }
        </div>
    )
};
export default Clients;