import s from './ManagerResult.module.scss';
import avatarDef from '../../image/avatarDef.png';
import { ReactComponent as CallIcon } from '../../image/iconcall.svg';
import { ReactComponent as IconCallExpert } from '../../image/iconCallExpert.svg';
import { ReactComponent as IconLogin } from '../../image/iconLogin.svg';
import { ReactComponent as IconNewClient } from '../../image/iconNewClient.svg';
import { ReactComponent as WarningYellowIcon } from '../../image/warningYellow.svg';
import { ReactComponent as IconMicro } from '../../image/iconMicro.svg';
import { ReactComponent as IconPause } from '../../image/iconPause.svg';
import { ReactComponent as IconPauseSmall } from '../../image/iconPauseSmall.svg';
import { ReactComponent as ArrowDown } from '../../image/arrowDown.svg';
import { ReactComponent as ArrowNarrow } from '../../image/arrowNarrow.svg';
import { ReactComponent as WarningRed } from '../../image/warningRed.svg';
import { ReactComponent as IconCallTime } from '../../image/iconCallTime.svg';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip/Tooltip';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import Profile from '../Profile/Profile';

function ManagerResult({ name, surname, avatar, status, bp, bpPlan, call, callPlan,
    level, mistakes, timeEnd, loader, id, managerStatus, rate, newClients, typeManager,
    schedule, pause, pauseDuration, type, loginNum, loginPlan, lids, lidsPlan, activePoint, callTime,
    zoom, anketa, shedule }) {

    const dark = useSelector(menuSelector).dark;
    const [tooltip, setTooltip] = useState(false);
    const [colorLine, setColorLine] = useState('');
    const [anim, setAnim] = useState(false);
    const [statusNow, setStatusNow] = useState('');
    const [openProfile, setOpenProfile] = useState(false);
    const [timer, setTimer] = useState(pauseDuration);
    const [pauseUpdate, setPauseUpdate] = useState(pause || 0)


    useEffect(() => {
        if (id === managerStatus.manager_id) {
            setStatusNow(managerStatus.work_status)
        } else {
            setStatusNow(status);
        }
    }, [managerStatus, loader]);

    function handleOpenProfile() {
        setOpenProfile(true)
    }


    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }

    useEffect(() => {
        if (bp / bpPlan <= 0.5) {
            setColorLine('');
            return
        }
        if (bp / bpPlan > 0.5 && bp / bpPlan < 1) {
            setColorLine('yellow');
            return
        }
        if (bp / bpPlan >= 1) {
            setColorLine('green');
            return
        }
    }, [bp, bpPlan]);




    useEffect(() => {
        setAnim(false)
        setTimeout(() => {
            setAnim(true)
        })
    }, [statusNow])


    return (
        <>
            <div onClick={handleOpenProfile} className={`${s.manager} ${dark && s.dark}`}>
                {loader && <Loader />}
                <div className={s.container_left}>
                    <div className={s.avatar}>
                        <img src={avatar === '' ? avatarDef : avatar}></img>
                    </div>
                    <div className={`${s.container_result} ${s.container_result_expert}`}>
                    {typeManager !== 'expert' && <div className={s.text}>
                            {typeManager === 'expert' && <p>{name} {surname} <sup>{'5/2'}</sup></p>}
                            {typeManager !== 'expert' && <p>{name} {surname} <sup>{schedule === 1 ? '5/2' : '2/2'}</sup></p>}
                            {/*  {rate === -1 && <ArrowDown/>}
                            {rate === 0 && <ArrowNarrow/>} */}

                            <div style={{ display: status === 'holiday' && 'none' }} className={`${s.bp} ${typeManager == 'expert' && s.bp_expert}`}>
                                {mistakes.length > 0 &&
                                    <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                                        <WarningRed />
                                    </div>
                                }

                                {tooltip && <Tooltip type={'fault'} mistakes={mistakes} />}
                                {typeManager !== 'expert' && <p>{bp} из {bpPlan}</p>}
                            </div>
                        </div>}

                        {typeManager !== 'expert' && <div style={{ display: status === 'holiday' && 'none' }} className={`${s.progress} ${dark && s.progress_dark}`}>
                            <div style={{ width: `${bpPlan === 0 ? 0 : bp / bpPlan * 100}%` }} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green}`}></div>
                        </div>}

                        {typeManager == 'expert' && <div style={{ display: status === 'holiday' && 'none' }} className={s.progress_expert}>
                            <div className={s.block_expert}>
                                <p>Zoom <span>{zoom}/3</span></p>
                                <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                    <div style={{ width: `${zoom === 0 ? 0 : zoom / 3 * 100}%` }} className={`${s.inner} ${zoom == 2 && s.yellow} ${zoom >= 3 && s.green}`}></div>
                                </div>
                            </div>
                            <div className={s.block_expert}>
                                <p>Анкеты <span>{anketa}/2</span></p>
                                <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                    <div style={{ width: `${anketa === 0 ? 0 : anketa / 2 * 100}%` }} className={`${s.inner} ${anketa >= 2 && s.green}`}></div>
                                </div>
                            </div>

                            {/*  <div className={s.block_expert}>
                                <p>Предоплаты <span>2/1</span></p>
                                <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                    <div style={{ width: `${bpPlan === 0 ? 0 : bp / bpPlan * 100}%` }} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green}`}></div>
                                </div>
                            </div> */}

                        </div>}

                    </div>
                </div>

                <div className={s.container_right}>
                    {typeManager !== 'expert' &&
                        <div style={{ marginRight: '20px' }} className={s.block_progress}>

                            <div style={{ display: status === 'holiday' && 'none', width: '50px' }} className={`${s.calls} ${activePoint == 0 && s.calls_lid}`}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_lid}`}>
                                    средняя длительность разговоров за 3 дня
                                </div>
                                <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                    <div className={`${s.iconTime} ${callTime / 3600 >= 4 && s.iconTime_green} ${callTime / 3600 >= 3 && callTime / 3600 < 4 && s.iconTime_yellow} ${callTime / 3600 < 3 && s.iconTime_red}`}>
                                        <IconCallTime />
                                    </div>
                                    <p>{`${callTime / 3600}`.slice(0, 3)}</p>
                                </div>
                            </div>

                            <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_call}`}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_call}`}>Звонки от 1 минуты</div>
                                <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                    {typeManager === 'expert' ? <IconCallExpert /> : <CallIcon />}
                                    <p>{call}</p>
                                </div>
                                <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                    <div style={{ width: `${call / (typeManager === 'expert' ? 20 : callPlan) * 100}%` }} className={`${s.callinner}`}></div>
                                </div>
                            </div>

                            <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${activePoint == 0 && s.calls_lid}`}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_lid}`}>
                                    Новые клиенты
                                </div>
                                <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                    <IconNewClient />
                                    <p>{lids}<sup> {lidsPlan}</sup></p>
                                </div>
                                <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                    <div style={{ width: `${lids / lidsPlan * 100}%` }} className={`${s.callinner}`}></div>
                                </div>
                            </div>

                            <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_lk}`}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_lk}`}>{typeManager === 'expert' ? 'Новые клиенты взятые в работу' : 'Входы в ЛК'}</div>
                                <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                    {typeManager === 'expert' ? <IconNewClient /> : <IconLogin />}
                                    {typeManager === 'expert' && <p>{newClients}</p>}
                                    {typeManager !== 'expert' && <p>{loginNum}</p>}
                                </div>
                                <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                    <div style={{ width: `${typeManager === 'expert' ? newClients / 15 * 100 : loginNum / loginPlan * 100}%` }} className={`${s.callinner}`}></div>
                                </div>
                            </div>

                            <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_pause}`}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_pause}`}>Пауза</div>
                                <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                    <IconPauseSmall />
                                    {statusNow === 'not_work' && <p>{Math.floor(pauseUpdate / 60)} <sup>{Math.floor(pauseUpdate / 60)}</sup></p>}
                                    {statusNow !== 'not_work' && <p>{Math.floor(timer / 60)} <sup>{Math.floor(pauseUpdate / 60)}</sup></p>}
                                </div>
                                <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                    <div style={{ width: `${timer / pauseUpdate * 100}%` }} className={`${s.callinner}`}></div>
                                </div>
                            </div>


                        </div>

                    }

                    {typeManager === 'expert' && < div className={`${s.block_progress} ${s.block_expert}`}>
                        <div style={{ display: status === 'holiday' && 'none', width: '50px', marginRight: '8px' }} className={`${s.calls} ${activePoint == 0 && s.calls_lid}`}>
                            <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_lid}`}>
                                средняя длительность разговоров за 3 дня
                            </div>
                            <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                <div className={`${s.iconTime} ${callTime / 3600 >= 4 && s.iconTime_green} ${callTime / 3600 >= 3 && callTime / 3600 < 4 && s.iconTime_yellow} ${callTime / 3600 < 3 && s.iconTime_red}`}>
                                    <IconCallTime />
                                </div>
                                <p>{`${callTime / 3600}`.slice(0, 3)}</p>
                            </div>
                        </div>
                        <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_call}`}>
                            <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_call}`}>Звонки от 1.5 минут</div>
                            <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                {typeManager === 'expert' ? <IconCallExpert /> : <CallIcon />}
                                <p>{call}</p>
                            </div>
                            <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                <div style={{ width: `${call / (typeManager === 'expert' ? 20 : callPlan) * 100}%` }} className={`${s.callinner}`}></div>
                            </div>
                        </div>

                        <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_lk}`}>
                            <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_lk}`}>{typeManager === 'expert' ? 'Новые клиенты взятые в работу' : 'Входы в ЛК'}</div>
                            <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                {typeManager === 'expert' ? <IconNewClient /> : <IconLogin />}
                                {typeManager === 'expert' && <p>{newClients}</p>}
                                {typeManager !== 'expert' && <p>{loginNum}</p>}
                            </div>
                            <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                <div style={{ width: `${typeManager === 'expert' ? newClients / 15 * 100 : loginNum / loginPlan * 100}%` }} className={`${s.callinner}`}></div>
                            </div>
                        </div>

                        <div style={{ display: status === 'holiday' && 'none' }} className={`${s.calls} ${s.calls_pause}`}>
                            <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${s.tooltip_pause}`}>Пауза</div>
                            <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                                <IconPauseSmall />
                                {statusNow === 'not_work' && <p>{Math.floor(pauseUpdate / 60)} <sup>{Math.floor(pauseUpdate / 60)}</sup></p>}
                                {statusNow !== 'not_work' && <p>{Math.floor(timer / 60)} <sup>{Math.floor(pauseUpdate / 60)}</sup></p>}
                            </div>
                            <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                                <div style={{ width: `${timer / pauseUpdate * 100}%` }} className={`${s.callinner}`}></div>
                            </div>
                        </div>
                    </div>}


                    {/* <div className={`${s.status} ${dark && s.status_dark} ${s.status_active} ${dark && s.status_active_dark}`}>
                    <div style={{ width: '90%' }} className={`${s.pauseProgress} ${dark && s.pauseProgress_dark}`}></div>
                    <div className={s.iconWarning} style={{ display: 'none' }}>
                        <WarningYellowIcon />
                    </div>
                    <p style={{ display: 'none' }}>Готовится начать день</p>
                    <p style={{ display: 'none' }}>День завершен<sup>16:45</sup></p>
                    <p style={{ display: 'none' }}>Разговор<sup>6:45</sup></p>
                    <p>Пауза<sup>{10} мин</sup></p>
                    <div className={`${s.iconMicro} ${dark && s.iconMicro_dark}`}>
                        <IconMicro />
                    </div>

                    <div style={{ display: 'none' }} className={`${s.iconPause} ${dark && s.iconPause_dark}`}>
                        <IconPause />
                    </div>

                </div> */}



                    {statusNow === 'talk' &&
                        <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark} ${s.status_active} ${dark && s.status_active_dark}`}>
                            <p >Разговор{/* <sup>6:45</sup> */}</p>
                            <div className={`${s.iconMicro} ${dark && s.iconMicro_dark}`}>
                                <IconMicro />
                            </div>
                        </div>
                    }

                    {statusNow === 'in_work' &&
                        <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark} ${s.status_active} ${dark && s.status_active_dark}`}>
                            <p>В работе</p>
                        </div>
                    }

                    {statusNow === '' &&
                        <div className={`${s.status}`}>
                        </div>
                    }

                    {statusNow === 'not_work' &&
                        <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark}`}>
                            <p>День не начат</p>
                        </div>
                    }

                    {statusNow === 'pause' &&
                        <div className={`${s.status} ${s.status_pause} ${anim && s.anim} ${dark && s.status_pause_dark} ${s.status_active} ${dark && s.status_active_dark}`}>
                            {/*  {<div style={{ width: `${timer / pause * 100}%` }} className={`${s.pauseProgress} ${dark && s.pauseProgress_dark}`}></div>} */}
                            <p>Пауза

                            </p>
                            <div className={`${s.iconPause} ${dark && s.iconPause_dark}`}>
                                <IconPause />
                            </div>

                        </div>
                    }

                    {statusNow === 'holiday' &&
                        <div className={`${s.status} ${anim && s.anim}  ${dark && s.status_dark}`}>
                            <p>Выходной</p>
                        </div>
                    }

                    {statusNow === 'queue_end' &&
                        <div className={`${s.status} ${anim && s.anim}  ${dark && s.status_dark}`}>
                            <p>Очередь звонков закончилась</p>
                        </div>
                    }

                    {statusNow === 'end_work' &&
                        <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark} `}>
                            <p>Конец дня<sup>{timeEnd?.slice(0, 5)}</sup></p>
                        </div>
                    }
                </div>
            </div >
            {openProfile && <Profile setOpenProfile={setOpenProfile} name={name} surname={surname} avatar={avatar} level={level} dark={dark} type={type} id={id} setTimer={setTimer} setPauseUpdate={setPauseUpdate} bpPlan={bpPlan} shedule={shedule}/>
            }
        </>

    )
};

export default ManagerResult;