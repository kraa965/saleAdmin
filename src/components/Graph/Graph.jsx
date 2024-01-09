import s from './Graph.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useEffect, useState } from 'react';
import { setDayOfWeek } from '../../utils/dates';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import Loader from '../Loader/Loader';

function Graph({ dayMonth, graphData, loader }) {
    const dark = useSelector(menuSelector).dark;
    const [tooltipId, setTooltipId] = useState(0);
    const datesArr = Object.keys(graphData);
    //Передаем в график 1-значение оси Y, 2-Массив дат за месяц(преобразуем в день недели), план на день по предоплатам и кол-во предоплат по дням
    const payMax = 3;
    console.log(graphData)
    

    
    function handleMouseEnter(e) {
        const id = e.currentTarget.id;
        setTooltipId(id)
    }

    function handleMouseLeave() {
        setTooltipId(0)
    }
    return (
        <div className={s.graph}>
            {loader && <Loader />}
            <div className={`${s.axisY} ${dark && s.axisY_dark}`}>
                <p>{0}</p>
                {[...Array(payMax)].map((el, index) => {
                    return <div className={`${s.axisYNum}`}>
                        <p>{index + 1}</p>
                    </div>
                })}
            </div>
            <div className={`${s.axisX} ${dark && s.axisX_dark}`}>
                {datesArr.map((el, index) => {
                    return <p>{setDayOfWeek(el).fDay}</p>
                })}
            </div>

            <div className={s.content}>
                {datesArr.map((el, index) => {
                    const payNum = graphData[el].items.length;
                    const payPlan = (setDayOfWeek(el).fDay === 'Сб' || setDayOfWeek(el).fDay === 'Вс') ? 0 : 2;
                    const payPlanColumn = payNum > payPlan ? payNum : payPlan;
                    return <div className={s.container_column}>
                        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id={`${index + 1}`} style={{ height: `${payPlanColumn / payMax * 100}%` }} className={`${s.columnplan} ${dark && s.columnplan_dark}`}>
                            <div style={{ height: `${payNum / payPlanColumn * 100}%`, zIndex: `${31 - index}` }} className={s.column}>
                                <div className={`${s.tooltip} ${dark && s.tooltip_dark}`} style={{ display: index + 1 == tooltipId ? '' : 'none' }}>
                                    <div className={s.trigle}></div>
                                    <div className={s.total}>
                                        <p>{setDayOfWeek(el).day} {setDayOfWeek(el).fMonth2}</p>
                                        <p>{addSpaceNumber(graphData[el].total_sum)} ₽</p>
                                    </div>
                                    <ul>
                                        {graphData[el].items.map((el) => {
                                            return <li className={s.pay}>
                                                <p>{el.client.name} {el.client.surname}</p>
                                                <span>{addSpaceNumber(el.sum)} ₽</span>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

                <div className={s.lines}>
                    {[...Array(payMax + 1)].map((el, index) => {
                        return <div className={`${s.line} ${dark && s.line_dark}`}>
                        </div>
                    })}
                </div>

            </div>
        </div>
    )
};

export default Graph;