import s from './Statistic30.module.scss';
//API 
import { getLeaderProgress } from '../../../Api/Api';
import { useEffect, useState } from 'react';


const Progress = ({ name, plan, stat, type }) => {
    const [percent, setPercent] = useState(0);
    const [color, setColor] = useState('')

    useEffect(() => {
        const result = Math.ceil(stat / plan * 100);
        setPercent(result)

        if (result < 50) {
            setColor('red');
        } else if (result < 90 && result >= 50) {
            setColor('yellow');
        } else if (result >= 90) {
            setColor('green');
        }

    }, [stat, plan])

    return (
        <div className={s.progress}>
            <div className={s.header}>
                <p>{name} <sup>{percent} %</sup></p>
                {type !== 'all' && <p>{stat}/{plan}</p>}
            </div>

            {type !== 'per' && <div className={s.bar}>
                <div style={{ width: `${percent}%` }} className={`${s.inner} ${color == 'red' && s.red} ${color == 'yellow' && s.yellow} ${color == 'green' && s.green}`}></div>
            </div>}
        </div>
    )
}

const Statistic30 = () => {
    const role = document.getElementById('root_leader').getAttribute('role');
    const [zoom, setZoom] = useState(0)
    const [zoomPlan, setZoomPlan] = useState(0)
    const [anketa, setAnketa] = useState(0)
    const [anketaPlan, setAnketaPlan] = useState(0)
    const [sales, setSales] = useState(0)
    const [salesPlan, setSalesPlan] = useState(0)
    const [lk, setLk] = useState(0)
    const [lkPlan, setLkPlan] = useState(0)
    const [bp, setBp] = useState(0)
    const [bpPlan, setBpPlan] = useState(0)
    const [bpPerManager, setBpPerManager] = useState(0)
    const [bpPerManagerPlan, setBpPerManagerPlan] = useState(0)

    useEffect(() => {
        getLeaderProgress()
            .then(res => {
                console.log(res)
                const data = res.data.data;
                const experts = data.experts.progress;
                const consultant = data.business_consultants;
                setZoom(experts.zoom.num)
                setZoomPlan(experts.zoom.plan)
                setAnketa(experts.anketa.num)
                setAnketaPlan(experts.anketa.plan)
                setSales(experts.sales.num)
                setSalesPlan(experts.sales.plan)
                setLk(consultant.login.num)
                setLkPlan(consultant.login.plan)
                setBp(consultant.bp.num)
                setBpPlan(consultant.bp.plan)
                setBpPerManager(consultant.bp_per_manager.num)
                setBpPerManagerPlan(consultant.bp_per_manager.plan)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={s.stat30}>
            <h3>Результаты за последние 30 дней</h3>
            <div className={s.container}>
                {role == 'frmanager' && <Progress plan={100} name={'Общий прогресс'} stat={(((sales / 20) * 100) + ((anketa / anketaPlan) * 100) + ((zoom / zoomPlan) * 100)) / 3} type={'all'} />}
                {role == 'frmanager' && <Progress plan={zoomPlan} name={'Zoom-встречи'} stat={zoom} />}
                {role == 'frmanager' && <Progress plan={anketaPlan} name={'Одобренные анкеты'} stat={anketa} />}
                {role == 'frmanager' && <Progress plan={20} name={'Продажи'} stat={sales} />}

                {role == 'leader' && <Progress plan={100} name={'Общий прогресс'} stat={(((lk / lkPlan) * 100) + ((bp / bpPlan) * 100)) / 2} type={'all'} />}
                {role == 'leader' && <Progress plan={lkPlan} name={'Входы в личный кабинет'} stat={lk} />}
                {role == 'leader' && <Progress plan={bpPlan} name={'Открытые бизнес-планы'} stat={bp} />}
               {/*  {role == 'leader' && <Progress plan={bpPerManagerPlan} name={'Открытых бизнес-планов на консультанта'} stat={bpPerManager} type={'per'}/>} */}
            </div>
        </div>
    )
}

export default Statistic30;