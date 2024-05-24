import s from './Schedule.module.scss';
import CalendarMonth from '../Calendar/CalendarMonth';
import { setDateForCalendarMonth, handleRangeDate } from '../../utils/dates';
import { useState, useEffect } from 'react';
import SheduleWork from '../SheduleWork/SheduleWork';
import SheduleTable from '../SheduleTable/SheduleTable';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { getSchedule, getTimesheet } from '../../Api/Api';
import { salesSelector } from '../../store/reducer/sales/selector';
import { scheduleSelector } from '../../store/reducer/shedule/selector';
import DateCalendarRange from '../../utils/DateCalendar/DateCalendarRange';

function Shedule({ role }) {
    const [sheduleView, setSheduleView] = useState(JSON.parse(localStorage.getItem('sheduleView')) || true);
    const dark = useSelector(menuSelector).dark;
    const [anim, setAnim] = useState(false);
    const [shedule, setShedule] = useState({});
    const [table, setTable] = useState([]);
    const [sheduleTwoWeek, setSheduleTwoWeek] = useState({});
    const [disCalendar, setDisCalendar] = useState(false);
    const [loader, setLoader] = useState(false);
    const [dateStartDefault, setDateStartDefault] = useState('');
    const [dateEndDefault, setDateEndDefault] = useState('');
    const [dateStartRange, setDateStartRange] = useState('');
    const [dateEndRange, setDateEndRange] = useState('');
    const [openCalendar, setOpenCalendar] = useState(false);
    const [range, setRange] = useState(false);
    const [rangeText, setRangeText] = useState('');
    const [value, setValue] = useState([null, null]);
    const [dateIcon, setDateIcon] = useState('')
    const date = useSelector(salesSelector);
    const update = useSelector(scheduleSelector)?.update;

    useEffect(() => {
        setAnim(true);
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        !update && setLoader(true)
        if (date.dayStart && date.dayEnd && date.dayStart !== '' && date.dayEnd !== '' && !range) {
            getSchedule(date?.dayStart, date?.dayEnd)
                .then((res) => {
                    const data = res.data.data;
                    console.log(data)
                    setTimeout(() => {
                        setLoader(false)
                    })
                    setShedule(data);
                    setDisCalendar(false)
                })
                .catch(err => console.log(err));


            if (date?.monthIndex == 12 && dateStartDefault && dateEndDefault && dateStartDefault !== '' && dateEndDefault !== '' && !range) {
                getSchedule(dateStartDefault, dateEndDefault)
                    .then((res) => {
                        const data = res.data.data;
                        setSheduleTwoWeek(data);
                        setTimeout(() => {
                            setLoader(false)
                        })
                    })
                    .catch(err => console.log(err))
            } else {
                setSheduleTwoWeek({})
            }
        }

        if (range) {
            getSchedule(dateStartRange, dateEndRange)
                .then((res) => {
                    const data = res.data.data;
                    setShedule(data);
                    setTimeout(() => {
                        setLoader(false)
                    })
                })
                .catch(err => console.log(err))
        } else {
            setSheduleTwoWeek({})
        }

    }, [date.dayStart, date.dayEnd, dateStartDefault, dateEndDefault, update, range, dateEndRange, dateStartRange]);

    useEffect(() => {
        if (date.dateMonth) {
            getTimesheet(date.dateMonth)
                .then((res) => {
                    console.log(res)
                    const data = res.data.data;
                    setTable(data);
                })
                .catch(err => console.log(err))
        }
    }, [date.dateMonth, update])

    function handleSwitchView() {
        if (sheduleView) {
            setSheduleView(false);
            setValue([null, null])
            localStorage.setItem('sheduleView', JSON.stringify(false));
        } else {
            setSheduleView(true);
            localStorage.setItem('sheduleView', JSON.stringify(true));
        }
    }

    useEffect(() => {
        if (value[1] !== null) {
            setRangeText(`${handleRangeDate(dateStartRange)} - ${handleRangeDate(dateEndRange)}`)
            setRange(true);

        } else {
            setRange(false);
        }
    }, [value])

    function handleOpenCalendar() {
        if (openCalendar) {
            setOpenCalendar(false)
        } else {
            setOpenCalendar(true)
        }
    }
    return (
        <div className={`${s.shedule}`}>
            <div className={s.header}>
                <p className={s.title}>Расписание</p>
                <CalendarMonth type={sheduleView ? 'shedule' : 'reprot'} setDisCalendar={setDisCalendar} disCalendar={disCalendar}
                    setDateStartDefault={setDateStartDefault} setDateEndDefault={setDateEndDefault} handleOpenCalendar={handleOpenCalendar}
                    range={range} setRange={setRange} setValue={setValue} rangeText={rangeText} />
                {openCalendar && <DateCalendarRange value={value} setValue={setValue} setDateIcon={setDateIcon}
                    setOpenCalendar={setOpenCalendar} dark={dark} type={'shedule'} setDateStartRange={setDateStartRange} setDateEndRange={setDateEndRange} />}
            </div>

            <div className={`${s.main} ${dark && s.main_dark}`}>
                <div className={s.block}>
                    {role === 'leader' && <p className={s.text}>Бизнес-консультанты <sup>{shedule?.managers?.length} чел</sup></p>}
                    {role === 'frmanager' && <p className={s.text}>Эксперты <sup>{shedule?.managers?.length} чел</sup></p>}
                    {role === 'mobleader' && <p className={s.text}>Мобильные бизнес-консультанты <sup>{shedule?.managers?.length} чел</sup></p>}
                    <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
                        <div onClick={handleSwitchView} className={`${s.button} ${sheduleView && s.button_active} ${sheduleView && dark && s.button_active_dark}  ${dark && s.button_dark}`}>График работы</div>
                        <div onClick={handleSwitchView} className={`${s.button} ${!sheduleView && s.button_active} ${!sheduleView && dark && s.button_active_dark}  ${dark && s.button_dark}`}>Табель</div>
                    </div>
                </div>
                {sheduleView && <SheduleWork dark={dark} shedule={shedule} date={date} loader={loader} update={update} sheduleTwoWeek={sheduleTwoWeek} range={range} />}
                {!sheduleView && <SheduleTable dark={dark} table={table} date={date}/>}
            </div>
        </div>
    )
};

export default Shedule;