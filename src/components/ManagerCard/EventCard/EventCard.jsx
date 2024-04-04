import s from './EventCard.module.scss';

const EventCard = () => {
    return (
        <ul className={s.event}>
            <li className={s.item}>
                <p className={s.date}>25.05.23</p>
                <p className={`${s.fail}`}>Незапланированный выходной за свой счет</p>
            </li>

            <li className={s.item}>
                <p>25.05.23</p>
                <p>Незапланированный выходной за свой счет</p>
            </li>
        </ul>
    )
};

export default EventCard;