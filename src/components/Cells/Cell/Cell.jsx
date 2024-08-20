import { useRef, useState, useEffect } from 'react';
import s from './Cell.module.scss';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconCalendarSmall } from '../../../image/iconCalendarSmall.svg';
import { ReactComponent as IconCross } from '../../../image/iconCross.svg';
import { ReactComponent as IconPlus } from '../../../image/iconPlus.svg';
import { ReactComponent as IconYellow } from '../../../image/iconYellow.svg';
import { ReactComponent as IconRed } from '../../../image/iconRed.svg';
import { ReactComponent as IconGreen } from '../../../image/iconGreen.svg';
import { ReactComponent as IconAlert } from '../../../image/iconAlert.svg';
import { ReactComponent as IconHistory } from '../../../image/iconHistory.svg';
import { ReactComponent as IconClose } from '../../../image/iconCloseModal.svg';
import CellModal from '../../CellModal/CellModal';
import CellHistory from '../../CellHistory/CellHistory';
import { deleteShift } from '../../../Api/Api';
import { setUpdate } from '../../../store/reducer/shedule/slice';;

function Cell({ type, dark, manager, date, eventsList, eventsDay, isAdd, shiftId, loader }) {
    const [view, setView] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState('');
    const [anim, setAnim] = useState(false);
    const schedule = manager.schedule.id;
    const dispatch = useDispatch();
    const id = manager.id;
    const name = manager.name;
    const surname = manager.surname;
    const sheduleId = manager.schedule.id;

    useEffect(() => {
        /*   
           setTimeout(() => {
                 setAnim(true);
            }) */

        if (loader) {
            setAnim(false)
        } else {
            setAnim(true)
        }

    }, [loader])

    function handleOpenButtons() {
        setView(true);
    }

    function handleCloseButtons() {
        setView(false);
    }

    function handleOpenModal(e) {
        const id = e.currentTarget.id;
        setTypeModal(id);
        setOpenModal(true);
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function handleDeleteShift() {
        deleteShift(shiftId)
            .then((res) => {
                dispatch(setUpdate());
                setView(false)
            })
            .catch(err => console.log(err))
    }


    return (
        <>
            {openModal && typeModal !== 'history' && <CellModal type={typeModal} setOpenModal={setOpenModal} dark={dark} id={id}
                name={name} surname={surname} eventsDay={eventsDay} date={date} eventsList={eventsList} cell={type} isAdd={isAdd} sheduleId={sheduleId} shiftId={shiftId} />}

            {typeModal === 'history' && openModal && <CellHistory setOpenModal={setOpenModal} dark={dark} date={date} eventsDay={eventsDay} />}

            {type === 5 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${dark && s.cell_dark}`}>
                    {view ?
                        <div className={`${s.buttons} ${s.buttons_column}`}>
                            <div id='shift' onClick={handleOpenModal} className={s.button}>
                                Добавить смену
                            </div>
                            <div id='event' onClick={handleOpenModal} className={`${s.button_2} ${dark && s.button_2_dark}`}>
                                Событие
                            </div>
                        </div>
                        :
                        <div className={s.time}></div>
                    }
                </div>

            }

            {type === 6 &&

                <div style={{ alignItems: sheduleId === 2 && 'flex-end' }} onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons}
                    className={`${s.cell} ${anim && s.cell_anim} ${s.cell_2} ${dark && s.cell_2_dark}`}>
                    {view && sheduleId === 2 && <div id={shiftId} onClick={handleDeleteShift} className={s.delete}>
                        <IconClose />
                    </div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>

                        :
                        <div className={s.time}>
                            <IconCalendarSmall className={s.iconcalendar} />
                            {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>
                    }
                </div>

            }

            {type === 11 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_2} ${dark && s.cell_2_dark}`}>
                    {view && sheduleId === 2 && <div id={shiftId} onClick={handleDeleteShift} className={s.delete}>
                        <IconClose />
                    </div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>
                        :
                        <>
                            <p className={s.textadd}>доп. смена</p>
                            <div className={s.time}>
                                <IconCalendarSmall className={s.iconcalendar} />

                                {schedule === 1 && <p>10:00 - 19:00</p>}
                                {schedule === 2 && <p>8:00 - 20:00</p>}
                            </div>
                        </>
                    }
                </div>

            }

            {type === 7 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_3} ${dark && s.cell_3_dark}`}>
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='cancel' onClick={handleOpenModal} className={s.button}>
                                Отменить событие
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconCross />
                            {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>

                    }
                </div>

            }

            {type === 9 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_3} ${dark && s.cell_3_dark}`}>
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='cancel' onClick={handleOpenModal} className={s.button}>
                                Отменить событие
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <p>Отпуск</p>
                        </div>

                    }
                </div>

            }

            {type === 4 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_4} ${dark && s.cell_4_dark}`}>
                    {!view && <div className={`${s.line} ${dark && s.line_dark}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={`${s.button}`}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>

                    }
                </div>

            }

            {type === 1 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_5}`}>
            
                    {!view && <div className={`${s.line} ${s.line_green}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={`${s.button}`}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconGreen /> {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>

                    }
                </div>

            }

            {type === 14 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_6}`}>
                    {!view && <div className={`${s.line} ${s.line_yellow}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconYellow /><p>День не начат</p>

                        </div>

                    }
                </div>
            }

            {type === 15 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_6}`}>
                    {!view && <div className={`${s.line} ${s.line_yellow}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconYellow /><p>Ранее окончание дня</p>

                        </div>

                    }
                </div>
            }

            {/*  {type === 16 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_6}`}>
                    {!view && <div className={`${s.line} ${s.line_yellow}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconYellow /><p>Позднее начало дня</p>

                        </div>

                    }
                </div>

            } */}

            {type === 2 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_6}`}>
                    {!view && <div className={`${s.line} ${s.line_yellow}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconYellow /> {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>

                    }
                </div>

            }

            {type === 3 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_7}`}>
                    {!view && <div className={`${s.line} ${s.line_red}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_3} ${eventsDay.length === 0 && s.button_disable} ${dark && s.button_3_dark}`}>
                                <IconHistory />
                            </div>
                            <div id='event' onClick={handleOpenModal} className={`${s.button}`}>
                                <p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconRed /> {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>
                    }
                </div>
            }

            {type === 10 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${s.cell_7}`}>
                    {!view && <div className={`${s.line} ${s.line_red}`}></div>}
                    {!view && eventsDay.length > 0 && <div className={s.alert}><IconAlert /></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='cancel' onClick={handleOpenModal} className={s.button}>
                                Отменить событие
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconRed /> {schedule === 1 && <p>10:00 - 19:00</p>}
                            {schedule === 2 && <p>8:00 - 20:00</p>}
                        </div>
                    }
                </div>
            }

            {type === 8 &&
                <div style={{ cursor: 'default', opacity: '0.6' }} className={`${s.overlay} ${dark && s.overlay_dark}`}>
                    <div className={`${s.cell} ${anim && s.cell_anim} ${dark && s.cell_dark}`}>

                    </div>
                </div>
            }

            {type === 12 &&

                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${anim && s.cell_anim} ${dark && s.cell_dark}`}>
                    {view ?
                        <div className={`${s.buttons} ${s.buttons_column}`}>
                            <div id='shift' onClick={handleOpenModal} className={s.button}>
                                Плановая смена
                            </div>

                        </div>
                        :
                        <div className={s.time}></div>
                    }
                </div>

            }

            {type === 13 &&

                <div style={{ alignItems: sheduleId === 2 && 'flex-end', opacity: '0.5' }} onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons}
                    className={`${s.cell} ${anim && s.cell_anim} ${s.cell_2} ${dark && s.cell_2_dark}`}>
                    {view && sheduleId === 2 && <div id={shiftId} onClick={handleDeleteShift} className={s.delete}>
                        <IconClose />
                    </div>}

                    <div className={s.time}>
                        <IconCalendarSmall className={s.iconcalendar} />
                        {schedule === 1 && <p>10:00 - 19:00</p>}
                        {schedule === 2 && <p>8:00 - 20:00</p>}
                    </div>

                </div>

            }

        </>

    )
};

export default Cell;