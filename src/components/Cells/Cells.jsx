import s from './Cells.module.scss';
import Cell from './Cell/Cell';
import { setDate } from '../../utils/dates';
import { сompareDate } from '../../utils/dates';
import { handelNewManagerMonth } from '../../utils/dates';
import { сompareDateStart } from '../../utils/dates';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { scheduleSelector } from '../../store/reducer/shedule/selector';

function Cells({ arr, dark, manager, managersShedule, loader, events }) {
   const [newManager, setNewManager] = useState(null);
   const editNew = useSelector(scheduleSelector)?.editNew;
  
   useEffect(() => {
      if(handelNewManagerMonth(manager.manager_start_date) && manager.schedule.id === 2) {
         setNewManager(manager)
         return
      } 
   },[manager]);

   return (
      <div className={s.cells}>

         {arr?.map((el) => {
            const isAdd = managersShedule?.[el]?.is_additional === 1 ? true : false;
            const status = сompareDate(el);
            const dayStartStatus = сompareDateStart(manager.manager_start_date, el);
            let type
            if (managersShedule[el].status === '' && !isAdd && dayStartStatus === 2) {
               if (managersShedule[el].is_work === 0 && status == 2) {
                  type = 5;
               } else if (managersShedule[el].is_work === 0 && status == 0) {
                  type = 8;
               } else if (managersShedule[el].is_work === 1 && status == 2) {
                  type = 6;
               } else if (managersShedule[el].is_work === 1 && managersShedule[el].is_start === 1 && managersShedule[el].events.filter(el => el.event_id == 3).length == 0 && status == 0) {
                  type = 1; 
               } else if (managersShedule[el].is_work === 1 && managersShedule[el].is_start === 0 && status == 0) {
                  type = 14;
               } else if (managersShedule[el].is_work === 1 && managersShedule[el].is_start === 1 && managersShedule[el].events.filter(el => el.event_id == 3).length > 0 && status == 0) {
                  type = 15;
               } /* else if (managersShedule[el].is_work === 1 && managersShedule[el].is_start === 1 && managersShedule[el].events.filter(el => el.event_id == 13).length > 0 && status == 0) {
                  type = 16;
               } */ else if (managersShedule[el].is_work === 1 && status === 1) {
                  type = 4;
               } else if (managersShedule[el].is_work === 0 && status === 1) {
                  type = 5;
               }
            } else if (managersShedule[el].status === '' && isAdd && dayStartStatus === 2) {
               type = 11
            } else if (managersShedule[el].status === 'unplanned_weekend' && dayStartStatus === 2) {
               if (status == 2) {
                  type = 10;
               } else {
                  type = 3;
               }
               
            } else if (managersShedule[el].status === 'plan_weekend' && dayStartStatus === 2) {
               type = 7;
            } else if (managersShedule[el].status === 'vacation' && dayStartStatus === 2) {
               type = 9;
            } else if (dayStartStatus === 0 && !newManager) {
              type = 8;  
            } else if (dayStartStatus === 0 && newManager && managersShedule[el].is_work === 0) {
               if(editNew.status === 1 && editNew.id === manager.id) {
                  type = 12; 
               } else {
                  type = 8;
               }
                
            } else if (dayStartStatus === 0 && newManager && managersShedule[el].is_work === 1) {
               if(editNew.status === 1 && editNew.id === manager.id) {
                  type = 13; 
               } else {
                  type = 8;
               } 
             } 


            return <Cell loader={loader} key={el} type={type} dark={dark} manager={manager} eventsDay={managersShedule[el].events} 
            history={managersShedule[el].history} date={el} eventsList={events} isAdd={isAdd} shiftId={managersShedule[el].id}/>
         })}
      </div>
   )
};

export default Cells;