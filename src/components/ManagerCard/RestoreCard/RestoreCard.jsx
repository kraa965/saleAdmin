import s from './RestoreCard.module.scss';
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
import { editManager } from '../../../Api/Api';
import { useDispatch } from 'react-redux';
//selector
import { addWorkSelector } from '../../../store/reducer/addWorker/selector';


const EditCard = ({ setAddWindow, setAnim, manager }) => {
    const [save, setSave] = useState(true);
    const [load, setLoad] = useState(false);
  ;
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
    const managerUpdate = useSelector(addWorkSelector).managerUpdate;
    const managerUpdateAvatar = useSelector(addWorkSelector).managerUpdateAvatar;
    const dispatch = useDispatch()
    console.log(avatar, avatarFile.file)

    useEffect(() => {
        setSave(false)
    }, []);	

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

        if (id == '3') {
            setPositionMain(-482 * 2);
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


   



    return (
        <div id={manager.id} className={s.edit}>
            <div onClick={handleClose} className={s.button_close}>
                <IconClose />
            </div>
            <div className={s.header}>
                <div onMouseEnter={handlePancelView} onMouseLeave={handlePancelHiden} className={s.avatar}>
                    <div className={`${s.overlay}  ${avatarEdit && s.overlay_hiden}`}>
                        <img src={avatar == '' ? AvatarDef : avatar}></img>
                    </div>

                </div>

                <div className={s.container_header}>
                    <h3 className={s.title}>{manager.name} {manager.surname}</h3>
                    <p className={s.text}>
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
                    <div className={s.progress}>
                        <div style={{ width: `${manager.precent}%` }}></div>
                    </div>
                    <div className={s.stats}>
                        <div className={s.stat}>
                            <p className={s.text_2}>Надежность</p>
                            <p className={s.sub}>{handleReliability(manager.reliability)}</p>
                        </div>
                        <div className={s.stat}>
                            <p className={s.text_2}>Активность</p>
                            <p className={s.sub}>{handleActive(manager.teamwork)}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.buttons}>
                <button  className={`${s.button} ${s.button_delete}`}>Уволить</button>
                <button  className={`${s.button} ${save && s.button_success}`}>
                   <p>Сохранить изменения</p>
                </button>
                <span className={s.error}>{/* {error} */}</span>
            </div>
           
        </div>
    )
};

export default EditCard;