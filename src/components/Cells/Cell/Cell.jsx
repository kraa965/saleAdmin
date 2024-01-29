import { useRef, useState, useEffect } from 'react';
import s from './Cell.module.scss';
import { ReactComponent as IconCalendarSmall } from '../../../image/iconCalendarSmall.svg';
import { ReactComponent as IconCross } from '../../../image/iconCross.svg';
import { ReactComponent as IconPlus } from '../../../image/iconPlus.svg';
import { ReactComponent as IconYellow } from '../../../image/iconYellow.svg';
import { ReactComponent as IconRed } from '../../../image/iconRed.svg'; 
import { ReactComponent as IconGreen } from '../../../image/iconGreen.svg';
import { ReactComponent as IconAlert } from '../../../image/iconAlert.svg';
import CellModal from '../../CellModal/CellModal';
import CellHistory from '../../CellHistory/CellHistory';

function Cell({ num, cell, type, dark }) {
    const [view, setView] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [typeModal, setTypeModal] = useState('')
    const modalRef = useRef();

    

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

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
            handleCloseModal();
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [openModal]);

    return (
        <>
             {openModal && typeModal !== 'history' && <CellModal type={typeModal} modalRef={modalRef} setOpenModal={setOpenModal} dark={dark}/>}
             {typeModal === 'history' && openModal && <CellHistory modalRef={modalRef} setOpenModal={setOpenModal} dark={dark}/>}
            {type === 5 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${dark && s.cell_dark}`}>
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='event' onClick={handleOpenModal} className={`${s.button_2} ${dark && s.button_2_dark}`}> 
                                Событие
                            </div>
                            <div id='shift' onClick={handleOpenModal} className={s.button}>
                                Добавить смену
                            </div>
                        </div>
                        :
                        <div className={s.time}></div>
                    }
                </div>
            }

            {type === 6 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_2} ${dark && s.cell_2_dark}`}>
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='event' onClick={handleOpenModal}  className={s.button}>
                                Создать событие
                            </div>
                        </div>
                        :
                        <div className={s.time}>
                            <IconCalendarSmall />
                            <p>10:00 - 19:00</p>
                        </div>
                    }
                </div>
            }

            {type === 7 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_3} ${dark && s.cell_3_dark}`}>
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='cancel' onClick={handleOpenModal} className={s.button}>
                                Отменить событие
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconCross />
                            <p>10:00 - 19:00</p>
                        </div>

                    }
                </div>
            }

            {type === 4 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_4} ${dark && s.cell_4_dark}`}>
                    {!view && <div className={`${s.line} ${dark && s.line_dark}`}></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div  id='event' onClick={handleOpenModal} className={s.button}>
                                Создать событие
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <p>10:00 - 19:00</p>
                        </div>

                    }
                </div>
            }

            {type === 1 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_5}`}>
                    {!view && <div className={`${s.line} ${s.line_green}`}></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_2} ${dark && s.button_2_dark}`}>
                                История
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconGreen/><p>10:00 - 19:00</p>
                        </div>

                    }
                </div>
            }

            {type === 2 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_6}`}>
                    {!view && <div className={`${s.line} ${s.line_yellow}`}></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_2} ${dark && s.button_2_dark}`}>
                                История
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <IconPlus /><p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconYellow /><p>10:00 - 19:00</p>
                        </div>

                    }
                </div>
            }

            {type === 3 &&
                <div onMouseEnter={handleOpenButtons} onMouseLeave={handleCloseButtons} className={`${s.cell} ${s.cell_7}`}>
                    {!view && <div className={`${s.line} ${s.line_red}`}></div>}
                    {!view && <div className={s.alert}><IconAlert/></div>}
                    {view ?
                        <div className={`${s.buttons}`}>
                            <div id='history' onClick={handleOpenModal} className={`${s.button_2} ${dark && s.button_2_dark}`}>
                                История
                            </div>
                            <div id='event' onClick={handleOpenModal} className={s.button}>
                                <IconPlus/><p>Событие</p>
                            </div>
                        </div>

                        :

                        <div className={s.time}>
                            <IconRed/><p>10:00 - 19:00</p>
                        </div>
                    }
                </div>
            }

        </>

    )
};

export default Cell;