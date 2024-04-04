import s from './Sales.module.scss';
import { useState, useEffect } from 'react';
import CalendarMonth from '../Calendar/CalendarMonth';
import GraphSales from '../GraphsSales/GraphsSales';
import ProgressStat from '../ProgressStat/ProgressStat';
import Clients from '../Clients/Clients';
import PlanSales from '../PlanSales/PlanSales';
import { getSales } from '../../Api/Api';
import { useSelector, useDispatch } from 'react-redux';
import { salesSelector } from '../../store/reducer/sales/selector';
import TopConsul from '../TopConsul/TopConsul';
import Debt from '../Debt/Debt';

function Sales() {
    const [anim, setAnim] = useState(false);
    const [salesTotal, setSalesTotal] = useState({});
    const [loader, setLoader] = useState(false);
    const [graphData, setGraphData] = useState({});
    const [clients, setClients] = useState([]);
    const [experts, setExperts] = useState([]);
    const [statConsult, setStatConsult] = useState([]);
    const [statExpert, setStatExpert] = useState([]);
    const [date, setDate] = useState('')
    const [dailyAvarage, setDailyAvarage] = useState(0);
    const [update, setUpdate] = useState(0);
    const salesInfo = useSelector(salesSelector);
    const dateMonth = salesInfo?.dateMonth;
    
    const dispatch = useDispatch();

    useEffect(() => {
        setAnim(true);
    }, []);

    useEffect(() => {
        setDate(dateMonth);
    }, [dateMonth])

    useEffect(() => {
        window.scrollTo(0, 0);
        setLoader(true)
        if (date) {
            getSales(date)
                .then((res) => {
                    const data = res.data.data;
                    console.log(data)
                    setSalesTotal(data.sales);
                    setGraphData(data.sale_graph.data);
                    setDailyAvarage(data.sale_graph.daily_average);
                    setClients(data.clients);
                    setExperts(data.experts);
                    setStatConsult(data.progress);
                    setStatExpert(data.progress_experts);
                    setTimeout(() => {
                        setLoader(false)
                    }, 200)
                })
                .catch(err => {
                    setTimeout(() => {
                        setLoader(false)
                    }, 200)
                })
        }  else {
            setLoader(true) 
        }
    }, [date]);

    useEffect(() => {
        if (date) {
            getSales(date)
                .then((res) => {
                    const data = res.data.data;
                    setClients(data.clients);
                })
                .catch(err => {
                })
        } 
    }, [date, update]);

    return (
        <div className={`${s.sales} ${anim && s.anim}`}>
            <div className={s.header}>
                <p className={s.title}>Продажи</p>
                <CalendarMonth loader={loader} />
            </div>
            <GraphSales salesTotal={salesTotal} loader={loader} graphData={graphData} dailyAvarage={dailyAvarage} experts={experts}/>
            <div className={s.stat}>
                <ProgressStat title={'Бизнес-консультанты'} type={'consult'} indicators={statConsult} loader={loader} />
                <ProgressStat title={'Эксперты'} type={'expert'} indicators={statExpert} loader={loader} />
            </div>
            <Clients clients={clients} loader={loader} setUpdate={setUpdate}/>
            <PlanSales experts={experts} loader={loader} />
            <TopConsul loader={loader}/>
            <Debt/>
        </div>
    )
};

export default Sales;