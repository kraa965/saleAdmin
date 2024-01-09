import { useEffect, useState, useRef } from 'react';
import s from './Profile.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import avatarDef from '../../image/avatar.png';

function Profile({ setOpenProfile, name, surname, avatar, level }) {
    const [anim, setAnim] = useState(false);
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

    function closeModal(e) {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);


    return (
        <div className={`${s.window}`}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div ref={modalRef} className={`${s.profile} ${anim && s.profile_anim}`}>
                <div onClick={handleClose} className={s.close}>
                    <IconClose  />
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
            </div>
        </div>

    )
};

export default Profile;