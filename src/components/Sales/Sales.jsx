import s from './Sales.module.scss';
import { useState, useEffect } from 'react';
import CalendarMonth from '../Calendar/CalendarMonth';
import GraphSales from '../GraphsSales/GraphsSales';
import ProgressStat from '../ProgressStat/ProgressStat';
import Clients from '../Clients/Clients';
import PlanSales from '../PlanSales/PlanSales';

const indicatorsDay = [{ title: 'Входы в личный кабинет', quantity: 189, total: 500 },
{ title: 'Открытые бизнес-планы', quantity: 105, total: 150 },
{ title: 'Бизнес-планов на консультанта', quantity: 109, total: 250 }]

const indicatorsExpert = [{ title: 'Zoom-встречи', quantity: 189, total: 500 },
{ title: 'Одобренные анкеты', quantity: 105, total: 150 },
{ title: 'Продажи', quantity: 109, total: 250 }]


function Sales() {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setAnim(true);
    }, []);

    return (
        <div className={`${s.sales} ${anim && s.anim}`}>
            <div className={s.header}>
                <p className={s.title}>Продажи</p>
                <CalendarMonth/>
            </div>
            <GraphSales/>
            <div className={s.stat}>
                <ProgressStat title={'Прогресс дня'} type={'consult'} indicators={indicatorsDay} />
                <ProgressStat title={'Эксперты'} type={'expert'} indicators={indicatorsExpert} />
            </div>
            <Clients/>
            <PlanSales/>
        </div>
    )
};

export default Sales;