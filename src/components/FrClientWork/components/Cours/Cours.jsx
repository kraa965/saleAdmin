import s from './Cours.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconClose } from '../../image/iconClose.svg';
//slice
import { setCoursOpen } from '../../store/reducer/Work/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';

import { exam } from '../../constant/content';

const Question = ({ el, active }) => {
    const options = el.options;
    const name = el.name;
    const answer = el.answer;

    return (
        <div className={s.question}>
        <div className={s.question_header}>
            <h3 className={s.num}>{el.id}. </h3><h3>{el.name}</h3>
        </div>

        <div className={s.answers}>
            {options.map((el) => {
                const id = el.id;

                return <div id={id} className={`${s.answer} ${(id == active && active == answer && s.answer_succes)} ${(id == active && active !== answer) && s.answer_fail}`}>
                    <div id={id} className={`${s.radio} ${id == active && s.radio_active} ${id == active && active == answer && s.radio_succes} ${id == active && active != answer && s.radio_fail}`}>
                        <div></div>
                    </div>
                    <p>{el.text}</p>
                </div>
            })}
        </div>

    </div>
    )
}



const Cours = () => {
    const answers = useSelector(selectorClient).answers;
    console.log(answers)
    const [anim, setAnim] = useState(false);
    const dispatch = useDispatch();
    const modalRef = useRef();


    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    const handleClose = () => {
        setAnim(false);
        setTimeout(() => {
            dispatch(setCoursOpen(false))
        }, 200)
    }




    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleClose();
        }
    }
    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);
    return (
        <div className={`${s.overlay} ${anim && s.overlay_anim}`}>
            <div ref={modalRef} className={`${s.anketa} ${anim && s.anketa_anim}`}>
                <div className={s.header}>
                    <h2 className={s.title}>Проверка знаний</h2>
                    <div onClick={handleClose} className={s.icon_close}><IconClose /></div>
                </div>

                <div className={s.container}>
                    {exam.map((el, i) => {
                        const active = answers.find(item => item.quest == el.id)
                        console.log(active)
                        return <Question key={el.id} el={el} active={active?.answer}/>
                    })}
                </div>

            </div>
        </div>
    )
};

export default Cours;