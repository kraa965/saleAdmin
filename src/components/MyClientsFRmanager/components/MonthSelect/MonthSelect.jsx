import s from './MonthSelect.module.scss';
import { useState } from 'react';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';


const MonthSelect = () => {
    const [openList, setOpenList] = useState(false);
    return (
        <div className={`${s.select} ${openList && s.select_open}`}>
            <p>Сентябрь 2024</p><IconChewron/>
            <ul className={`${s.list} ${openList && s.list_open}`}>

            </ul>
        </div>
    )
};

export default MonthSelect;