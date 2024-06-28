import { useState } from 'react';
import s from './Widget.module.scss';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//selectors
import { selectorWidget } from '../../store/reducer/Widget/selector';
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setDisabledMyClients } from '../../store/reducer/App/slice';
//components
import WidgetCall from '../WidgetCall/WidgetCall';
import WidgetWork from '../WidgetWork/WidgetWork';
import WidgetWorkZoom from '../WidgetWork/WidgetWorkZoom';
import WidgetPlan from '../WidgetPlan/WidgetPlan';
import WidgetEndWork from '../WidgetEndWork/WidgetEndWork';
import WidgetReject from '../WidgetReject/WidgetReject';
import HandOverWidget from '../HandOverClient/HandOverClient';
import WidgetWorkComment from '../WidgetWork/WidgetWorkComment';
//utils
import { handleEmptyTask } from '../../utils/dates';

/* stages =[bp, viewBp (ознакомился с БП, road status == finished), ReqZoom (запросил zoom последний лог type == ReqZoom), setZoom (записался на Zoom road status == finished), 
finishZoom (road status == finished)] , noZoom (зумм не состоялся setZoom road status == finished берем последний лог и смотрим что время лога меньше чем текущего времени на пол часа ), 
sendAnketa(смотрим если последний лог type == SendForm), finishAnketa(road status == finished), rejectAnketa]
 */

const Widget = ({ loadClose }) => {
    const road = Object.values(useSelector(selectorWork).road).slice(4, 10);
    const client_id = useSelector(selectorClient).client_id;
    const zoom_status = useSelector(selectorWork).zoom_status;
    const next_connect = useSelector(selectorWork).next_connect;
    const last_connect = useSelector(selectorWork).last_connect;
    const zoom_date = useSelector(selectorWork).zoom_date;
    const stageRoad = useSelector(selectorClient).stage;
    const [stageZoom, setStageZoom] = useState(false);
    const [stageSendAnketa, setStageSendAnketa] = useState(false);
    const [stageAnketa, setStageAnketa] = useState(false);
    const [stageTraining, setStageTraining] = useState(false);
    const [widget, setWidget] = useState(JSON.parse(localStorage.getItem('widget')) || '');
    const [prevWidget, setPrevWidget] = useState(JSON.parse(localStorage.getItem('prevWidget')) || '');
    const [empty, setEmpity] = useState(true);
    const [planWithoutCall, setPlanWithoutCall] = useState(false);
    const [planTime, setPlanTime] = useState('');
    const [planZoom, setPlanZoom] = useState(false);
    const [endType, setEndType] = useState('');
    const widgetHeight = useSelector(selectorWidget).height;
    const dispatch = useDispatch();
    const callStatus = useSelector(selectorApp).callStatus;


    useEffect(() => {
        if (widget == '') {
            setPrevWidget('')
            dispatch(setHeight(316))
        }
    }, [widget]);



    useEffect(() => {
        if (callStatus.action == 'new_call_out') {
            setWidget('call');
            setPrevWidget('call');
            localStorage.setItem('widget', JSON.stringify('call'));
            localStorage.setItem('prevWidget', JSON.stringify('call'));
            JSON.parse(localStorage.getItem('widget')) == 'plan' && setWidget('plan');
            return
        }
    }, [callStatus]);

    console.log(widget)

    useEffect(() => {
        setWidget('');
        setPrevWidget('');
        localStorage.removeItem('widget');
        localStorage.removeItem('prevWidget');
        localStorage.removeItem('comment');
        localStorage.removeItem('tab');
        localStorage.removeItem('sms');
        localStorage.removeItem('screenShots');
        dispatch(setHeight(316));
    }, [client_id])

    useEffect(() => {
        if (widget == 'zoom' || widget == 'planZoom' || widget == 'call' || widget == 'plan' || widget == 'cancelZoom' || widget == 'reject' || widget == 'handOver') {
            dispatch(setDisabledMyClients(true));
            return
        }

        if (widget == 'end') {
            dispatch(setDisabledMyClients(false));
        }

        if (widget == '') {
            dispatch(setDisabledMyClients(false));
        }
    }, [widget])


    useEffect(() => {
        if (stageRoad == 'setZoom' || zoom_status == 2) {
            setStageZoom(true);
        } else {
            setStageZoom(false);
        }

        if (stageRoad == 'sendAnketa') {
            setStageSendAnketa(true)
        } else {
            setStageSendAnketa(false)
        }

        if (stageRoad == 'finishAnketa' || stageRoad == 'signContract' || stageRoad == 'prepaid' || stageRoad == 'ReqTraining' || stageRoad == 'finishTraining' || stageRoad == 'access') {
            setStageAnketa(true);
        } else {
            setStageAnketa(false);
        }

        if (stageRoad == 'ReqTraining') {
            setStageTraining(true);
        } else {
            setStageTraining(false)
        }

    }, [stageRoad, zoom_status]);

    useEffect(() => {
        if (next_connect == '0000-00-00 00:00:00'/* (handleEmptyTask(next_connect) || next_connect == '0000-00-00 00:00:00') && handleEmptyTask(zoom_date) */) {
            setEmpity(true)
        } else {
            setEmpity(false)
        }
    }, [last_connect, next_connect]);

    return (
        <div style={{ height: `${widgetHeight}px` }} className={`${s.widget}`}>
            {widget === '' && <WidgetCall setWidget={setWidget} setPrevWidget={setPrevWidget} stageZoom={stageZoom} zoomDate={zoom_date} stageSendAnketa={stageSendAnketa}
                stageAnketa={stageAnketa} stageTraining={stageTraining} empty={empty} loadClose={loadClose} setPlanWithoutCall={setPlanWithoutCall}
            />}
            {widget === 'call' && <WidgetWork setWidget={setWidget} setPrevWidget={setPrevWidget} setPlanWithoutCall={setPlanWithoutCall}/>} 
            {widget === 'comment' && <WidgetWorkComment setWidget={setWidget} setPrevWidget={setPrevWidget} setPlanWithoutCall={setPlanWithoutCall}/>}
            {widget === 'zoom' && <WidgetWorkZoom setWidget={setWidget} setPrevWidget={setPrevWidget} setPlanWithoutCall={setPlanWithoutCall} />}
            {widget === 'plan' && <WidgetPlan setWidget={setWidget} setPrevWidget={setPrevWidget} type={'call'} planWithoutCall={planWithoutCall} setPlanTime={setPlanTime} setPlanZoom={setPlanZoom} />}
            {widget === 'planZoom' && <WidgetPlan setWidget={setWidget} type={'zoom'} planWithoutCall={planWithoutCall} setPlanTime={setPlanTime} setPlanZoom={setPlanZoom} />}
            {widget == 'end' && <WidgetEndWork planTime={planTime} planZoom={planZoom} setWidget={setWidget} endType={endType} setEndType={setEndType} />}
            {widget == 'cancelZoom' && <WidgetReject setWidget={setWidget} type={'zoom'} setStageZoom={setStageZoom} setEndType={setEndType} />}
            {widget == 'reject' && <WidgetReject setWidget={setWidget} setPrevWidget={setPrevWidget} prevWidget={prevWidget} type={'reject'} setStageZoom={setStageZoom} setEndType={setEndType} />}
            {widget == 'handOver' && <HandOverWidget setWidget={setWidget} prevWidget={prevWidget} setEndType={setEndType} />}
        </div>
    )
};

export default Widget;