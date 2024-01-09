import s from './ManagerExam.module.scss';
import avatar from '../../image/avatar.png';
import { useState } from 'react';
import { setHomeWorkModal } from '../../store/reducer/skills/slice';
import { useDispatch } from 'react-redux';

function ManagerExam({type}) {
    const [tooltip, setToolTip] = useState(0)
    const dispatch = useDispatch();
    function handleOpenTooltip(e) {
        const id = e.currentTarget.id;
        setToolTip(Number(id))
    }

    function handleCloseTooltip() {
        setToolTip(0)
    }

    function handleOpenHomework() {
        dispatch(setHomeWorkModal(true));
    }

    return (
        <div className={s.exam}>
            <div className={s.block}>
                <div className={s.avatar}>
                    <img src={avatar}></img>
                </div>
                <p className={s.name}>Денис Дубков</p>
            </div>
            <div className={s.progress}>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} id='1' className={`${s.bar} ${s.green}`}>
                    <div className={`${s.tooltip} ${tooltip == 1 && s.tooltip_active}`}>
                        <p>Начал изучать 7 ноября</p>
                        <div></div>
                    </div>
                </div>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} id='2' className={`${s.bar} ${s.red}`}>
                    <div style={{left: '-85px'}} className={`${s.tooltip} ${tooltip == 2 && s.tooltip_active}`}>
                        <p>Домашка отправлена 10 ноября</p>
                        <div></div>
                    </div>
                </div>
                <div onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} id='3' className={`${s.bar}`}>
                    <div style={{left: '-106px'}} className={`${s.tooltip} ${tooltip == 3 && s.tooltip_active}`}>
                        <p>Сдача домашки просрочена 10 ноября</p>
                        <div></div>
                    </div>
                </div>
            </div>
            {type !== 'ready' && <button onClick={handleOpenHomework} className={s.button_check}>Проверить домашку</button>}
            {type === 'ready' && <div className={s.buttons}>
                                     <button className={s.button_retake}>Пересдача</button>
                                     <button className={s.button_passed}>Сдал</button>
                                 </div>
            }
        </div>
    )
};

export default ManagerExam;