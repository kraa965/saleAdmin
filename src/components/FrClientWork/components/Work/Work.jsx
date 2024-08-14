import s from './Work.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//components
import Client from '../Client/Client';
import Road from '../Road/Road';
import Comments from '../Comments/Comments';
import CallPlan from '../CallPlan/CallPlan';
import Widget from '../Widget/Widget';
import Anketa from '../Anketa/Anketa';
import CityPartners from '../CityPartners/CityPartners';
import Scenario from '../Scenario/Scenario';
import Messenger from '../Messenger/Messenger';
import { YandexMap } from '../YandexMap/YandexMap';
//selector 
import { selectorApp } from '../../store/reducer/App/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorWork } from '../../store/reducer/Work/selector';

const Work = ({ scenario }) => {
    const [anim, setAnim] = useState(false);
    const [loadClose, setLoadClose] = useState(true);
    const [loadVisible, setLoadVisible] = useState(true);
    const loadClient = useSelector(selectorApp).loadClient;
    const openAnketa = useSelector(selectorWork).anketaOpen;
    const client_city = useSelector(selectorClient).client_city;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        })
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100)
    }, []);

    useEffect(() => {
        if (loadClient) {
            setLoadClose(true);
            setTimeout(() => {
                setLoadVisible(true);
            }, 100)

        } else {
            setLoadClose(false);
            setLoadVisible(false);
        }
    }, [loadClient])



    return (
        <div className={`${s.work} ${anim && s.work_anim}`}>
            <div className={`${s.block} ${s.block_left}`}>
                <Client loadClose={loadClose} loadVisible={loadVisible} />
                <Road loadClose={loadClose} loadVisible={loadVisible} />
                <Comments loadClose={loadClose} loadVisible={loadVisible} />
            </div>
            <div className={`${s.block} ${s.block_right}`}>
                <CallPlan loadClose={loadClose} loadVisible={loadVisible} />
                <div className={s.conteiner}>
                    <Widget loadClose={loadClose} />
                    <Messenger loadClose={loadClose} theme={JSON.parse(localStorage.getItem('theme'))} callButtonAdd={false} />
                </div>
            </div>

            <div className={`${s.block} ${s.block_map}`}>
                <h3>Карта</h3>
                <YandexMap city={client_city}/>
            </div>


            <div className={`${s.block} ${s.block_city}`}>
                <CityPartners />
            </div>

            <div className={`${s.block} ${s.block_scenario}`}>
                <Scenario scenario={scenario} />
            </div>
            {openAnketa && <Anketa />}
        </div>
    )
};

export default Work;