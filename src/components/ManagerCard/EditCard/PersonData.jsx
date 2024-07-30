import { useEffect, useRef, useState } from 'react';
import s from './EditCard.module.scss';
import { ReactComponent as ArrowInput } from '../../../image/ArrowInput.svg';
import DataPickerMiu from '../../../utils/DataPickerMiu/DataPickerMiu';
import InputMask from 'react-input-mask';

const PersonData = ({ name, setName, surName, setSurName,
    sex, setSex, hbDate, setHbDate, tel, setTel, mango, setMango,
    login, setLogin, password, setPassword, comment, setComment, restoreWindow }) => {
    const [sexList, setSexList] = useState(false);
    const textRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        textRef.current.value = comment;
    }, [comment])

    const handleOpenSexList = () => {
        sexList ? setSexList(false) : setSexList(true)
    }

    const handleSelectSex = (e) => {
        const sex = e.currentTarget.id;
        setSex(sex);
        setSexList(false);
    }

    const handleChangeData = (e) => {
        const id = e.currentTarget.id;
        const value = e.currentTarget.value;
        if (id === 'name') {
            setName(value);
            return
        }

        if (id === 'surname') {
            setSurName(value);
            return
        }

        if (id === 'tel') {
            const regex = /[0-9]/g;
            const cleanValue = value?.match(regex)?.join('');
            value && setTel(cleanValue);
            return
        }

        if (id === 'mango') {
            setMango(value);
            return
        }

        if (id === 'login') {
            setLogin(value);
            return
        }

        if (id === 'password') {
            setPassword(value);
            return
        }

        if (id === 'comment') {
            setComment(value);
            return
        }

    }

    function closeModal(e) {
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
        <div className={s.data}>
            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Имя</p>
                    <input disabled={restoreWindow} autocomplete="off" id='name' onChange={handleChangeData} className={`${s.input}`} value={name || ''} placeholder='Имя' type='text'></input>
                </div>
                <div className={s.block}>
                    <p className={s.sub}>Фамилия</p>
                    <input disabled={restoreWindow} autocomplete="off" id='surname' onChange={handleChangeData} className={`${s.input}`} value={surName || ''} placeholder='Фамилия' type='text'></input>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Пол</p>
                    <div ref={modalRef} onClick={handleOpenSexList} className={`${s.select} ${sexList && s.select_open} ${restoreWindow && s.select_dis}`}>
                        <input disabled={restoreWindow} onClick={handleOpenSexList} value={sex == '1' ? 'Мужской' : 'Женский'} className={`${s.input} ${s.input_select}`} placeholder='Укажите пол' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${sexList && s.list_open}`}>
                            <div id='1' onClick={handleSelectSex} className={`${s.itemlist} ${sex == '1' && s.itemlist_active}`}><p>Мужской</p></div>
                            <div id='0' onClick={handleSelectSex} className={`${s.itemlist} ${sex == '0' && s.itemlist_active}`}><p>Женский</p></div>
                        </div>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>День рождения</p>
                    <DataPickerMiu disabled={restoreWindow} date={hbDate} setDate={setHbDate} type={'edit'} />
                </div>
            </div>

            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Моб телефон</p>
                    <div className={`${s.input} ${s.input_tel} ${restoreWindow && s.input_tel_dis}`}>
                        <InputMask mask="+7 (999)-999-99-99" onChange={handleChangeData} value={tel || ''}>
                            {() => <input
                                id='tel'
                                type="tel"
                                placeholder="+7 (___)-___-__-__"
                            />}
                        </InputMask>
                    </div>
                </div>
                <div className={s.block}>
                    <p className={s.sub}>Добавочный в Mango</p>
                    <input disabled={restoreWindow} autocomplete="off" id='mango' onChange={handleChangeData} className={`${s.input}`} value={mango || ''} placeholder='Mango' type='number'></input>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Логин в Скилла</p>
                    <input disabled={true} autocomplete="off" id='login' onChange={handleChangeData} className={`${s.input}`} value={login || ''} placeholder='Логин' type='text'></input>
                </div>
                <div className={s.block}>
                    <p className={s.sub}>Пароль</p>
                    <input disabled={restoreWindow} autocomplete="off" id='password' onChange={handleChangeData} className={`${s.input}`} value={password || ''} placeholder='Пароль' type='text'></input>
                </div>
            </div>
            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Комментарий</p>
                    <textarea disabled={restoreWindow} id='comment' ref={textRef} onChange={handleChangeData} className={s.comment} placeholder='Комментарий'></textarea>
                </div>
            </div>
        </div>
    )
};

export default PersonData;