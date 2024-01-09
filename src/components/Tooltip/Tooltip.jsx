import s from './Tooltip.module.scss';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { menuSelector } from '../../store/reducer/menu/selector';

function Tooltip({ type, mistakes, day }) {
    const dark = useSelector(menuSelector).dark;
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    return (
        <>
            {type === 'fault' &&
                <div className={`${s.tooltip} ${anim && s.tooltip_open} ${dark && s.tooltip_dark} ${s.tooltip_fault}`}>
                    {mistakes.map(el => {
                        return <p className={s.textred}>{el.name}</p>
                    })}
                    {/* <p className={s.textsub}>Юлия Корчагина в 10:32</p> */}
                    <div className={`${s.trig} ${dark && s.trig_dark}`}></div>
                </div>
            }

            {type === 'default' &&
                <div className={`${s.tooltip} ${s.tooltip_default} ${anim && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <p>Плановые значения рассчитываются исходя из количества человек работающих в конкретный день</p>
                    <div className={`${s.trig} ${s.trig_def} ${dark && s.trig_dark}`}></div>
                </div>
            }

            {type === 'consult' &&
                <div className={`${s.tooltip} ${s.tooltip_consult} ${anim && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <p>Плановые значения рассчитываются исходя из количества человек работающих в конкретный месяц</p>
                    <div className={`${s.trig} ${s.trig_consult} ${dark && s.trig_dark}`}></div>
                </div>
            }

            {type === 'expert' &&
                <div className={`${s.tooltip} ${s.tooltip_expert} ${anim && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                    <p>Плановые значения рассчитываются исходя из количества человек работающих в конкретный {day ? 'день' : 'месяц'}</p>
                    <div className={`${s.trig} ${s.trig_expert} ${dark && s.trig_dark}`}></div>
                </div>
            }
        </>
    )
};

export default Tooltip;