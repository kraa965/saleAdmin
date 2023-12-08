import s from './PlanSales.module.scss';
import avatar from '../../image/avatar.png';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
const planSales = [{ name: 'Юлия', surname: 'Кондыбаева', plan: 20000000, total: 10000000, avatar: avatar },
{ name: 'Юлия', surname: 'Кондыбаева', plan: 20000000, total: 10000000, avatar: avatar },
{ name: 'Юлия', surname: 'Кондыбаева', plan: 20000000, total: 10000000, avatar: avatar }]
function PlanSales() {
    const dark = useSelector(menuSelector).dark;
    return (
        <div className={`${s.paln} ${dark && s.paln_dark}`}>
            <p className={s.title}>Выполнение плана</p>
            <div className={s.managers}>
                {planSales.map((el) => {
                    return <div className={s.manager}>
                        <div className={s.avatar}>
                            <img src={el.avatar}></img>
                        </div>
                        <div className={s.container}>
                            <div className={s.block_top}>
                                <p>Юлия Кондыбаева<sup>96%</sup></p>
                                <p>{addSpaceNumber(el.total)} из {addSpaceNumber(el.plan)} ₽</p>
                            </div>
                            <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                <div style={{width: '70%'}} className={`${s.selfplan} ${dark && s.selfplan_dark}`}></div>
                                <div style={{width: `${el.total/el.plan * 100}%`}} className={s.bar}></div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
};

export default PlanSales;