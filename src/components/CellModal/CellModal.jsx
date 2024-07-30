import s from './CellModal.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconArrowInput } from '../../image/iconArrowInput.svg';
import { useEffect, useState, useRef } from 'react';
import DatePicker from '../../utils/DatePicker/DatePicker';
import { addShift } from '../../Api/Api';
import { setUpdate } from '../../store/reducer/shedule/slice';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../Api/Api';
import { сompareDate } from '../../utils/dates';
import { deleteEvent } from '../../Api/Api';
import { dateForModal, handleCompareTime } from '../../utils/dates';
import { addAdditionalShift, deleteShift } from '../../Api/Api';


function CellModal({ type, setOpenModal, dark, id, name, surname, date, eventsList, eventsDay, cell, isAdd, sheduleId, shiftId }) {
    const [anim, setAnim] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [value, setValue] = useState('');
    const [reason, setReason] = useState(0);
    const [queryDate, setQueryDate] = useState(date);
    const [idEventsDay, setIdEventsDay] = useState([]);
    const [idEventForDelete, setIdEventForDelete] = useState(0);
    const [nameEventForDelete, setNameEventForDelete] = useState(0);
    const [switcher, setSwitcher] = useState(false);

    const modalRef = useRef();
    const dispatch = useDispatch();
    const status = сompareDate(date);
    const modalDate = dateForModal(date);
    const eventPlanWeekend = eventsDay.find(el => el.event_id === 11);
    const eventVacation = eventsDay.find(el => el.event_id === 12);
    const eventUnplanWeekend = eventsDay.find(el => el.event_id === 1);
    const role = document.getElementById('root_leader').getAttribute('role');

    console.log(eventsList)

    useEffect(() => {
        const allIdDay = eventsDay.map((el) => {
            return el.event_id
        });

        setIdEventsDay(allIdDay)

        if (eventPlanWeekend) {
            setIdEventForDelete(eventPlanWeekend.id);
            setNameEventForDelete(eventPlanWeekend.type.name);
            return
        }

        if (eventUnplanWeekend) {
            setIdEventForDelete(eventUnplanWeekend.id);
            setNameEventForDelete(eventUnplanWeekend.type.name);
            return
        }

        if (eventVacation) {
            setIdEventForDelete(eventVacation.id);
            setNameEventForDelete(eventVacation.type.name);
            return
        }

    }, [eventsDay])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    function handleClose() {
        setTimeout(() => {
            setOpenModal(false);
        }, 200)

        setAnim(false)
    }


    function handleOpenList() {
        if (openInput) {

            setOpenInput(false)
        } else {
            setOpenInput(true)
        }
    }

    function handleInputValue(e) {
        const id = e.currentTarget.id;
        const name = e.currentTarget.textContent;
        setValue(name);
        setReason(id);
    }

    function handleAddShift() {
        addShift(queryDate, id)
            .then((res) => {
                dispatch(setUpdate());
                handleClose();
            })
            .catch(err => console.log(err))
    }

    function handleAddEvent() {

        addEvent(queryDate, id, reason)
            .then((res) => {
                dispatch(setUpdate());
                handleClose();
            })
            .catch(err => console.log(err))
    }

    function handleDeleteEvent() {
        deleteEvent(idEventForDelete)
            .then((res) => {
                dispatch(setUpdate());
                handleClose();
            })
            .catch(err => console.log(err))
    }


    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
            handleClose()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    useEffect(() => {
        modalRef.current.addEventListener('wheel', function (e) {
            e.stopPropagation()
        })
    });

    function handleSwitch() {
        if (switcher) {
            setSwitcher(false)
        } else {
            setSwitcher(true)
        }
    }


    return (
        <div className={s.window}>
            <div className={`${s.overlay} ${dark && anim && s.overlay_dark}  ${anim && s.overlay_anim}`}></div>
            <div ref={modalRef} className={`${s.modal} ${type === 'event' && s.modal_event} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>

                <div className={s.header}>
                    {type === 'event' && <p>Новое событие<sup>{modalDate.modal}</sup></p>}
                    {type === 'cancel' && <p>Отмена события<sup>{modalDate.modal}</sup></p>}
                    {type === 'shift' && <p>Новая смена<sup>{modalDate.modal}</sup></p>}
                    <IconClose onClick={handleClose} />
                </div>

                <div className={s.main}>
                    <p className={`${s.sub} ${dark && s.sub_dark}`}>Сотрудник</p>

                    <div className={`${s.manager} ${dark && s.manager_dark}`}>
                        <p>{name} {surname}</p>
                    </div>
                    {/*   {sheduleId === 2 && <div className={s.switch}>
                        <div onClick={handleSwitch} className={`${s.switcher} ${switcher && s.switcher_on}`}>
                            <div></div>
                        </div>
                        <p>Автозаполнение смен</p>
                    </div>
                    } */}
                    {type === 'event' && <p className={`${s.sub} ${dark && s.sub_dark}`}>Вид события</p>}
                    {type === 'cancel' && <p className={`${s.sub} ${dark && s.sub_dark}`}>Вид события</p>}
                    {type === 'shift' && !switcher && <p className={`${s.sub} ${dark && s.sub_dark}`}>Дата</p>}
                    {/*  {type === 'shift' && switcher && <p className={`${s.sub} ${dark && s.sub_dark}`}>Дата начала работы менеджера</p>} */}

                    {type === 'event' &&
                        <div className={`${s.event} ${dark && s.event_dark} ${openInput && s.event_open}`} onClick={handleOpenList}>
                            <input value={value || ''} placeholder='Выберите событие' type='text' disabled></input>
                            <IconArrowInput />
                            <div className={`${s.list} ${dark && s.list_dark} ${openInput && s.list_open} ${openInput && status === 2 && s.list_open_2}`}>

                                {/*   {status === 2 && cell === 5 && <div key={14} onClick={handleInputValue} id={14}
                                    className={`${s.item} ${isAdd && s.item_check} ${value == 'Дополнительна смена' && s.item_active} ${dark && s.item_dark}`}>
                                    <p>Дополнительна смена</p>
                                    {isAdd && <div></div>}
                                </div>
                                } */}

                                {status == 0 &&
                                    (role === 'mobleader' ?
                                        eventsList.filter((el) => el.id !== 2 && el.id !== 6 && el.id !== 7 && el.id !== 9 && el.id !== 10 && el.id !== 7)
                                        :
                                        eventsList).map((el) => {
                                            if (el.id !== 11) {
                                                return <div key={el.id} onClick={handleInputValue} id={el.id}
                                                    className={`${s.item} ${idEventsDay.includes(el.id) && s.item_check} ${value == el.name && s.item_active} ${dark && s.item_dark}`}>
                                                    <p>{el.name}</p>
                                                    {idEventsDay.includes(el.id) && <div></div>}
                                                </div>
                                            }
                                        })}

                                {status === 2 && (cell === 5 || cell === 6 || cell === 11) && eventsList.map((el) => {
                                    if (el.id === 1 || el.id === 11 || el.id === 12) {
                                        return <div key={el.id} onClick={handleInputValue} id={el.id}
                                            className={`${s.item} ${idEventsDay.includes(el.id) && s.item_check} ${value == el.name && s.item_active} ${dark && s.item_dark}`}>
                                            <p>{el.name}</p>
                                            {idEventsDay.includes(el.id) && <div></div>}
                                        </div>
                                    }
                                })}

                                {status === 1 && eventsList.map((el) => {
                                    const weekendEvent = handleCompareTime(sheduleId == 1 ? 11 : 8); 
                                  
                                        return <div style={{display: !weekendEvent && el.id == 11 ? 'none' : ''}} key={el.id} onClick={handleInputValue} id={el.id}
                                            className={`${s.item} ${idEventsDay.includes(el.id) && s.item_check} ${value == el.name && s.item_active} ${dark && s.item_dark}`}>
                                            <p>{el.name}</p>
                                            {idEventsDay.includes(el.id) && <div></div>}
                                        </div>
                                    
                                })}
                            </div>
                        </div>
                    }

                    {type === 'cancel' &&
                        <div className={`${s.event_block} ${dark && s.event_block_dark}`} >
                            <p>{nameEventForDelete}</p>
                        </div>
                    }

                    {type === 'shift' &&
                        <div className={`${s.shift}`} >
                            <DatePicker queryDate={queryDate} setQueryDate={setQueryDate} dark={dark} />
                        </div>
                    }

                </div>

                {type === 'event' &&
                    <button onClick={handleAddEvent} className={`${s.button} ${value == '' && !dark && s.button_dis} ${value == '' && dark && s.button_dis_dark}`}>
                        {<p>Добавить</p>}
                    </button>
                }

                {type === 'shift' &&
                    <button onClick={handleAddShift} className={`${s.button}`}>
                        {<p>Подтвердить</p>}
                    </button>
                }

                {type === 'cancel' &&
                    <button onClick={handleDeleteEvent} className={`${s.button}`}>
                        {<p>Подтвердить</p>}
                    </button>
                }

            </div>
        </div>
    )
};

export default CellModal;