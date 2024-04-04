import { useState, useEffect } from 'react';
import s from './Metrics.module.scss';
import SalesFunnel from './SalesFunnel/SalesFunnel';
import Kpi from './Kpi/Kpi';
import Clients from './Clients/Clients';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function Metrics() {
    const [activeButton, setActiveButton] = useState(1);
    const [anim, setAnim] = useState(false);
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
            setAnim(true);
        window.scrollTo(0, 0);
    }, []);


    function handleMenu(e) {
        const id = Number(e.currentTarget.id);
        setActiveButton(id);

    }
    return (
        <div className={`${s.metrics} ${anim && s.metrics_anim}`}>
            <div className={s.header}>
                <h2>Метрики</h2>
                <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
                    <button id='1' onClick={handleMenu} className={`${s.button} ${dark && s.button_dark} 
                                                                    ${activeButton === 1 && !dark && s.button_active} 
                                                                    ${activeButton === 1 && dark && s.button_dark_active}`}>Воронка продаж</button>
                    <button id='2' onClick={handleMenu} className={`${s.button} ${dark && s.button_dark} 
                                                                    ${activeButton === 2 && !dark && s.button_active} 
                                                                    ${activeButton === 2 && dark && s.button_dark_active}`}>Шаги клиентов</button>
                    <button id='3' onClick={handleMenu} className={`${s.button} ${dark && s.button_dark} 
                                                                    ${activeButton === 3 && !dark && s.button_active} 
                                                                    ${activeButton === 3 && dark && s.button_dark_active}`}>Работа с клиентами</button>
                    <button id='4' onClick={handleMenu} className={`${s.button} ${dark && s.button_dark} 
                                                                    ${activeButton === 4 && !dark && s.button_active} 
                                                                    ${activeButton === 4 && dark && s.button_dark_active}`}>Сотрудники</button>
                </div>
            </div>
            {activeButton === 1 &&
                <div className={`${s.container} ${dark && s.container_dark}`}>
                    <SalesFunnel />
                    <Kpi />
                </div>
            }

            {activeButton !== 1 &&
                <div className={`${s.container} ${dark && s.container_dark}`}>
                    <Clients active={activeButton}/>
                </div>
            }
        </div>
    )
};

export default Metrics;