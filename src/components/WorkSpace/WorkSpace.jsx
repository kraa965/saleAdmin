import s from './WorkSpace.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';


function WorkSpace() {
    const dark = useSelector(menuSelector).dark;

    return (
        <div className={`${s.space} ${dark && s.space_dark}`}>
            <p className={s.title}>Рабочие пространства</p>
            <ul className={s.videos}>
                <div className={s.video}><div><iframe src="https://open.ivideon.com/embed/v3/?server=100-hIyagJHWh6Mw9XWqepsZEn&amp;camera=327680&amp;width=&amp;height=&amp;lang=ru&amp;ap" width="100%" height="305" frameborder="0" allowfullscreen></iframe></div><div ><div></div><div>&nbsp;</div><script src="https://open.ivideon.com/embed/v3/embedded.js"></script></div></div>
                <div className={s.video}><div><iframe src="https://open.ivideon.com/embed/v3/?server=100-hIyagJHWh6Mw9XWqepsZEn&amp;camera=393216&amp;width=&amp;height=&amp;lang=ru&amp;ap" width="100%" height="305" frameborder="0" allowfullscreen></iframe></div><div ><div></div><div>&nbsp;</div><script src="https://open.ivideon.com/embed/v3/embedded.js"></script></div></div>
                <div className={s.video}><div><iframe src="https://open.ivideon.com/embed/v3/?server=100-hIyagJHWh6Mw9XWqepsZEn&amp;camera=262144&amp;width=&amp;height=&amp;lang=ru&amp;ap" width="100%" height="305" frameborder="0" allowfullscreen></iframe></div><div ><div></div><div>&nbsp;</div><script src="https://open.ivideon.com/embed/v3/embedded.js"></script></div></div>
                <div className={s.video}><div><iframe src="https://open.ivideon.com/embed/v3/?server=100-hIyagJHWh6Mw9XWqepsZEn&amp;camera=131072&amp;width=&amp;height=&amp;lang=ru&amp;ap" width="100%" height="305" frameborder="0" allowfullscreen></iframe></div><div ><div></div><div>&nbsp;</div><script src="https://open.ivideon.com/embed/v3/embedded.js"></script></div></div>
            </ul>
        </div>
    )
};

export default WorkSpace;