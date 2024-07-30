import { useEffect, useState } from 'react';
import s from './WidgetEndWork.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setClientId } from '../../store/reducer/Client/slice';
//selector
import { selectorApp } from '../../store/reducer/App/selector';
//utils
import { handleDatePlan } from '../../utils/dates';
//component
import Timer from '../../utils/Timer';
import AnimEnd from '../AnimEnd/AnimEnd';


const WidgetEndWork = ({ planTime, planZoom, setWidget, endType, setEndType }) => {
    const [anim, setAnim] = useState(false);
    const [timer, setTimer] = useState(3);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const time = new Date();
    time.setSeconds(time.getSeconds() + 2);

    useEffect(() => {
        setAnim(true)
    }, []);

    useEffect(() => {
        localStorage.removeItem('widget');
        localStorage.removeItem('prevWidget');
        localStorage.removeItem('comment');
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        localStorage.removeItem('screenShots');  
        dispatch(setHeight(316));
    }, []);

    useEffect(() => {
        if (timer == 0) {

            setTimeout(() => {
                setWidget('')
            }, 1000)
           
            setTimeout(() => {
                setEndType('');
            }, 1800);
        }
    }, [timer]);



    return (
        <div className={`${s.container} ${anim && s.container_anim}`}>
             <AnimEnd/>
            {planZoom && endType == '' && <p>Zoom запланирован {handleDatePlan(planTime)}</p>}
            {!planZoom && endType == '' && <p>Контакт запланирован {handleDatePlan(planTime)}</p>}
            {endType == 'reject' && <p>Клиент отказался от сотрудничества</p>}
            {endType == 'handOver' && <p>Клиент передан </p>}
           
            <div className={s.progress}>
                <div style={{ width: `${(3 - timer) * 100 / 3}%` }}></div>
            </div>

            <Timer expiryTimestamp={time} setTimer={setTimer} status={'end'} />
        </div>
    )
};

export default WidgetEndWork;