import s from './ProgressStat.module.scss';
import { ReactComponent as TooltipIcon } from '../../image/tooltipIcon.svg';
import IndicatorDay from '../IndicatorDay/IndicatorDay';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip/Tooltip';
import { useState } from 'react';

function ProgressStat({ title, type, indicators, loader }) {
    const dark = useSelector(menuSelector).dark;
    const [tooltip, setTooltip] = useState(false);
    const arrStat = Object.entries(indicators)

    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }
    return (
        <div /* style={{padding: (type === 'expert' || type === 'consult') && '40px'}} */ className={`${s.progress} ${dark && s.progress_dark}`}>
            <div className={s.header}>
                <p>{title}</p>
                <div style={{ cursor: 'pointer' }} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    <TooltipIcon />
                </div>
                {tooltip && <Tooltip type={type} />}
            </div>
            <div className={s.indicators}>
                {arrStat.map(el => {
                    return <IndicatorDay title={el[0]} quantity={el[1].plan === 0 ? 0 : el[1].num} total={el[1].plan > 0 ? el[1].plan < 4 ? 4 : el[1].plan : 0} loader={loader}/>
                })}
            </div>
            {type === 'expert' &&
                <div className={s.expert}>
                    <div className={s.block}>
                        <p>Средний чек</p>
                        <p>420 250 руб</p>
                    </div>
                    <div className={s.block}>
                        <p>Время принятия решения</p>
                        <p>2 мес 1 нед</p>
                    </div>
                </div>
            }
        </div>
    )
};

export default ProgressStat;