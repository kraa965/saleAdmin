import s from './SheduleTableItem.module.scss';
import avatarDef from '../../image/avatar.png';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import { ReactComponent as IconСross } from '../../image/iconСross.svg';
import { useState } from 'react';

function SheduleTableItem({dark}) {
    const [tooltipFail, setTooltipFail] = useState(false);
    const [tooltip, setTooltip] = useState(false);

    function handleOpenTooltip() {
        if(tooltip) {
            setTooltip(false)
        } else {
            setTooltip(true)
        }
    }

    function handleOpenTooltipFail() {
        if(tooltipFail) {
            setTooltipFail(false)
        } else {
            setTooltipFail(true)
        }
    }

    return (
        <div className={`${s.item} ${dark && s.item_dark}`}>
            <div className={s.manager}>
                <div className={s.avatar}>
                    <img src={avatarDef}></img>
                </div>

                <div className={`${s.block_text} ${dark && s.block_text_dark}`}>
                    <p className={s.text}>Мария Царук<sup>lvl 2</sup></p>
                    <span>5/2</span>
                </div>
            </div>
            <div className={s.progress}>
                <p className={s.text}>48 180 из 53 334 ₽</p>
                <div className={`${s.line} ${dark && s.line_dark}`}>
                <div style={{ width: '55%' }} className={`${s.line_plan} ${dark && s.line_plan_dark}`}></div>
                    <div style={{ width: '35%' }} className={s.inner}></div>
                </div>
            </div>
            <div className={s.plan}>
                <p className={s.text}>60 000</p>
            </div>
            <div className={s.bonus}>
                {/* <p className={s.text}>15 000</p> */}
                <IconСross onMouseEnter={handleOpenTooltipFail} onMouseLeave={handleOpenTooltipFail}/>
                <div className={`${s.tooltip} ${tooltipFail && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <div className={s.arrow}></div>
                    <div className={s.block_fail}>
                        <p>Опоздание на планерку</p>
                        <span>Юлия Корчагина 14 декабря в 10:32</span>
                    </div>
                    <div className={s.block_fail}>
                        <p>Опоздание на планерку</p>
                        <span>Юлия Корчагина 14 декабря в 10:32</span>
                    </div>
                </div>
            </div>
            <div className={s.shift}>
                <p className={s.text}>22 из 25</p>
                <IconTooltip onMouseEnter={handleOpenTooltip} onMouseLeave={handleOpenTooltip}/>
                <div className={`${s.tooltip} ${s.tooltip_2} ${tooltip && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <div className={s.arrow}></div>
                    <div className={s.block_tooltip}>
                        <span>24 сентября</span>
                        <p>Незапланированный выходной</p>
                    </div>
                    <div className={s.block_tooltip}>
                        <span>24 сентября</span>
                        <p>Незапланированный выходной</p>
                    </div>
                </div>
            </div>

            <div className={s.accruals}>
                <p className={s.text}>66 000</p>
            </div>
            <div className={s.profit}>
                <p>100 000</p>
            </div>
        </div>
    )
};

export default SheduleTableItem;