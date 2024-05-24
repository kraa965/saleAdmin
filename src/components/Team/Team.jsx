import s from './Team.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as IconSearch } from '../../image/iconSearch.svg';
import { ReactComponent as IconPlus } from '../../image/iconPlus.svg';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import TeamMember from '../TeamMember/TeamMember';
import ManagerCard from '../ManagerCard/ManagerCard';
//API
import { getTeam } from '../../Api/Api';
//utils
import { handleFilterManager } from '../../utils/filter';
//selectors
import { menuSelector } from '../../store/reducer/menu/selector';
import { mangerUpdateSelector } from '../../store/reducer/mangerUpdate/selector';
//Components
import TeamMemberSceleton from '../TeamMember/TeamMemberSceleton/TeamMemberSceleton';
import Loader from '../Loader/Loader';

function Team() {
    const role = document.getElementById('root_leader').getAttribute('role');
    const [managers, setManagers] = useState([]);
    const [teamList, setTemList] = useState([]);
    const [teamListFired, setTemListFired] = useState([]);
    const [managersFired, setManagersFired] = useState([]);
    const [fired, setFired] = useState(false);
    const [addWindow, setAddWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const [restoreWindow, setRestoreWindow] = useState(false);
    const [typeEdit, setTypeEdit] = useState(false);
    const [manager, setManager] = useState({});
    const [lengthList, setLengthList] = useState(15);
    const [query, setQuery] = useState('');
    const [load, setLoad] = useState(true);
    const dark = useSelector(menuSelector).dark;
    const update = useSelector(mangerUpdateSelector).updateManagersList;
    const listRef = useRef()
    console.log(managers)
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        Promise.all([getTeam(1), getTeam(0)])
            .then(([res1, res2]) => {
                const data1 = res1.data.team;
                const data2 = res2.data.team;
                setManagers(data1);
                const level1 = data1.filter(el => el.level === 1);
                const level2 = data1.filter(el => el.level === 2);
                const level3 = data1.filter(el => el.level === 3);
                const level4 = data1.filter(el => el.level === 4);
                const level5 = data1.filter(el => el.level === 5);
                const level6 = data1.filter(el => el.level === 6);
                setTemList([level1, level2, level3, level4, level5, level6]);

                setManagersFired(data2);
                const level1remove = data2.filter(el => el.level === 1);
                const level2remove = data2.filter(el => el.level === 2);
                const level3remove = data2.filter(el => el.level === 3);
                const level4remove = data2.filter(el => el.level === 4);
                const level5remove = data2.filter(el => el.level === 5);
                const level6remove = data2.filter(el => el.level === 6);
                setTemListFired([level6remove, level5remove, level4remove, level3remove, level2remove, level1remove]);
                setTimeout(() => {
                    setLoad(false);
                }, 200)

            })
            .catch(err => console.log(err));
    }, [update])

    useEffect(() => {
        window.addEventListener('scroll', scrollLoad);
        return () => window.removeEventListener('scroll', scrollLoad)
    }, [fired])

    const scrollLoad = () => {
        const load = listRef?.current?.getBoundingClientRect().bottom - window.innerHeight < 800;
        load && fired && setLengthList(prevState => prevState + 30);
    }

    useEffect(() => {
        setQuery('');
        const level1 = managers.filter(el => el.level === 1);
        const level2 = managers.filter(el => el.level === 2);
        const level3 = managers.filter(el => el.level === 3);
        const level4 = managers.filter(el => el.level === 4);
        const level5 = managers.filter(el => el.level === 5);
        const level6 = managers.filter(el => el.level === 6);
        setTemList([level1, level2, level3, level4, level5, level6]);

        const level1remove = managersFired.filter(el => el.level === 1);
        const level2remove = managersFired.filter(el => el.level === 2);
        const level3remove = managersFired.filter(el => el.level === 3);
        const level4remove = managersFired.filter(el => el.level === 4);
        const level5remove = managersFired.filter(el => el.level === 5);
        const level6remove = managersFired.filter(el => el.level === 6);
        setTemListFired([level6remove, level5remove, level4remove, level3remove, level2remove, level1remove]);

    }, [fired])

    function handleSwitchFired() {
        if (fired) {
            setFired(false);
            setLengthList(15);
            setRestoreWindow(false)
        } else {
            setFired(true)
            setRestoreWindow(true)
        }
    }

    function handleOpenAddWindow() {
        setEditWindow(false);
        setAddWindow(true);
        setTypeEdit(false);
    }


    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value)
        const searchResult = fired ? handleFilterManager(value, managersFired) : handleFilterManager(value, managers);
        const level1 = searchResult.filter(el => el.level === 1);
        const level2 = searchResult.filter(el => el.level === 2);
        const level3 = searchResult.filter(el => el.level === 3);
        const level4 = searchResult.filter(el => el.level === 4);
        const level5 = searchResult.filter(el => el.level === 5);
        const level6 = searchResult.filter(el => el.level === 6);
        setTemList([level1, level2, level3, level4, level5, level6]);

        const level1remove = searchResult.filter(el => el.level === 1);
        const level2remove = searchResult.filter(el => el.level === 2);
        const level3remove = searchResult.filter(el => el.level === 3);
        const level4remove = searchResult.filter(el => el.level === 4);
        const level5remove = searchResult.filter(el => el.level === 5);
        const level6remove = searchResult.filter(el => el.level === 6);
        setTemListFired([level6remove, level5remove, level4remove, level3remove, level2remove, level1remove]);
    }


    return (
        <div className={`${s.team} ${dark && s.team_dark}`}>
            <p className={s.title}>Команда <sup>{managers.length}{load && <Loader />}</sup></p>
            <div className={s.header}>
                <div className={s.container_header}>
                    <div className={`${s.search} ${dark && s.search_dark}`}>
                        <IconSearch />
                        <input onChange={handleSearch} value={query || ''} placeholder='Искать...'></input>
                    </div>
                    <div className={`${s.buttons} ${load && s.buttons_dis} ${dark && s.buttons_dark}`}>
                        <button onClick={handleSwitchFired} className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${!fired && dark && s.button_active_dark} ${!fired && s.button_active}`}>Работающие</button>
                        <button onClick={handleSwitchFired} className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${fired && dark && s.button_active_dark} ${fired && s.button_active}`}>Уволенные</button>
                    </div>
                </div>
                <button onClick={handleOpenAddWindow} className={`${s.button} ${s.button_new}`}><IconPlus /><p>Добавить сотрудника</p></button>
            </div>

            {/*   <div className={s.container_stat}>
                <p className={`${s.text} ${s.text_2}`}>Штат</p>
                <IconTooltip />
                <div className={s.indicators}>
                    <div className={s.indicator}>
                        <div className={s.container_text}>
                            <p>Бизнес-консультанты<sup>80%</sup></p>
                            <p>20 из 25</p>
                        </div>
                        <div className={s.progress}>
                            <div></div>
                        </div>
                    </div>

                    <div className={s.indicator}>
                        <div className={s.container_text}>
                            <p>Бизнес-консультанты<sup>80%</sup></p>
                            <p>20 из 25</p>
                        </div>
                        <div className={s.progress}>
                            <div></div>
                        </div>
                    </div>

                    <div className={s.indicator}>
                        <div className={s.container_text}>
                            <p>Бизнес-консультанты<sup>80%</sup></p>
                            <p>20 из 25</p>
                        </div>
                        <div className={s.progress}>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div> */}

            {!fired && !load && teamList.map((el, index) => {
                return <div ref={listRef} lassName={s.container} style={{ display: el.length < 1 ? 'none' : '' }}>
                    {role !== 'frmanager' && <p className={s.text}>
                        {index === 0 && 'Новичок-звонила'}
                        {index === 1 && 'Подающий надежды'}
                        {index === 2 && 'Ученик джедая'}
                        {index === 3 && 'Джедай'}
                        {index === 4 && 'Мастер продаж'}
                        {index === 5 && 'Гуру продаж'}
                        <sup> {el.length}</sup>
                    </p>
                    }
                    <div className={s.block}>
                        {el?.map((el, i) => {
                            return <TeamMember key={el.id} id={el.id} name={el.name} surname={el.surname} avatar={el.avatar} hb={el.hb}
                                index={i + 1} level={el.level} progress={el.achivments.progress}
                                reliability={el.achivments.reliability} reliabilityModal={el.achivments.reliability_modal} teamwork={el.achivments.teamwork}
                                phone={el.phone} mango={el.mango_phone} el={el} setManager={setManager} setAddWindow={setAddWindow} setEditWindow={setEditWindow} setTypeEdit={setTypeEdit} />
                        })}

                    </div>
                </div>
            })}

            {load && [[...Array(10)], [...Array(8)], [...Array(6)]].map((el, index) => {
                return <div ref={listRef} lassName={s.container}>
                    {role !== 'frmanager' && <p className={s.text}>
                        {index == 0 && 'Новичок-звонила'}
                        {index == 1 && 'Подающий надежды'}
                        {index == 2 && 'Ученик джедая'}
                        <sup></sup>
                    </p>
                    }
                    <div className={s.block}>
                        {el?.map((el, i) => {
                            return <TeamMemberSceleton />
                        })}

                    </div>
                </div>
            })}

            {fired && teamListFired.map((el, index) => {
                return <div lassName={s.container} style={{ display: el.length < 1 ? 'none' : '' }}>
                    {role !== 'frmanager' && <p className={s.text}>
                        {index === 0 && 'Гуру продаж'}
                        {index === 1 && 'Мастер продаж'}
                        {index === 2 && 'Джедай'}
                        {index === 3 && 'Ученик джедая'}
                        {index === 4 && 'Подающий надежды'}
                        {index === 5 && 'Новичок-звонила'}
                        <sup> {el.length}</sup>
                    </p>
                    }
                    <div ref={listRef} className={s.block}>
                        {el?.map((el, i) => {
                            return i < lengthList && <TeamMember key={el.id} id={el.id} el={el} name={el.name} surname={el.surname} avatar={el.avatar} hb={el.hb}
                                index={i + 1} level={el.level} progress={el.achivments.progress}
                                reliability={el.achivments.reliability} reliabilityModal={el.achivments.reliability_modal} setAddWindow={setAddWindow} setEditWindow={setEditWindow}
                                setTypeEdit={setTypeEdit} setManager={setManager} teamwork={el.achivments.teamwork} type={'fired'} setRestoreWindow={setRestoreWindow} />
                        })}

                    </div>
                </div>
            })}



            {addWindow && <ManagerCard setAddWindow={setAddWindow} typeEdit={typeEdit} />}
            {editWindow && <ManagerCard setAddWindow={setEditWindow} typeEdit={typeEdit} manager={manager} restoreWindow={restoreWindow} setRestoreWindow={setRestoreWindow} />}
        </div>
    )
};

export default Team;