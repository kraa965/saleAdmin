import s from './TooltipBar.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconDone } from '../../image/iconDone.svg';
import { ReactComponent as IconDone2 } from '../../image/iconDone2.svg';
import { ReactComponent as IconTime } from '../../image/iconTime.svg';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { handleDateLog, handleDateStudy } from '../../utils/dates';
import { addSpaceNumber } from '../../utils/addSpaceNumber';

function TooltipBar({ status, step, logs }) {
    const [anim, setAnim] = useState(false);
    const dark = useSelector(menuSelector).dark;
    const studyCancel = step == 2 && logs[0]?.type == 'CancelTraining' ? true : false;
    const prePaySum = logs[0]?.sum

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [step, status]);

    return (
        <div className={`${s.tooltip} ${(step == 3 || step == 5)  && status == 'done' && s.tooltip_1} ${step == 1 && status == 'cancel' && s.tooltip_2} ${dark && s.tooltip_dark} ${anim && s.anim}`}>
            {status == 'done' && step !== 2 && step !== 5 && <IconDone />}
            {status == 'done' && step == 5 && <IconDone2 />}
            {step == 2 && status == 'done' && <IconTime />}
            {(status == 'cancel' || studyCancel) && <IconClose />}
            <div className={s.container}>
                {step == 1 && status == 'done' && <p className={s.text}>Внесена предоплата {prePaySum && `${addSpaceNumber(prePaySum)} руб`}</p>}
                {step == 1 && status == 'cancel' && <p className={s.text}>Возврат предоплаты </p>}
                {step == 2 && status == 'done' && <p className={s.text}>Запланировано обучение</p>}
                 {step == 2 && status == 'cancel' && <p className={s.text}>Обучение отменено</p>}
                {step == 3 && status == 'done' && <p className={s.text}>Сумма договора подтверждена</p>}
                {step == 4 && status == 'done' && <p className={s.text}>Обучение пройдено</p>}
                {step == 5 && status == 'done' && <p className={s.text}>Средства поступили на счет</p>}
                <div className={s.logs}>
                    {logs.map((el, index) => {
                        return <div style={{ display: (el.type == "ClientFinishTraining" || el.type == 'lkReqAccessCheck') && (index == 1 || index == 2) ? 'none' : '' }} className={s.log}>
                            {el.type == 'prepay' && el.is_online == 1 && index == 0 && <p className={s.text2}>В личном кабинете</p>}
                            {el.type == 'prepay' && el.is_online == 0 && index == 0 && <p className={s.text2}>На расчетный счет</p>}
                            {el.type == 'prepay' && el.is_online == 1 && index == 1 && <p className={s.text2}>Клиент внес предоплату в личном кабинете</p>}
                            {el.type == 'prepay' && el.is_online == 0 && index == 1 && <p className={s.text2}>Клиент внес предоплату на расчетный счет</p>}
                            {el.type == 'ReqTraining' && <p className={s.text2}>Клиент записался на {handleDateStudy(el?.comment?.slice(-11))}</p>}
                            {el.type == 'CancelTraining' && <p className={s.text2}>Клиент отменил запись</p>}
                            {el.type == 'lkReqAccessCheck' && index == 0 && <p className={s.text2}>Акт подписан</p>}
                            {el.type == 'ClientPayFull' && <p className={s.text2}>Дата поступления средств {handleDateLog(el.date).main}</p>}
                            <p className={s.sub}>{handleDateLog(el.date).sub} {el.person ? `${el.person.name} ${el.person.surname}` : ''}</p>

                        </div>
                    })}
                </div>



            </div>
            <div className={s.trig}></div>
        </div>
    )
};

export default TooltipBar;