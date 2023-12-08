import s from './Clients.module.scss';
import Client from '../Client/Client';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function Clients() {
    const dark = useSelector(menuSelector).dark;
    return (
        <div className={`${s.clients} ${dark && s.clients_dark}`}>
            <p className={s.title}>Клиенты<sup>15</sup></p>
            <div className={`${s.header} ${dark && s.header_dark}`}>
                <div className={s.header_client}>
                    <p>Клиент</p>
                </div>
                <div className={s.header_sum}>
                    <p>Сумма</p>
                </div>
                <div className={s.header_time}>
                    <p>Время</p>
                </div>
                <div className={s.header_source}>
                    <p>Источник</p>
                </div>
                <div className={s.header_managers}>
                    <p>Сотрудники</p>
                </div>
                <div className={s.header_study}>
                    <p>Дата обучения</p>
                </div>
                <div className={s.header_progress}>
                    <p>Прогресс</p>
                </div>
                <div className={s.header_pay}>
                    <p></p>
                </div>
            </div>
            <div className={s.container}>
                <Client step={1} stepFail = {1}/>
                <Client step={2}/>
                <Client step={2} stepFail = {2}/>
                <Client step={3}/>
                <Client step={4}/>
                <Client step={5}/>
            </div>
        </div>
    )
};

export default Clients;

