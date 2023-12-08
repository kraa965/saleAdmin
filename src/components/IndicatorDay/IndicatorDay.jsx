import s from './IndicatorDay.module.scss';
import { menuSelector } from '../../store/reducer/menu/selector';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function IndicatorDay({title, quantity, total, loader}) {
    const dark = useSelector(menuSelector).dark;
    const [colorLine, setColorLine] = useState('');
    const percent = Math.ceil(quantity/total * 100);

    useEffect(() => {
        if(quantity / total <= 0.5) {
            setColorLine('');
            return
        }
        if (quantity / total > 0.5 && quantity / total < 1) {
            setColorLine('yellow');
            return
        }
        if (quantity / total >= 1) {
            setColorLine('green');
            return
        }
    }, [quantity, total]);


    return (
        <div className={s.indicator}>
            {loader && <Loader/>}
            <div className={s.container}>
                <p>
                    {title === 'login' && 'Входы в личный кабинет'}
                    {title === 'bp' && 'Открытые бизнес-планы '}
                    {title === 'bp_per_manager' && 'Бизнес-планов на консультанта'}
                    <sup>{percent}%</sup>
                </p>
                <p>{quantity} из {total}</p>
            </div>

            <div className={`${s.progress} ${dark && s.progress_dark}`}>
                <div style={{width: `${percent}%`}} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green}`}></div>
            </div>
        </div>
    )
};

export default IndicatorDay;