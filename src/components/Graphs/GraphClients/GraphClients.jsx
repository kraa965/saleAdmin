import { useEffect, useRef, useState } from 'react';
import s from './GraphClients.module.scss';
import './GraphClients.css';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    const dark = useSelector(menuSelector).dark;
    if (active && payload && payload.length) {
        return (
            <div className={`${s.tooltip} ${dark && s.tooltip_dark}`}>
                <p className={s.title}>
                    {label.slice(0, 2) == 'пн' && `Понедельник`}
                    {label.slice(0, 2) == 'вт' && `Вторник`}
                    {label.slice(0, 2) == 'ср' && `Среда`}
                    {label.slice(0, 2) == 'чт' && `Четверг`}
                    {label.slice(0, 2) == 'пт' && `Пятница`}
                    {label.slice(0, 2) == 'сб' && `Суббота`}
                    {label.slice(0, 2) == 'ис' && `Воскресение`}
                    <sup>12 декабря</sup>
                </p>
                <div className={s.item}>
                    <div className={s.green}>
                        <div></div> <p>{`Входы в ЛК`} <span>{`85%`}</span></p>
                    </div>
                    <p>{payload[2].value} из {payload[0].value}</p>
                </div>

                <div className={s.item}>
                    <div className={s.blue}>
                        <div></div> <p>{`Отправлено СМС приглашений`}</p>
                    </div>
                    <p>{payload[1].value}</p>
                </div>
            </div>
        );
    }

    return null;
};

function GraphClient({ data, title, ind1, ind2 }) {
    const dark = useSelector(menuSelector).dark;
    const max = 100;
    const stepY = max / 4;



    return (
        <div className={`${s.window} ${dark && s.window_dark}`}>
            <div className={s.header}>
                <p className={s.title}>{title}<sup>шт</sup></p>
                <div className={s.bages}>
                    <div className={`${s.bage} ${dark && s.bage_dark}`}>
                        <div></div>
                        <p>{ind1.name}</p>
                        <span>{ind1.num}</span>
                    </div>

                    <div className={`${s.bage} ${dark && s.bage_dark} ${s.bage_right}`}>
                        <div></div>
                        <p>{ind2.name}</p>
                        <span>{ind2.num}</span>
                    </div>
                </div>
            </div>
            <div className={s.graph}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                    >
                        <CartesianGrid stroke={dark ? '#3F4A5E' : "#EAF0FA"} vertical={false} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Line type="monotone" dataKey="pl" stroke={dark ? '#ECECEC' : "#121922"} strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={false} />
                        <Line type="monotone" dataKey="pv" stroke="#5CD8F0" strokeWidth={3} dot={false} activeDot={{ strokeWidth: 0, r: 5 }} />
                        <Line type="monotone" dataKey="uv" stroke="#63E08D" strokeWidth={3} dot={false} activeDot={{ strokeWidth: 0, r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    )
};
export default GraphClient;