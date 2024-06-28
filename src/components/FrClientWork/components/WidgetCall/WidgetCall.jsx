import s from './WidgetCall.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconPhone } from '../../image/work/widget/iconPhone.svg';
import { ReactComponent as IconGoToBack } from '../../image/work/widget/IconGoToBack.svg';
import { ReactComponent as IconPersonAdding } from '../../image/work/widget/IconPersonAdding.svg';
import { ReactComponent as IconCalendar } from '../../image/work/widget/iconCalendar.svg';
import { ReactComponent as IconZoom } from '../../image/work/widget/iconZoom.svg';
import { ReactComponent as IconCancleZoom } from '../../image/work/widget/iconCancleZoom.svg';
import { ReactComponent as IconAnketa } from '../../image/work/widget/iconAnketa.svg'; 
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
import { ReactComponent as IconCancel } from '../../image/work/widget/iconCancel.svg'; 
import { ReactComponent as IconComment } from '../../image/work/widget/iconComment.svg';
//Api
import { callClient } from '../../Api/Api';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorApp } from '../../store/reducer/App/selector';
//slice
import { setAnketaOpen } from '../../store/reducer/Work/slice';
//components
import WidgetCallSceleton from '../WidgetCallSceleton/WidgetCallSceleton';
import ModalConfirm from './ModalConfirm/ModalConfirm';
//utils
import { handleDatePlan, handleDateZoomDiff2, handleDateAnketa } from '../../utils/dates';

const WidgetCall = ({ setWidget, setPrevWidget, stageZoom, zoomDate, stageSendAnketa, stageAnketa, stageTraining, empty, loadClose, setPlanWithoutCall }) => {
    const next_connect = useSelector(selectorWork).next_connect;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const client_main_number = useSelector(selectorClient).client_main_number;
    const anketaAcceptDate = useSelector(selectorClient).anketaAcceptDate;
    const callStatus = useSelector(selectorApp).callStatus;
    const [anim, setAnim] = useState(false);
    const [modalCancel, setModalCancel] = useState(false);
    const [dialing, setDialing] = useState(false);
    const dispatch = useDispatch();
    console.log(next_connect)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })

    }, []);

    /*  useEffect(() => {
         message.action !== 'call_client' && setDialing(false);
     }, [message]); */

    const handleCall = () => {
        localStorage.removeItem('widget');
        localStorage.removeItem('prevWidget');
        localStorage.removeItem('comment');
        localStorage.removeItem('screenShots')
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        setDialing(true);
      /*   callClient(client_main_number)
            .then(res => console.log(res))
            .catch(err => console.log(err)); */
        setWidget('call');
        setPrevWidget('call');
        localStorage.setItem('prevWidget', JSON.stringify('call'));
    }

    const handleZoom = () => {
        localStorage.removeItem('widget');
        localStorage.removeItem('prevWidget');
        localStorage.removeItem('comment');
        localStorage.removeItem('screenShots')
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        setWidget('zoom');
        setPrevWidget('zoom');
        localStorage.setItem('widget', JSON.stringify('zoom'))
        localStorage.setItem('prevWidget', JSON.stringify('zoom'));
    }

    const handlePlanContact = () => {
        setPlanWithoutCall(true);
        setTimeout(() => {
            setWidget('plan');
            localStorage.setItem('widget', JSON.stringify('plan'));

        })
    }

    const handleCancelZoom = () => {
        setWidget('cancelZoom');
        setPrevWidget('cancelZoom');
    }

    const handleHandOver = () => {
        setWidget('handOver')
    }

    const handleOpenAnketa = () => {
        dispatch(setAnketaOpen(true))
    }

    const handleOpenCancelModal = () => {
        setModalCancel(true)
    }

    const handleReject = () => {
        setWidget('reject')
    }

    const handleComment = () => {
        setWidget('comment')
    }

    return (
        <div className={`${s.call} ${anim && s.call_anim}`}>
            <div className={s.container}>
                {!empty && stageZoom && <p className={s.text}>{'Zoom запланирован'} {handleDatePlan(zoom_date)}</p>}
                {!empty && !stageZoom && <p className={s.text}>{`Контакт запланирован`} {handleDatePlan(next_connect)}</p>}
                {stageZoom && handleDateZoomDiff2(zoomDate) && <button onClick={handleZoom} className={s.button}><p>Начать Zoom-встречу</p><IconZoom /></button>}
                {stageSendAnketa && <button onClick={handleOpenAnketa} className={s.button}><p>Проверить анкету</p><IconAnketa /></button>}
                <button onClick={handleCall} className={`${s.button} ${((stageZoom && handleDateZoomDiff2(zoomDate)) || stageSendAnketa) && s.button_minor} ${dialing && s.button_anim}`}><p>
                    {!dialing && `Позвонить`}
                    {dialing && `Звоним...`}
                </p><IconPhone /></button>
                {stageTraining && <button onClick={handleOpenCancelModal} className={`${s.button} ${s.button_minor}`}><p>Отменить обучение</p><IconClose /></button>}
                {stageAnketa && <button onClick={handleOpenAnketa} className={s.button_small}><p>{'Анкета'} {handleDateAnketa(anketaAcceptDate)}</p></button>}
            </div>
            <div className={s.buttons}>
                <div className={s.buttons_container}>
                    {stageZoom && <button onClick={handleCancelZoom} className={s.button_small}><p>Отменить Zoom</p> <IconCancleZoom /></button>}
                    {!stageZoom && <button onClick={handlePlanContact} className={s.button_small}><p>Запланировать контакт</p> <IconCalendar /></button>}
                    <button onClick={handleHandOver} className={s.button_small}><p>Передать клиента</p> <IconPersonAdding /></button>
                </div>
                <div className={s.buttons_container}>
                    <button onClick={handleReject} className={s.button_small}><p>Клиент отказался</p> <IconCancel /></button>
                    <button onClick={handleComment} className={s.button_small}><p>Комментарий</p> <IconComment /></button>
                </div>
            </div>

            {modalCancel && <ModalConfirm setModalCancel={setModalCancel} />}

            <div className={`${s.sceleton} ${!loadClose && s.sceleton_hiden}`}>
                <WidgetCallSceleton />
            </div>
        </div>
    )
};

export default WidgetCall;
