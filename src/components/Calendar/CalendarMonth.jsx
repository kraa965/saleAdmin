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
import { setDay, setDayStart, setDayEnd, setDayStartNum } from '../../store/reducer/sales/slice';

function CalendarMonth({ loader, type, disCalendar, setDisCalendar, setDateStartDefault, setDateEndDefault, handleOpenCalendar, range, setRange, setValue, rangeText }) {
    const [month, setMonth] = useState(type === 'shedule' ? 12 : 0);
    const [date, setDate] = useState('');
    const [date2, setDate2] = useState('');
    const dispatch = useDispatch();
    const dark = useSelector(menuSelector).dark;
    const forward = date.day > 24 ? true : false;
    console.log(month)
    useEffect(() => {
        dispatch(setDateMonth(''));
        const date = setDateForCalendarMonth(month);
        setDate(date)
    }, [month])


    useEffect(() => {
        dispatch(setDateMonth(date.date));
        dispatch(setDayMonth(date.dayInMonth));
        dispatch(setNameMonth(date.month));
        dispatch(setNameMonth2(date.month2));
        dispatch(setMonthIndex(month));
        dispatch(setDay(date.day));
        dispatch(setDayStart(date.dateStart));
        dispatch(setDayEnd(date.dateEnd));
        dispatch(setDayStartNum(date.dateStartNum));

        if (month === 12) {
            setDateStartDefault(date.dateStartDefault);
            setDateEndDefault(date.dateEndDefault);
        }

    }, [date]);

    useEffect(() => {
        if (!loader && month === 12 && type === 'reprot') {
            setMonth(0)
        }
    }, [type])

    function handleChangeMonth(e) {
        const id = e.currentTarget.id;
        type === 'shedule' && setRange(false);
        type === 'shedule' && setValue([null, null]);
        if ((month === 12 || range) && !forward) {
            if (id === 'left') {
                setMonth(-1)
            } else {
                setMonth(0)
            }
            return
        }

        if (!loader && (month === -1 || range) && !forward && type === 'shedule') {
            setDisCalendar(true)
            if (id === 'left') {
                setMonth(-2)
            } else {
                setMonth(12)
            }
            return
        }


        if (!loader && (month === 0 || range) && !forward && type === 'shedule') {
            setDisCalendar(true)
            if (id === 'left') {
                setMonth(12)
            } else {
                setMonth(1)
            }
            return
        }


        //forward
        if ((month === 12 || range) && forward) {
            if (id === 'left') {
                setMonth(0)
            } else {
                setMonth(1)
            }
            return
        }

        if (!loader && (month === 0 || range)&& forward && type === 'shedule') {
            setDisCalendar(true)
            if (id === 'left') {
                setMonth(-1)
            } else {
                setMonth(12)
            }
            return
        }


        if (!loader && (month === 1|| range) && forward && type === 'shedule') {
            setDisCalendar(true)
            if (id === 'left') {
                setMonth(12)
            } else {
                setMonth(2)
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
    console.log('дата календаря', date, month)

    return (
        <div className={`${s.month} ${dark && s.month_dark}`}>
            <div onClick={handleChangeMonth} id='left' className={`${s.left} ${dark && s.left_dark} ${disCalendar && s.dis}`}>
                <ArrowLeft />
            </div>
            <div onClick={handleOpenCalendar} className={`${s.center} ${dark && s.center_dark} ${type == 'shedule' && s.center_shedule}`}>
                <IconCalendar />
                {!range && <p>{month == 12 ? '2 недели' : date.month}</p>}
                {range && <p>{rangeText}</p>}
            </div>

            <div onClick={handleChangeMonth} id='right' className={`${s.right} ${dark && s.right_dark} ${disCalendar && s.dis} ${month >= 0 && type !== 'shedule' && type !== 'reprot' && s.dis}`}>
                <ArrowLeft />
            </div>
        </div>
    )
};

export default CalendarMonth;