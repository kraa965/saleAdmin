import { useEffect, useRef, useState, memo } from 'react';
import s from './GraphProfile.module.scss';
//utils
import { setDayOfWeek, handleWeekend } from '../../utils/dates';
import Loader from '../Loader/Loader';

function GraphProfile({ dark, type, indicator, indicatorTotal, load, planDay, shedule }) {
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
    console.log(type, planPercent)

    useEffect(() => {

        points.length > 0 && color.stroke && draw();
    }, [points, color])

    useEffect(() => {
        const data = Object.values(indicator).slice(-30);
        const date = Object.keys(indicator).slice(-30);
        const sheduleArr = shedule ? Object.values(shedule) : [];

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
        const sumPlan = planData.slice(0, 28).reduce(function (a, b) {
            return a + b;
        }, 0);
        setTotalPlan(sumPlan)

        setMax(maxHeight == 0 ? 1 : maxHeight);
        setDates(date)

        const percent = indicatorTotal / sumPlan * 100;
        indicatorTotal && sumPlan && setPlanPercent(percent)

    }, [indicator]);

    useEffect(() => {

        if (planPercent < 0 && dark && type !== 'event') {
            setColor({
                add1: 'rgba(135, 162, 255, 0.52)',
                add2: 'rgba(135, 162, 255, 0.1)',
                stroke: 'rgba(135, 162, 255)'
            })
            return
        }

        if (planPercent < 0 && !dark && type !== 'event') {
            setColor({
                add1: 'rgba(0, 44, 251, 0.52)',
                add2: 'rgba(0, 44, 251, 0.1)',
                stroke: 'rgba(0, 44, 251, 0.6)'
            })
            return
        }

        if (planPercent < 70 && planPercent > 0 && type !== 'event') {
            setColor({
                add1: 'rgba(255, 51, 51, 0.52)',
                add2: 'rgba(255, 255, 255, 0.1)',
                stroke: '#E75A5A'
            })
            return
        }

        if (planPercent < 90 && planPercent >= 70 && type !== 'event') {
            setColor({
                add1: 'rgba(255, 222, 51, 0.52)',
                add2: 'rgba(248, 250, 253, 0.1)',
                stroke: '#FFDE35'
            })
            return
        }

        if (planPercent >= 90 && type !== 'event') {
            setColor({
                add1: 'rgba(51, 255, 71, 0.52)',
                add2: 'rgba(248, 250, 253, 0.1)',
                stroke: '#2EA96E'
            })
            return
        }

        if (indicatorTotal == 0 && type == 'event') {
            setColor({
                add1: 'rgba(135, 162, 255, 0.52)',
                add2: 'rgba(135, 162, 255, 0.1)',
                stroke: 'rgba(135, 162, 255)'
            })
            return
        }

        if (indicatorTotal == 1 && type == 'event') {
            setColor({
                add1: 'rgba(255, 222, 51, 0.52)',
                add2: 'rgba(248, 250, 253, 0.1)',
                stroke: '#FFDE35'
            })
            return
        }

        if (indicatorTotal > 1 && type == 'event') {
            setColor({
                add1: 'rgba(255, 51, 51, 0.52)',
                add2: 'rgba(255, 255, 255, 0.1)',
                stroke: '#E75A5A'
            })
            return
        }
    }, [planPercent, dark, indicatorTotal])


    function draw() {
        if (canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext("2d");
            const ctxDotted = canvasRef.current.getContext("2d");
            ctx.save()
            ctxDotted.setLineDash([4, 4]);
            ctxDotted.beginPath();
            ctxDotted.lineWidth = dark ? 1.1 : 0.7;

            ctxDotted.moveTo(0, 58 - plan[0] / max * 58);
            ctxDotted.lineTo(10, 58 - plan[0] / max * 58);
            plan.forEach((el, index) => {
                if (index > 0) {
                    ctxDotted.lineTo(23 * index + 10, 58 - el / max * 58);
                }
            })

            ctxDotted.lineTo(684, 58 - plan[29] / max * 58)
            ctxDotted.lineTo(700, 62);
            ctxDotted.lineTo(0, 62);
            ctxDotted.strokeStyle = dark ? 'white' : 'black';

            ctxDotted.stroke();
            ctx.restore();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, 58 - points[0] / max * 58);
            ctx.lineTo(10, 58 - points[0] / max * 58);
            points.forEach((el, index) => {
                if (index > 0 && index < 30) {
                    /* if(index % 2 === 0) {
                        ctx.lineTo(23 * index + 10, 58 - el / max * 58);
                    } else { */
                    ctx.arcTo(/* 16 */23 * index + 10, 58 - el / max * 58, /* 16 */23 * (index + 1) + 10, 58 - points[index + 1] / max * 58, 0);


                }
            })

            ctx.lineTo(674, 58 - points[29] / max * 58)
            ctx.lineTo(780, 58 - points[29] / max * 58);
            ctx.lineTo(780, 72);
            ctx.lineTo(0, 62);
            const grad = ctx.createLinearGradient(241, 58, 241, 2);
            grad.addColorStop(1, `${color.add1}`);
            grad.addColorStop(0, `${color.add2}`);
            ctx.fillStyle = grad;
            ctx.strokeStyle = `${color.stroke}`;

            ctx.stroke();
            ctx.fill();

        }
    }

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
                {type == 'new' && <p className={s.title}>Новые клиенты</p>}
                {type == 'call' && <p className={s.title}>Разговоры от 1.5 мин</p>}
                {type == 'lk' && <p className={s.title}>Входы в Личный кабинет</p>}
                {type == 'bp' && <p className={s.title}>Бизнес-планы</p>}
                {type == 'zoom' && <p className={s.title}>Состоявшиеся встречи</p>}
                {type == 'anketa' && <p className={s.title}>Получено анкет</p>}
                {type == 'reject' && <p className={s.title}>Отправлено в отказ</p>}
                {type == 'event' && <p className={s.title}>Дисциплина</p>}


                {type == 'new' && <p className={s.percent}>{indicatorTotal}</p>}
                {type == 'call' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'lk' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'bp' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'zoom' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'anketa' && <p className={s.percent}>{indicatorTotal} из {totalPlan}</p>}
                {type == 'reject' && <p className={s.percent}>{indicatorTotal}</p>}
                {type == 'event' && <p className={s.percent}>{indicatorTotal}</p>}
            </div>
            <div ref={graphRef} className={s.graph}>
                <canvas ref={canvasRef} id="canvas" width="684" height="58"></canvas>

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
                    return <div>
                        <div onMouseEnter={handleOpenPop} onMouseLeave={handleCloseTooltip} id={`${index}`}
                            style={{
                                top: `${58 - el / max * 58 - 12}px`,
                                left: `${index * /* 16 */23 - 2}px`,
                                opacity: idTooltip === `${index}` ? '1' : '0',
                               /*  display: handleWeekend(dates[index]) ? 'none' : 'flex' */
                               display: plan[index] == 0 ? 'none' : 'flex',
                            }}
                            className={s.point}
                        >
                            <div style={{ backgroundColor: `${color.stroke}` }} className={s.inner}></div>

                        </div>

                        <div
                            style={{
                                opacity: idTooltip === `${index}` ? '1' : '0',
                                visibility: idTooltip === `${index}` ? 'visible' : 'hidden',
                                top: `${52 - 26 - el / max * 58 - 12}px`,
                                left: `${index * /* 16 */23 - 2 - 234}px`,
                            }}

                            className={`${s.tooltip} ${dark && s.tooltip_dark}`}>
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
                            <div className={`${s.triangle} ${dark && s.triangle_dark}`}></div>
                        </div>
                    </div>
                })}
            </div>

            <div className={`${s.loader} ${!load && s.loader_hidden}`}>
                <div className={s.loader_inner}>
                    <Loader />
                </div>

            </div>

        </div>
    )
};

export default memo(GraphProfile);