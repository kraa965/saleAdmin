import s from './WorkTime.module.scss';

function WorkTime({dark}) {
    return (
        <div className={`${s.container} ${dark && s.container_dark}`}>
            <div className={s.header}>
                <p className={s.title}>Рабочий день <span>5/2</span></p>
                <p className={s.alltime}>{'8'} ч</p>
            </div>

            <div className={s.progress}>
                <div style={{width: `${20}%`}} className={s.plan}></div>
                <div style={{width: `${10}%`}} className={s.call}></div>
                <div style={{width: `${15}%`}} className={s.card}></div>
                <div style={{width: `${15}%`}} className={s.client}></div>
                <div style={{width: `${30}%`}} className={s.pause}></div>
                <div style={{width: `${10}%`}} className={s.add}></div>
            </div>

            <div className={s.sub}>
                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>

                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>

                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>

                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>

                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>

                <div className={s.item}>
                    <div className={s.point}></div>
                    <p>Планерка <span>1 ч </span></p>
                </div>
            </div>
        </div>
    )
};

export default WorkTime;