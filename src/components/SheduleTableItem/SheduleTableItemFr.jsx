import s from './SheduleTableItem.module.scss';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import { ReactComponent as IconСross } from '../../image/iconСross.svg';
import avatarDef from '../../image/avatarDef.png';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { useState, useEffect } from 'react';
import { setDayOfWeek } from '../../utils/dates';

function SheduleTableItemFr({ dark, manager, sheet, date }) {
    const [tooltipFail, setTooltipFail] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [sum, setSum] = useState(sheet?.earnings_actual || 0);

    const salePercent = sheet.percent_sum;


    function handleOpenTooltip() {
        if (tooltip) {
            setTooltip(false)
        } else {
            setTooltip(true)
        }
    }

    function handleOpenTooltipFail() {
        if (tooltipFail) {
            setTooltipFail(false)
        } else {
            setTooltipFail(true)
        }
    }


    return (
        <div style={{ display: sheet.shift_worked <= 0 && date.monthIndex <= 0 ? 'none' : '' }} className={`${s.item} ${dark && s.item_dark}`}>
            <div className={s.manager}>
                <div className={s.avatar}>
                    <img src={manager.avatar === '' ? avatarDef : manager.avatar}></img>
                </div>

                <div className={`${s.block_text} ${dark && s.block_text_dark}`}>
                    <div><p className={`${s.text} ${s.text_2}`}>{manager.name} {manager.surname}</p>
                        <sup>lvl {manager.level}</sup>
                    </div>
                    <span>{manager.schedule.id === 1 ? '5/2' : '2/2'}</span>
                </div>
            </div>
          
            <div className={`${s.plan} ${s.plan_fr}`}>
                <p className={s.text}>{addSpaceNumber(sheet.plan)}</p>
            </div>
            <div className={`${s.bonus}`}>
                {sheet.mistakes.length >= 2 && <IconСross onMouseEnter={handleOpenTooltipFail} onMouseLeave={handleOpenTooltipFail} />}
                {sheet.mistakes.length < 2 && <p className={s.text}>{addSpaceNumber(sheet.bonus)}</p>}
                <div className={`${s.tooltip} ${tooltipFail && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <div className={s.arrow}></div>

                    {sheet?.mistakes?.map((el) => {
                        return <div className={s.block_fail}>
                            <p>{el?.type?.name}</p>
                            <span>{setDayOfWeek(el.date_created.slice(0, 10)).day} {setDayOfWeek(el.date_created.slice(0, 10)).fMonth2} {el.date_created.slice(-9, -3)}</span>
                        </div>
                    })}

                </div>
            </div>

            <div className={`${s.bonus}`}>
                <p>{salePercent > 0 ? addSpaceNumber(salePercent) : ''}</p>
            </div>

            <div className={s.shift}>
                <div className={s.shifts}>
                    <p className={s.text}>{sheet.shift_worked - (sheet.shift_half * 0.5)} из {sheet.shift_number}</p>
                </div>
                {sheet?.mistakes?.filter((el) => el?.type?.name === 'Незапланированный выходной за свой счет' ||
                    el?.type?.name === 'Плановый выходной за свой счет').length > 0
                    && <IconTooltip onMouseEnter={handleOpenTooltip} onMouseLeave={handleOpenTooltip} />}

                {sheet?.mistakes?.length > 0 && <div className={`${s.tooltip} ${s.tooltip_2} ${tooltip && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <div className={s.arrow}></div>
                    {sheet?.mistakes?.map((el) => {
                        if (el?.type?.name === 'Незапланированный выходной за свой счет' || el?.type?.name === 'Плановый выходной за свой счет')
                            return <div className={s.block_tooltip}>
                                <span>{setDayOfWeek(el.date_created.slice(0, 10)).day} {setDayOfWeek(el.date_created.slice(0, 10)).fMonth2}</span>
                                <p>{el?.type?.name}</p>
                            </div>

                    })}

                </div>
                }
            </div>

            <div className={`${s.shift} ${s.shift_half}`}>
                <div className={s.shifts}>
                    <p className={s.text}>{sheet.shift_half == 0 ? '' : sheet.shift_half}</p>
                </div>
            </div>

            <div className={`${s.shift} ${s.shift_vacation}`}>
                <div className={s.shifts}>
                    <p className={s.text}>{sheet.shift_vacation == 0 ? '' : sheet.shift_vacation}</p>
                </div>
            </div>

            {/*  <div className={s.accruals}>
                <p className={s.text}>{addSpaceNumber(sheet.earnings_actual)}</p>
            </div> */}
            <div className={s.profit}>
                <p>{addSpaceNumber(sum)}</p>
            </div>
        </div>
    )
};

export default SheduleTableItemFr;