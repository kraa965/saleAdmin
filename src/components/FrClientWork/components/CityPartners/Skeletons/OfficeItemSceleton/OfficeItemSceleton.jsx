import s from './OfficeItemSceleton.module.scss';
import LoaderSceleton from '../../../Loader/LoaderSceleton';



const OfficeItemSceleton = () => {



    return (
        <div className={`${s.container}`}>
            <div className={s.header}>
                <div className={s.logo}>
                    <LoaderSceleton />
                </div>
                <div className={s.adress}>
                    <div className={s.adress_city}><LoaderSceleton /></div>
                    <div className={s.adress_time}><LoaderSceleton /></div>
                </div>
                <div className={`${s.arrow}`}>
                    <LoaderSceleton />
                </div>
            </div>

        </div>
    )
};

export default OfficeItemSceleton;