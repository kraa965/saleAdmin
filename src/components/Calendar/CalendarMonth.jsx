import s from './CalendarMonth.module.scss';
import {ReactComponent as IconCalendar} from '../../image/iconCalendar.svg';
import {ReactComponent as ArrowLeft} from '../../image/arrowLeft.svg';
import { setDateForCalendarMonth } from '../../utils/dates';
import { useEffect, useState } from 'react';
import { setDateMonth } from '../../store/reducer/sales/slice';
import { setDayMonth } from '../../store/reducer/sales/slice';
import { setNameMonth } from '../../store/reducer/sales/slice';
import { setNameMonth2 } from '../../store/reducer/sales/slice';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { setMonthIndex } from '../../store/reducer/sales/slice';
import { setDay } from '../../store/reducer/sales/slice';

function CalendarMonth() {
    const [month, setMonth] = useState(0);
    const dispatch = useDispatch();
    const date = setDateForCalendarMonth(month);
    const dark = useSelector(menuSelector).dark;
    console.log(month)
    useEffect(() => {
        dispatch(setDateMonth(date.date));
        dispatch(setDayMonth(date.dayInMonth));
        dispatch(setNameMonth(date.month));
        dispatch(setNameMonth2(date.month2));
        dispatch(setMonthIndex(month));
        dispatch(setDay(date.day));
    },[month])

    function handleChangeMonth(e) {
        const id = e.currentTarget.id;
        if(id === 'left') {
            setMonth(month - 1)
        } else {
            setMonth(month + 1)
        }
    }

    
   
    return (
        <div className={`${s.month} ${dark && s.month_dark}`}>
            <div onClick={handleChangeMonth} id='left' className={`${s.left} ${dark && s.left_dark}`}>
                <ArrowLeft/>
            </div>
            <div className={`${s.center} ${dark && s.center_dark}`}>
                <IconCalendar/>
                <p>{date.month}</p>
            </div>

            <div onClick={handleChangeMonth} id='right' className={`${s.right} ${dark && s.right_dark} ${month >= 0  && s.right_dis}`}>
                <ArrowLeft/>
            </div>
        </div>
    )
};

export default CalendarMonth;