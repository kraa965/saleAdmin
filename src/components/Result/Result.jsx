import s from './Result.module.scss';
import { useState, useEffect } from 'react';
import ProgressStat from '../ProgressStat/ProgressStat';
import ManagersDay from '../ManagersDay/ManagersDay';
import WorkSpace from '../WorkSpace/WorkSpace';
import { getDashbord } from '../../Api/Api';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import { setDateDay } from '../../utils/dates';

const token = `1050618373649ab4de90f22649ab4de90f59`;
let ws = new WebSocket(`wss://lk.skilla.ru:8007/?user=${token}`);
ws.addEventListener('close', (e) => {
  ws = new WebSocket(`wss://lk.skilla.ru:8007/?user=${token}`);
  console.log('соединение переустановленно');
});

function Result() {
    const [activePoint, setActivePoint] = useState(0);
    const [anim, setAnim] = useState(false);
    const [leaders, setLeaders] = useState([]);
    const [leadersToday, setLeadersToday] = useState([])
    const [stat, setStat] = useState({});
    const [statToday, setStatToday] = useState({});
    const [managerStatus, setManagerStatus] = useState({});
    const [loader, setLoader] = useState(false);
    const dark = useSelector(menuSelector).dark;
    const date = (setDateDay(activePoint));
    console.log(managerStatus)
    useEffect(() => {
        setAnim(true);
    }, []);

    useEffect(() => {
        ws.addEventListener('message', (e) => {
           if (JSON.parse(e.data).action == 'manager_status') {
            setManagerStatus(JSON.parse(e.data));
          } 
        });
      }, []);

    useEffect(() => {
        setLoader(true)
        getDashbord(date)
            .then(res => {
                const data = res.data.data;
                console.log(res);
                setLeaders(data.leaders);
                setStat(data.progres);
                setTimeout(() => {
                    setLoader(false);
                }, 300)
            })
            .catch(err => console.log(err))

        if (activePoint === 0) {
            const date = setDateDay(0)
            function handleInfoDashbord(date) {
            
                getDashbord(date)
                    .then(res => {
                        const data = res.data.data;
                        console.log(res);
                        setLeadersToday(data.leaders);
                        setStatToday(data.progres);
                       /*  setTimeout(() => {
                            setLoader(false);
                        }, 700) */
                    })
                    .catch(err => console.log(err))
                    .finally(setTimeout(() => {handleInfoDashbord(date)},10000))
            }

            handleInfoDashbord(date)
        }
    }, [activePoint])

    function handleActivePoint(e) {
        const id = Number(e.currentTarget.id);
        console.log(id)
        setActivePoint(id);
    }

    return (
        <div className={`${s.result} ${anim && s.anim}`}>
            <div className={s.header}>
                <p className={s.title}>Результаты дня</p>
                <div className={`${s.switch} ${dark && s.switch_dark}`}>
                    <button onClick={handleActivePoint} id='2' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 2 && s.button_active} ${activePoint === 2 && dark && s.button_active_dark}`}>Позавчера</button>
                    <button onClick={handleActivePoint} id='1' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 1 && s.button_active} ${activePoint === 1 && dark && s.button_active_dark}`}>Вчера</button>
                    <button onClick={handleActivePoint} id='0' className={`${s.button} ${loader && s.button_dis} ${dark && s.button_dark} ${activePoint === 0 && s.button_active} ${activePoint === 0 && dark && s.button_active_dark}`}>Сегодня</button>
                </div>
            </div>

            <div className={s.content}>
                <ManagersDay leaders={activePoint === 0 ? leadersToday : leaders} loader={loader} managerStatus={activePoint === 0 ? managerStatus : {}}/>
                <ProgressStat title={'Бизнес-консультанты'} type={'default'} indicators={ activePoint === 0 ? statToday : stat} loader={loader} />
                <WorkSpace />
            </div>

        </div>
    )
};

export default Result;