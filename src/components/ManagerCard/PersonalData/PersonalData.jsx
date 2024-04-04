import s from './PersonalData.module.scss';
import { ReactComponent as ArrowInput } from '../../../image/ArrowInput.svg';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from 'react-input-mask';
import DataPickerMiu from '../../../utils/DataPickerMiu/DataPickerMiu';
//slice
import {
    setName,
    setSecondName,
    setSex,
    setHbDate,
    setTel,
    setMango,
    setLogin,
    setPassword
} from '../../../store/reducer/addWorker/slice';
//selector
import { addWorkSelector } from '../../../store/reducer/addWorker/selector';

function PersonalData() {
    const [sexList, setSexList] = useState(false);
    const dispatch = useDispatch();
    const workerInfo = useSelector(addWorkSelector);
    const modalRef = useRef();

    useEffect(() => {
        localStorage.setItem('addHbDate', JSON.stringify(workerInfo.hbDate));
    }, [workerInfo.hbDate]);

    const handleName = (e) => {
        dispatch(setName(e.currentTarget.value));
        localStorage.setItem('addName', JSON.stringify(e.currentTarget.value));
    }

    const handleSecondName = (e) => {
        dispatch(setSecondName(e.currentTarget.value));
        localStorage.setItem('addSecondName', JSON.stringify(e.currentTarget.value));
    }

    const handleOpenSexList = () => {
        sexList ? setSexList(false) : setSexList(true)
    }

    const handleSelectSex = (e) => {
        const sex = e.currentTarget.textContent;
        dispatch(setSex(sex));
        localStorage.setItem('addSex', JSON.stringify(sex));
        setSexList(false);
    }

    const handleTel = (e) => {
        const value = e.currentTarget.value;
        const regex = /[0-9]/g;
        const cleanValue = value?.match(regex)?.join('');
        value && dispatch(setTel(cleanValue));
        value && localStorage.setItem('addTel', JSON.stringify(cleanValue));
    }

    const handleMango = (e) => {
        dispatch(setMango(e.currentTarget.value));
        localStorage.setItem('addMango', JSON.stringify(e.currentTarget.value));
    }

    const handleLogin = (e) => {
        dispatch(setLogin(e.currentTarget.value));
        localStorage.setItem('addLogin', JSON.stringify(e.currentTarget.value));
    }

    const handlePassword = (e) => {
        dispatch(setPassword(e.currentTarget.value));
        localStorage.setItem('addPassword', JSON.stringify(e.currentTarget.value));
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSexList(false)
            return
        }

    }
    useEffect(() => {
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener('click', closeModal);
    }, []);

    return (

        <div className={s.person}>
            <p className={s.sub}>Имя</p>
            <input onChange={handleName} className={`${s.input} ${s.input_text}`} value={workerInfo.name || ''} placeholder='Имя' type='text'></input>
            <p className={s.sub}>Фамилия</p>
            <input onChange={handleSecondName} value={workerInfo.secondName || ''} className={`${s.input} ${s.input_text}`} placeholder='Фамилия' type='text'></input>

            <div className={s.container}>
                <div className={s.block}>
                    <p className={s.sub}>Пол</p>
                    <div ref={modalRef} onClick={handleOpenSexList} className={`${s.select}  ${sexList && s.select_open}`}>
                        <input onClick={handleOpenSexList} value={workerInfo.sex || ''} className={`${s.input} ${s.input_select}`} placeholder='Укажите пол' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${sexList && s.list_open}`}>
                            <div onClick={handleSelectSex} className={`${s.item} ${workerInfo.sex == 'Мужской' && s.item_active}`}><p>Мужской</p></div>
                            <div onClick={handleSelectSex} className={`${s.item} ${workerInfo.sex == 'Женский' && s.item_active}`}><p>Женский</p></div>
                        </div>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>День рождения</p>
                    <DataPickerMiu date={workerInfo.hbDate} setDate={setHbDate} />
                </div>
            </div>

            <p className={s.sub}>Моб телефон</p>
            <div className={`${s.input} ${s.input_tel}`}>
                <InputMask mask="+7 (999)-999-9999" onChange={handleTel} value={workerInfo.tel || ''}>
                    {() => <input
                        type="tel"
                        placeholder="+7 (___)-___-____"
                    />}
                </InputMask>
            </div>
            <p className={s.sub}>Добавочный в Mango</p>
            <input onChange={handleMango} className={`${s.input} ${s.input_text}`} value={workerInfo.mango || ''} placeholder='Не указано' type='text'></input>

            <p className={s.sub}>Логин в Скилла</p>
            <input onChange={handleLogin} className={`${s.input} ${s.input_text}`} value={workerInfo.login || ''} placeholder='Не указано' type='text'></input>

            <p className={s.sub}>Пароль</p>
            <input onChange={handlePassword} className={`${s.input} ${s.input_text}`} value={workerInfo.password || ''} placeholder='Не указано' type='text'></input>
        </div>


    )
};

export default PersonalData;