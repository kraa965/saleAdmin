import { useEffect, useState, useRef } from 'react';
import s from './Profile.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import GraphProfile from '../GraphProfile/GraphProfile';
import WorkTime from '../WorkTime/WorkTime';
import ProfileModal from '../ProfileModal/ProfileModal';
import {ReactComponent as IconPlus} from '../../image/iconPlus.svg';

function Profile({ setOpenProfile, name, surname, avatar, level, dark }) {
    const [anim, setAnim] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const profileRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100);
    }, []);

    function handleClose() {
        setAnim(false)
        setTimeout(() => {
            setOpenProfile(false);
        }, 400)
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function closeModal(e) {
        e.stopPropagation()
        if (profileRef.current && !profileRef.current.contains(e.target) && !openModal) {
            handleClose();
            return
        }

        if(modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [openModal]);

    function handleOpenModal(e) {
        const id = e.currentTarget.id;
        setOpenModal(true) 
        setModalType(id)
    }

    return (
        <div className={`${s.window}`}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div ref={profileRef} className={`${s.profile} ${dark && s.profile_dark} ${anim && s.profile_anim}`}>
                <div className={`${s.overlay_profile} ${openModal && s.overlay_profile_open}`}></div>
                <div onClick={handleClose} className={s.close}>
                    <IconClose />
                </div>
                <div className={s.header}>
                    <div className={s.container}>
                        <div className={s.avatar}>
                            <img src={avatar}></img>
                        </div>

                        <div className={s.container_column}>
                            <p className={s.name}>{name} {surname}</p>
                            <p className={s.level}>
                                {level === 1 && 'Новичок звонила'}
                                {level === 2 && 'Подающий надежды'}
                                {level === 3 && 'Ученик джедая'}
                                {level === 4 && 'Джедай'}
                                {level === 5 && 'Мастер продаж'}
                                {level === 6 && 'Гуру продаж'}
                                {level === 7 && 'Крепкий орешек'}
                                {level === 8 && 'Баба Гануш'}
                                {level === 9 && 'Магистр продаж'}
                                {level === 10 && 'Бесспорный лидер'}
                                {level === 11 && 'Волк с Уолл-стрит'}
                                {level === 12 && 'Бог продаж'}
                            </p>
                        </div>
                    </div>

                    <div className={s.bage}>
                        <p></p>
                    </div>
                </div>
                <div className={s.container_graph}>
                    <GraphProfile dark={dark}/>
                    <GraphProfile dark={dark}/>
                    <GraphProfile dark={dark}/>
                    <GraphProfile dark={dark}/>
                </div>
                <WorkTime dark={dark}/>
                <div className={s.buttons}>
                    <button id='resort' onClick={handleOpenModal} className={`${s.resort} ${dark && s.resort_dark}`}>Время отдыха</button>
                    <button id='event' onClick={handleOpenModal} className={s.event}><IconPlus/> Создать событие</button>
                </div>
            </div>
            {openModal && <ProfileModal modalRef={modalRef} setOpenModal={setOpenModal} type={modalType} dark={dark}/>}
        </div>

    )
};

export default Profile;