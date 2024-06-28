import s from './ClientTableSceleton.module.scss';
//components
import ClientItemSceleton from './ClientItemSceleton/ClientItemSceleton';

const ClientTableSceleton = ({load, type}) => {
    

    return (
        <div className={`${s.table} ${load && s.table_load}`}>
           
            <ul className={s.list}>
                {[...Array(type == 'search' ? 5 : 14)].map(el => {
                    return  <ClientItemSceleton/>
                })}
            </ul>
        </div>
    )
};

export default ClientTableSceleton;