import { useEffect, useState } from 'react';
import s from './TeamMemberSceleton.module.scss';
import Loader from '../../Loader/Loader';
import { menuSelector } from '../../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';

const TeamMemberSceleton = () => {
    const dark = useSelector(menuSelector).dark
    return (
        <div   className={`${s.member} ${dark && s.member_dark}`}>
        <div className={s.header}>
            <div className={s.avatar}>
            <Loader/>
                <div className={s.overlay}>
                 
                </div>
                <img></img>
            </div>
            <div className={`${s.add} ${dark && s.add_dark}`}>
            <Loader/>
            </div>
        </div>
        <p className={s.name}></p>
        <div className={s.level}>
        <Loader/>
        </div>
        <div className={`${s.progress}  ${dark && s.progress_dark}`}>
        <Loader/>
        </div>

        <ul className={s.indicators}>
            <li id='1' className={s.indicator}>
                <p>Прогресс в Скилла</p>
                <span><Loader/></span>
            </li>

            <li id='2' className={s.indicator}>
                <p>Надежность</p>
                <span><Loader/></span>
            </li>

            <li className={s.indicator}>
                <p>Активность</p>
                <span><Loader/></span>
            </li>
        </ul>

    </div>





       /*  <li className={`${s.item}`}>
            <div className={`${s.number}`}>
               <div><Loader/></div>
            </div>
            <div className={`${s.name}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.outgo}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.total}`}>
            <div><Loader/></div>
            </div>
            <div className={`${s.position}`}>
            <div className={s.position_1}><Loader/></div>
            <span><Loader/></span>
            </div>

            <div className={`${s.action}`}>
                <button className={s.button_2}>
                <Loader/>
                </button>
                <button  className={s.button}>
                <Loader/>
                </button>
            </div>
           
        </li> */
    )
};

export default TeamMemberSceleton;