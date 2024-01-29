import s from './Schedule.module.scss';
import CalendarMonth from '../Calendar/CalendarMonth';
import { useState } from 'react';
import SheduleWork from '../SheduleWork/SheduleWork';
import SheduleTable from '../SheduleTable/SheduleTable';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function Shedule() {
    const [sheduleView, setSheduleView] = useState(JSON.parse(localStorage.getItem('sheduleView')));
    const dark = useSelector(menuSelector).dark;

    function handleSwitchView() {
        if (sheduleView) {
            setSheduleView(false);
            localStorage.setItem('sheduleView', JSON.stringify(false));
        } else {
            setSheduleView(true);
            localStorage.setItem('sheduleView', JSON.stringify(true));
        }
    }
    return (
        <div className={s.shedule}>
            <div className={s.header}>
                <p className={s.title}>Расписание</p>
                <CalendarMonth type={'shedule'}/>
            </div>  

            <div className={`${s.main} ${dark && s.main_dark}`}>
                <div className={s.block}>
                    <p className={s.text}>Бизнес-консультанты <sup>15 чел</sup></p>
                    <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
                        <div onClick={handleSwitchView} className={`${s.button} ${sheduleView && s.button_active} ${sheduleView && dark && s.button_active_dark}  ${dark && s.button_dark}`}>График работы</div>
                        <div onClick={handleSwitchView} className={`${s.button} ${!sheduleView && s.button_active} ${!sheduleView && dark && s.button_active_dark}  ${dark && s.button_dark}`}>Табель</div>
                    </div>
                </div>
                {sheduleView && <SheduleWork dark={dark}/>}
                {!sheduleView && <SheduleTable dark={dark}/>}
            </div>
        </div>
    )
};

export default Shedule;