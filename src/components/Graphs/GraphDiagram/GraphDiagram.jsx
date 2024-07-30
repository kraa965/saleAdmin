import s from './GraphDiagram.module.scss';
//components
import Column from './Column/Column';
import { useEffect, useState } from 'react';
const indicators = [{name: 'Всего клиентов', num: 200}, {name: 'Передано экспертам', num: 180}, {name: 'Состоялась встреча', num: 90}, {name: 'Заполнена анкета', num: 40}, ];
const colors = ['#ED8181','#FFD966', '#63E08D', '#5CD8F0']

const Bage = ({ data, color }) => {
    return (
        <div className={s.bage}>
            <div style={{ backgroundColor: `${color}` }}></div>
            <p>{data.name}</p>
            <span>1777</span>
        </div>
    )
}

const GraphDiagram = ({traficStatic}) => {
    const [maximumValue, setMaximumValue] = useState(200);

    return (
        <div className={s.diagram}>
            <div className={s.header}>
                <h2 className={s.title}>
                    Качество обработки трафика<sup>шт</sup>
                </h2>

                <div className={s.bages}>
                    {indicators.map((el, i) => {
                        return <Bage data={el} color={colors[i]} />
                    })}
                </div>
            </div>
            <div className={s.graph}>
                {traficStatic.map(el => {
                    return <Column colors={colors} indicators={indicators} maximumValue={maximumValue} el={el}/>
                })}

                <div className={s.grid}>
                    {[...Array(5)].map((el, i) => {
                        return <div style={{height: `${i * 25}%`}} className={s.line}>
                            <p>{i * 25}</p>
                            <div></div>
                        </div>
                    })}
                </div>
            </div>
        </div >
    )
};

export default GraphDiagram;