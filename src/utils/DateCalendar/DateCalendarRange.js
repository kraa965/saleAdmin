import { useState, useEffect, useRef } from 'react';
import s from './DateCalendar.module.scss';
import './DateCalendar.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers-pro'; 
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { DateRangeCalendar } from '@mui/x-date-pickers-pro/DateRangeCalendar';
import { setDateCalendar } from '../dates';


function DateCalendarRange({ value, setValue, setOpenCalendar, setDateIcon, dark, type, setDateStartRange, setDateEndRange }) {
    const [anim, setAnim] = useState(false);
    const maxDate = setDateCalendar(3);
    const minDate = setDateCalendar(30);
    const currentDate = setDateCalendar(0);
    /* const dateActive = dayjs(value); */
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

        setValue(date)
        setDateStartRange(date[0].format('YYYY-MM-DD'))
        if (date[1] !== null) {
            setDateEndRange(date[1].format('YYYY-MM-DD'))
        }



        /*   setAnim(false)
          setTimeout(() => {
              setOpenCalendar(false);
          }, 200)
  
   */

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

        <div ref={modalRef} className={`${s.calendar_shedule} ${dark && s.calendar_shedule_dark} ${dark && `calendar_dark`} ${anim && s.calendar_anim}`}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                <ThemeProvider theme={theme}>
                    <DateRangeCalendar value={value} onChange={onChange} views={['day']} reduceAnimations={true} />
                </ThemeProvider>
            </LocalizationProvider>
        </div>
    );
}

export default DateCalendarRange;