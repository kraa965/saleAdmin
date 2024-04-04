import s from './Clients.module.scss';
import Client from '../Client/Client';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import Loader from '../Loader/Loader';
import { useEffect } from 'react';

function Clients({clients, loader, setUpdate}) {
    const dark = useSelector(menuSelector).dark;
    console.log(clients)
   /*  useEffect(() => {
        if(clients) {
          clients.sort((a, b) => {
            if(a.accept_interval > b.accept_interval) {
                return 1
            }

            if(a.accept_interval < b.accept_interval) {
                return -1
            }

            return 0
          })
        }
    },[clients]) */

    const clientRev = [...clients].reverse();
    
    return (
        <div className={`${s.clients} ${dark && s.clients_dark}`}>
            <p className={s.title}>Клиенты<sup>{clients.length}{loader && <Loader/>}</sup></p>
            <div className={`${s.header} ${dark && s.header_dark}`}>
                <div className={s.header_client}>
                    <p>Клиент</p>
                </div>
                <div className={s.header_sum}>
                    <p>Сумма</p>
                </div>
                
                <div className={s.header_source}>
                    <p>Источник</p>
                </div>
                <div className={s.header_managers}>
                    <p>Сотрудники</p>
                </div>
               {/*  <div className={s.header_study}>
                    <p>Дата обучения</p>
                </div> */}
                <div className={s.header_progress}>
                    <p>Прогресс</p>
                </div>
                <div className={s.header_pay}>
                    <p></p>
                </div>
            </div>
            <div className={s.container}>
            {loader && <Loader/>}
            {clientRev.map((el) => {
                    return <Client name={el.name} surname={el.surname} city={el.city} sum={el.sum}
                                   source={el.source} expert={el.expert} interne={el.interne} acceptDate={el.accept_interval}
                                   dateStudy={el.crm_date} id={el.id} progress={Object.values(el.progress)} setUpdate={setUpdate} crmLogin={el.crm_login && el.crm_login !== '' ? true : false}/>
                })}

            </div>
        </div>
    )
};

export default Clients;

