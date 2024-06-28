import s from './AddCard.module.scss';
import { ReactComponent as IconClose } from '../../../image/iconCloseModal.svg';
import { ReactComponent as Patch } from '../../../image/patch.svg';
import { useState, useEffect, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import generatePassword from "omgopass";
//component
import PersonalData from '../PersonalData/PersonalData';
import WorkData from '../WorkData/WorkData';
import FileLoader from '../../FileLoader/FileLoader';
import LoaderButton from '../../LoaderButton/LoaderButton';
//selector
import { addWorkSelector } from '../../../store/reducer/addWorker/selector';
//slice
import {
    setName,
    setSecondName,
    setSex,
    setHbDate,
    setTel,
    setMango,
    setLogin,
    setPassword,
    setFormat,
    setStartDate,
    setShedule,
    setShedule2,
    setFilledStage,
    setPhoto,
} from '../../../store/reducer/addWorker/slice';
import { setUpdateManagersList } from '../../../store/reducer/mangerUpdate/slice';
//Api 
import { addManager } from '../../../Api/Api';

function AddCard({ setAddWindow, setAnim, disabled, setDisabled }) {
    const role = document.getElementById('root_leader').getAttribute('role');
    const workerInfo = useSelector(addWorkSelector);
    const filledStage = useSelector(addWorkSelector).filledStage;
    const [activeStage, setActiveStage] = useState(JSON.parse(localStorage.getItem('stage')) || 1);
    const [positionMain, setPositionMain] = useState(JSON.parse(localStorage.getItem('positionMain')) || 0);
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('sdfsf');
    const dispatch = useDispatch();
    const passwordRandom = generatePassword({
        minSyllableLength: 2,
        maxSyllableLength: 2,
        hasNumbers: false,
    });

    console.log(workerInfo)
    useEffect(() => {
        if (workerInfo.password.length == 0) {
            dispatch(setPassword(passwordRandom));
            localStorage.setItem('addPassword', JSON.stringify(passwordRandom));
            return
        }
    }, []);

    useEffect(() => {
        if(role == 'mobleader') {
            dispatch(setFormat(1));
            localStorage.setItem('format', JSON.stringify(1))
        } else {
            dispatch(setFormat(0));
            localStorage.setItem('format', JSON.stringify(0))
        }
    }, [])

    useEffect(() => {
        setError('')
    }, [activeStage, workerInfo])

    useEffect(() => {
        if (activeStage == 1) {
            setPositionMain(0);
            localStorage.setItem('positionMain', JSON.stringify(0));
            return
        }

        if (activeStage == 2) {
            setPositionMain(-482);
            localStorage.setItem('positionMain', JSON.stringify(-482));
            return
        }

        if (activeStage == 3) {
            setPositionMain(-482 * 2);
            localStorage.setItem('positionMain', JSON.stringify(-482 * 2));
            return
        }
    }, [activeStage])

    useEffect(() => {
        localStorage.setItem('photo', JSON.stringify(workerInfo.photo));
    }, [workerInfo.photo]);

    useEffect(() => {
        const stage1 = !Object.values(workerInfo).slice(1, 9).some(el => el.length < 1)
        const stage2 = !Object.values(workerInfo).slice(9, 13).some(el => el.length < 1)
        const stage3 = Object.values(workerInfo.photo).length >= 3 ? true : false;

        if (!stage1) {
            dispatch(setFilledStage(0));
            return
        }

        if (stage1 && !stage2 && !stage3) {
            dispatch(setFilledStage(1));
            return
        }

        if (stage1 && stage2 && !stage3) {
            dispatch(setFilledStage(2));
            return
        }

        if (stage1 && stage2 && stage3) {
            console.log('последний шаг')
            dispatch(setFilledStage(3));
            return
        }

    }, [workerInfo]);


    function handleCloseWindow() {
        setAnim(false)
        setTimeout(() => {
            setAddWindow(false)
        }, 400)
    }

    const handleNextStage = () => {
        if (activeStage < 3) {
            setActiveStage(prevState => prevState + 1);
            localStorage.setItem('stage', JSON.stringify(activeStage + 1))
        }
    }

    const handleSelectStage = (e) => {
        const id = Number(e.currentTarget.id);
        if (id <= filledStage) {
            setActiveStage(id);
            localStorage.setItem('stage', JSON.stringify(id));
        }
    }

    console.log(workerInfo)

    const handleCreateCard = () => {
        setLoad(true)
        const formData = new FormData();
        formData.append('name', workerInfo.name);
        formData.append('surname', workerInfo.secondName)
        formData.append('sex', workerInfo.sex)
        formData.append('phone', workerInfo.tel)
        formData.append('hb', workerInfo.hbDate)
        formData.append('mango_phone', workerInfo.mango)
        formData.append('login', workerInfo.login)
        formData.append('password', workerInfo.password)
        formData.append('is_remote', workerInfo.format)
        formData.append('manager_start_date', workerInfo.startDate)
        workerInfo.shedule == 1 && formData.append('work_schedule_id', 1);
        workerInfo.shedule == 2 && formData.append('work_schedule_id', 2);
        workerInfo.shedule == 3 && formData.append('work_schedule_id', 1);
        workerInfo.shedule == 4 && formData.append('work_schedule_id', 1);

        workerInfo.shedule == 1 && formData.append('work_time_start', '10:00');
        workerInfo.shedule == 2 && formData.append('work_time_start', '08:00');
        workerInfo.shedule == 3 && formData.append('work_time_start', '09:00');
        workerInfo.shedule == 4 && formData.append('work_time_start', '08:00');

        workerInfo.shedule == 1 && formData.append('work_time_end', '19:00');
        workerInfo.shedule == 2 && formData.append('work_time_end', '20:00');
        workerInfo.shedule == 3 && formData.append('work_time_end', '18:00');
        workerInfo.shedule == 4 && formData.append('work_time_end', '17:00');


        workerInfo.shedule == 1 && formData.append('next_work_schedule_id', 1);
        workerInfo.shedule == 2 && formData.append('next_work_schedule_id', 2);
        workerInfo.shedule == 3 && formData.append('next_work_schedule_id', 1);
        workerInfo.shedule == 4 && formData.append('next_work_schedule_id', 1);

        workerInfo.shedule == 1 && formData.append('next_time_start', '10:00');
        workerInfo.shedule == 2 && formData.append('next_time_start', '08:00');
        workerInfo.shedule == 3 && formData.append('next_time_start', '09:00');
        workerInfo.shedule == 4 && formData.append('next_time_start', '08:00');

        workerInfo.shedule == 1 && formData.append('next_time_end', '19:00');
        workerInfo.shedule == 2 && formData.append('next_time_end', '20:00');
        workerInfo.shedule == 3 && formData.append('next_time_end', '18:00');
        workerInfo.shedule == 4 && formData.append('next_time_end', '17:00');
       /*  formData.append('next_work_schedule_id', workerInfo.shedule2) */
        workerInfo.photo.file && formData.append('avatar', workerInfo.photo.fileSend, workerInfo.photo.name)

        addManager(formData)
            .then(res => {
                console.log(res)
                localStorage.removeItem('addName');
                localStorage.removeItem('addSecondName');
                localStorage.removeItem('addSex');
                localStorage.removeItem('addHbDate');
                localStorage.removeItem('addTel');
                localStorage.removeItem('addMango');
                localStorage.removeItem('addLogin');
                localStorage.removeItem('addPassword');
                localStorage.removeItem('format');
                localStorage.removeItem('startDate');
                localStorage.removeItem('shedule');
                localStorage.removeItem('shedule2');
                localStorage.removeItem('photo');
                localStorage.removeItem('stage');

                setTimeout(() => {
                    setLoad(false)
                    handleCloseWindow();
                    dispatch(setUpdateManagersList());
                    dispatch(setName(''));
                    dispatch(setSecondName(''))
                    dispatch(setSex(1))
                    dispatch(setHbDate(''))
                    dispatch(setTel(''))
                    dispatch(setMango(''))
                    dispatch(setLogin(''))
                    dispatch(setPassword(''))
                    dispatch(setFormat(0))
                    dispatch(setStartDate(''))
                    dispatch(setShedule(1))
                    dispatch(setShedule2(1))
                    dispatch(setFilledStage(''))
                    dispatch(setPhoto(''))
                    setActiveStage(1);
                }, 200)
            })
            .catch(err => {
                const status = err.response.status;
                status == 422 ? setError('Введены некоректные данные') : setError('Ошибка сервера');
                setLoad(false)
            })
    }

    return (
        <div className={s.add}>
            <div className={s.header}>
                <div className={s.conteiner_header}>
                    <p className={s.title}>Новый сотрудник</p>
                    <div onClick={handleCloseWindow} className={s.button_close}><IconClose /></div>
                </div>
                <div className={s.progress}>
                    <div onClick={handleSelectStage} id={1} className={`${s.path} ${activeStage == 1 && s.path_active} ${filledStage >= 1 && s.path_check}`}>
                        <p>Личные данные</p>
                        <Patch />
                    </div>
                    <div onClick={handleSelectStage} id={2} className={`${s.path} ${activeStage == 2 && s.path_active} ${filledStage >= 2 && s.path_check}`}>
                        <p>Условия работы</p>
                        <Patch />
                    </div>
                    <div onClick={handleSelectStage} id={3} className={`${s.path} ${activeStage == 3 && s.path_active}  ${filledStage >= 3 && s.path_check}`}>
                        <p>Фотография</p>
                        <Patch />
                    </div>
                </div>
            </div>

            <div className={s.main}>
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <PersonalData />
                </div>

                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <WorkData />
                </div>

                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <div className={s.photo}><FileLoader file={workerInfo.photo} setFile={setPhoto} /></div>
                </div>
            </div>
            <button onClick={activeStage == 3 ? handleCreateCard : handleNextStage} className={`${s.button} ${(filledStage < activeStage && activeStage !== 3) && s.button_dis}`}>{activeStage == 3 ? 'Создать карточку' : 'Далее'}{load && <LoaderButton color={'#FFFFFF'} />}</button>
            <span className={s.error}>{error}</span>
        </div>
    )
};

export default AddCard;