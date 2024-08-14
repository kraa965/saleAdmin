import { useEffect, useRef, useState, memo } from 'react';
import s from './GraphProfile2.module.scss';
//utils
import { setDayOfWeek, handleWeekend } from '../../utils/dates';
import Loader from '../Loader/Loader';

const Column = ({ point, plan, max }) => {
    const [anim, setAnim] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        setAnim(true)
    }, [])


    useEffect(() => {
        if (point / plan < 0.66) {
            setColor('red2');
        } else if (point / plan < 0.9 && point / plan >= 0.66) {
            setColor('yellow');
        } else {
            setColor('green3');
        }
    }, [point, plan]);

    return (
        <div className={s.column}>
            <div style={{ height: plan >= 0 ? `${plan / max * 100}%` : '100%', background: plan < 0 ? 'none' : '' }} className={s.plan}></div>
            <div style={{ height: anim ? `${point / max * 100}%` : '0' }} className={`${s.column_inner} ${plan > 0 ? color : 'blue'}`}></div>
        </div>

    )
}

function GraphProfile2({ dark, type, indicator, indicatorTotal, load, planDay, shedule }) {
    const canvasRef = useRef();
    const [idTooltip, setIdTooltip] = useState('');
    const [points, setPoints] = useState([]);
    const [plan, setPlan] = useState([]);
    const [totalPlan, setTotalPlan] = useState(0);
    const [planPercent, setPlanPercent] = useState(0);
    const [color, setColor] = useState({});
    const [dates, setDates] = useState([]);
    const [max, setMax] = useState(0);
    const graphRef = useRef();
    const dateForX = Object.keys(indicator).slice(-30).slice(0, -1);

    useEffect(() => {
        const data = Object.values(indicator).slice(-30).slice(0, -1);
        const date = Object.keys(indicator).slice(-30).slice(0, -1);
        const sheduleArr = shedule ? Object.values(shedule) : [];
        console.log(sheduleArr, data, date)

        const planDataNoShedule = date.map((el, i) => {
            const weekend = handleWeekend(el);
            if (weekend && (type !== 'new' && type !== 'reject' && type !== 'event')) {
                return 0
            } else {
                return planDay
            }
        })

        const planDataShedule = sheduleArr?.map((el, i) => {
            if (el.is_work == 0) {
                return 0
            } else {
                return planDay
            }
        })

        const planData = shedule ? planDataShedule : planDataNoShedule;

        const maxHeight = Math.max(...data) > Math.max(...planData) ? Math.max(...data) : Math.max(...planData)

        setPoints(data);
        setPlan(planData);
        const sumPlan = planData.slice(-30).slice(0, -1).reduce(function (a, b) {
            return a + b;
        }, 0);
        setTotalPlan(sumPlan)

        setMax(maxHeight == 0 ? 1 : maxHeight);
        setDates(date)

        const percent = indicatorTotal / sumPlan * 100;
        indicatorTotal && sumPlan && setPlanPercent(percent)

    }, [indicator]);


    function handleOpenPop(e) {
        const id = e.target.id;
        setIdTooltip(id)
    }
    //в точках отнимаем 12px
    function handleCloseTooltip() {
        setIdTooltip('');
    }
    return (
        <div className={`${s.container} ${dark && s.container_dark}`}>
            <div className={s.header}>
                <p className={s.title}>
                    {type == 'new' && 'Новые клиенты'}
                    {type == 'call' && 'Разговоры от 1.5 мин'}
                    {type == 'lk' && 'Входы в Личный кабинет'}
                    {type == 'bp' && 'Бизнес-планы'}
                    {type == 'zoom' && 'Состоявшиеся встречи'}
                    {type == 'anketa' && 'Получено анкет'}
                    {type == 'reject' && 'Отправлено в отказ'}
                    {type == 'event' && 'Дисциплина'}
                    {type !== 'event' && type !== 'reject' && type !== 'new' && <sup>
                      {`${Math.ceil(indicatorTotal/totalPlan * 100)}%`}
                    </sup>}
                </p>



                {type == 'new' && <p className={s.percent}>{indicatorTotal}</p>}
                {type == 'call' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'lk' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'bp' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'zoom' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'anketa' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'reject' && <p className={s.percent}>{indicatorTotal}</p>}
                {type == 'event' && <p className={s.percent}>{indicatorTotal}</p>}

            </div>

            <div className={s.graph}>

                {points.map((el, i) => {
                    return <Column point={el} plan={plan[i]} max={max} />
                })}
                <div className={s.yaxis}>
                    {max > 5 && [...Array(5)].map((el, i) => {
                        return <p>{Math.ceil(max - ((max / 5) * i))}</p>
                    })}

                    {max <= 5 && [...Array(max)].map((el, i) => {
                        return <p>{Math.ceil(max - i)}</p>
                    })}
                    <p>0</p>
                </div>
                <div className={s.xaxis}>
                    {dateForX.map((el) => {
                        return <p>{setDayOfWeek(el).date}</p>
                    })}
                </div>


                <div className={s.container_tooltip}>
                    {points.map((el, index) => {
                        const percent = el / planDay * 100;
                        let colorProgress

                        if (percent < 66) {
                            colorProgress = '#E75A5A'
                        } else if (percent < 90 && percent >= 66) {
                            colorProgress = '#FFDE35'
                        } else if (percent >= 90) {
                            colorProgress = '#2EA96E'
                        }

                        return <div className={s.area}>
                            <div onMouseEnter={handleOpenPop} onMouseLeave={handleCloseTooltip} id={`${index}`} className={s.point}
                                style={{
                                    opacity: idTooltip === `${index}` ? '1' : '0',
                                    display: plan[index] == 0 ? 'none' : 'flex',
                                }}
                            >
                                <div style={{ backgroundColor: `${color.stroke}` }} className={s.inner}></div>

                            </div>

                            <div
                                style={{
                                    opacity: idTooltip === `${index}` ? '1' : '0',
                                    visibility: idTooltip === `${index}` ? 'visible' : 'hidden',
                                    bottom: `${el / max * 50 - 17}%`,
                                    right: index < 7 ? '-244px' : '26px',
                                }}

                                className={`${s.tooltip}  ${dark && s.tooltip_dark}`}>
                                <p className={s.title}>{setDayOfWeek(dates[index]).fDay2}<sup>{setDayOfWeek(dates[index]).date}</sup></p>
                                <div className={s.indicators}>
                                    {type === 'new' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Новых клиентов<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            {/*  <div className={s.progress}>
                                            <div className={s.line}></div>
                                        </div> */}

                                        </div>
                                    }

                                    {type === 'call' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Разговоры от 1.5 мин<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            <div className={s.progress}>
                                                <div style={{ width: `${percent}%`, backgroundColor: `${colorProgress}` }} className={s.line}></div>
                                            </div>

                                        </div>
                                    }

                                    {type === 'lk' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Входы в ЛК<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            <div className={s.progress}>
                                                <div style={{ width: `${percent}%`, backgroundColor: `${colorProgress}` }} className={s.line}></div>
                                            </div>

                                        </div>
                                    }

                                    {type === 'bp' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Открытые БП<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            <div className={s.progress}>
                                                <div style={{ width: `${percent}%`, backgroundColor: `${colorProgress}` }} className={s.line}></div>
                                            </div>

                                        </div>
                                    }

                                    {type === 'zoom' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Zoom встречи<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            <div className={s.progress}>
                                                <div style={{ width: `${percent}%`, backgroundColor: `${colorProgress}` }} className={s.line}></div>
                                            </div>

                                        </div>
                                    }

                                    {type === 'anketa' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Получено анкет<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            <div className={s.progress}>
                                                <div style={{ width: `${percent}%`, backgroundColor: `${colorProgress}` }} className={s.line}></div>
                                            </div>

                                        </div>
                                    }

                                    {type === 'reject' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Отправлено в отказ<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            {/*  <div className={s.progress}>
                                            <div className={s.line}></div>
                                        </div> */}

                                        </div>
                                    }

                                    {type === 'event' &&
                                        <div className={s.indicator}>
                                            <div className={s.block_indicator}>
                                                <p>Нарушения<sup>шт</sup></p>
                                                <span>{el}</span>
                                            </div>
                                            {/*  <div className={s.progress}>
                                            <div className={s.line}></div>
                                        </div> */}

                                        </div>
                                    }

                                    {type === 1 &&
                                        <p className={s.fault}><span>14:55</span>Использование телефона</p>
                                    }

                                </div>
                                <div className={`${s.triangle} ${index < 7 && s.triangle_left} ${dark && s.triangle_dark}`}></div>
                            </div>
                        </div>
                    })}
                </div>
            </div>





            <div className={`${s.loader} ${!load && s.loader_hidden}`}>
                <div className={s.loader_inner}>
                    <Loader />
                </div>

            </div>

        </div>
    )
};

export default memo(GraphProfile2);