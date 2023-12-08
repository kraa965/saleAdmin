import s from './TooltipBar.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconDone } from '../../image/iconDone.svg';
import { ReactComponent as IconDone2 } from '../../image/iconDone2.svg';
import { ReactComponent as IconTime } from '../../image/iconTime.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function TooltipBar({ type, sign }) {
    const [anim, setAnim] = useState(false);
    const dark = useSelector(menuSelector).dark;
 
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })

    }, [type]);
    return (
        <>
            {type === '1' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_1}`}>
                    <IconDone />
                    <div className={s.container}>
                        <p className={s.text}>Внесена предоплата</p>
                        <p className={s.text2}>На расчетный счет</p>
                        <p className={s.sub}>7 ноября в 12:45 Юлия Корчагина</p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

            {type === '1fail' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_1_fail}`}>
                    <IconClose />
                    <div className={s.container}>
                        <p className={s.text}>Возврат предоплаты</p>
                        <p className={s.sub}>7 ноября в 12:45 Юлия Корчагина</p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

            {type === '2' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_2}`}>
                    <IconTime />
                    <div className={s.container}>
                        <p className={s.text}>Запланировано обучение</p>
                        <p className={s.text2}>Клиент записался на 25 ноября </p>
                        <p className={s.sub}>7 ноября в 12:45</p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }
            
            {type === '2fail' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_2_fail}`}>
                    <IconClose />
                    <div className={s.container}>
                        <p className={s.text}>Обучение отменено</p>
                        <p className={s.text2}>Клиент отменил запись</p>
                        <p className={s.sub}>17 ноября в 12:45</p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

            {type === '3' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_3}`}>
                    <IconDone />
                    <div className={s.container}>
                        <p className={s.text}>Сумма договора подтверждена</p>
                        <p className={s.sub}>7 ноября в 12:45 Юлия Корчагина </p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

            {type === '4' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${sign === 1 ? s.tooltip_4 : s.tooltip_4_1}`}>
                    <IconDone />
                    <div className={s.container}>
                        <p className={s.text}>Обучение пройдено</p>
                        {sign === 1 && <p className={s.text2}>Акт подписан в личном кабинете</p>}
                        {sign === 1 && <p className={s.sub}>7 ноября в 12:45</p>}
                        {sign === 0 && <p className={s.text2}>Акт подписан на бумажном носителе</p>}
                        {sign === 0 && <p className={s.sub}>7 ноября в 12:45 Юлия Корчагина</p>}
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

            {type === '5' &&
                <div className={`${s.tooltip} ${dark && s.tooltip_dark} ${anim && s.anim} ${s.tooltip_5}`}>
                    <IconDone2 />
                    <div className={s.container}>
                        <p className={s.text}>Средства поступили на счет</p>
                        <p className={s.text2}>Дата поступления средств 6 ноября</p>
                        <p className={s.sub}>7 ноября в 12:45 Юлия Корчагина</p>
                    </div>
                    <div className={s.trig}></div>
                </div>
            }

        </>
    )
};

export default TooltipBar;