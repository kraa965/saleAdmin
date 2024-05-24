import s from './EditCard.module.scss';
import { ReactComponent as IconClose } from '../../../image/iconCloseModal.svg';
import { ReactComponent as IconPancel } from '../../../image/iconPancel.svg';
import { ReactComponent as IconDone } from '../../../image/iconDone3.svg';
import { ReactComponent as IconDelete } from '../../../image/iconDelete.svg';
import AvatarDef from '../../../image/avatarDef2.png';
import { useEffect, useState } from 'react';
import PersonData from './PersonData';
import WorkData from './workData';
import EventCard from '../EventCard/EventCard';
import FireModal from '../FireModal/FireModal';
import FileLoaderCircle from '../../FileLoaderCircle/FileLoaderCircle';
import { useSelector } from 'react-redux';
//utils
import { handleReliability, handleActive } from '../../../utils/TeamMemberProgress';
//Api
import { editManager, restoreManager } from '../../../Api/Api';
import { useDispatch } from 'react-redux';
//selector
import { addWorkSelector } from '../../../store/reducer/addWorker/selector';
import { mangerUpdateSelector } from '../../../store/reducer/mangerUpdate/selector';
//slice
import { setUpdateManagersList } from '../../../store/reducer/mangerUpdate/slice';
import { setManagerUpdate, setManagerUpdateAvatar } from '../../../store/reducer/mangerUpdate/slice';
//components 
import LoaderButton from '../../LoaderButton/LoaderButton';

