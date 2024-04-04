import s from './SheduleWork.module.scss';
import { ReactComponent as IconEmployee } from '../../image/iconEmployee.svg';
import { ReactComponent as IconCalendarSmall2 } from '../../image/iconCalendarSmall2.svg';
import { ReactComponent as IconLevelsmall } from '../../image/iconLevelsmall.svg';
import { useEffect, useRef, useState } from 'react';
import Cells from '../Cells/Cells';
import avatarDef from '../../image/avatarDef.png';
import { setDayOfWeek } from '../../utils/dates';
import { setDateCalendar } from '../../utils/dates';
import SheduleManager from './SheduleManager';
import Loader from '../Loader/Loader';

function SheduleWork({ dark, shedule, date, loader, update, sheduleTwoWeek, range }) {
    const [delta, setDelta] = useState(0)
    const graphRef = useRef();
    const headerRef = useRef();
    const windowRef = useRef();
    const todayRef = useRef();
    const [anim, setAnim] = useState(false);
    const todayDate = setDateCalendar(0);
    const yesterdayDate = setDateCalendar(1);
    const tomorrowDate = setDateCalendar(-1);

    useEffect(() => {
        setAnim(true);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            if (shedule && date.day && date.dayStartNum && (date.monthIndex === 12)) {
                windowRef?.current?.scrollTo({
                    left: (date.day - date.dayStartNum - 2) * 173,
                    top: 0,
                    behavior: "smooth",
                })
            } else {
                windowRef?.current?.scrollTo({
                    left: 0,
                    top: 0,
                    behavior: "smooth",
                })
            }
        }, 200)

    }, [date])

    useEffect(() => {
        graphRef.current && graphRef.current.addEventListener('wheel', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const delta = event.wheelDelta;
            windowRef.current.scrollLeft += delta > 0 ? 58.5 : -58.5;

        })

        windowRef.current && windowRef.current.addEventListener('scroll', function (event) {
            event.preventDefault();
            event.stopPropagation();
            headerRef.current.scrollLeft = windowRef.current.scrollLeft;
            /*  windowRef.current.scrollLeft = headerRef.current.scrollLeft; */
        })

    }, [graphRef, windowRef])

    return (
        <div className={`${s.workshedule} ${anim && s.workshedule_anim} ${dark && s.workshedule_dark}`}>
            <div className={s.employes}>
                <div className={`${s.header_employes} ${dark && s.header_employes_dark}`}>
                    <p className={`${s.text_sub} ${dark && s.text_sub_dark}`}>Сотрудник</p>
                </div>
                <div className={`${s.list} ${dark && s.list_dark}`}>
                    {shedule?.managers?.map((el) => {
                        return el.manager.surname !== 'Шуляк' && <SheduleManager key={el.manager.id} el={el} update={update} date={date} sheduleTwoWeek={sheduleTwoWeek} range={range} />
                    })}
                </div>
            </div>

            <div ref={graphRef} className={s.graph}>
                <div ref={headerRef} className={`${s.header_graph} ${dark && s.header_graph_dark}`}>

                    {shedule?.dates?.map((el, index) => {
                        const numWorkManager = shedule?.managers.filter((item) => item.items[el].is_work === 1)
                        return <div ref={el === todayDate ? todayRef : null} key={el} className={s.sub}>
                          
                            <p className={`${s.text_sub} ${el === todayDate && s.text_sub_active} ${dark && el !== todayDate && s.text_sub_dark} ${dark && el === todayDate && s.text_sub_active_dark}`}>
                                {el === todayDate && 'Сегодня'}
                                {el === yesterdayDate && 'Вчера'}
                                {el === tomorrowDate && 'Завтра'}
                                {el !== todayDate && el !== yesterdayDate && el !== tomorrowDate && setDayOfWeek(el).fDay}
                                <sup>{setDayOfWeek(el).day}</sup></p>
                            <div><IconEmployee /><p className={`${s.text_sub} ${dark && s.text_sub_dark}`}>{numWorkManager.length}</p></div>
                        </div>
                    })}

                </div>

                <div ref={windowRef} className={`${s.window} ${dark && s.window_dark}`}>
                    {shedule?.managers?.map((el) => {
                        return el.manager.surname !== 'Шуляк' && <Cells key={el.manager.id} events={shedule?.events} id={el.manager.id} loader={loader} num={el} arr={shedule?.dates} managersShedule={el.items} dark={dark} manager={el.manager} />
                    })}
                </div>

            </div>
        </div>
    )
};

export default SheduleWork;