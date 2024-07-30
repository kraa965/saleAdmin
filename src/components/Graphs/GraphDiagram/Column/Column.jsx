import { useEffect, useState } from 'react';
import s from './Column.module.scss';

const Column = ({ indicators, colors, maximumValue, el }) => {
    const [anim, setAnim] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);
  
    return (
        <div className={s.column}>
            {indicators.map((el, i) => {
                return <div style={{height: anim ? `${el.num/maximumValue * 100}%` :'0', backgroundColor: `${colors[i]}`}} className={`${s.section} ${i == 3 && s.section_top}`}>
                    {i !== 0 && <div className={s.percent}>{Math.round(el.num/indicators[i - 1].num * 100)}%</div>}
                </div>
            })}
            <p className={s.sub}>10.08 - 17.08</p>
        </div>
    )
};

export default Column;