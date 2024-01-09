import s from './HomeWorkModal.module.scss';
import { ReactComponent as IconCloseModal } from '../../image/iconCloseModal.svg';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setHomeWorkModal } from '../../store/reducer/skills/slice';


function HomeWorkModal() {
    const [anim, setAnim] = useState(false);
    const dispatch = useDispatch();
    const modalRef = useRef();
    useEffect(() => {
        setAnim(true);
    }, []);



    function handleCloseHomework() {
        console.log(12)
        dispatch(setHomeWorkModal(false));
    }

    function closeModal(e) {
        console.log(e.target)
        if (modalRef.current && !modalRef.current.contains(e.target) && e.target.textContent !== 'Проверить домашку') {
            dispatch(setHomeWorkModal(false));
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);

    return (
        <div  className={`${s.window}  ${anim && s.anim}`}>
            <div ref={modalRef} className={s.modal}>
                <div className={s.header}>
                    <p className={s.title}>Домашнее задание Дениса Дубкова</p>
                    <button onClick={handleCloseHomework} className={s.button_close}><IconCloseModal /></button>
                </div>
                <p className={s.subtitle}>Ответы</p>
                <div className={s.homework}>
                    <p>
                        1. Я хочу купить вот эту более простую палатку.<br></br>
                        2. Чем отличаются эти дорогие духи и вот эти дешевые?<br></br>
                        3. Как я могу получить дешево купить компьютерную игру не в официальном магазине?<br></br>
                        4. Давай закажем пиццу на день рождения вот тут со скидкой.<br></br>
                        5. Я ищу более дешевую машину с аналогичным пробегом.<br></br>
                        6. Этот крем слишком дорогой, покажите более дешевые аналоги в вашем магазине.<br></br>
                        7. Можете ли вы дать мне скидку, если я куплю не один шампунь, а целый годовой набор косметики?<br></br>
                        8. Я хочу купить машину с пробегом дешевле, чем они стоят у дилера.<br></br>
                        9. Нет времени определяться, купите самый дешевый тур в Тайланд.<br></br>
                        10. Этот стол руководителя слишком дорогой.<br></br>
                        11. Дадите ли вы мне скидку, если я выберу не эконом, а премиальную подписку на обучение инвестированию?<br></br>
                        12. Я хочу заказать по акции торт на день рождения.<br></br>
                        13. Пойдем туда, там кофе со скидкой.<br></br>
                        14. Я хочу этот более дешевый принтер.<br></br>
                        15. На эти стеклопакеты есть сейчас существенная скидка.<br></br>
                        16. Это слишком дорогая система автоматического полива<br></br>
                        17. Пойдем в Дикси, там продукты дешевле<br></br>
                        18. Мне нужно детское кресло со скидкой.<br></br>
                        19. Найди для моего отеля сантехнику по самой низкой цене<br></br>
                        20. Хочу сэкономить на очках неизвестного дешевого бренда<br></br>
                        21. На этих курсах английского обещают бесплатные уроки<br></br>
                        22. Я позже присоединюсь к вашей бонусной программе<br></br>
                        15. На эти стеклопакеты есть сейчас существенная скидка.<br></br>
                        16. Это слишком дорогая система автоматического полива<br></br>
                        17. Пойдем в Дикси, там продукты дешевле<br></br>
                        18. Мне нужно детское кресло со скидкой.<br></br>
                        19. Найди для моего отеля сантехнику по самой низкой цене<br></br>
                        20. Хочу сэкономить на очках неизвестного дешевого бренда<br></br>
                        21. На этих курсах английского обещают бесплатные уроки<br></br>
                        22. Я позже присоединюсь к вашей бонусной программе<br></br>
                    </p>
                </div>

                <div className={s.buttons}>
                    <button className={s.retake}>Пересдача</button>
                    <button className={s.passed}>Сдал</button>
                </div>
            </div>
        </div>
    )
};

export default HomeWorkModal;