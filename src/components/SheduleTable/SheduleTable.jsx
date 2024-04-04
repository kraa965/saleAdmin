import s from './SheduleTable.module.scss';
import SheduleTableItem from '../SheduleTableItem/SheduleTableItem';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import { ReactComponent as IconChewron2 } from '../../image/iconChewron2.svg';
import { useState, useEffect } from 'react';

function SheduleTable({ dark, table }) {
    const [openTooltip, setOpenTooltip] = useState(false);
    const [anim, setAnim] = useState(false);
    const [sort, setSort] = useState('');
    const [tableSort, setTableSort] = useState(table || []);
    console.log(table)

    useEffect(() => {
        const arraySortUp = [...table].sort((a, b) => {
            const priceA = a.sheet.earnings_total == 0 ? 1 : Math.round(a.sheet.earnings_total / a.sheet.bp_num);
            const priceB = b.sheet.earnings_total == 0 ? 1 : Math.round(b.sheet.earnings_total / b.sheet.bp_num);
            console.log(priceA, priceB)
            if (priceA > priceB) {
                return 1;
            }

            if (priceA < priceB) {
                return -1;
            }

        
                return 0;
            
           
        })

        setTableSort(arraySortUp)
        setSort('up')
    }, [table])

    const handleSortProgress = () => {

        const arraySortUp = [...table].sort((a, b) => {
            const priceA = a.sheet.earnings_total == 0 ? 1 : Math.round(a.sheet.earnings_total / a.sheet.bp_num);
            const priceB = b.sheet.earnings_total == 0 ? 1 : Math.round(b.sheet.earnings_total / b.sheet.bp_num);
            if (priceA > priceB) {
                return 1;
            }

            if (priceA < priceB) {
                return -1;
            }

            return 0;
        })

        const arraySortDown = [...table].sort((a, b) => {
            const priceA = a.sheet.earnings_total == 0 ? 1 : Math.round(a.sheet.earnings_total / a.sheet.bp_num);
            const priceB = b.sheet.earnings_total == 0 ? 1 : Math.round(b.sheet.earnings_total / b.sheet.bp_num);
            if (priceA > priceB) {
                return -1;
            }

            if (priceA < priceB) {
                return 1;
            }
            return 0;
        })

        if (sort == '') {
            setTableSort(arraySortUp)
            setSort('up')
            return
        }

        if (sort == 'up') {
            setTableSort(arraySortDown)
            setSort('down')
            return
        }

        if (sort == 'down') {
            setTableSort(table)
            setSort('')
            return
        }

    }


    useEffect(() => {
        setAnim(true);
        window.scrollTo(0, 0);
    }, []);

    function handleOpenTooltip() {
        if (openTooltip) {
            setOpenTooltip(false);
        } else {
            setOpenTooltip(true);
        }
    }
    return (
        <div className={`${s.table} ${anim && s.table_anim} ${dark && s.table_dark}`}>
            <div className={`${s.header} ${dark && s.header_dark}`}>
                <div className={s.header_manager}>Сотрудник</div>
                <div onClick={handleSortProgress} className={s.header_progress}><span className={`${sort == '' && s.chewron_hiden} ${sort == 'down' && s.chewron_down}`}><IconChewron2 /></span><p style={{ margin: '0 4px' }}>Прогресс по KPI</p> <IconTooltip onMouseEnter={handleOpenTooltip} onMouseLeave={handleOpenTooltip} />
                    <div className={`${s.tooltip} ${openTooltip && s.tooltip_open} ${dark && s.tooltip_dark}`}>
                        <p>Начисления за звонки от 1 минуты и открытые бинес-планы</p>
                        <div></div>
                    </div>
                </div>
                <div className={s.header_plan}>Плановый минимум</div>
                <div className={s.header_bonus}>Плановая премия</div>
                <div className={s.header_shift}>Отработано смен</div>
                <div className={s.header_shift_half}>Неполные смены</div>
                <div className={s.header_shift_vacation}>Отпуск</div>
                {/* <div className={s.header_accruals}>Фактически начислено</div> */}
                <div className={s.header_profit}>Итого к оплате</div>
            </div>
            {tableSort.map((el) => {
                return <SheduleTableItem dark={dark} manager={el?.manager} sheet={el?.sheet} />
            })}
        </div>
    )
};

export default SheduleTable;