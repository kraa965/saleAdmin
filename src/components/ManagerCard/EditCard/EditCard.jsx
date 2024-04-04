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

const EditCard = ({ setAddWindow, setAnim }) => {
    const [save, setSave] = useState(true);
    const [fireModal, setFireModal] = useState(false);
    const [fireModalAnim, setFireModalAnim] = useState(false);
    const [pancelView, setPancelView] = useState(false);
    const [avatarEdit, setAvatarEdit] = useState(false);
    const [avatarFile, setAvatarFile] = useState({});
    const [tab, setTab] = useState(1);
    const [positionMain, setPositionMain] = useState(0);
    const [name, setName] = useState('');
    const [surName, setSurName] = useState('');
    const [sex, setSex] = useState('male');
    const [hbDate, setHbDate] = useState('1990-01-01');
    const [tel, setTel] = useState('');
    const [mango, setMango] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [comment, setComment] = useState('');
    const [shedule1, setShedule1] = useState(0);
    const [shedule2, setShedule2] = useState(0);
    const [shedule3, setShedule3] = useState(0);
    console.log(avatarFile)

    useEffect(() => {
        setSave(false)
    }, [])

    /*  useEffect(() => {
         avatarFile.file && setAvatarEdit(false)
     }, [avatarFile.file]) */

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

    return (
        <div className={s.edit}>
            <div onClick={handleClose} className={s.button_close}>
                <IconClose />
            </div>
            <div className={s.header}>
                <div onMouseEnter={handlePancelView} onMouseLeave={handlePancelHiden} className={s.avatar}>
                    <div className={`${s.overlay}  ${avatarEdit && s.overlay_hiden}`}>
                        <img src={avatarFile.file ? avatarFile.file : AvatarDef}></img>
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
                    <h3 className={s.title}>Леха Какойто пвапвп</h3>
                    <p className={s.text}>Подающий надежды <sup>lvl 2</sup></p>
                    <div className={s.progress}>
                        <div style={{ width: `${50}%` }}></div>
                    </div>
                    <div className={s.stats}>
                        <div className={s.stat}>
                            <p className={s.text_2}>Надежность</p>
                            <p className={s.sub}>Очень высокая</p>
                        </div>
                        <div className={s.stat}>
                            <p className={s.text_2}>Надежность</p>
                            <p className={s.sub}>Очень высокая</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={s.tabs}>
                <div onClick={handleSelectTab} id='1' className={`${s.tab} ${tab == 1 && s.tab_active}`}>Личные данные</div>
                <div onClick={handleSelectTab} id='2' className={`${s.tab} ${tab == 2 && s.tab_active}`}>Условния работы</div>
                <div onClick={handleSelectTab} id='3' className={`${s.tab} ${tab == 3 && s.tab_active}`}>События</div>
            </div>

            <div className={s.main}>
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <PersonData name={name} setName={setName} surName={surName} setSurName={setSurName}
                        sex={sex} setSex={setSex} hbDate={hbDate} setHbDate={setHbDate}
                        tel={tel} setTel={setTel} mango={mango} setMango={setMango}
                        login={login} setLogin={setLogin} password={password} setPassword={setPassword}
                        comment={comment} setComment={setComment} />
                </div>
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <WorkData shedule1={shedule1} shedule2={shedule2} setShedule2={setShedule2} shedule3={shedule3} setShedule3={setShedule3} />
                </div>
                <div style={{ transform: `translateX(${positionMain}px)` }} className={s.item}>
                    <EventCard />
                </div>
            </div>

            <div className={s.buttons}>
                <button onClick={handleFireModal} className={`${s.button} ${s.button_delete}`}>Уволить</button>
                <button className={`${s.button} ${save && s.button_success}`}>
                    {save ? <p>Изменения сохранены</p> : <p>Сохранить изменения</p>}
                    {save && <IconDone />}
                </button>
            </div>
            {fireModal && <FireModal fireModalAnim={fireModalAnim} setFireModalAnim={setFireModalAnim} setFireModal={setFireModal} />}
        </div>
    )
};

export default EditCard;