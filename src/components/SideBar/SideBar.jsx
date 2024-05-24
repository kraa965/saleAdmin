import s from './SideBar.module.scss';
import logo from '../../image/logo.png';
import avatar from '../../image/avatar.png';
import avatarExpert from '../../image/avatarExpert.jpg';
import avatarDef from '../../image/avatarDef.png';
import SvetlanaAvatar from '../../image/SvetlanaAvatar.jpg'
import { ReactComponent as DashIcon } from '../../image/dash.svg';
import { ReactComponent as SalesIcon } from '../../image/sales.svg';
import { ReactComponent as IconTeam } from '../../image/iconTeam.svg';
import { ReactComponent as IconExit } from '../../image/iconExit.svg';
import { ReactComponent as IconMoon } from '../../image/iconMoon.svg';
import { ReactComponent as IconOrders } from '../../image/iconOrders.svg';
import { ReactComponent as IconSvod } from '../../image/iconSvod.svg';
import { ReactComponent as IconOpenBp } from '../../image/iconOpenBp.svg';
import { ReactComponent as IconSms } from '../../image/iconSms.svg';
import { ReactComponent as IconPhone } from '../../image/iconPhone.svg';
import { ReactComponent as IconManager } from '../../image/iconManager.svg';
import { ReactComponent as IconAnalitic } from '../../image/iconAnalitic.svg';
import { ReactComponent as IconStat } from '../../image/iconStat.svg';
import { ReactComponent as IconCalenM } from '../../image/iconCalenM.svg';
import { ReactComponent as IconSetting } from '../../image/iconSetting.svg';
import { ReactComponent as IconSkills } from '../../image/iconSkills.svg';
import { ReactComponent as IconShedule } from '../../image/iconShedule.svg';
import { ReactComponent as IconMetrics } from '../../image/iconMetrics.svg';
import { ReactComponent as NavPartners } from '../../image/navPartners.svg';
import { ReactComponent as NavAnalytics } from '../../image/navAnalytics.svg';
import { ReactComponent as IconEvent } from '../../image/iconEvent.svg';
import { ReactComponent as MobButton } from '../../image/mobButton.svg';
import { ReactComponent as IconArrow } from '../../image/ArrowInput.svg';
import { ReactComponent as Stock } from '../../image/icon/sidebar/Stock.svg';
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
import { handleTimeNow, handleTimeNowExpert } from '../../utils/dates';
import { Link } from 'react-router-dom';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';

