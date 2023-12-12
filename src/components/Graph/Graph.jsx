import s from './Graph.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useState } from 'react';

function Graph({ dayMonth, graphData }) {
    const dark = useSelector(menuSelector).dark;
    const [tooltipId, setTooltipId] = useState(0);
    const datesArr = Object.keys(graphData);
    console.log(datesArr)
    //Передаем в график 1-значение оси Y, 2-Массив дат за месяц(преобразуем в день недели), план на день по предоплатам и кол-во предоплат по дням
    const payMax = 4;
    const payPlan = 4;
    const payNum = 3;
    const payPlanColumn = payNum > payPlan ? payNum : payPlan;

    function handleMouseEnter(e) {
        const id = e.currentTarget.id;
        setTooltipId(id)
    }

    function handleMouseLeave(e) {
        setTooltipId(0)
    }
    return (
        <div className={s.graph}>
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
                    return <p>{el}</p>
                })}
            </div>

            <div className={s.content}>
                {datesArr.map((el, index) => {
                    return <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} id={`${index + 1}`} style={{ height: `${payPlanColumn / payMax * 100}%` }} className={`${s.columnplan} ${dark && s.columnplan_dark}`}>
                        <div style={{ height: `${payNum / payPlanColumn * 100}%`, zIndex: `${31 - index}` }} className={s.column}>
                            <div className={`${s.tooltip} ${dark && s.tooltip_dark}`} style={{ display: index + 1 == tooltipId ? '' : 'none' }}>
                                <div className={s.trigle}></div>
                                <div className={s.total}>
                                    <p>10 ноября</p>
                                    <p>1 500 000 ₽</p>
                                </div>
                                <ul>
                                    <li className={s.pay}>
                                        <p>Алексей Матюшенко</p>
                                        <span>70 700 ₽</span>
                                    </li>
                                    <li className={s.pay}>
                                        <p>Алексей Матюшенко</p>
                                        <span>70 700 ₽</span>
                                    </li>
                                    <li className={s.pay}>
                                        <p>Алексей Матюшенко</p>
                                        <span>70 700 ₽</span>
                                    </li>
                                </ul>
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