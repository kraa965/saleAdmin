import s from './CreateSkill.module.scss';
import { useState, useEffect } from 'react';
import { ReactComponent as IconBack } from '../../image/iconBack.svg';
import { useDispatch } from 'react-redux';
import { setSkillWindow } from '../../store/reducer/skills/slice';
import FileLoader from '../FileLoader/FileLoader';

function CreateSkill() {
    const [anim, setAnim] = useState(false);
    const [switchOnline, setSwitchOnline] = useState(JSON.parse(localStorage.getItem('switchOnline')) || false);
    const [name, setName] = useState(JSON.parse(localStorage.getItem('skillName')) || '');
    const [descpirt, setDescript] = useState(JSON.parse(localStorage.getItem('skillDescript')) || '');
    const [duration, setDuration] = useState(JSON.parse(localStorage.getItem('skillDuration')) || '');
    const [level, setLevel] = useState(JSON.parse(localStorage.getItem('skillLevel')) || '');
    const [introduction, setIntroduction] = useState(JSON.parse(localStorage.getItem('skillIntroduction')) || '');
    const dispatch = useDispatch();

    useEffect(() => {
        setAnim(true);
    }, []);

    function handleBack() {
        dispatch(setSkillWindow(''));
    }

    function handleName(e) {
        const text = e.target.value;
        setName(text);
        localStorage.setItem('skillName', JSON.stringify(text))
    }

    function handleDescript(e) {
        const text = e.target.value;
        setDescript(text);
        localStorage.setItem('skillDescript', JSON.stringify(text))
    }

    function handleDuration(e) {
        const text = e.target.value;
        setDuration(text);
        localStorage.setItem('skillDuration', JSON.stringify(text))
    }

    function handleLevel(e) {
        const text = e.target.value;
        setLevel(text);
        localStorage.setItem('skillLevel', JSON.stringify(text))
    }

    function handleIntroduction(e) {
        const text = e.target.value;
        setIntroduction(text);
        localStorage.setItem('skillIntroduction', JSON.stringify(text))
    }
    

    function handleSwitch(e) {
        const id = e.currentTarget.id;

        if (id === 'online' && !switchOnline) {
            setSwitchOnline(true);
            localStorage.setItem('switchOnline', true)
            return
        }

        if (id === 'online' && switchOnline) {
            setSwitchOnline(false);
            localStorage.setItem('switchOnline', false)
            return
        }
    }
    return (
        <div className={`${s.create} ${anim && s.anim}`}>
            <div className={s.skill}>
                <button onClick={handleBack} className={s.button_back}><IconBack /> Назад</button>
                <p className={s.title}>Новый навык</p>

                <p className={s.title_small}>Название</p>
                <input value={name || ''} onChange={handleName} placeholder='Не указано' className={s.name}></input>

                <div onClick={handleSwitch} id='online' className={s.container_switch}>
                    <div className={`${s.switch} ${switchOnline && s.switch_active}`}><div></div></div>
                    <p className={`${s.title_small} ${switchOnline && s.title_small_active}`}>Онлайн экзамен</p>
                </div>

                <p className={s.title_small}>Описание навыка в карточке</p>
                <textarea onChange={handleDescript} resize='none' placeholder='Не указано' className={s.desc}>{descpirt}</textarea>

                <div className={s.container}>
                    <div className={s.block}>
                        <p className={s.title_small}>Время на прочтение</p>
                        <div className={s.block_input}>
                            <input onChange={handleDuration} type='number' value={duration || ''} placeholder='0' className={s.time} min="1" max="100"></input>
                            <p>мин</p>
                        </div>
                        
                    </div>
                    <div className={s.block}>
                        <p className={s.title_small}>Доступно на уровне</p>
                        <input onChange={handleLevel} type='number' value={level || ''} placeholder='0' className={s.level} min="1" max="12"></input>
                    </div>
                </div>

                <p className={s.title_small}>Введение в навык</p>
                <textarea onChange={handleIntroduction} resize='none' placeholder='Не указано' className={s.introduction}>{introduction}</textarea>

                <p className={s.title_small}>Изображение</p>
                <FileLoader/>
            </div>
        </div>
    )
};

export default CreateSkill;