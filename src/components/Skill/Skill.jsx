import s from './Skill.module.scss';
import skill from '../../image/skill1.png';

function Skill({type}) {
    return (
        <div className={`${s.skill} ${type === 'new' && s.skill_new}`}>
            {type === 'new' && <div className={s.bage}><p>2</p></div>} 
            <div className={s.pic}>
                <img src={skill}></img>
            </div>
            <p className={s.title}>Основы в скилла</p> 
            <p className={`${s.text} ${s.text_desc}`}>Изучив этот навык, ты узнаешь про компанию Скилла все</p>   
            <p className={s.text}>Уровень 1</p> 
        </div>
    )
};

export default Skill;