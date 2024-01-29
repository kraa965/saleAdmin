import s from './TopConsul.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import avatar from '../../image/avatar.png';

function TopConsul() {
    const dark = useSelector(menuSelector).dark;
    return (
        <div className={`${s.top} ${dark && s.top_dark}`}>
            <p className={s.title}>Топ консультантов</p>
            <div className={s.managers}>
                <div className={s.manager}>
                    <div className={s.avatar}>
                        <img src={avatar}></img>
                    </div>
                    <div className={s.block}>
                        <div className={s.text}>
                            <p>Имя</p>
                            <p>0 шт</p>
                        </div>

                        <div className={`${s.progress} ${dark && s.progress_dark}`}>
                            <div style={{width: '50%'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TopConsul;