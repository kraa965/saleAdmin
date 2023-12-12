import s from './GraphSales.module.scss';
import { useSelector } from 'react-redux';
import { salesSelector } from '../../store/reducer/sales/selector';
import Graph from '../Graph/Graph';
import { menuSelector } from '../../store/reducer/menu/selector';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import Loader from '../Loader/Loader'


function GraphSales({salesTotal, loader, graphData}) {
    const monthName = useSelector(salesSelector).nameMonth2;
    const dayMonth = useSelector(salesSelector).dayMonth;
    const dateMonth = useSelector(salesSelector).dateMonth;
    const monthIndex = useSelector(salesSelector).monthIndex;
    const day = useSelector(salesSelector).day;
    const dark = useSelector(menuSelector).dark;

    return (
        <div className={`${s.graphs} ${dark && s.graphs_dark}`}>
            <p className={s.title}>План продаж</p>
            <div className={s.statistic}>
                <div className={s.container_top}>
                    <p className={s.text}>Выручка<sup>{Math.round(salesTotal.sale/salesTotal.sale_plan * 100)}%{loader && <Loader/>}</sup></p>
                    <p className={s.text}>{addSpaceNumber(salesTotal.sale)} из {addSpaceNumber(salesTotal.sale_plan)} ₽ {loader && <Loader/>}</p>
                </div>
                <div className={`${s.progressbar} ${dark && s.progressbar_dark}`}>
                    {loader && <Loader/>}
                    <div style={{width: monthIndex == 0 ? `${day/dayMonth * 100}%` : '100%'}} className={`${s.plan} ${dark && s.plan_dark}`}></div>
                    <div style={{width: `${salesTotal.sale/salesTotal.sale_plan * 100}%`}} className={s.inner}></div>
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
            <Graph dayMonth={dayMonth} graphData={graphData}/>
        </div>
    )
};
export default GraphSales;