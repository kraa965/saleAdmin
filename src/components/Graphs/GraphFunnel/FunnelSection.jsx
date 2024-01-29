import { useRef, useEffect, useState } from 'react';
import s from './GraphFunnel.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';

function FunnelSection({ number, next, planLine, nextPlanLine, currentPlanLine, nextCurrentPlanLine, index, countList }) {
    const refSection = useRef();
    const canvasRef = useRef();
    const [elWidth, setElWidth] = useState(0);
    const [elHeight, setElHeight] = useState(0);
    const [mark, setSectionMark] = useState(0);
    const [nextMark, setNextMark] = useState(0);
    const [color, setColor] = useState('#FDD67400');
    const [plan, setPlan] = useState(0);
    const [nextPlan, setNextPlan] = useState(0);
    const [currentPlan, setCurrentPlan] = useState(0);
    const [nextCurrentPlan, setNextCurrentPlan] = useState(0);
    const [anim, setAnim] = useState(false);
    const dark = useSelector(menuSelector).dark;
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 50 * (index + 1))
    }, [])
    console.log(elWidth)
    useEffect(() => {
        const height = refSection.current.getBoundingClientRect().height;
        const width = refSection.current.getBoundingClientRect().width;
        console.log(height, number)
        setElWidth(width);
        setElHeight(height)
        setSectionMark(height - number * height / 100);
        setNextMark(height - next * height / 100)
        setPlan(height - planLine * height / 100);
        setNextPlan(height - nextPlanLine * height / 100);
        setCurrentPlan(height - currentPlanLine * height / 100)
        setNextCurrentPlan(height - nextCurrentPlanLine * height / 100)
    }, [refSection, number])


    useEffect(() => {
        if (mark > 0 && countList === 1 && !dark) {
            window.requestAnimationFrame(draw)
            return
        }

        if (mark > 0 && countList === 1 && dark) {
            window.requestAnimationFrame(draw3)
            return
        }

        if (mark > 0 && countList !== 1) {
            window.requestAnimationFrame(draw2)
            return
        }

    }, [mark, dark]);

    useEffect(() => {
        const percent = number / currentPlanLine * 100;
        if( countList == 1) {
         
            if (percent <= 20) {
                setColor('#E75A5A');
                return;
            }
    
            if (percent <= 50 && percent > 20) {
                setColor('#FDD674');
                return
            }
    
            if (percent <= 80 && percent > 50) {
                setColor('#FDE56B');
                return
            }
    
            if (percent <= 100 && percent > 80) {
                setColor('#2EA96E');
                return
            }
        } else {
            if(index === 0) {
                setColor('#3CCAEA');
                return
            }

            if(index === 1) {
                setColor('#1E9FD6');
                return
            }

            if(index === 2) {
                setColor('#1774C9');
                return
            }

            if(index === 3) {
                setColor('#033CAD');
                return
            }

            if(index === 4) {
                setColor('#002C81');
                return
            }
        }
       
    }, [number, currentPlanLine, countList, index]);

