import s from './Skills.module.scss';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { ReactComponent as IconPlus } from '../../image/iconPlus.svg';
import Skill from '../Skill/Skill';
import SkillWindow from '../SkillWindow/SkillWindow';
import { useState } from 'react';
import { skillsSelector } from '../../store/reducer/skills/selector';
import { useDispatch } from 'react-redux';
import { setSkillWindow } from '../../store/reducer/skills/slice';
import CreateSkill from '../CreateSkill/CreateSkill';

function Skills() {
    const [anim, setAnim] = useState(false);
    const window = useSelector(skillsSelector).skillWindow;
    const dark = useSelector(menuSelector).dark;
    const dispatch = useDispatch();

    useEffect(() => {
        setAnim(true);
    }, []);

    function handleOpenSkillEdit() {
        dispatch(setSkillWindow('edit'))
    }

   

    return (
        <>
            {window === 'skill' && <SkillWindow />}
            {window === 'edit' && <CreateSkill />}

            {window === '' &&
                <div className={`${s.skills} ${dark && s.skills_dark} ${anim && s.anim}`}>
                    <div className={s.header}>
                        <h3 className={s.title}>Навыки <sup>17</sup></h3>
                        <button onClick={handleOpenSkillEdit} className={s.add}><IconPlus/> Добавить навык</button>
                    </div>
                    <p className={`${s.text}`}>Активные <sup>15</sup></p>
                    <div className={s.container}>
                        <Skill type={'new'} />
                        <Skill />
                        <Skill />
                        <Skill />
                        <Skill />
                        <Skill />
                        <Skill />
                    </div>
                </div>
            }

        </>

    )
};

export default Skills;