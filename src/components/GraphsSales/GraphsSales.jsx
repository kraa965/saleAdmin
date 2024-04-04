import s from './GraphSales.module.scss';
import { useSelector } from 'react-redux';
import { salesSelector } from '../../store/reducer/sales/selector';
import Graph from '../Graph/Graph';
import { menuSelector } from '../../store/reducer/menu/selector';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import Loader from '../Loader/Loader';
import { useState, useEffect } from 'react';

function GraphSales({salesTotal, loader, graphData, dailyAvarage, experts}) {
    const [progressNow, setProgressNow] = useState(0);
    const [colorLine, setColorLine] = useState('');
    const monthName = useSelector(salesSelector).nameMonth2;
    const dayMonth = useSelector(salesSelector).dayMonth;
    const dateMonth = useSelector(salesSelector).dateMonth;
    const monthIndex = useSelector(salesSelector).monthIndex;
    const day = useSelector(salesSelector).day;
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
        const progressNow = salesTotal.sale/(salesTotal.sale_plan * day/dayMonth) * 100;
        setProgressNow(progressNow)
    },[salesTotal])

    useEffect(() => {
        if (progressNow <= 0) {
            setColorLine('');
            return
        }
        if(progressNow <= 50) {
            setColorLine('red');
            return
        }
        if (progressNow > 50 && progressNow < 90) {
            setColorLine('yellow');
            return
        }
        if (progressNow >= 90) {
            setColorLine('green');
            return
        }
    }, [progressNow]);


    return (
        <div className={`${s.graphs} ${dark && s.graphs_dark}`}>
            <p className={s.title}>План продаж</p>
            <div className={s.statistic}>
                <div className={s.container_top}>
                    <p className={s.text}>Выручка<sup>{Math.round(salesTotal.sale/(experts.length * 2500000) * 100)}%{loader && <Loader/>}</sup></p>
                    <p className={s.text}>{addSpaceNumber(salesTotal.sale)} из {addSpaceNumber((experts.length * 2500000))} ₽ {loader && <Loader/>}</p>
                </div>
                <div className={`${s.progressbar} ${dark && s.progressbar_dark}`}>
                    {loader && <Loader/>}
                    <div style={{width: monthIndex == 0 ? `${day/dayMonth * 100}%` : '100%'}} className={`${s.plan} ${dark && s.plan_dark}`}></div>
                    <div style={{width: `${salesTotal.sale/(experts.length * 2500000) * 100}%`}} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                </div>
                <div className={s.container_bottom}>
                    <p className={`${s.textsub} ${dark && s.textsub_dark}`}>1 {monthName}</p>
                    <p className={`${s.textsub} ${dark && s.textsub_dark}`}>{dayMonth} {monthName}</p>
                </div>
            </div>
             <div className={s.graphheader}>
                <h2>Оплаты</h2>
                <p>Среднее в день - <span>{dailyAvarage}{loader && <Loader/>}</span></p>
             </div>
            <Graph dayMonth={dayMonth} graphData={graphData} loader={loader}/>
        </div>
    )
};
export default GraphSales;