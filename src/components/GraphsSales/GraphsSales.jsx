import s from './GraphSales.module.scss';
import { useSelector } from 'react-redux';
import { salesSelector } from '../../store/reducer/sales/selector';
import Graph from '../Graph/Graph';
import { menuSelector } from '../../store/reducer/menu/selector';


function GraphSales() {
    const monthName = useSelector(salesSelector).nameMonth2;
    const dayMonth = useSelector(salesSelector).dayMonth;
    const dark = useSelector(menuSelector).dark;

    return (
        <div className={`${s.graphs} ${dark && s.graphs_dark}`}>
            <p className={s.title}>План продаж</p>
            <div className={s.statistic}>
                <div className={s.container_top}>
                    <p className={s.text}>Выручка<sup>96%</sup></p>
                    <p className={s.text}>10 000 200 из 20 000 000 ₽</p>
                </div>
                <div className={`${s.progressbar} ${dark && s.progressbar_dark}`}>
                    <div style={{width: '70%'}} className={`${s.plan} ${dark && s.plan_dark}`}></div>
                    <div style={{width: '55%'}} className={s.inner}></div>
                </div>
                <div className={s.container_bottom}>
                    <p className={`${s.textsub} ${dark && s.textsub_dark}`}>1 {monthName}</p>
                    <p className={`${s.textsub} ${dark && s.textsub_dark}`}>{dayMonth} {monthName}</p>
                </div>
            </div>
             <div className={s.graphheader}>
                <h2>Количество предоплат по дням</h2>
                <p>Среднее в день - {`2`}</p>
             </div>
            <Graph dayMonth={dayMonth}/>
        </div>
    )
};
export default GraphSales;