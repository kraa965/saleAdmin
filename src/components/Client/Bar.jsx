import s from './Client.module.scss';
import TooltipBar from '../TooltipBar/TooltipBar';
import { useState } from 'react';
import { handleCompareDate } from '../../utils/dates';

const Bar = ({ id, el, step, dark }) => {
    const [tooltip, setTooltip] = useState(false);
    const lastStudyLog = step == 2 ? id == 2 && el.data.logs?.slice(0, 1)[0] : false;
   const trainingRegistrReq = lastStudyLog && !handleCompareDate(lastStudyLog.comment.slice(-11)) ? true : false;


    const handleOpenTooltip = () => {
        setTooltip(true);
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }

    return (
        <div id={id} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}
            className={`${s.bar} ${dark && s.bar_dark} ${(el.status == 'done' || step == id) && step !== 0 && s.green} ${step == 2 && id == 2 && trainingRegistrReq && s.yellow} ${el.status == '' && s.bar_block} ${step == 0 && el.status !== 'cancel' && s.bar_block} ${el.status == 'cancel' && s.red}`}>
            {tooltip && <TooltipBar step={id} status={el.status} logs={el.data.logs} />}
        </div>
    )
};

export default Bar;