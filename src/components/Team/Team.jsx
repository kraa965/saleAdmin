import s from './Team.module.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { ReactComponent as IconSearch } from '../../image/iconSearch.svg';
import { ReactComponent as IconPlus } from '../../image/iconPlus.svg';
import { ReactComponent as IconTooltip } from '../../image/iconTooltip.svg';
import TeamMember from '../TeamMember/TeamMember';
import ManagerCard from '../ManagerCard/ManagerCard';

function Team() {
    const [fired, setFired] = useState(false);
    const [addWindow, setAddWindow] = useState(false);
    const [editWindow, setEditWindow] = useState(false);
    const [typeEdit, setTypeEdit] = useState(false);
    const dark = useSelector(menuSelector).dark;
    console.log(editWindow, addWindow)
    function handleSwitchFired() {
        if (fired) {
            setFired(false)
        } else {
            setFired(true)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    function handleOpenAddWindow() {
        setEditWindow(false);
        setAddWindow(true);
        setTypeEdit(false);
    }

    function handleOpenEditWindow() {
        console.log('cliiick')
        setAddWindow(false);
        setEditWindow(true);
        setTypeEdit(true);
    }


    return (
        <div className={`${s.team} ${dark && s.team_dark}`}>
            <p className={s.title}>Команда <sup>13</sup></p>
            <div className={s.header}>
                <div className={s.container_header}>
                    <div className={`${s.search} ${dark && s.search_dark}`}>
                        <IconSearch />
                        <input placeholder='Искать...'></input>
                    </div>
                    <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
                        <button onClick={handleSwitchFired} className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${!fired && dark && s.button_active_dark} ${!fired && s.button_active}`}>Работающие</button>
                        <button onClick={handleSwitchFired} className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${fired && dark && s.button_active_dark} ${fired && s.button_active}`}>Уволенные</button>
                    </div>
                </div>
                <button onClick={handleOpenAddWindow} className={`${s.button} ${s.button_new}`}><IconPlus /><p>Добавить сотрудника</p></button>
            </div>

            <div className={s.container_stat}>
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
            </div>

            <div className={s.container}>
                <p className={s.text}>Новички<sup>12</sup></p>
                <div className={s.block}>
                    <TeamMember openEdit={handleOpenEditWindow} index={1} />
                    <TeamMember index={2} />
                    <TeamMember index={3} />
                    <TeamMember index={4} />
                    <TeamMember index={5} />
                    <TeamMember />
                    <TeamMember />
                </div>
            </div>
            {addWindow && <ManagerCard setAddWindow={setAddWindow} typeEdit={typeEdit} />}
            {editWindow && <ManagerCard setAddWindow={setEditWindow} typeEdit={typeEdit} />}
        </div>
    )
};

export default Team;