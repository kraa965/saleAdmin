import s from './PersonalData.module.scss'; 
import { ReactComponent as ArrowInput } from '../../image/ArrowInput.svg';

function PersonalData() {
    return (
        <div className={s.person}>
            <p className={s.sub}>Имя</p>
            <input className={`${s.input} ${s.input_text}`} placeholder='Имя' type='text'></input>
            <p className={s.sub}>Фамилия</p>
            <input className={`${s.input} ${s.input_text}`} placeholder='Фамилия' type='text'></input>

            <p className={s.sub}>Пол</p>
            <div className={s.select}>
                <input value='' className={`${s.input} ${s.input_select}`} disabled placeholder='Укажите пол' type='text'></input>
                <ArrowInput/>
            </div>
            <div className={s.list}>
                <div className={s.item}><p>Мужской</p></div>
                <div className={s.item}><p>Женский</p></div>
            </div>
            
        </div>
    )
};

export default PersonalData;