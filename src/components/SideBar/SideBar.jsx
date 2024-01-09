import s from './SideBar.module.scss';
import logo from '../../image/logo.png';
import avatar from '../../image/avatar.png';
import {ReactComponent as DashIcon} from '../../image/dash.svg';
import {ReactComponent as SalesIcon} from '../../image/sales.svg';
import {ReactComponent as IconTeam} from '../../image/iconTeam.svg';
import {ReactComponent as IconExit} from '../../image/iconExit.svg';
import {ReactComponent as IconMoon} from '../../image/iconMoon.svg';
import {ReactComponent as IconOrders} from '../../image/iconOrders.svg';
import {ReactComponent as IconSvod} from '../../image/iconSvod.svg';
import {ReactComponent as IconOpenBp} from '../../image/iconOpenBp.svg';
import {ReactComponent as IconSms} from '../../image/iconSms.svg';
import {ReactComponent as IconPhone} from '../../image/iconPhone.svg';
import {ReactComponent as IconManager} from '../../image/iconManager.svg';
import {ReactComponent as IconAnalitic} from '../../image/iconAnalitic.svg';
import {ReactComponent as IconStat} from '../../image/iconStat.svg';
import {ReactComponent as IconCalenM} from '../../image/iconCalenM.svg';
import {ReactComponent as IconSetting} from '../../image/iconSetting.svg';
import { ReactComponent as IconSkills } from '../../image/iconSkills.svg';
import { useEffect, useState } from 'react';
import { setMenuStatus } from '../../store/reducer/menu/slice';
import { useDispatch } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import { setDark } from '../../store/reducer/menu/slice';
import { setSkillWindow } from '../../store/reducer/skills/slice';
import { getDashbord } from '../../Api/Api';
import { setDateDay } from '../../utils/dates';
import { handleTimeNow } from '../../utils/dates';

