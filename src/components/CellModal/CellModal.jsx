import s from './CellModal.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconArrowInput } from '../../image/iconArrowInput.svg';
import { useEffect, useState } from 'react';
import DatePicker from '../../utils/DatePicker/DatePicker';
const type = ['event', 'cancel', 'new'];

function CellModal({ type, modalRef, setOpenModal, dark }) {
    const [anim, setAnim] = useState(false);
    const [openInput, setOpenInput] = useState(false);
    const [value, setValue] = useState('');
    const [queryDate, setQueryDate] = useState('');

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

        if (id === '1') {
            setValue('Опоздание на планерку');
            return
        }
    }

    return (
        <div className={s.window}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div ref={modalRef} className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>

                <div className={s.header}>
                    {type === 'event' && <p>Новое событие</p>}
                    {type === 'cancel' && <p>Отмена события</p>}
                    {type === 'shift' && <p>Новая смена</p>}
                    <IconClose onClick={handleClose} />
                </div>

                <div className={s.main}>
                    <p className={`${s.sub} ${dark && s.sub_dark}`}>Сотрудник</p>

                    <div className={`${s.manager} ${dark && s.manager_dark}`}>
                        <p>Рамзан Димельханов</p>
                    </div>
                    {type === 'event' && <p className={`${s.sub} ${dark && s.sub_dark}`}>Вид события</p>}
                    {type === 'cancel' && <p className={`${s.sub} ${dark && s.sub_dark}`}>Вид события</p>}
                    {type === 'shift' && <p className={`${s.sub} ${dark && s.sub_dark}`}>Дата</p>}

                    {type === 'event' &&
                        <div className={`${s.event} ${dark && s.event_dark} ${openInput && s.event_open}`} onClick={handleOpenList}>
                            <input value={value || ''} placeholder='Выберите событие' type='text' disabled></input>
                            <IconArrowInput />
                            <div className={`${s.list} ${dark && s.list_dark} ${openInput && s.list_open}`}>
                                <div onClick={handleInputValue} id='1' className={`${s.item} ${dark && s.item_dark}`}>
                                    <p>Опоздание на планерку</p>
                                </div>
                            </div>
                        </div>
                    }

                    {type === 'cancel' &&
                        <div className={`${s.event_block} ${dark && s.event_block_dark}`} >
                            <p>Опоздание на планерку</p>
                        </div>
                    }

                    {type === 'shift' &&
                        <div className={`${s.shift}`} >
                            <DatePicker queryDate={queryDate} setQueryDate={setQueryDate} />
                        </div>
                    }

                </div>

                {type === 'event' &&
                    <button className={`${s.button} ${value == '' && !dark && s.button_dis} ${value == '' && dark && s.button_dis_dark}`}>
                        {<p>Добавить</p>}
                    </button>
                }

                {(type === 'cancel' || type === 'shift') &&
                    <button className={`${s.button}`}>
                        {<p>Подтвердить</p>}
                    </button>
                }

            </div>
        </div>
    )
};

export default CellModal;