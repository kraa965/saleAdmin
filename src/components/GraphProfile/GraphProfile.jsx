import { useEffect, useRef, useState } from 'react';
import s from './GraphProfile.module.scss';

const points = [25, 41, 0, 0, 27, 45, 31, 22, 29, 0, 0, 19, 43, 15, 27, 20, 0, 0, 35, 40, 21]
const plan = [30, 30, 0, 0, 30, 30, 30, 30, 30, 0, 0, 30, 30, 30, 30, 30, 0, 0, 30, 30, 30]
function GraphProfile({dark}) {
    const canvasRef = useRef();
    const [idTooltip, setIdTooltip] = useState('');
    const [type, setType] = useState(1);
    const max = Math.max(...points);
    const graphRef = useRef();
    console.log(graphRef.offsetHeight)

    useEffect(() => {
        setTimeout(() => {
            draw()
        }, 200)
    }, [])

    function draw() {
        console.log(canvasRef.current.current)
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

            ctxDotted.lineTo(485, 58 - plan[20] / max * 58)
            ctxDotted.lineTo(500, 62);
            ctxDotted.lineTo(0, 62);
            ctxDotted.strokeStyle = dark ? 'white' : 'black';

            ctxDotted.stroke();
            ctx.restore();
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, 58 - points[0] / max * 58);
            ctx.lineTo(10, 58 - points[0] / max * 58);
            points.forEach((el, index) => {
                if (index > 0) {
                    /* if(index % 2 === 0) {
                        ctx.lineTo(23 * index + 10, 58 - el / max * 58);
                    } else { */
                    ctx.arcTo(23 * index + 10, 58 - el / max * 58, 23 * (index + 1) + 10, 58 - points[index + 1] / max * 58, 4);


                }
            })

            ctx.lineTo(485, 58 - points[20] / max * 58)
            ctx.lineTo(500, 62);
            ctx.lineTo(0, 62);
            const grad = ctx.createLinearGradient(241, 58, 241, 2);
            grad.addColorStop(1, `rgba(255, 222, 51, 0.52)`);
            grad.addColorStop(0, `rgba(248, 250, 253, 0.1)`);
            ctx.fillStyle = grad;
            ctx.strokeStyle = '#FFDE35';

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
                <p className={s.title}>Разговоры</p>
                <p className={s.percent}>80%</p>
            </div>
            <div ref={graphRef} className={s.graph}>
                <canvas ref={canvasRef} id="canvas" width="484" height="58"></canvas>

                {points.map((el, index) => {
                    return <div>
                        <div onMouseEnter={handleOpenPop} onMouseLeave={handleCloseTooltip} id={`${index}`}
                            style={{
                                top: `${58 - el / max * 58 - 12}px`,
                                left: `${index * 23 - 2}px`,
                                opacity: idTooltip === `${index}` ? '1' : '0',
                                display: el === 0 ? 'none' : 'flex'
                            }}
                            className={s.point}
                        >
                            <div className={s.inner}></div>

                        </div>

                        <div
                            style={{
                                opacity: idTooltip === `${index}` ? '1' : '0',
                                visibility: 'visible',
                                top: `${53 - 80 - el / max * 58 - 12}px`,
                                left: `${index * 23 - 2 - 355}px`,
                            }}
                            className={`${s.tooltip} ${dark && s.tooltip_dark}`}>
                            <p className={s.title}>{'Пятница'}<sup>{'10.12'}</sup></p>
                            <div className={s.indicators}>
                                {type === 0 &&
                                    <div className={s.indicator}>
                                        <div className={s.block_indicator}>
                                            <p>Бизнес-планы<sup>100%</sup></p>
                                            <span>4 из 4</span>
                                        </div>
                                        <div className={s.progress}>
                                            <div className={s.line}></div>
                                        </div>

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

        </div>
    )
};

export default GraphProfile;