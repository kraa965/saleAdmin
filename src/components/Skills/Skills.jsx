import s from './Skills.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import {ReactComponent as IconPlus} from '../../image/iconPlus.svg';
import Skill from '../Skill/Skill';
import SkillWindow from '../SkillWindow/SkillWindow';
import { useState } from 'react';

function Skills() {
    const [window, setWindow] = useState(false);
    const dark = useSelector(menuSelector).dark;
    return (
        <div className={`${s.skills} ${dark && s.skills_dark}`}>
            <div className={s.header}>
                <h3 className={s.title}>Навыки <sup>17</sup></h3>
                <button className={s.add}><IconPlus/> Добавить навык</button>
            </div>
            <p className={`${s.text}`}>Активные <sup>15</sup></p>
            <div className={s.container}>
                <Skill type={'new'}/>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
                <Skill/>
            </div>
        </div>
    )
};

export default Skills;