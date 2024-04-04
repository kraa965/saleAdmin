import s from './IndicatorDay.module.scss';
import { menuSelector } from '../../store/reducer/menu/selector';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { handleTimeNow, handleTimeNowExpert } from '../../utils/dates';

function IndicatorDay({title, quantity, total, loader, activePoint, type}) {
    const dark = useSelector(menuSelector).dark;
    const [colorLine, setColorLine] = useState('');
    const percent = total <= 0 ? 0 : Math.ceil(quantity/total * 100);
    const percentNow = total <= 0 ? 0 : Math.ceil((total * (type === 'expert' ? handleTimeNowExpert() : handleTimeNow()))/total * 100);
    const totalNow = activePoint === 0 ? quantity >= total ? total : total * (type === 'expert' ? handleTimeNowExpert() : handleTimeNow()) : total;

    useEffect(() => {
        if (quantity/totalNow <= 0) {
            setColorLine('');
            return
        }
        if(quantity/totalNow <= 0.5) {
            setColorLine('red');
            return
        }
        if (quantity/totalNow > 0.5 && quantity/totalNow < 0.9) {
            setColorLine('yellow');
            return
        }
        if (quantity/totalNow >= 0.9) {
            setColorLine('green');
            return
        }
    }, [quantity, totalNow]);


    return (
        <div style={{order: title === 'login' ? '-3' : title === 'bp_view' ? '-2' : '-1'}} className={s.indicator}>
            {loader && <Loader/>}
            <div className={s.container}>
                <p>
                    {title === 'login' && 'Входы в личный кабинет'}
                    {title === 'bp' && 'Открытые бизнес-планы'}
                    {title === 'bp_view' && 'Открытые БП'}
                  
                    {title === 'zoom' && 'Zoom-встречи'}
                    {title === 'anketa' && 'Одобренные анкеты'}
                    {title === 'sales' && 'Продажи'}

                    {title === 'consul' && 'Бизнес-консультанты'}
                    {title === 'expert' && 'Эксперты'}
                    {title === 'intern' && 'Стажеры'}

                    {title === 'reg' && 'Записаны на интервью'}
                    {title === 'first' && 'Прошли первое интервью'}
                    {title === 'second' && 'Прошли второе интервью'}
                    {total > 0 && <sup>{percent}%</sup>}
                </p>
                <p>{quantity} из {total}</p>
            </div>

            <div className={`${s.progress} ${dark && s.progress_dark}`}>
                <div style={{width: `${percent}%`}} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                {activePoint === 0 && <div style={{width: `${percentNow}%`}} className={`${s.plan} ${dark && s.plan_dark}`}></div>}
            </div>
        </div>
    )
};

export default IndicatorDay;