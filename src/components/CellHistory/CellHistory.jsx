import s from './CellHistory.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconEnd } from '../../image/iconEnd.svg';
import { ReactComponent as IconStart } from '../../image/iconStart.svg';
import { ReactComponent as IconWarm } from '../../image/iconWarm.svg';

function CellHistory({ modalRef, setOpenModal, dark }) {
    const [anim, setAnim] = useState(false);

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

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                <div className={s.header}>
                    <p>1 декабря, понедельник</p>
                    <IconClose onClick={handleClose} />
                </div>
                <div className={`${s.block} ${dark && s.block_dark}`}>
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

                </div>

                <div className={`${s.block} ${dark && s.block_dark}`}>
                    <div className={s.title}>
                        <p >История дня</p>
                    </div>
                    <div style={{ marginBottom: '12px' }} className={`${s.event} ${s.event_start} ${dark && s.event_start_dark}`}>
                        <div className={s.icon}>
                            <IconStart />
                        </div>
                        <p>Начало дня</p>
                        <span>09:54</span>
                    </div>

                    <div className={`${s.event}`}>
                        <div className={s.icon}>
                        </div>
                        <p>10:32</p>
                        <div style={{ width: '20%' }} className={s.line}></div>
                        <p>-1 мин</p>
                    </div>

                    <div className={`${s.event} ${s.event_fail}`}>
                        <div className={s.icon}>
                            <IconWarm />
                        </div>
                        <p>14:13</p>
                        <p className={s.text_err}>Использование телефона</p>
                    </div>

                    <div className={`${s.event}`}>
                        <div className={s.icon}>
                        </div>
                        <p>15:32</p>
                        <div style={{ width: '50%' }} className={s.line}></div>
                        <p>-25 мин</p>
                    </div>

                    <div style={{ marginTop: '4px' }} className={`${s.event} ${s.event_start} ${dark && s.event_start_dark}`}>
                        <div className={s.icon}>
                            <IconEnd />
                        </div>
                        <p>День завершен</p>
                        <span>18:54</span>
                    </div>
                </div>
            </div>


        </div>
    )
};

export default CellHistory;