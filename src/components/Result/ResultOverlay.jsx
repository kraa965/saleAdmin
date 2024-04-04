import s from './Result.module.scss';
import Result from './Result';
import { useState, useEffect } from 'react';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconCalendar } from '../../image/iconCalendar.svg';
import Calendar from '../../utils/DateCalendar/DateCalendar';
import { setDateDay } from '../../utils/dates';

function ResultOverlay() {
    const [activePoint, setActivePoint] = useState(0);
    const [date, setDate] = useState(setDateDay(activePoint));
    const [openCalendar, setOpenCalendar] = useState(false);
    const [dateIcon, setDateIcon] = useState('');
    const [anim, setAnim] = useState(false);
    const [loader, setLoader] = useState(false);
    const [managers, setManagers] = useState(true);
   
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
        setAnim(true);
        window.scrollTo(0, 0);
    }, []);

    function handleActivePoint(e) {
        const id = Number(e.currentTarget.id);
        setActivePoint(id);
    }

    useEffect(() => {
        if(activePoint === 3) {
            
        } else {
            setOpenCalendar(false)
            setDate(setDateDay(activePoint));
            setDateIcon('')
        }
    }, [activePoint])

    function handleCalendar() {
        if(openCalendar) {
            setOpenCalendar(false);
        } else {
            setOpenCalendar(true);
            
        }     
    }

    function handleOpenManager() {
        if(managers) {
            setManagers(false)
        } else {
            setManagers(true)
        }
    }
    return (
        <div className={`${s.result} ${anim && s.anim}`}>
            <div className={s.header}>
                <p className={s.title}>Результаты дня</p>
                <div className={`${s.switch} ${dark && s.switch_dark}`}>
                    <button onClick={handleCalendar} id='3' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 3 && s.button_active} ${activePoint === 3 && dark && s.button_active_dark}`}>
                        {dateIcon === '' ? <IconCalendar /> : <p>{dateIcon}</p>}
                    </button>
                    {openCalendar && <Calendar value={date} setValue={setDate} setOpenCalendar={setOpenCalendar} setDateIcon={setDateIcon} dark={dark} setActivePoint={setActivePoint}/>}
                    <button onClick={handleActivePoint} id='2' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 2 && s.button_active} ${activePoint === 2 && dark && s.button_active_dark}`}>Позавчера</button>
                    <button onClick={handleActivePoint} id='1' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 1 && s.button_active} ${activePoint === 1 && dark && s.button_active_dark}`}>Вчера</button>
                    <button onClick={handleActivePoint} id='0' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 0 && s.button_active} ${activePoint === 0 && dark && s.button_active_dark}`}>Сегодня</button>
                </div>

                <div className={`${s.switch}  ${s.switch_mob} ${dark && s.switch_dark}`}>
                    <button onClick={handleOpenManager}  className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${managers && s.button_active} ${managers && dark && s.button_active_dark}`}>Менеджеры</button>
                    <button onClick={handleOpenManager}  className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${!managers && s.button_active} ${!managers && dark && s.button_active_dark}`}>Сатистика</button>
                </div>
            </div>
            <Result date={date} activePoint={activePoint} setLoader={setLoader} loader={loader} managers={managers}/>
        </div>
    )
};

export default ResultOverlay;