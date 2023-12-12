import s from './Team.module.scss';
import { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import {ReactComponent as IconSearch} from '../../image/iconSearch.svg';
import {ReactComponent as IconPlus} from '../../image/iconPlus.svg';
import TeamMember from '../TeamMember/TeamMember';

function Team() {
    const [fired, setFired] = useState(false);
    const dark = useSelector(menuSelector).dark;

    function handleSwitchFired() {
        if(fired) {
            setFired(false)
        } else {
            setFired(true)
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={`${s.team} ${dark && s.team_dark}`}>
            <p className={s.title}>Команда <sup>13</sup></p>
            <div className={s.header}>
                <div className={s.container_header}>
                    <div className={`${s.search} ${dark && s.search_dark}`}>
                        <IconSearch/>
                        <input placeholder='Искать...'></input>
                    </div>
                    <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
                        <button onClick={handleSwitchFired} className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${!fired && dark && s.button_active_dark} ${!fired && s.button_active}`}>Работающие</button>
                        <button onClick={handleSwitchFired}  className={`${s.button} ${s.button_workers} ${dark && s.button_workers_dark} ${fired && dark && s.button_active_dark} ${fired && s.button_active}`}>Уволенные</button>
                    </div>
                </div>
                <button className={`${s.button} ${s.button_new}`}><IconPlus/><p>Добавить сотрудника</p></button>
            </div>

            <div className={s.container}>
                <p className={s.text}>Новички<sup>12</sup></p>
                <div className={s.block}>
                    <TeamMember index={1}/>
                    <TeamMember index={2}/>
                    <TeamMember index={3}/>
                    <TeamMember index={4}/>
                    <TeamMember index={5}/>
                    <TeamMember/>
                    <TeamMember/>
                </div>
            </div>
        </div>
    )
};

export default Team;