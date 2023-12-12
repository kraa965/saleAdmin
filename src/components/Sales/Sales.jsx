import s from './Sales.module.scss';
import { useState, useEffect } from 'react';
import CalendarMonth from '../Calendar/CalendarMonth';
import GraphSales from '../GraphsSales/GraphsSales';
import ProgressStat from '../ProgressStat/ProgressStat';
import Clients from '../Clients/Clients';
import PlanSales from '../PlanSales/PlanSales';
import { getSales } from '../../Api/Api';
import { useSelector } from 'react-redux';
import { salesSelector } from '../../store/reducer/sales/selector';

const indicatorsDay = [{ title: 'Входы в личный кабинет', quantity: 189, total: 500 },
{ title: 'Открытые бизнес-планы', quantity: 105, total: 150 },
{ title: 'Бизнес-планов на консультанта', quantity: 109, total: 250 }]

const indicatorsExpert = [{ title: 'Zoom-встречи', quantity: 189, total: 500 },
{ title: 'Одобренные анкеты', quantity: 105, total: 150 },
{ title: 'Продажи', quantity: 109, total: 250 }]


function Sales() {
    const [anim, setAnim] = useState(false);
    const [salesTotal, setSalesTotal] = useState({});
    const [loader, setLoader] = useState(false);
    const [graphData, setGraphData] = useState({})
    const salesInfo = useSelector(salesSelector);
    const dateMonth = salesInfo?.dateMonth;
   console.log(salesTotal)
    useEffect(() => {
        setAnim(true);
    }, []);

    useEffect(() => {
        window.scrollTo(0,0);
        setLoader(true)
        if(dateMonth) {
            getSales(dateMonth)
            .then((res) => {
                const data = res.data.data;
                console.log(data)
                setSalesTotal(data.sales);
                setGraphData(data.sale_graph)
                setTimeout(() => {
                    setLoader(false)
                }, 200)
            })
            .catch(err => console.log(err))
        }
      }, [dateMonth]);

    return (
        <div className={`${s.sales} ${anim && s.anim}`}>
            <div className={s.header}>
                <p className={s.title}>Продажи</p>
                <CalendarMonth />
            </div>
            <GraphSales salesTotal={salesTotal} loader={loader} graphData={graphData}/>
            <div className={s.stat}>
                <ProgressStat title={'Бизнес-консультанты'} type={'consult'} indicators={indicatorsDay} />
                <ProgressStat title={'Эксперты'} type={'expert'} indicators={indicatorsExpert} />
            </div>
            <Clients/>
            <PlanSales/>
        </div>
    )
};

export default Sales;