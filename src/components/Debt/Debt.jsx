import s from './Debt.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { ReactComponent as TooltipIcon } from '../../image/tooltipIcon.svg';

function Debt() {
    const dark = useSelector(menuSelector).dark;

    return (
        <div className={`${s.debt} ${dark && s.debt_dark}`}>
            <div className={s.header}>
                <p className={s.title}>Задолженность на сегодня</p>
                <TooltipIcon />
            </div>
            <div className={s.item}>
                <p>Декабрь</p>
                <p>1 300 000 руб</p>
            </div>
            <div className={s.item}>
                <p>Декабрь</p>
                <p>1 300 000 руб</p>
            </div>
            <div className={s.item}>
                <p>Декабрь</p>
                <p>1 300 000 руб</p>
            </div>
        </div>
    )
};

export default Debt;