const EditCard = ({ setAddWindow, setAnim, manager, restoreWindow }) => {
    const role = document.getElementById('root_leader').getAttribute('role');
    const [save, setSave] = useState(true);
    const [load, setLoad] = useState(false);
    const [fireModal, setFireModal] = useState(false);
    const [fireModalAnim, setFireModalAnim] = useState(false);
    const [pancelView, setPancelView] = useState(false);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [avatarFile, setAvatarFile] = useState({});
    const [tab, setTab] = useState(1);
    const [positionMain, setPositionMain] = useState(0);
    const [name, setName] = useState(manager.name || '');
    const [surName, setSurName] = useState(manager.surname || '');
    const [avatar, setAvatar] = useState(manager.avatar_mini || '');
    const [sex, setSex] = useState(1);
    const [hbDate, setHbDate] = useState(manager.hb || '');
    const [tel, setTel] = useState(manager.phone || '');
    const [mango, setMango] = useState(manager.mango_phone || '');
    const [login, setLogin] = useState(manager.login || '');
    const [password, setPassword] = useState('');
    const [comment, setComment] = useState(manager.comment || '');
    const [shedule1, setShedule1] = useState(1);
    const [shedule2, setShedule2] = useState(JSON.parse(localStorage.getItem('shedule2')) || 1);
    const [shedule3, setShedule3] = useState(JSON.parse(localStorage.getItem('shedule3')) || 1);
    const [offense, setOffense] = useState(0);
    const [error, setError] = useState('');
    const managerUpdate = useSelector(mangerUpdateSelector).managerUpdate;
    const managerUpdateAvatar = useSelector(mangerUpdateSelector).managerUpdateAvatar;
    const dispatch = useDispatch()
    console.log(manager)

    useEffect(() => {
        setSave(false)
    }, []);

    useEffect(() => {
        setPassword(manager.password_vis) 
    }, [manager])

    useEffect(() => {
        setError('')
    }, [name, surName, avatar, sex, hbDate, tel, mango, login, password, comment, shedule1, shedule2, shedule3, offense, fireModal])


    useEffect(() => {
        if (manager.id == managerUpdate.id) {
            setName(managerUpdate.name);
            setSurName(managerUpdate.surname);
            setAvatar(managerUpdateAvatar);
            setHbDate(managerUpdate.hb);
            setTel(managerUpdate.phone);
            setMango(managerUpdate.mango_phone);
        }
    }, [managerUpdate])

    useEffect(() => {
        manager.work_schedule_graph.forEach((el, i) => {

            if (manager.work_schedule_graph.length == 1) {
                setShedule1(el.work_schedule_id)
                setShedule2(el.work_schedule_id)
                setShedule3(el.work_schedule_id)
            }
            if (manager.work_schedule_graph.length == 2 && i == 0) {
                setShedule1(el.work_schedule_id)
            }

            if (manager.work_schedule_graph.length == 2 && i == 1) {
                setShedule2(el.work_schedule_id)
                setShedule3(el.work_schedule_id)
            }

            if (manager.work_schedule_graph.length == 3 && i == 0) {
                setShedule1(el.work_schedule_id)
            }

            if (manager.work_schedule_graph.length == 3 && i == 1) {
                setShedule2(el.work_schedule_id)
            }


            if (manager.work_schedule_graph.length == 3 && i == 2) {
                setShedule3(el.work_schedule_id)
            }
        })
    }, [manager])

    /*  useEffect(() => {
         avatarFile.file && setAvatarEdit(false)
     }, [avatarFile.file]) */

    useEffect(() => {
        const eventFailLength = manager.events.filter(el => el.event_id !== 11 && el.event_id !== 12);
        setOffense(eventFailLength.length)
    }, [manager])

    const handleSelectTab = (e) => {
        const id = e.currentTarget.id;
        setTab(id);

        if (id == '1') {
            setPositionMain(0);
            return
        }

        if (id == '2') {
            console.log(id)
            setPositionMain(-482);
            return
        }

        if (id == '3' && role !== 'frmanager') {
            setPositionMain(-482 * 2);
            return
        }

        if (id == '3' && role == 'frmanager') {
            setPositionMain(-482);
            return
        }
    }

    const handlePancelView = () => {
        setPancelView(true);
    }

    const handlePancelHiden = () => {
        setPancelView(false);
    }

    const handleClose = () => {
        setAnim(false);
        setTimeout(() => {
            setAddWindow(false)
        }, 200)
    }

    const handleFireModal = () => {
        setFireModal(true);
        setTimeout(() => {
            setFireModalAnim(true);
        })
    }
    const handleAvatarEdit = () => {
        if (avatarEdit) {
            setAvatarEdit(false)
            setAvatarFile({})
        } else {
            setAvatarEdit(true)
        }
    }

    const handleSaveNewAvatar = () => {
        setAvatarEdit(false);
        setPancelView(false);
    }

    const handleDeleteNewAvatar = () => {
        setAvatarFile({})
    }

    const handleSaveChange = () => {
        setLoad(true)
        const formData = new FormData();
        formData.append('id', manager.id);
        formData.append('name', name);
        formData.append('surname', surName)
        formData.append('sex', sex)
        formData.append('phone', tel)
        formData.append('hb', hbDate)
        formData.append('mango_phone', mango)
        formData.append('login', login)
        password !== '' && formData.append('password', password)
        comment !== '' && formData.append('comment', comment)
        /* formData.append('is_remote', workerInfo.format) */
        /*   formData.append('manager_start_date', workerInfo.startDate) */
        formData.append('work_schedule_id', shedule2)
        formData.append('next_work_schedule_id', shedule3)
        avatarFile.file && formData.append('avatar_mini', avatarFile.fileSend, avatarFile.name)
        console.log(name, surName, sex, tel, hbDate, mango, login, password, shedule2, shedule3, avatarFile, comment)

        editManager(formData)
            .then(res => {
                console.log(res)
                const manager = res.data.manager;
                dispatch(setManagerUpdate(manager));
                dispatch(setManagerUpdateAvatar(avatarFile.file ? avatarFile.file : avatar));
                setTimeout(() => {
                    dispatch(setUpdateManagersList());
                }, 100)
                setTimeout(() => {
                    setLoad(false);
                    handleClose();
                }, 800)
            })
            .catch(err => {
                const status = err.response.status;
                status == 422 ? setError('Введены некоректные данные') : setError('Ошибка сервера');
                setLoad(false)
            })
    }


    const handleRestore = () => {
        setLoad(true)
        restoreManager({ id: manager.id, manager_start_date: manager.manager_start_date, from_base: true })
            .then(res => {
                console.log(res);
                handleClose();

                setTimeout(() => {
                    dispatch(setUpdateManagersList());
                }, 100)

                setTimeout(() => {
                    setLoad(false)
                }, 200)
            })
            .catch(err => {
                const status = err.response.status;
                status == 422 ? setError('Введены некоректные данные') : setError('Ошибка сервера');
                setLoad(false)
            })
    }

    return (
        <div id={manager.id} className={s.edit}>
            <div onClick={handleClose} className={s.button_close}>
                <IconClose />
            </div>
            <div className={s.header}>
                <div onMouseEnter={handlePancelView} onMouseLeave={handlePancelHiden} className={s.avatar}>
                    <div className={`${s.overlay}  ${avatarEdit && s.overlay_hiden}`}>
                        <img src={avatarFile.file ? avatarFile.file : avatar == '' ? AvatarDef : avatar}></img>
                    </div>

                    {avatarEdit && <FileLoaderCircle file={avatarFile} setFile={setAvatarFile} />}

                    <div onClick={handleAvatarEdit} className={`${s.close} ${!avatarFile.file && avatarEdit && s.close_view}`}>
                        <IconClose />
                    </div>

                    <div onClick={handleSaveNewAvatar} className={`${s.save} ${avatarFile.file && avatarEdit && s.save_view}`}>
                        <IconDone />
                    </div>

                    <div onClick={handleDeleteNewAvatar} className={`${s.delete} ${avatarFile.file && avatarEdit && s.delete_view}`}>
                        <IconDelete />
                    </div>

                    <div onClick={handleAvatarEdit} className={`${s.pancel} ${pancelView && !avatarEdit && s.pancel_view}`}>
                        <IconPancel />
                    </div>

                </div>

                <div className={s.container_header}>
                    <h3 className={s.title}>{manager.name} {manager.surname}</h3>
                    {role !== 'frmanager' && <p className={s.text}>
                        {manager.level === 1 && `Новичок-звонила`}
                        {manager.level === 2 && `Подающий надежды`}
                        {manager.level === 3 && `Ученик джедая`}
                        {manager.level === 4 && `Джедай`}
                        {manager.level === 5 && `Мастер продаж`}
                        {manager.level === 6 && `Гуру продаж`}
                        {manager.level === 7 && `Крепкий орешек`}
                        {manager.level === 8 && `Баба Гануш`}
                        {manager.level === 9 && `Магистр продаж`}
                        {manager.level === 10 && `Бесспорный лидер`}
                        {manager.level === 11 && `Волк с Уолл-стрит`}
                        {manager.level === 12 && `Бог продаж`}
                        <sup> lvl {manager.level}</sup></p>
                    }
                    {role !== 'frmanager' && <div className={s.progress}>
                        <div style={{ width: `${manager.precent}%` }}></div>
                    </div>
                    }
                    <div className={s.stats}>
                        <div className={s.stat}>
                            <p className={s.text_2}>Надежность</p>
                            <p className={s.sub}>{handleReliability(manager.reliability)}</p>
                        </div>
                        {role !== 'frmanager' && <div className={s.stat}>
                            <p className={s.text_2}>Активность</p>
                            <p className={s.sub}>{handleActive(manager.teamwork)}</p>
                        </div>
                        }
                    </div>
                </div>
            </div>

            <div className={s.tabs}>
                <div onClick={handleSelectTab} id='1' className={`${s.tab} ${tab == 1 && s.tab_active} ${restoreWindow && s.tab_disabled}`}>Личные данные</div>
                {!restoreWindow && role !== 'frmanager' && <div onClick={handleSelectTab} id='2' className={`${s.tab} ${tab == 2 && s.tab_active}`}>Условия работы</div>}
                {!restoreWindow && <div onClick={handleSelectTab} id='3' className={`${s.tab} ${tab == 3 && s.tab_active}`}>События</div>}
            </div>

            <div className={s.main}>
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <PersonData name={name} setName={setName} surName={surName} setSurName={setSurName}
                        sex={sex} setSex={setSex} hbDate={hbDate} setHbDate={setHbDate}
                        tel={tel} setTel={setTel} mango={mango} setMango={setMango}
                        login={login} setLogin={setLogin} password={password} setPassword={setPassword}
                        comment={comment} setComment={setComment} restoreWindow={restoreWindow} />
                </div>
                {role !== 'frmanager' && <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <WorkData shedule1={shedule1} shedule2={shedule2} setShedule2={setShedule2} shedule3={shedule3}
                        setShedule3={setShedule3} ip={manager.work_ip} dateStart={manager.manager_start_date} offense={offense} />
                </div>
                }
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <EventCard events={manager.events} />
                </div>
            </div>

            <div className={s.buttons}>
                {!restoreWindow && <button onClick={handleFireModal} className={`${s.button} ${s.button_delete}`}>Уволить</button>}
                {!restoreWindow && <button onClick={handleSaveChange} className={`${s.button} ${save && s.button_success}`}>
                    {save ? <p>Изменения сохранены</p> : <p>Сохранить изменения</p>}
                    {!save && load && <LoaderButton color={'#FFFFFF'} />}
                    {save && <IconDone />}
                </button>}
                {restoreWindow && <button onClick={handleRestore} className={`${s.button}`}>
                    <p>Востановить сотрудника</p>
                    {load && <LoaderButton color={'#FFFFFF'} />}
                </button>}
                <span className={s.error}>{error}</span>
            </div>
            {fireModal && <FireModal fireModalAnim={fireModalAnim} setFireModalAnim={setFireModalAnim} setFireModal={setFireModal} id={manager.id} handleClose2={handleClose} />}
        </div>
    )
};

export default EditCard;