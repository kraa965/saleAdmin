import s from './ManagersDay.module.scss';
import ManagerResult from '../ManagerResult/ManagerResult';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function ManagersDay({leaders, loader, managerStatus}) {
    const dark = useSelector(menuSelector).dark;
    const [managers, setManagers] = useState([]);
    

    useEffect(() => {

        const teamResultSorting = leaders?.sort(function (a, b) {
            if ((a.bp_num === b.bp_num) && ( a.bp_plan > b.bp_plan))  {
                return 1;
              }
              if ((a.bp_num === b.bp_num) && (a.bp_plan <= b.bp_plan)) {
                return -1;
              }
              return 0;
         })

        const teamResultSorting2 = teamResultSorting?.sort(function (a, b) {
            if ((a.work_status === "not_work") && (b.work_status !== "not_work"))  {
                return 1;
              }
              if ((a.work_status !== "not_work") && (b.work_status === "not_work" )) {
                return -1;
              }
              return 0;
         });

         const teamResultSorting3 = teamResultSorting2?.sort(function (a, b) {
            if ((a.work_status === "holiday") && (b.work_status !== "holiday"))  {
                return 1;
              }
              if ((a.work_status !== "holiday") && (b.work_status === "holiday")) {
                return -1;
              }
              return 0;
         })

       
         setManagers(teamResultSorting3);
    },[leaders]);
    
    return (
        <div className={`${s.managers} ${dark && s.dark}`}>
            <p className={s.title}>Бизнес-консультанты <sup>{leaders.length} чел</sup></p>

            <ul className={s.list}>
                {managers?.map((el, index) => {
                    return <ManagerResult avatar={el.avatar} id={el.id} name={el.name} surname={el.surname} status={el.work_status}
                                          bp={el.bp_num} bpPlan={el.bp_plan} call={el.call_num} callPlan={el.call_plan} 
                                          level={el.level} mistakes={el.mistakes} timeEnd={el.time_end_work} loader={loader} managerStatus={managerStatus}/>
                })}
                
            </ul>
        </div>
    )
};

export default ManagersDay;