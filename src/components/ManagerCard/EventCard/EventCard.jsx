import s from './EventCard.module.scss';
import { handleRangeDateYear } from '../../../utils/dates';

const EventCard = ({ events }) => {
    return (
        <ul className={s.event}>

            {events.map((el) => {
                if (el.event_id == 11 || el.event_id == 12) {
                    return <li className={s.item}>
                        <p>{handleRangeDateYear(el.date)}</p>
                        <p className={s.name}>{el.type.name}</p>
                    </li>
                } else {
                    return <li className={s.item}>
                        <p>{handleRangeDateYear(el.date)}</p>
                        <p  className={`${s.fail} ${s.name}`}>{el.type.name}</p>
                    </li>
                }
            })}
        </ul>
    )
};

export default EventCard;