import s from './TeamMember.module.scss';
import penis from '../../image/penis.jpg';
import { ReactComponent as IconLevel } from '../../image/iconLevel.svg';
import { ReactComponent as IconAwards } from '../../image/iconAwards.svg';
import { ReactComponent as IconSkill } from '../../image/iconSkill.svg';
import { ReactComponent as IconDay } from '../../image/iconDay.svg';
import { ReactComponent as IconCallProg } from '../../image/iconCallProg.svg';
import { ReactComponent as IconHb } from '../../image/iconHb.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function TeamMember({index, openEdit}) {
    const [tooltip1, setTooltip1] = useState(false);
    const [tooltip2, setTooltip2] = useState(false);
    const dark = useSelector(menuSelector).dark;

    function handleOpenTooltip(e) {
        const id = e.currentTarget.id;
        
        if(id === '1') {
            setTooltip1(true);
            return
        } 

        if(id === '2') {
            setTooltip2(true);
            return
        } 
       
    }

    function handleCloseTooltip() {
        setTooltip1(false);
        setTooltip2(false);
    }

    return (
        <div onClick={openEdit} className={`${s.member} ${dark && s.member_dark}`}>
            <div className={s.header}>
                <div className={s.avatar}>
                    <div className={s.overlay}>
                        <IconHb/>
                        <p>28 сентября</p>
                    </div>
                    <img src={penis}></img>
                </div>
                <div className={`${s.add} ${dark && s.add_dark}`}>
                    <p>доб. 314</p>
                </div>
            </div>
            <p className={s.name}>Каролина Казанцева</p>
            <p className={s.level}>Новичок-звонила</p>
            <div className={`${s.progress}  ${dark && s.progress_dark}`}>
                <div style={{ width: '50%' }} className={`${s.inner}`}></div>
            </div>

            <ul className={s.indicators}>
                <li id='1' onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={s.indicator}>
                    <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${tooltip1 && s.tooltip_open} ${index === 5 && s.tooltip_left}`}>
                        <div className={s.trig}></div>
                        <div className={s.container_tooltip}>
                            <div><IconLevel/>Уровень</div>
                            <span>1</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconAwards/>Награды дня</div>
                            <span>50</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconSkill/>Навыки</div>
                            <span>5</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconDay/>Дней в Скилла</div>
                            <span>265</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconCallProg/>Разговоры</div>
                            <span>265</span>
                        </div>
                    </div>
                    <p>Прогресс в Скилла</p>
                    <span>100%</span>
                </li>

                <li id='2' onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={s.indicator}>
                <div style={{width: '246px'}} className={`${s.tooltip} ${s.tooltip_2} ${dark && s.tooltip_dark} ${tooltip2 && s.tooltip_open} ${index === 5 && s.tooltip_left2}`}>
                        <div className={s.trig}></div>
                        <div className={s.container_tooltip}>
                            <p>Пунктуальность</p>
                            <div className={s.point}></div>
                        </div>
                    </div>
                    <p>Надежность</p>
                    <span>Очень высокая</span>
                </li>

                <li className={s.indicator}>
                    <p>Активность</p>
                    <span>Средняя</span>
                </li>
            </ul>

        </div>
    )
};

export default TeamMember;