import s from './CellHistory.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconEnd } from '../../image/iconEnd.svg';
import { ReactComponent as IconStart } from '../../image/iconStart.svg';
import { ReactComponent as IconWarm } from '../../image/iconWarm.svg';
import { dateForModal } from '../../utils/dates';
import { historyTime } from '../../utils/dates';
import { deleteEvent } from '../../Api/Api';
import { setUpdate } from '../../store/reducer/shedule/slice';
import { handleDiffDates } from '../../utils/dates';

function CellHistory({ setOpenModal, dark, date, eventsDay }) {
    const [anim, setAnim] = useState(false);
    const [anim2, setAnim2] = useState(false);
    const [openDelte, setOpenDelete] = useState(false);
    const [nameEventDelete, setNameEventDelete] = useState('');
    const [idEventDelete, setIdEventDelete] = useState('');
    const modalRef = useRef();
    const modalDeleteRef = useRef();
    const modalDate = dateForModal(date);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    function handleClose() {
        setAnim(false)
        setTimeout(() => {
            setOpenModal(false);
        }, 200)
    }

    function openModalDelete(e) {
        const id = e.currentTarget.id;
        const name = e.currentTarget.title;
        setIdEventDelete(id);
        setNameEventDelete(name)
        setOpenDelete(true);
        setTimeout(() => {
            setAnim2(true)
        })
    }

    function handleCloseDelete() {
        setAnim2(false)
        setTimeout(() => {
            setOpenDelete(false)
        }, 200)
    }

    function handleDeleteEvent() {
        deleteEvent(idEventDelete)
            .then((res) => {
                dispatch(setUpdate());
                handleCloseDelete();
            })
            .catch(err => console.log(err))
    }

    function closeModal(e) {
        e.stopPropagation()
        if (!openDelte && modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
            handleClose()
            return
        }
    }

    function closeModalDelete(e) {
        e.stopPropagation()
        if (modalDeleteRef.current && !modalDeleteRef.current.contains(e.target)) {
            handleCloseDelete()
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [openDelte]);

    useEffect(() => {
        document.addEventListener('mouseup', closeModalDelete);

        return () => document.removeEventListener('mouseup', closeModalDelete);
    }, []);

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div className={`${s.overlay} ${dark && anim && s.overlay_dark}  ${anim && s.overlay_anim}`}></div>
            {openDelte && <div ref={modalDeleteRef} className={`${s.modal} ${s.modal_delete} ${anim2 && s.modal_anim} ${dark && s.modal_dark}`}>
                <div className={`${s.header} ${s.header_delete}`}>
                    <p>Удалить событие</p>
                    <IconClose onClick={handleCloseDelete} />
                </div>
                <div className={`${s.event} ${s.event_fail}`}>
                    <div className={s.icon}>
                        <IconWarm />
                    </div>
                    <p className={s.text_err}>{nameEventDelete}</p>
                </div>

                <button onClick={handleDeleteEvent}>Подтвердить</button>


            </div>}
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                <div className={s.header}>
                    <p>{modalDate.history}</p>
                    <IconClose onClick={handleClose} />
                </div>
                {/* <div className={`${s.block} ${dark && s.block_dark}`}>
                    <div className={s.title}>
                        <p >Рабочий день</p>
                        <span>8 ч 10 мин</span>
                    </div>

                    <div className={s.progress}>
                        <div style={{ width: '20%' }} className={s.progress_plan}></div>
                        <div style={{ width: '30%' }} className={s.progress_call}></div>
                        <div style={{ width: '10%' }} className={s.progress_card}></div>
                        <div style={{ width: '10%' }} className={s.progress_client}></div>
                        <div style={{ width: '20%' }} className={s.progress_pause}></div>
                        <div style={{ width: '10%' }} className={s.progress_add}></div>
                    </div>

                    <div className={s.container}>
                        <div className={s.subs}>
                            <div className={`${s.point}`}>
                                <div className={s.point_plan}></div>
                                <p>Планерка<sup>1 ч</sup></p>
                            </div>

                            <div className={`${s.point}`}>
                                <div className={s.point_call}></div>
                                <p>Разговоры<sup>1 ч</sup></p>
                            </div>

                            <div className={`${s.point}`}>
                                <div className={s.point_card}></div>
                                <p>Работа с карточкой<sup>1 ч</sup></p>
                            </div>
                        </div>

                        <div className={s.subs}>
                            <div className={`${s.point}`}>
                                <div className={s.point_client}></div>
                                <p>Дозвон до клиента<sup>1 ч</sup></p>
                            </div>

                            <div className={`${s.point}`}>
                                <div className={s.point_pause}></div>
                                <p>Пауза<sup>1 ч</sup></p>
                            </div>

                            <div className={`${s.point}`}>
                                <div className={s.point_add}></div>
                                <p>Добавленная пауза<sup>1 ч</sup></p>
                            </div>
                        </div>
                    </div>

                </div> */}

                <div className={`${s.block} ${dark && s.block_dark}`}>
                    <div className={s.title}>
                        <p >История дня</p>
                    </div>
                    {/*  <div style={{ marginBottom: '12px' }} className={`${s.event} ${s.event_start} ${dark && s.event_start_dark}`}>
                        <div className={s.icon}>
                            <IconStart />
                        </div>
                        <p>Начало дня</p>
                        <span>09:54</span>
                    </div> */}

                    {/* <div className={`${s.event}`}>
                        <div className={s.icon}>
                        </div>
                        <p>10:32</p>
                        <div style={{ width: '20%' }} className={s.line}></div>
                        <p>-1 мин</p>
                    </div> */}

                    {eventsDay.map((el) => {

                        return <div className={s.fail}>
                            <div className={`${s.event} ${s.event_fail}`}>
                                <div className={s.icon}>
                                    <IconWarm />
                                </div>
                                <p>{historyTime(el.date_created)}</p>
                                <p className={s.text_err}>{el.type.name}</p>
                            </div>
                           {/*  {handleDiffDates(el.date) <= 3 && */} < div id={el.id} title={el.type.name} onClick={openModalDelete} className={s.delete}>
                                <IconClose />
                            </div>
                          {/*   } */}
                        </div>
                    })}



                    {/*  <div className={`${s.event}`}>
                        <div className={s.icon}>
                        </div>
                        <p>15:32</p>
                        <div style={{ width: '50%' }} className={s.line}></div>
                        <p>-25 мин</p>
                    </div> */}

                    {/*   <div style={{ marginTop: '4px' }} className={`${s.event} ${s.event_start} ${dark && s.event_start_dark}`}>
                        <div className={s.icon}>
                            <IconEnd />
                        </div>
                        <p>День завершен</p>
                        <span>18:54</span>
                    </div> */}
                </div>
            </div>


        </div >
    )
};

export default CellHistory;