import { useEffect, useState } from 'react';
import s from './ProfileModal.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconArrowInput } from '../../image/iconArrowInput.svg';
//API
import { addPause, addEvent } from '../../Api/Api';
//component
import LoaderButton from '../LoaderButton/LoaderButton';
//constants
import { evenstList } from '../../constants/eventsList';
//utils
import { dayToday } from '../../utils/dates';

function ProfileModal({ id, modalRef, setOpenModal, type, dark, setTimer, setPauseUpdate }) {
    const [anim, setAnim] = useState(false);
    const [value, setValue] = useState('');
    const [eventId, setEventId] = useState(0);
    const [timeValue, setTimeValue] = useState(0);
    const [openInput, setOpenInput] = useState(false);
    const [load, setLoad] = useState(false);
    const dateToday = dayToday();
    console.log(dateToday)

    useEffect(() => {
        setAnim(true)
    }, []);

    function handleCloseModal() {
        setOpenModal(false)
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
        setEventId(id)
        const value = evenstList.find(el => el.id == id).name;
        setValue(value)

    }

    function handleTimeInput(e) {
        const id = e.currentTarget.id;
        setTimeValue(id * 10)
    }

    function handleAddEvent() {
        setLoad(true)
        addEvent(dateToday, id, eventId)
        .then(res => {
            setLoad(false);
            setOpenModal(false)
        })
        .catch(err => console.log(err))
    }

    function handleAddPause() {
        setLoad(true)
        addPause(id, timeValue)
            .then(res => {
                setTimer(prevState => prevState + timeValue * 60)
                setPauseUpdate(prevState => prevState + timeValue * 60)
                setLoad(false);
                setOpenModal(false)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className={s.window}>
            <div ref={modalRef} className={`${s.modal} ${type === 'event' && s.modal_event} ${dark && s.modal_dark} ${anim && s.modal_anim}`}>
                <div className={s.header}>
                    {type === 'resort' && <p className={s.title}>Время отдыха</p>}
                    {type === 'event' && <p className={s.title}>Новое событие</p>}
                    <IconClose onClick={handleCloseModal} />
                </div>

                <div className={s.block}>
                    {type === 'event' && <p className={s.text}>Вид события</p>}
                    {type === 'resort' && <p className={s.text}>Время добавленной паузы</p>}

                    {type === 'event' &&
                        <div className={`${s.event} ${dark && s.event_dark} ${openInput && s.event_open}`} onClick={handleOpenList}>
                            <input value={value || ''} placeholder='Выберите событие' type='text' disabled></input>
                            <IconArrowInput />
                            <div className={`${s.list} ${dark && s.list_dark} ${openInput && s.list_open}`}>
                                {evenstList.map(el => {
                                    return <div key={el.id} onClick={handleInputValue} id={el.id} className={`${s.item} ${dark && s.item_dark}`}>
                                        <p>{el.name}</p>
                                    </div>
                                })}

                            </div>
                        </div>
                    }

                    {type === 'resort' &&
                        <div className={s.container}>
                            <div id='1' onClick={handleTimeInput} className={`${s.time} ${dark && s.time_dark} ${timeValue === 10 && s.time_active}`}>10</div>
                            <div id='2' onClick={handleTimeInput} className={`${s.time} ${dark && s.time_dark}  ${timeValue === 20 && s.time_active}`}>20</div>
                            <div id='3' onClick={handleTimeInput} className={`${s.time} ${dark && s.time_dark}  ${timeValue === 30 && s.time_active}`}>30</div>
                        </div>
                    }

                </div>

                {type === 'event' && <button onClick={handleAddEvent} className={`${s.button} ${value == '' && !dark && s.button_dis} ${value == '' && dark && s.button_dis_dark}`}>Сохранить {load && <LoaderButton color={'#ffff'} />}</button>}
                {type === 'resort' && <button onClick={handleAddPause} className={`${s.button} ${timeValue == '' && !dark && s.button_dis} ${timeValue == '' && dark && s.button_dis_dark}`}>Сохранить {load && <LoaderButton color={'#ffff'} />}</button>}
            </div>
        </div>


    )
};

export default ProfileModal;