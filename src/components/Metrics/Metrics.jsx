import { useState, useEffect } from 'react';
import s from './Metrics.module.scss';
import SalesFunnel from './SalesFunnel/SalesFunnel';
import Kpi from './Kpi/Kpi';
import Clients from './Clients/Clients';
import Experts from './Experts/Experts';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
//API
import { getMetricsSales, getMetricsSteps } from '../../Api/Api';

function Metrics() {
    const [activeButton, setActiveButton] = useState(1);
    const [anim, setAnim] = useState(false);
    const [stepsStat, setStepsStat] = useState({});
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
        setAnim(true);
        getMetricsSales()
            .then(res => {
            })
            .catch(err => console.log(err))

        getMetricsSteps()
            .then(res => {
                const data = res.data;
                setStepsStat(data);
            })
            .catch(err => console.log(err))
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

                    <button id='5' onClick={handleMenu} className={`${s.button} ${dark && s.button_dark} 
                                                                    ${activeButton === 5 && !dark && s.button_active} 
                                                                    ${activeButton === 5 && dark && s.button_dark_active}`}>Эксперты</button>
                </div>
            </div>
            {activeButton === 1 &&
                <div className={`${s.container} ${dark && s.container_dark}`}>
                    <SalesFunnel />
                    <Kpi />
                </div>
            }

            {activeButton !== 1 && activeButton !== 5 &&
                <div className={`${s.container} ${dark && s.container_dark}`}>
                    <Clients active={activeButton} stepsStat={stepsStat} />
                </div>
            }

            {activeButton == 5 &&
                <div className={`${s.container} ${dark && s.container_dark}`}>
                    <Experts/>
                </div>
            }
        </div>
    )
};

export default Metrics;