function SideBar({ role, location }) {
    const [activePoint, setActivePoint] = useState(JSON.parse(localStorage.getItem('point')) || 1);
    const [optionsOpen, setOptionsOpen] = useState(false);
    const [switchOn, setSwitchOn] = useState(false);
    const [colorLine, setColorLine] = useState('');
    const [stat, setStat] = useState({});
    const [directProgress, setDirectProgress] = useState(0);
    const [diretProgressNow, setDirectProgressNow] = useState(0);
    const [percentNow, setPercentNow] = useState(0);
    const [openMobMenu, setOpenMobMenu] = useState(false);
    const [openList, setOpenList] = useState(false);
    const dispatch = useDispatch();
    const dark = useSelector(menuSelector).dark;
    const optionsRef = useRef();
    const buttonRef = useRef();



    useEffect(() => {
        function handleInfoDashbord() {
            getDashbord(setDateDay(0))
                .then(res => {
                    const dataConsul = role === 'leader' ? res.data.data.business_consultants.progress : res.data.data.mobile_consultants.progress;
                    const bp = dataConsul?.bp;
                    const login = dataConsul?.login;

                    const dataExpert = res.data.data.experts.progress;
                    const zoom = dataExpert?.zoom;
                    const anketa = dataExpert?.anketa;
                    const sales = dataExpert?.sales;

                    const dayProgress = handleTimeNow();
                    const dayProgressExpert = handleTimeNowExpert();

                    const percentBp = bp?.plan == 0 ? 0 : bp?.num / bp?.plan < 1 ? bp?.num / bp?.plan : 1;
                    const percentLk = login?.plan == 0 ? 0 : login?.num / login?.plan < 1 ? login?.num / login?.plan : 1;

                    const avarage = (percentBp + percentLk) / 2 * 100;
                    const planNow = (login?.plan * dayProgress / login?.plan + bp?.plan * dayProgress / bp?.plan) / 2 * 100;
                    const avarageNow = avarage / planNow * 100;

                    const percentZoom = zoom?.num / zoom?.plan < 1 ? zoom?.num / zoom?.plan : 1;
                    const percentAnketa = anketa?.num / anketa?.plan < 1 ? anketa?.num / anketa?.plan : 1;
                    const percentSales = sales?.num / sales?.plan < 1 ? sales?.num / sales?.plan : 1;
                    const avarageExpert = (percentZoom + percentAnketa + percentSales) / 3 * 100;
                    const planNowExpert = (zoom?.plan * dayProgressExpert / zoom?.plan + anketa?.plan * dayProgressExpert / anketa?.plan + sales?.plan * dayProgressExpert / sales?.plan) / 3 * 100;
                    const avarageNowExpert = avarageExpert / planNowExpert * 100;

                    if (role === 'frmanager') {
                        setDirectProgress(avarageExpert);
                        setDirectProgressNow(avarageNowExpert);
                        setPercentNow(planNowExpert)
                    } else {
                        setDirectProgress(avarage);
                        setDirectProgressNow(avarageNow);
                        setPercentNow(planNow)
                    }

                })
                .catch(err => console.log(err))
                .finally(setTimeout(() => { handleInfoDashbord() }, 10000))
        }
        handleInfoDashbord()
    }, [])
    useEffect(() => {
        const path = location?.pathname;
        localStorage.removeItem('point');
        dispatch(setMenuStatus(''))
        if (path) {
            if (path === '/leader/dashboard' || path === '/') {
                setActivePoint(1)
                localStorage.setItem('point', JSON.stringify(1))
                return
            }

            if (path == '/leader/dashboard/sales') {

                setActivePoint(2);
                localStorage.setItem('point', JSON.stringify(2))
                return
            }

            if (path === '/leader/dashboard/team') {
                setActivePoint(19);
                localStorage.setItem('point', JSON.stringify(19))
                return
            }

            if (path === '/leader/dashboard/skills') {
                setActivePoint(20);
                localStorage.setItem('point', JSON.stringify(20))
                return
            }

            if (path === '/leader/dashboard/shedule') {
                setActivePoint(21);
                localStorage.setItem('point', JSON.stringify(21))
                return
            }

            if (path === '/leader/dashboard/metrics') {
                setActivePoint(22);
                localStorage.setItem('point', JSON.stringify(22))
                return
            }

            if (path === '/leader/dashboard/stock') {
                setActivePoint(23);
                localStorage.setItem('point', JSON.stringify(23))
                return
            }
        }

    }, [location.pathname])

    function handleOpenOptions() {
        if (optionsOpen) {
            setOptionsOpen(false)
        } else {
            setOptionsOpen(true)
        }
    }

    function handleActivePoint(e) {
        const id = Number(e.currentTarget.id);
        setOpenMobMenu(false)
        setActivePoint(id)

        if (activePoint === 20) {
            dispatch(setSkillWindow(''));
        }
    }

    function handleSwitch() {
        if (switchOn) {
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
        if (dark) {
            setSwitchOn(true);
        } else {
            setSwitchOn(false);
        }
    }, [dark])

    function closeModal(e) {
        if (optionsRef.current && !optionsRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOptionsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);

    useEffect(() => {
        if (diretProgressNow <= 0) {
            setColorLine('');
            return
        }
        if (diretProgressNow <= 50) {
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

    function handleOpenMenuMob() {
        if (openMobMenu) {
            setOpenMobMenu(false)
        } else {
            setOpenMobMenu(true)
        }
    }

    function handleOpenList() {
        openList && activePoint !== 23 && activePoint !== 24 ? setOpenList(false) : setOpenList(true);
    }

    useEffect(() => {
        activePoint !== 23 && activePoint !== 24 && setOpenList(false);
    }, [activePoint])

    return (
        <>
            <div className={`${s.sidebar} ${openMobMenu && s.sidebar_open}`}>
                <img src={logo} className={s.logo}></img>
                <div onClick={handleOpenMenuMob} className={s.close}><IconClose /></div>
                <div className={s.container_avatar}>
                    <div ref={buttonRef} onClick={handleOpenOptions} className={s.button}></div>
                    <div ref={optionsRef} className={`${s.options} ${dark && s.options_dark} ${optionsOpen && s.options_open}`}>
                        <div onClick={handleSwitch} className={`${s.container_switch} ${dark && s.container_switch_dark}`}>
                            <div className={`${s.block} ${dark && s.block_dark}`}>
                                <IconMoon />
                                <p>Темная тема</p>
                            </div>
                            <div className={`${s.switch} ${switchOn && s.switch_on}`}>
                                <div></div>
                            </div>
                        </div>
                        <a href='https://lk.skilla.ru/login/logout.php' className={s.exit}>Выйти из профиля<IconExit /></a>
                    </div>
                    <div className={s.avatar}>
                        {role === 'leader' && <img src={avatar}></img>}
                        {role === 'frmanager' && <img src={avatarExpert}></img>}
                        {role === 'mobleader' && <img src={SvetlanaAvatar}></img>}
                    </div>
                    {role === 'leader' && <div>
                        <p className={s.name}>Юлия Корчагина</p>
                        <p className={s.post}>Руководитель</p>
                    </div>}

                    {role === 'leader' && <div className={s.progress}>
                        <div style={{ width: `${directProgress}%` }} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                        <div style={{ width: `${Math.ceil(percentNow)}%` }} className={`${s.plan}`}></div>
                    </div>}
                    {role === 'leader' && <p className={s.percent}>Прогресс дня {Math.round(directProgress)} %</p>}

                    {role === 'frmanager' && <div>
                        <p className={s.name}>Анна Шуляк</p>
                        <p className={s.post}>Руководитель экспертов</p>
                    </div>}

                    {role === 'frmanager' && <div className={s.progress}>
                        <div style={{ width: `${directProgress}%` }} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                        <div style={{ width: `${Math.ceil(percentNow)}%` }} className={`${s.plan}`}></div>
                    </div>}
                    {role === 'frmanager' && <p className={s.percent}>Прогресс дня {Math.round(directProgress)} %</p>}

                    {role === 'mobleader' && <div>
                        <p className={s.name}>Светлана Соколова</p>
                        <p className={s.post}>Руководитель мобильных бизнес-консультантов</p>
                    </div>}

                    {role === 'mobleader' && <div className={s.progress}>
                        <div style={{ width: `${directProgress}%` }} className={`${s.inner} ${colorLine === 'yellow' && s.yellow} ${colorLine === 'green' && s.green} ${colorLine === 'red' && s.red}`}></div>
                        <div style={{ width: `${Math.ceil(percentNow)}%` }} className={`${s.plan}`}></div>
                    </div>}
                    {role === 'mobleader' && <p className={s.percent}>Прогресс дня {Math.round(directProgress)} %</p>}

                </div>

                {role === 'leader' && <ul className={s.items}>
                    <Link to={'/leader/dashboard'}>
                        <li onClick={handleActivePoint} id='1' className={`${s.item} ${activePoint === 1 && s.item_active}`}><DashIcon />Дашборд</li>
                    </Link>
                    <Link to={'/leader/dashboard/sales'}>
                        <li onClick={handleActivePoint} id='2' className={`${s.item} ${s.item_2} ${activePoint === 2 && s.item_2_active}`}><SalesIcon />Продажи</li>
                    </Link>

                    <Link to={'/leader/dashboard/team'}>
                        <li onClick={handleActivePoint} id='19' className={`${s.item}  ${activePoint === 19 && s.item_active}`}><IconTeam />Команда</li>
                    </Link>
                    {/* <Link to={'/leader/dashboard/skills'}>
                <li onClick={handleActivePoint} id='20' className={`${s.item}  ${activePoint === 20 && s.item_active}`}><IconSkills />Навыки</li>
                 </Link>
                 */}
                    <Link to={'/leader/dashboard/shedule'}>
                        <li onClick={handleActivePoint} id='21' className={`${s.item}  ${activePoint === 21 && s.item_active}`}><IconShedule />Расписание</li>
                    </Link>
                    <Link to={'/leader/dashboard/metrics'}>
                        <li onClick={handleActivePoint} id='22' className={`${s.item} ${s.item_2} ${activePoint === 22 && s.item_2_active}`}><IconMetrics />Метрики</li>
                    </Link>
                    <div className={`${s.list} ${(openList || activePoint === 23 || activePoint === 24) && s.list_open}`}>
                        <li id='233' onClick={handleOpenList} className={`${s.item} ${(activePoint === 23 || activePoint === 24) && s.item_active}`}><Stock />Закупки <div className={`${s.arrow} ${(openList || activePoint === 23 || activePoint === 24) && s.arrow_open}`}><IconArrow /></div></li>
                        <li onClick={handleActivePoint} id='24' className={`${s.item} ${s.item_small} ${s.item_dis} ${activePoint === 24 && s.item_small_active}`}>Список закупок</li>
                        <Link to={'/leader/dashboard/stock'}>
                            <li onClick={handleActivePoint} id='23' className={`${s.item} ${s.item_small} ${activePoint === 23 && s.item_small_active}`}>Склад</li>
                        </Link>
                    </div>

                    <a href='https://lk.skilla.ru/frmanager/?type=all'><li onClick={handleActivePoint} id='3' className={`${s.item} ${s.item_3} ${activePoint === 3 && s.item_active}`}><IconOrders />Заявки</li></a>
                    {/* <a href='https://lk.skilla.ru/leader/report'><li onClick={handleActivePoint} id='4' className={`${s.item} ${s.item_3} ${activePoint === 4 && s.item_active}`}><IconSvod />Сводка</li></a> */}
                    {/* <a href='https://lk.skilla.ru/frmanager/bp/'><li onClick={handleActivePoint} id='5' className={`${s.item} ${s.item_3} ${activePoint === 5 && s.item_active}`}><IconOpenBp />Открытые БП</li></a> */}
                    {/* <a href='https://lk.skilla.ru/leader/quality'><li onClick={handleActivePoint} id='6' className={`${s.item} ${s.item_3} ${activePoint === 6 && s.item_active}`}><IconOpenBp />Качество работы</li></a> */}
                    {/* <a href='https://lk.skilla.ru/leader/contracts'><li onClick={handleActivePoint} id='7' className={`${s.item} ${s.item_3} ${activePoint === 7 && s.item_active}`}><IconOpenBp />Договоры</li></a> */}
                    {/* <a href='https://lk.skilla.ru/leader/sms/'><li onClick={handleActivePoint} id='8' className={`${s.item} ${s.item_3} ${activePoint === 8 && s.item_active}`}><IconSms />СМС</li></a> */}
                    <a href='https://lk.skilla.ru/leader/speech-check'><li onClick={handleActivePoint} id='9' className={`${s.item} ${s.item_3} ${activePoint === 9 && s.item_active}`}><IconPhone />Звонки</li></a>
                    <a href='https://lk.skilla.ru/leader/managers'><li onClick={handleActivePoint} id='10' className={`${s.item} ${s.item_3} ${activePoint === 10 && s.item_active}`}><IconManager />Менеджеры</li></a>
                    <a href='https://lk.skilla.ru/frmanager/analytics'><li onClick={handleActivePoint} id='11' className={`${s.item} ${s.item_3} ${activePoint === 11 && s.item_active}`}><IconAnalitic />Аналитика</li></a>
                    {/* <a href='https://lk.skilla.ru/leader/change'><li onClick={handleActivePoint} id='12' className={`${s.item} ${s.item_3} ${activePoint === 12 && s.item_active}`}><IconStat />Статистика передач</li></a> */}
                    {/* <a href='https://lk.skilla.ru/controller/analytics'><li onClick={handleActivePoint} id='13' className={`${s.item} ${s.item_3} ${activePoint === 13 && s.item_active}`}><IconStat />Контроль и ошибки</li></a> */}
                    <a href='https://lk.skilla.ru/leader/skills'><li onClick={handleActivePoint} id='14' className={`${s.item} ${s.item_3} ${activePoint === 14 && s.item_active}`}><IconStat />Сдача навыков</li></a>
                    <a href='https://lk.skilla.ru/purchases'><li onClick={handleActivePoint} id='15' className={`${s.item} ${s.item_3} ${activePoint === 15 && s.item_active}`}><IconStat />Закупки</li></a>
                    <a href='https://lk.skilla.ru/moderator/calendar'><li onClick={handleActivePoint} id='16' className={`${s.item} ${s.item_3} ${activePoint === 16 && s.item_active}`}><IconCalenM />Календарь событий</li></a>
                    {/*  <a href='https://lk.skilla.ru/frmanager/ianalytics'><li onClick={handleActivePoint} id='17' className={`${s.item} ${s.item_3} ${activePoint === 17 && s.item_active}`}><IconStat />Аналитика стажеров</li></a> */}
                    {/*  <a href='https://lk.skilla.ru/leader/motivation'><li onClick={handleActivePoint} id='18' className={`${s.item} ${s.item_3} ${activePoint === 18 && s.item_active}`}><IconSetting />Настройки</li></a> */}
                    {/*  <a href='https://lk.skilla.ru/leader/managers/nowork'><li onClick={handleActivePoint} id='18' className={`${s.item} ${s.item_3} ${activePoint === 18 && s.item_active}`}><IconEvent />События</li></a> */}
                </ul>
                }

                {role === 'mobleader' && <ul className={s.items}>
                    <Link to={'/leader/dashboard'}>
                        <li onClick={handleActivePoint} id='1' className={`${s.item} ${activePoint === 1 && s.item_active}`}><DashIcon />Дашборд</li>
                    </Link>

                    <Link to={'/leader/dashboard/shedule'}>
                        <li onClick={handleActivePoint} id='21' className={`${s.item}  ${activePoint === 21 && s.item_active}`}><IconShedule />Расписание</li>
                    </Link>

                    <Link to={'/leader/dashboard/sales'}>
                        <li onClick={handleActivePoint} id='2' className={`${s.item} ${s.item_2} ${activePoint === 2 && s.item_2_active}`}><SalesIcon />Продажи</li>
                    </Link>

                    <Link to={'/leader/dashboard/team'}>
                        <li onClick={handleActivePoint} id='19' className={`${s.item}  ${activePoint === 19 && s.item_active}`}><IconTeam />Команда</li>
                    </Link>

                    <a href='https://lk.skilla.ru/leader/managers'><li onClick={handleActivePoint} id='10' className={`${s.item} ${s.item_3} ${activePoint === 10 && s.item_active}`}><IconManager />Менеджеры</li></a>
                    <a href='https://lk.skilla.ru/leader/skills'><li onClick={handleActivePoint} id='14' className={`${s.item} ${s.item_3} ${activePoint === 14 && s.item_active}`}><IconStat />Сдача навыков</li></a>
                    {/*  <a href='https://lk.skilla.ru/leader/managers/nowork'><li onClick={handleActivePoint} id='3' className={`${s.item} ${s.item_3} ${activePoint === 3 && s.item_active}`}><IconEvent />События</li></a> */}
                </ul>
                }

                {role === 'frmanager' && <ul className={s.items}>
                    <Link to={'/leader/dashboard'}>
                        <li onClick={handleActivePoint} id='1' className={`${s.item} ${activePoint === 1 && s.item_active}`}><DashIcon />Дашборд</li>
                    </Link>
                    <Link to={'/leader/dashboard/sales'}>
                        <li onClick={handleActivePoint} id='2' className={`${s.item} ${s.item_2} ${activePoint === 2 && s.item_2_active}`}><SalesIcon />Продажи</li>
                    </Link>
                    <Link to={'/leader/dashboard/shedule'}>
                        <li onClick={handleActivePoint} id='21' className={`${s.item}  ${activePoint === 21 && s.item_active}`}><IconShedule />Расписание</li>
                    </Link>

                    <Link to={'/leader/dashboard/team'}>
                        <li onClick={handleActivePoint} id='19' className={`${s.item}  ${activePoint === 19 && s.item_active}`}><IconTeam />Команда</li>
                    </Link>
                    <a href='https://lk.skilla.ru/leader/managers'><li onClick={handleActivePoint} id='10' className={`${s.item} ${s.item_3} ${activePoint === 10 && s.item_active}`}><IconManager />Менеджеры</li></a>
                    <a href='https://lk.skilla.ru/frmanager/bp/'><li onClick={handleActivePoint} id='5' className={`${s.item} ${s.item_3} ${activePoint === 5 && s.item_active}`}><IconOpenBp />Открытые БП</li></a>
                    <a href='https://lk.skilla.ru/leader/quality'><li onClick={handleActivePoint} id='6' className={`${s.item} ${s.item_3} ${activePoint === 6 && s.item_active}`}><IconOpenBp />Качество работы</li></a>
                    <a href='https://lk.skilla.ru/frmanager/?type=events'><li onClick={handleActivePoint} id='3' className={`${s.item} ${s.item_3} ${activePoint === 3 && s.item_active}`}><IconOrders />Мои клиенты</li></a>
                    <a href='https://lk.skilla.ru/frmanager/?type=favorite'><li onClick={handleActivePoint} id='4' className={`${s.item} ${s.item_3} ${activePoint === 4 && s.item_active}`}><IconOrders />Избранные клиенты</li></a>
                    <a href='https://lk.skilla.ru/mango/'><li onClick={handleActivePoint} id='9' className={`${s.item} ${s.item_3} ${activePoint === 9 && s.item_active}`}><IconPhone />Звонки</li></a>
                    <a href='https://lk.skilla.ru/frmanager/partners/'><li onClick={handleActivePoint} id='5' className={`${s.item} ${s.item_3} ${activePoint === 5 && s.item_active}`}><NavPartners />Партнеры</li></a>
                    {/* <a href='https://lk.skilla.ru/frmanager/analytics/'><li onClick={handleActivePoint} id='7' className={`${s.item} ${s.item_3} ${activePoint === 7 && s.item_active}`}><NavAnalytics />Аналитика</li></a> */}
                </ul>
                }
            </div>
            <button onClick={handleOpenMenuMob} className={s.sidemob}><MobButton /></button>
        </>
    )
}

export default SideBar;