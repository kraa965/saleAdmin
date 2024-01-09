import s from './SkillWindow.module.scss';
import skill from '../../image/skill1.png';
import {ReactComponent as IconBack} from '../../image/iconBack.svg';
import { useState, useEffect } from 'react';
import { setSkillWindow } from '../../store/reducer/skills/slice';
import { useDispatch } from 'react-redux';
import ManagerExam from '../ManagerExam/ManagerExam';
import HomeWorkModal from '../HomeWorkModal/HomeWorkModal';
import { skillsSelector } from '../../store/reducer/skills/selector';
import { useSelector } from 'react-redux';

function SkillWindow() {
    const [anim, setAnim] = useState(false);
    const dispatch = useDispatch();
    const homeworkModal = useSelector(skillsSelector).homeWorkModal
    console.log(homeworkModal)
    useEffect(() => {
        setAnim(true);
    }, []);

    function handleBack() {
        dispatch(setSkillWindow(''));
    }
    return (
        <div className={`${s.window} ${anim && s.anim}`}>
            {homeworkModal && <HomeWorkModal/>}
            <div className={s.container_left}>
                <div className={s.container_top}>
                    <button onClick={handleBack} className={s.button_back}><IconBack/> Назад</button>
                    <div className={s.header}>
                        <div className={s.pic}>
                            <img src={skill}></img>
                        </div>
                        <div className={s.container_header}>
                            <p style={{ marginBottom: '4px' }} className={s.text_small}>Добавлен 21.09.2023</p>
                            <p className={s.title}>Основы в Скилла</p>
                            <div className={s.container_text}>
                                <p className={s.text}>Время на прочтение</p>
                                <p className={s.text_small}>30 мин</p>
                            </div>
                            <div className={s.container_text}>
                                <p className={s.text}>Доступно</p>
                                <p className={s.text_small}>Уровень 1</p>
                            </div>
                        </div>


                    </div>
                    <p className={s.title_small}>Описание навыка</p>
                    <div className={s.discript}>
                        С этого навыка начинают все новички. Изучив этот навык, ты узнаешь про компанию Скилла все, что нужно для начала работы. Это база, имея которую, легко влиться в процесс и коллектив. Легкость адаптации и твой будущий личный доход напрямую зависит от освоения данного навыка.
                        Поехали!
                    </div>
                </div>
                <button className={s.button_edit}>Редактировать навык</button>
            </div>
            <div className={s.container__right}>
            <div className={s.scrool}>
            <p className={s.title_small}>Готовы сдать экзамен</p>
                    <ul className={s.managers}>
                        <ManagerExam type={'ready'}/>
                    </ul>
                <div className={s.exambook}>
               
                    <p className={s.title_small}>Журнал экзаменов</p>
                    <ul className={s.managers}>
                        <ManagerExam/>
                        <ManagerExam/>
                        <ManagerExam/>
                        <ManagerExam/>
                        <ManagerExam/>
                        
                    </ul>
                </div>
            </div>
          </div>
        </div>
    )
};

export default SkillWindow;