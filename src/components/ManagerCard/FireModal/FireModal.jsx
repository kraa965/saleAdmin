import s from './FireModal.module.scss'; 
import { ReactComponent as IconClose } from '../../../image/iconCloseModal.svg';
import { ReactComponent as Checkbox } from '../../../image/Checkbox.svg';
import DataPickerMiu from '../../../utils/DataPickerMiu/DataPickerMiu';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';

const FireModal = ({fireModalAnim, setFireModalAnim, setFireModal}) => {
    const [date, setDate] = useState('');
    const modalRef = useRef();
    const dark = useSelector(menuSelector).dark;

    const handleClose = () => {
        setFireModalAnim(false);
        setTimeout(() => {
            setFireModal(false);
        }, 200)
    }

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target) && !e.target.closest('.base-Popper-root')) {
            handleClose();
            return
        }

    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);

        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.fire} ${fireModalAnim && s.fire_anim}`}>
            <div ref={modalRef} className={`${s.modal} ${dark && s.modal_dark}`}>
                <div className={s.header}>
                    <p>Увольнение сотрудника</p>
                    <IconClose onClick={handleClose}/>
                </div>
                <p className={s.sub}>Последний рабочий день</p>
                <DataPickerMiu type={'edit'} date={date} setDate={setDate}/>
                <div className={s.check}><Checkbox/><p>Передать всех клиентов в базу</p></div>
                <button className={`${s.button} ${date == '' && s.button_dis}`}><p>Уволить</p></button>
            </div>
        </div>
    )
};

export default FireModal;