console.log(countList)
    function draw() {
        console.log(canvasRef.current.current)
        if (canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext("2d");
            const ctxDotted = canvasRef.current.getContext("2d");
            const ctxCurrent = canvasRef.current.getContext("2d");
            ctx.save()
            //план

            ctxDotted.setLineDash([4, 3]);
            ctxDotted.beginPath();
            ctxDotted.lineWidth = 0.8;

            ctx.moveTo(0, plan);
            ctx.lineTo(0, plan);

            ctx.arcTo(elWidth - 20, plan, elWidth + 18, nextPlan, 50)
            ctxDotted.lineWidth = 0.8;
            ctx.arcTo(elWidth + 18, nextPlan, elWidth + 28, nextPlan, 50)
            ctx.lineTo(elWidth + 100, nextPlan);

            ctx.lineTo(elWidth + 100, elHeight + 30);
            ctxDotted.strokeStyle = 'black';
            ctxDotted.stroke();

            ctx.restore();

            //текущий план
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, elHeight + 30);
            ctx.lineTo(0, currentPlan);

            ctx.arcTo(elWidth - 20, currentPlan, elWidth + 18, nextCurrentPlan, 50)

            ctx.arcTo(elWidth + 18, nextCurrentPlan, elWidth + 28, nextCurrentPlan, 50)
            ctx.lineTo(elWidth + 100, nextCurrentPlan);

            ctx.lineTo(elWidth + 100, elHeight + 30);

            ctx.fillStyle = '#F1F4F9';
            ctx.strokeStyle = '#fdd67400';

            ctx.stroke();
            ctx.fill();


            //график
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, elHeight + 30);
            ctx.lineTo(0, mark);

            ctx.arcTo(elWidth - 20, mark, elWidth + 18, nextMark, 50)

            ctx.arcTo(elWidth + 18, nextMark, elWidth + 28, nextMark, 50)
            ctx.lineTo(elWidth + 100, nextMark);

            ctx.lineTo(elWidth + 100, elHeight + 30);

            ctx.fillStyle = color;
            ctx.strokeStyle = '#fdd67400';

            ctx.stroke();
            ctx.fill();
        }
    }

    function draw3() {
        console.log(canvasRef.current.current)
        if (canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext("2d");
            const ctxDotted = canvasRef.current.getContext("2d");
            const ctxCurrent = canvasRef.current.getContext("2d");
            ctx.save()
            //план

            ctxDotted.setLineDash([4, 3]);
            ctxDotted.beginPath();
            ctxDotted.lineWidth = 0.8;

            ctx.moveTo(0, plan);
            ctx.lineTo(0, plan);

            ctx.arcTo(elWidth - 20, plan, elWidth + 18, nextPlan, 50)
            ctxDotted.lineWidth = 0.8;
            ctx.arcTo(elWidth + 18, nextPlan, elWidth + 28, nextPlan, 50)
            ctx.lineTo(elWidth + 100, nextPlan);

            ctx.lineTo(elWidth + 100, elHeight + 30);
            ctxDotted.strokeStyle = '#ECECEC';
            ctxDotted.stroke();

            ctx.restore();

            //текущий план
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, elHeight + 30);
            ctx.lineTo(0, currentPlan);

            ctx.arcTo(elWidth - 20, currentPlan, elWidth + 18, nextCurrentPlan, 50)

            ctx.arcTo(elWidth + 18, nextCurrentPlan, elWidth + 28, nextCurrentPlan, 50)
            ctx.lineTo(elWidth + 100, nextCurrentPlan);

            ctx.lineTo(elWidth + 100, elHeight + 30);

            ctx.fillStyle = '#414B5D';
            ctx.strokeStyle = '#414B5D';

            ctx.stroke();
            ctx.fill();


            //график
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, elHeight + 30);
            ctx.lineTo(0, mark);

            ctx.arcTo(elWidth - 20, mark, elWidth + 18, nextMark, 50)

            ctx.arcTo(elWidth + 18, nextMark, elWidth + 28, nextMark, 50)
            ctx.lineTo(elWidth + 100, nextMark);

            ctx.lineTo(elWidth + 100, elHeight + 30);

            ctx.fillStyle = color;
            ctx.strokeStyle = '#fdd67400';

            ctx.stroke();
            ctx.fill();
        }
    }

    function draw2() {
        console.log(canvasRef.current.current)
        if (canvasRef.current.getContext) {
            const ctx = canvasRef.current.getContext("2d");

            ctx.save()
           
            //график
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(0, elHeight + 30);
            ctx.lineTo(0, mark);

            ctx.arcTo(elWidth - 20, mark, elWidth + 18, nextMark, 50)

            ctx.arcTo(elWidth + 18, nextMark, elWidth + 28, nextMark, 50)
            ctx.lineTo(elWidth + 100, nextMark);

            ctx.lineTo(elWidth + 100, elHeight + 30);

            ctx.fillStyle = color;
            ctx.strokeStyle = '#fdd67400';

            ctx.stroke();
            ctx.fill();
        }
    }


    return (
        <div ref={refSection} className={`${s.section} ${anim && s.section_anim}`}>
            <div className={`${s.overlay} ${dark && s.overlay_dark}`}></div>
            <canvas ref={canvasRef} id="canvas"></canvas>
        </div>
    )
};

export default FunnelSection;