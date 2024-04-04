import s from './Result.module.scss';
import { useState, useEffect, memo } from 'react';
import ProgressStat from '../ProgressStat/ProgressStat';
import ManagersDay from '../ManagersDay/ManagersDay';
import WorkSpace from '../WorkSpace/WorkSpace';
import { getDashbord } from '../../Api/Api';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useDispatch, useSelector } from 'react-redux';
import { setDateDay } from '../../utils/dates';
import { ReactComponent as TooltipIcon } from '../../image/tooltipIcon.svg';


const token = `1050618373649ab4de90f22649ab4de90f59`;
let ws = new WebSocket(`wss://lk.skilla.ru:8007/?user=${token}`);
ws.addEventListener('close', (e) => {
    ws = new WebSocket(`wss://lk.skilla.ru:8007/?user=${token}`);
    console.log('соединение переустановленно');
});

function Result({activePoint, date, setLoader, loader, managers}) {
    const dark = useSelector(menuSelector).dark;
    const [leaders, setLeaders] = useState([]);
    const [leadersToday, setLeadersToday] = useState([]);
    const [mobleaders, setMobleaders] = useState([]);
    const [mobleadersToday, setMobleadersToday] = useState([]);
    const [experts, setExperts] = useState([]);
    const [expertsToday, setExpertsToday] = useState([]);
    const [stat, setStat] = useState({});
    const [statToday, setStatToday] = useState({});
    const [statMob, setStatMob] = useState({});
    const [statMobToday, setStatMobToday] = useState({});
    const [statExpert, setStatExpert] = useState({});
    const [statExpertToday, setStatExpertToday] = useState({});
    const [managerStatus, setManagerStatus] = useState({});
    const role = document.getElementById('root_leader').getAttribute('role');
    console.log(managers)
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
                console.log(res)
                const data = res.data.data;
                setLeaders(data.business_consultants.leaders);
                setMobleaders(data.mobile_consultants.leaders);
                setExperts(data.experts.leaders);
                setStat(data.business_consultants.progress);
                setStatMob(data.mobile_consultants.progress);
                setStatExpert(data.experts.progress);
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
                        setStatToday(data.business_consultants.progress);
                        setStatMobToday(data.mobile_consultants.progress);
                        setStatExpertToday(data.experts.progress);
                        setLeadersToday(data.business_consultants.leaders);
                        setExpertsToday(data.experts.leaders);
                        setMobleadersToday(data.mobile_consultants.leaders);
                        /*  setTimeout(() => {
                             setLoader(false);
                         }, 700) */
                    })
                    .catch(err => console.log(err))
                    .finally(setTimeout(() => { handleInfoDashbord(date) }, 10000))
            }

            handleInfoDashbord(date)
        }
    }, [date])

    return (
        
            <div className={`${s.content} ${managers && s.content_manager}`}>
              <ManagersDay leaders={activePoint === 0 ? leadersToday : leaders} activePoint={activePoint} mobLeaders={activePoint === 0 ? mobleadersToday : mobleaders} experts={activePoint === 0 ? expertsToday : experts}
                    loader={loader} managerStatus={activePoint === 0 ? managerStatus : {}} role={role} />
                {role === 'leader' && <div className={s.stat}>
                    <ProgressStat title={'Бизнес-консультанты'} type={'default'} indicators={activePoint === 0 ? statToday : stat} loader={loader} activePoint={activePoint} />
                    <ProgressStat title={'Мобильные бизнес-консультнты'} type={'mob'} indicators={activePoint === 0 ? statMobToday : statMob} loader={loader} activePoint={activePoint} />
                    <ProgressStat title={'Эксперты'} type={'expert'} day={true} indicators={activePoint === 0 ? statExpertToday : statExpert} loader={loader}  activePoint={activePoint}/>
                </div>
                }

                {role === 'mobleader' && <div className={s.stat}>
                    <ProgressStat title={'Мобильные бизнес-консультнты'} type={'mob'} indicators={activePoint === 0 ? statMobToday : statMob} loader={loader} activePoint={activePoint} />
                    <ProgressStat title={'Бизнес-консультанты'} type={'default'} indicators={activePoint === 0 ? statToday : stat} loader={loader} activePoint={activePoint} />
                    <ProgressStat title={'Эксперты'} type={'expert'} day={true} indicators={activePoint === 0 ? statExpertToday : statExpert} loader={loader} activePoint={activePoint}/>
                </div>
                }

                {role === 'frmanager' && <div className={s.stat}>
                    <ProgressStat title={'Эксперты'} type={'expert'} day={true} indicators={activePoint === 0 ? statExpertToday : statExpert} loader={loader} activePoint={activePoint}/>
                    <ProgressStat title={'Бизнес-консультанты'} type={'default'} indicators={activePoint === 0 ? statToday : stat} loader={loader} activePoint={activePoint} />
                    <ProgressStat title={'Мобильные бизнес-консультнты'} type={'mob'} indicators={activePoint === 0 ? statMobToday : statMob} loader={loader} activePoint={activePoint} />
                </div>
                }
                <WorkSpace />
                <div className={`${s.teamStat} ${dark && s.teamStat_dark}`}>
                    <div className={s.header_team}>
                        <h3>Команда</h3>
                        <TooltipIcon />
                    </div>
                    <ProgressStat title={'Сотрудники'} type={'team'} indicators={{}} loader={loader} />
                    <ProgressStat title={'Соискатели'} type={'applicants'} day={true} indicators={{}} loader={loader} />
                </div>
            </div>

        
    )
};

export default Result;
