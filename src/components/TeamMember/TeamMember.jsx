import s from './TeamMember.module.scss';
import { ReactComponent as IconLevel } from '../../image/iconLevel.svg';
import { ReactComponent as IconAwards } from '../../image/iconAwards.svg';
import { ReactComponent as IconSkill } from '../../image/iconSkill.svg';
import { ReactComponent as IconDay } from '../../image/iconDay.svg';
import { ReactComponent as IconCallProg } from '../../image/iconCallProg.svg';
import { ReactComponent as IconHb } from '../../image/iconHb.svg';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
//utils
import { handleDateLog } from '../../utils/dates';
import { TeamMemberProgress, handleReliability, handleActive } from '../../utils/TeamMemberProgress';
import avatarDef from '../../image/avatarDef2.png';
//selector
import { mangerUpdateSelector } from '../../store/reducer/mangerUpdate/selector';


function TeamMember({ index, el, level, id, progress, reliability, reliabilityModal, teamwork, setManager, setAddWindow, setEditWindow, setRestoreWindow, setTypeEdit, type }) {
    const role = document.getElementById('root_leader').getAttribute('role');
    const [anim, setAnim] = useState(false);
    const [name, setName] = useState(el?.name || '');
    const [surname, setSurname] = useState(el?.surname || '');
    const [avatar, setAvatar] = useState(el?.avatar_mini || '');
    const [hb, sethb] = useState(el?.hb || '');
    const [mango, setMango] = useState(el?.mango_phone || '');
    const [tooltip1, setTooltip1] = useState(false);
    const [tooltip2, setTooltip2] = useState(false);
    const [progressTotal, setProgressTotal] = useState(0);
    const [precent, setPrecent] = useState(0);
    const dark = useSelector(menuSelector).dark;
    const managerUpdate = useSelector(mangerUpdateSelector)?.managerUpdate;
    const managerUpdateAvatar = useSelector(mangerUpdateSelector)?.managerUpdateAvatar;
    const skillsArray = Object.values(progress?.skills).flat();
    const skillsNum = skillsArray?.length;
    /* const reliabilityModalRemote = reliabilityModal?.filter(el => el.id !== 2 && el.id !== 6 && el.id !== 7); */
   /*  console.log(managerUpdate, managerUpdateAvatar) */
    useEffect(() => {
        setAnim(true)
    }, [])

    useEffect(() => {
        if (id == managerUpdate?.id) {
            setName(managerUpdate.name);
            setSurname(managerUpdate.surname);
            setAvatar(managerUpdateAvatar);
            sethb(managerUpdate.hb);
            setMango(managerUpdate.mango_phone);
        }
    }, [managerUpdate])

    useEffect(() => {
        const data = TeamMemberProgress(level, progress.total_bp, skillsNum);
        setProgressTotal(data.progressTotal);
        setPrecent(data.percent);
    }, [progress])

    function handleOpenTooltip(e) {
        const id = e.currentTarget.id;

        if (id === '1') {
            setTooltip1(true);
            return
        }

        if (id === '2') {
            setTooltip2(true);
            return
        }

    }

    function handleCloseTooltip() {
        setTooltip1(false);
        setTooltip2(false);
    }

    function handleOpenEditWindow(e) {
        console.log('cliiick')
        const id = e.currentTarget.id;
        /* type !== 'fired' && */ setManager({ ...el, precent, reliability, teamwork });
        /* type !== 'fired' && */ setAddWindow(false);
       /*  type !== 'fired' && */ setEditWindow(true);
        /* type !== 'fired' && */ setTypeEdit(true);
        type == 'fired' && setRestoreWindow(true)
    }

    return (
        <div id={id} onClick={handleOpenEditWindow} className={`${s.member} ${anim && s.member_anim}  ${dark && s.member_dark}`}>
            <div className={s.header}>
                <div className={s.avatar}>
                    <div className={s.overlay}>
                        <IconHb />
                        <p>{handleDateLog(hb).main}</p>
                    </div>
                    <img src={avatar == '' ? avatarDef : avatar}></img>
                </div>
                <div className={`${s.add} ${dark && s.add_dark}`}>
                    <p>доб. {mango}</p>
                </div>
            </div>
            <p className={s.name}>{name} {surname}</p>
            {role !== 'frmanager' && <p className={s.level}>
                {level === 1 && `Новичок-звонила`}
                {level === 2 && `Подающий надежды`}
                {level === 3 && `Ученик джедая`}
                {level === 4 && `Джедай`}
                {level === 5 && `Мастер продаж`}
                {level === 6 && `Гуру продаж`}
                {level === 7 && `Крепкий орешек`}
                {level === 8 && `Баба Гануш`}
                {level === 9 && `Магистр продаж`}
                {level === 10 && `Бесспорный лидер`}
                {level === 11 && `Волк с Уолл-стрит`}
                {level === 12 && `Бог продаж`}
            </p>
            }
            {role !== 'frmanager' && <div className={`${s.progress}  ${dark && s.progress_dark}`}>
                <div style={{ width: `${precent}%` }} className={`${s.inner}`}></div>
            </div>
            }

            <ul className={s.indicators}>
                {role !== 'frmanager' && <li id='1' onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={s.indicator}>
                    <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${tooltip1 && s.tooltip_open} ${index % 5 == 0 && s.tooltip_left}`}>
                        <div className={s.trig}></div>
                        <div className={s.container_tooltip}>
                            <div><IconLevel />Уровень</div>
                            <span>{level}</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconAwards />Награды дня</div>
                            <span>{progress?.total_bp}</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconSkill />Навыки</div>
                            <span>{skillsNum}</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconDay />Дней в Скилла</div>
                            <span>{progress?.days_in_skilla}</span>
                        </div>

                        <div className={s.container_tooltip}>
                            <div><IconCallProg />Разговоры</div>
                            <span>{progress?.total_calls}</span>
                        </div>
                    </div>
                    <p>Прогресс в Скилла</p>
                    <span>{Math.ceil(progressTotal)}%</span>
                </li>
                }

                <li id='2' onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} className={s.indicator}>
                    <div className={`${s.tooltip} ${s.tooltip_2} ${dark && s.tooltip_dark} ${tooltip2 && s.tooltip_open} ${index % 5 == 0 && s.tooltip_left2}`}>
                        <div className={s.trig}></div>
                        {reliabilityModal?.map(el => {
                            return <div className={s.container_tooltip}>
                                <p>
                                    {el.id === 2 && 'Пунктуальность'}
                                    {el.id === 1 && 'Отсутствие внеплан. выходных'}
                                    {el.id === 3 && 'Завершение дня'}
                                    {el.id === 5 && 'Вежливость'}
                                    {el.id === 6 && 'Использование телефона'}
                                    {el.id === 4 && 'Сдача экзаменов'}
                                    {el.id === 7 && 'Дресс-код'}
                                    {el.id === 8 && 'Прочее'}
                                    {el.id === 13 && 'Позднее начало рабочего дня'}
                                    {el.id === 14 && 'Звонок на посторонние номера'}
                                </p>
                                <div className={`${s.point} ${el.percent < 100 && el.percent > 96 && s.point_orange} ${el.percent < 96 && s.point_red}`}></div>
                            </div>


                            /*     <div className={`cardteam__container_reliability cardteam__container_reliability_${theme ? 'dark' : ''}`}>
                                    <div className='reliability__container'>
                                        <p> 
                                        </p>
                                        <div className={`reliability__indicator reliability__indicator_${el.percent < 100 && el.percent > 96 ? 'orange' : el.percent < 96 ? 'red' : ''}`}></div>
                                    </div>
                                </div> */
                        })}


                    </div>
                    <p>Надежность</p>
                    <span>{handleReliability(reliability)}</span>
                </li>

                {role !== 'frmanager' && <li className={s.indicator}>
                    <p>Активность</p>
                    <span>{handleActive(teamwork)}</span>
                </li>
                }
            </ul>

        </div>
    )
};

export default TeamMember;