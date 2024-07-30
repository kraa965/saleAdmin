import s from './FireModal.module.scss';
import { ReactComponent as IconClose } from '../../../image/iconCloseModal.svg';
import { ReactComponent as Checkbox } from '../../../image/Checkbox.svg';
import DataPickerMiu from '../../../utils/DataPickerMiu/DataPickerMiu';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';
//API
import { firedManager } from '../../../Api/Api';
//Slice
import { setUpdateManagersList } from '../../../store/reducer/mangerUpdate/slice';
//Components
import LoaderButton from '../../LoaderButton/LoaderButton';

const FireModal = ({ fireModalAnim, setFireModalAnim, setFireModal, handleClose2, id }) => {
    const [date, setDate] = useState('');
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');
    const modalRef = useRef();
    const dark = useSelector(menuSelector).dark;
    const dispatch = useDispatch();

    useEffect(() => {
        setError('')
    }, [date])

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

    const handleFireManager = () => {
        setLoad(true)
        firedManager({ id, manager_end_date: date, to_base: true })
            .then(res => {
        
                handleClose();

                setTimeout(() => {
                    dispatch(setUpdateManagersList());
                }, 100)

                setTimeout(() => {
                    handleClose2()
                    setLoad(false)
                }, 200)
            })
            .catch(err => {
                const status = err?.response?.status;
                status == 422 ? setError('Введены некоректные данные') : setError('Ошибка сервера');
                setLoad(false)
             })
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
                    <IconClose onClick={handleClose} />
                </div>
                <p className={s.sub}>Последний рабочий день</p>
                <DataPickerMiu type={'edit'} date={date} setDate={setDate} />
                <div className={s.check}><Checkbox /><p>Передать всех клиентов в базу</p></div>
                <button onClick={handleFireManager} className={`${s.button} ${date == '' && s.button_dis}`}><p>Уволить</p>{load && <LoaderButton color={'#FFFFFF'} />}</button>
                <span className={s.error}>{error}</span>
            </div>
        </div>
    )
};

export default FireModal;