import s from './CalendarMonth.module.scss';
import { ReactComponent as IconCalendar } from '../../image/iconCalendar.svg';
import { ReactComponent as ArrowLeft } from '../../image/arrowLeft.svg';
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

function CalendarMonth({ loader, type }) {
    const [month, setMonth] = useState(type ==='shedule' ? 12 : 0);
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
    console.log(date, month)
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
        dispatch(setDateMonth(''));
        const date = setDateForCalendarMonth(month);
        if(month < 12) {
            setDate(date)
        } else {
            setDate({})  
        }
       
    },[month])


    useEffect(() => {
        dispatch(setDateMonth(date.date));
        dispatch(setDayMonth(date.dayInMonth));
        dispatch(setNameMonth(date.month));
        dispatch(setNameMonth2(date.month2));
        dispatch(setMonthIndex(month));
        dispatch(setDay(date.day));
    }, [date])

    function handleChangeMonth(e) {
        const id = e.currentTarget.id;

        if(!loader && month === 12) {
            if (id === 'left') {
                setMonth(-1)
            } else {
                setMonth(0)
            }
            return 
        }

        if(!loader && month === -1 && type ==='shedule') {
            if (id === 'left') {
                setMonth(-2)
            } else {
                setMonth(12)
            }
            return 
        }

        if(!loader && month === 0 && type ==='shedule') {
            if (id === 'left') {
                setMonth(12)
            } else {
                setMonth(1)
            }
            return 
        }

        if (!loader && month < 12) {
            if (id === 'left') {
                setMonth(month - 1)
            } else {
                setMonth(month + 1)
            }
            return
        }

    }



    return (
        <div className={`${s.month} ${dark && s.month_dark}`}>
            <div onClick={handleChangeMonth} id='left' className={`${s.left} ${dark && s.left_dark}`}>
                <ArrowLeft />
            </div>
            <div className={`${s.center} ${dark && s.center_dark}`}>
                <IconCalendar />
                <p>{month == 12 ? '2 недели' : date.month}</p>
            </div>

            <div onClick={handleChangeMonth} id='right' className={`${s.right} ${dark && s.right_dark} ${month >= 0 && type !=='shedule' && s.right_dis}`}>
                <ArrowLeft />
            </div>
        </div>
    )
};

export default CalendarMonth;