function SideBar() {
    const [activePoint, setActivePoint] = useState(JSON.parse(localStorage.getItem('point')) || 1);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [colorLine, setColorLine] = useState('');
    const [stat, setStat] = useState({});
    const [directProgress, setDirectProgress] = useState(0);
    const [diretProgressNow, setDirectProgressNow] = useState(0);
    const [percentNow, setPercentNow] = useState(0);
    const dispatch = useDispatch();
    const dark = useSelector(menuSelector).dark;
    const optionsRef = useRef();
    const buttonRef = useRef();
  
    useEffect(() => {
        function handleInfoDashbord() {
            getDashbord(setDateDay(0))
            .then(res => {
                const data = res.data.data.progress;
                const dayProgress = handleTimeNow();
    
                const percentBp = data?.bp?.num/data?.bp?.plan < 1 ? data?.bp?.num/data?.bp?.plan : 1;
                const percentLk = data?.login?.num/data?.login?.plan < 1 ? data?.login?.num/data?.login?.plan : 1;
                const percentBpNow = data?.bp?.num/(data?.bp?.plan * dayProgress) < 1 ? data?.bp?.num/(data?.bp?.plan * dayProgress) : 1;
                const percentLkNow = data?.login?.num/(data?.login?.plan * dayProgress) < 1 ? data?.login?.num/(data?.login?.plan * dayProgress) : 1;
                const avarage = (percentBp + percentLk)/2*100;
                
                const planNow = (data?.login?.plan * dayProgress / data?.login?.plan + data?.bp?.plan * dayProgress / data?.bp?.plan)/2*100;
                const avarageNow = avarage/planNow * 100;
          console.log(avarageNow)
                setDirectProgress(avarage);
                setDirectProgressNow(avarageNow);
                setPercentNow(planNow)
            })
            .catch(err => console.log(err))
            .finally(setTimeout(() => { handleInfoDashbord()}, 10000))
        }
        handleInfoDashbord()
        },[])

    useEffect(() => {
        if(activePoint === 1) {
            dispatch(setMenuStatus('result'));
            localStorage.setItem('point', JSON.stringify(1))
            return
        }

        if(activePoint === 2) {
            dispatch(setMenuStatus('sales'));
            localStorage.setItem('point', JSON.stringify(2))
            return
        }

        if(activePoint === 19) {
            dispatch(setMenuStatus('team'));
            localStorage.setItem('point', JSON.stringify(19))
            return
        }

        if(activePoint === 20) {
           
            dispatch(setMenuStatus('skills'));
            localStorage.setItem('point', JSON.stringify(20))
            return
        }
    },[activePoint]);

    function handleOpenOptions() {
        if(optionsOpen) {
            setOptionsOpen(false)
        } else {
            setOptionsOpen(true)
        }
    }

    function handleActivePoint(e) {
       const id = Number(e.currentTarget.id);
       console.log(id)
       setActivePoint(id)

       if(activePoint === 20) {
        console.log('скилл')
        dispatch(setSkillWindow(''));
       }
    }

    function handleSwitch() {
        if(switchOn) {
            setSwitchOn(false);
            dispatch(setDark(false));
            localStorage.setItem('darkTheme', JSON.stringify(false))
        } else {
            setSwitchOn(true);
            dispatch(setDark(true));
            localStorage.setItem('darkTheme', JSON.stringify(true))
        }
    }

    useEffect(() => {
       if(dark) {
        setSwitchOn(true);
       } else {
        setSwitchOn(false);
       }
    },[dark])

    function closeModal(e) {
        if (optionsRef.current && !optionsRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOptionsOpen(false)
        }
    }
    console.log(diretProgressNow)
    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);

    useEffect(() => {
        if (diretProgressNow <= 0) {
            setColorLine('');
            return
        }
        if(diretProgressNow <= 50) {
            setColorLine('red');
            return
        }
        if (diretProgressNow > 50 && diretProgressNow < 90) {
            setColorLine('yellow');
            return
        }
        if (diretProgressNow >= 90) {
            setColorLine('green');
            return
        }
    }, [diretProgressNow]);

    return (
        <div className={s.sidebar}>
            <img src={logo} className={s.logo}></img>

            <div className={s.container_avatar}>
                <div ref={buttonRef} onClick={handleOpenOptions} className={s.button}></div>
                <div ref={optionsRef} className={`${s.options} ${dark && s.options_dark} ${optionsOpen && s.options_open}`}>
                    <div onClick={handleSwitch} className={`${s.container_switch} ${dark && s.container_switch_dark}`}>
                        <div className={`${s.block} ${dark && s.block_dark}`}>
                            <IconMoon/>
                            <p>Темная тема</p>
                        </div>
                        <div  className={`${s.switch} ${switchOn && s.switch_on}`}>
                            <div></div>
                        </div>
                    </div>
                    <a href='https://lk.skilla.ru/login/logout.php' className={s.exit}>Выйти из профиля<IconExit/></a>
                </div>
                <div className={s.avatar}>
                    <img src={avatar}></img>
                </div>
                <p className={s.name}>Юлия Корчагина</p>
                <p className={s.post}>Руководитель</p>
                <div className={s.progress}>
                    <div  style={{width: `${directProgress}%`}}  className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                    <div style={{width: `${Math.ceil(percentNow)}%`}} className={`${s.plan}`}></div>
                </div>
                <p className={s.percent}>Прогресс дня {Math.round(directProgress)} %</p>
            </div>
            
            <ul className={s.items}>
                <li onClick={handleActivePoint} id='1' className={`${s.item} ${activePoint === 1 && s.item_active}`}><DashIcon/>Дашборд</li>
                <li onClick={handleActivePoint} id='2' className={`${s.item} ${s.item_2} ${activePoint === 2 && s.item_2_active}`}><SalesIcon/>Продажи</li>
                <li onClick={handleActivePoint} id='19' className={`${s.item}  ${activePoint === 19 && s.item_active}`}><IconTeam/>Команда</li>
                <li onClick={handleActivePoint} id='20' className={`${s.item}  ${activePoint === 20 && s.item_active}`}><IconSkills/>Навыки</li>
                <a href='https://lk.skilla.ru/frmanager/?type=all'><li onClick={handleActivePoint} id='3' className={`${s.item} ${s.item_3} ${activePoint === 3 && s.item_active}`}><IconOrders/>Заявки</li></a>
                <a href='https://lk.skilla.ru/leader/report'><li onClick={handleActivePoint} id='4' className={`${s.item} ${s.item_3} ${activePoint === 4 && s.item_active}`}><IconSvod/>Сводка</li></a>
                <a href='https://lk.skilla.ru/frmanager/bp/'><li onClick={handleActivePoint} id='5' className={`${s.item} ${s.item_3} ${activePoint === 5 && s.item_active}`}><IconOpenBp/>Открытые БП</li></a>
                <a href='https://lk.skilla.ru/leader/quality'><li onClick={handleActivePoint} id='6' className={`${s.item} ${s.item_3} ${activePoint === 6 && s.item_active}`}><IconOpenBp/>Качество работы</li></a>
                <a href='https://lk.skilla.ru/leader/contracts'><li onClick={handleActivePoint} id='7' className={`${s.item} ${s.item_3} ${activePoint === 7 && s.item_active}`}><IconOpenBp/>Договоры</li></a>
                <a href='https://lk.skilla.ru/leader/sms/'><li onClick={handleActivePoint} id='8' className={`${s.item} ${s.item_3} ${activePoint === 8 && s.item_active}`}><IconSms/>СМС</li></a>
                <a href='https://lk.skilla.ru/leader/speech-check'><li onClick={handleActivePoint} id='9' className={`${s.item} ${s.item_3} ${activePoint === 9 && s.item_active}`}><IconPhone/>Звонки</li></a>
                <a href='https://lk.skilla.ru/leader/managers'><li onClick={handleActivePoint} id='10' className={`${s.item} ${s.item_3} ${activePoint === 10 && s.item_active}`}><IconManager/>Менеджеры</li></a>
                <a href='https://lk.skilla.ru/frmanager/analytics'><li onClick={handleActivePoint} id='11' className={`${s.item} ${s.item_3} ${activePoint === 11 && s.item_active}`}><IconAnalitic/>Аналитика</li></a>
                <a href='https://lk.skilla.ru/leader/change'><li onClick={handleActivePoint} id='12' className={`${s.item} ${s.item_3} ${activePoint === 12 && s.item_active}`}><IconStat/>Статистика передач</li></a>
                <a href='https://lk.skilla.ru/controller/analytics'><li onClick={handleActivePoint} id='13' className={`${s.item} ${s.item_3} ${activePoint === 13 && s.item_active}`}><IconStat/>Контроль и ошибки</li></a>
                <a href='https://lk.skilla.ru/leader/skills'><li onClick={handleActivePoint} id='14' className={`${s.item} ${s.item_3} ${activePoint === 14 && s.item_active}`}><IconStat/>Сдача навыков</li></a>
                <a href='https://lk.skilla.ru/purchases'><li onClick={handleActivePoint} id='15' className={`${s.item} ${s.item_3} ${activePoint === 15 && s.item_active}`}><IconStat/>Закупки</li></a>
                <a href='https://lk.skilla.ru/moderator/calendar'><li onClick={handleActivePoint} id='16' className={`${s.item} ${s.item_3} ${activePoint === 16 && s.item_active}`}><IconCalenM/>Календарь событий</li></a>
                <a href='https://lk.skilla.ru/frmanager/ianalytics'><li onClick={handleActivePoint} id='17' className={`${s.item} ${s.item_3} ${activePoint === 17 && s.item_active}`}><IconStat/>Аналитика стажеров</li></a>
                <a href='https://lk.skilla.ru/leader/motivation'><li onClick={handleActivePoint} id='18' className={`${s.item} ${s.item_3} ${activePoint === 18 && s.item_active}`}><IconSetting/>Настройки</li></a>
            </ul>

        </div>
    )
}

export default SideBar;