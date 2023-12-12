import s from './ManagerResult.module.scss';
import avatarDef from '../../image/avatar.png';
import { ReactComponent as CallIcon } from '../../image/iconcall.svg';
import { ReactComponent as WarningYellowIcon } from '../../image/warningYellow.svg';
import { ReactComponent as IconMicro } from '../../image/iconMicro.svg';
import { ReactComponent as IconPause } from '../../image/iconPause.svg';
import { ReactComponent as ArrowDown } from '../../image/arrowDown.svg';
import { ReactComponent as ArrowNarrow } from '../../image/arrowNarrow.svg';
import { ReactComponent as WarningRed } from '../../image/warningRed.svg';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip/Tooltip';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';

function ManagerResult({ name, surname, avatar, status, bp, bpPlan, call, callPlan, level, mistakes, timeEnd, loader, id, managerStatus, rate} ) {
    const dark = useSelector(menuSelector).dark;
    const [tooltip, setTooltip] = useState(false);
    const [colorLine, setColorLine] = useState('');
    const [anim, setAnim] = useState(false);
    const [statusNow, setStatusNow] = useState('');

    useEffect(() => {
        if(id === managerStatus.manager_id) {
            setStatusNow(managerStatus.work_status)
        } else {
            setStatusNow(status);
        }
    },[managerStatus, loader])
    

    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }

    useEffect(() => {
        if(bp / bpPlan <= 0.5) {
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
    },[statusNow])


    return (
        <div className={`${s.manager} ${dark && s.dark}`}>
            {loader && <Loader/>}
            <div className={s.container_left}>
                <div className={s.avatar}>
                    <img src={avatar}></img>
                </div>
                <div className={s.container_result}>
                    <div className={s.text}>
                        <p>{name} {surname} <sup>lvl {level}</sup>
                            {rate === -1 && <ArrowDown/>}
                            {rate === 0 && <ArrowNarrow/>}
                        </p>
                        <div style={{display: status === 'holiday' && 'none'}} className={s.bp}>
                            {mistakes.length > 0 &&
                                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                                    <WarningRed />
                                </div>
                            }

                            {tooltip && <Tooltip type={'fault'} mistakes={mistakes} />}
                            {bp} из {bpPlan}
                        </div>
                    </div>
                    <div style={{display: status === 'holiday' && 'none'}} className={`${s.progress} ${dark && s.progress_dark}`}>
                        <div style={{ width: `${bp / bpPlan * 100}%`}} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green}`}></div>
                    </div>
                </div>
            </div>

            <div className={s.container_right}>
                <div style={{display: status === 'holiday' && 'none'}} className={s.calls}>
                    <div className={`${s.callsnum} ${dark && s.callsnum_dark}`}>
                        <CallIcon />
                        <p>{call} из {callPlan}</p>
                    </div>
                    <div className={`${s.callsprogress} ${dark && s.callsprogress_dark}`}>
                        <div style={{ width: `${call / callPlan * 100}%` }} className={`${s.callinner}`}></div>
                    </div>
                </div>

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

                {statusNow === 'not_work' &&
                    <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark}`}>
                        <p>Готовится начать день</p>
                    </div>
                }

                {statusNow === 'pause' &&
                    <div className={`${s.status} ${s.status_pause} ${anim && s.anim} ${dark && s.status_pause_dark} ${s.status_active} ${dark && s.status_active_dark}`}>
                        {/*  <div style={{ width: '90%' }} className={`${s.pauseProgress} ${dark && s.pauseProgress_dark}`}></div> */}
                        <p>Пауза{/* <sup>{10} мин</sup> */}</p>
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

                {statusNow === 'end_work' &&
                    <div className={`${s.status} ${anim && s.anim} ${dark && s.status_dark} `}>
                        <p>День завершен<sup>{timeEnd?.slice(0,5)}</sup></p>
                    </div>
                }
            </div>
        </div>
    )
};

export default ManagerResult;