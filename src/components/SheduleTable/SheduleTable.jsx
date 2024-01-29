import s from './SheduleTable.module.scss';
import SheduleTableItem from '../SheduleTableItem/SheduleTableItem';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import { useState } from 'react';

function SheduleTable({dark}) {
    const [openTooltip, setOpenTooltip] = useState(false);

    function handleOpenTooltip() {
        if(openTooltip) {
            setOpenTooltip(false);
        } else {
            setOpenTooltip(true);
        }
    }
    return (
        <div className={`${s.table} ${dark && s.table_dark}`}>
            <div className={`${s.header} ${dark && s.header_dark}`}>
                <div className={s.header_manager}>Сотрудник</div>
                <div className={s.header_progress}>Прогресс по KPI <IconTooltip onMouseEnter={handleOpenTooltip} onMouseLeave={handleOpenTooltip}/>
                    <div className={`${s.tooltip} ${openTooltip && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                        <p>Начисления за звонки от 1 минуты и открытые бинес-планы</p>
                        <div></div>
                    </div>
                </div>
                <div className={s.header_plan}>Плановый минимум</div>
                <div className={s.header_bonus}>Плановая премия</div>
                <div className={s.header_shift}>Отработано смен</div>
                <div className={s.header_accruals}>Фактически начислено</div>
                <div className={s.header_profit}>Итого к оплате</div>
            </div>
            <SheduleTableItem dark={dark}/>
            <SheduleTableItem dark={dark}/>
            <SheduleTableItem dark={dark}/>
        </div>
    )
};

export default SheduleTable;