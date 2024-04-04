import { useState, useEffect, useRef } from 'react';
import s from './DateCalendar.module.scss';
import './DateCalendar.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { setDateCalendar } from '../dates';

export default function Calendar({ value, setValue, setOpenCalendar, setDateIcon, dark, setActivePoint, type }) {
    const [anim, setAnim] = useState(false);
    const maxDate = setDateCalendar(3);
    const minDate = setDateCalendar(30);
    const currentDate = setDateCalendar(0);
    const dateActive = dayjs(value);
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        })
    }, []);


    const theme = createTheme({
        typography: {
            fontFamily: 'Inter, sans-serif',
        }
    })


    function onChange(date) {
      
        if (currentDate === date.format('YYYY-MM-DD') &&  type !== 'shedule') {
            setValue(date.format('YYYY-MM-DD'));
            setAnim(false)
            setTimeout(() => {
                setOpenCalendar(false);
                setActivePoint(0);
            }, 200)
            
            return

        }

        if (setDateCalendar(1) === date.format('YYYY-MM-DD') &&  type !== 'shedule') {
            setValue(date.format('YYYY-MM-DD'));
            setAnim(false)
            setTimeout(() => {
                setOpenCalendar(false);
                setActivePoint(1);
            }, 200)
           
            return

        }

        if (setDateCalendar(2) === date.format('YYYY-MM-DD') &&  type !== 'shedule') {
            setValue(date.format('YYYY-MM-DD'));
            setAnim(false)
            setTimeout(() => {
                setOpenCalendar(false);
                setActivePoint(2);
            }, 200)
            
            return

        }


        if (currentDate !== date.format('YYYY-MM-DD') && setDateCalendar(1) !== date.format('YYYY-MM-DD') && setDateCalendar(2) !== date.format('YYYY-MM-DD')) {
            setValue(date.format('YYYY-MM-DD'));
            setDateIcon(date.format('DD.MM'));
            setAnim(false)
            setTimeout(() => {
                setOpenCalendar(false);
                type !== 'shedule' && setActivePoint(3);
            }, 200)
            
            return
        }


    };

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setAnim(false);

            setTimeout(() => {
                setOpenCalendar(false)
            }, 200)
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);
    return (
        <div ref={modalRef} className={`${type == 'shedule' ? s.calendar_shedule : s.calendar} ${dark && `calendar_dark`} ${anim && s.calendar_anim}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={theme}>
                    <DateCalendar value={dateActive} onChange={onChange} views={['day']} maxDate={dayjs(currentDate)} minDate={dayjs(minDate)} reduceAnimations={true} />
                </ThemeProvider>
            </LocalizationProvider>
        </div>

    );
}