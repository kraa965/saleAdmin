import { useState, useEffect } from 'react';
import s from './ExpertMonth.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import avatar from '../../image/avatar.png'
import { addSpaceNumber } from '../../utils/addSpaceNumber';


function ExpertMonth({el}) {
    const dark = useSelector(menuSelector).dark;
    const [colorLine, setColorLine] = useState('');
    const percent = Math.ceil(el.sale / el.sale_plane * 100);
    useEffect(() => {
        if (el.sale <= 0) {
            setColorLine('');
            return
        }
        if(el.sale / el.sale_plane <= 0.5) {
            setColorLine('');
            return
        }
        if (el.sale / el.sale_plane > 0.5 && el.sale / el.sale_plane < 0.9) {
            setColorLine('yellow');
            return
        }
        if (el.sale / el.sale_plane >= 0.9) {
            setColorLine('green');
            return
        }
    }, [el.sale, el.sale_plane]);

    return (
        <div className={s.manager}>
            <div className={s.avatar}>
                <img src={el.avatar == '' ? avatar : el.avatar}></img>
            </div>
            <div className={s.container}>
                <div className={s.block_top}>
                    <p>{el.name} {el.surname}<sup>{percent}%</sup></p>
                    <p>{addSpaceNumber(el.sale)} из {addSpaceNumber(el.sale_plane)} ₽</p>
                </div>
                <div className={`${s.progress} ${dark && s.progress_dark}`}>
                    <div style={{ width: `${percent}%` }} className={`${s.selfplan} ${dark && s.selfplan_dark}`}></div>
                    <div style={{ width: `${percent}%` }} className={`${s.bar} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green}`}></div>
                </div>
            </div>
        </div>

    )
};

export default ExpertMonth;