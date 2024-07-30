import s from './ManagersDay.module.scss';
import ManagerResult from '../ManagerResult/ManagerResult';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { handleDiffDates } from '../../utils/dates';

function ManagersDay({ leaders, loader, managerStatus, mobLeaders, experts, role, activePoint }) {
  const dark = useSelector(menuSelector).dark;
  const [managers, setManagers] = useState([]);
  const [mobManagers, setMobManagers] = useState([]);
  const [expertManagers, setExpertManagers] = useState([]);
  const [managersFilter, setManagersFilter] = useState([]);
  const [managerFilterWeekend, setManagerFilterWeekend] = useState([]);
  const [consultFilterWeekend, setConsultFilterWeekend] = useState([]);
  const [expertFilterWeekend, setExpertFilterWeekend] = useState([]);
  const [mobFilterWeekend, setMobFilterWeekend] = useState([]);
  const [viewWeekend, setViewWeekend] = useState(false);
  const [managerType, setManagerType] = useState('all');
  const heigthItem = window.screen.availWidth > 720 ? 83.2 : 83.2;

  useEffect(() => {

    const teamResultSorting = leaders?.sort(function (a, b) {
      if ((a.bp_num === b.bp_num) && (a.bp_plan > b.bp_plan)) {
        return 1;
      }
      if ((a.bp_num === b.bp_num) && (a.bp_plan <= b.bp_plan)) {
        return -1;
      }
      return 0;
    })

    const teamResultSorting2 = teamResultSorting?.sort(function (a, b) {
      if ((a.work_status === "not_work") && (b.work_status !== "not_work")) {
        return 1;
      }
      if ((a.work_status !== "not_work") && (b.work_status === "not_work")) {
        return -1;
      }
      return 0;
    });

    const teamResultSorting3 = teamResultSorting2?.sort(function (a, b) {
      if ((a.work_status === "holiday") && (b.work_status !== "holiday")) {
        return 1;
      }
      if ((a.work_status !== "holiday") && (b.work_status === "holiday")) {
        return -1;
      }
      return 0;
    })

    const teamResultSorting4 = teamResultSorting3?.filter(el => el.work_status !== "holiday")
    setManagerFilterWeekend(teamResultSorting4);
    setConsultFilterWeekend(leaders?.filter(el => el.work_status !== "holiday"))
    setManagers(teamResultSorting3);
  }, [leaders]);


  useEffect(() => {
    if (managerType === 'all') {
      setManagersFilter(managers);
      const teamResultSorting4 = managers?.filter(el => el.work_status !== "holiday")
      setManagerFilterWeekend(teamResultSorting4);
      return
    }

    if (managerType === 'trainees') {
      const filter = managers?.filter((el) => handleDiffDates(el.manager_start_date) <= 30);
      const teamResultSorting4 = filter?.filter(el => el.work_status !== "holiday")
      setManagerFilterWeekend(teamResultSorting4);
      setManagersFilter(filter);
      return
    }

    if (managerType === 'consultants') {
      const filter = managers?.filter((el) => handleDiffDates(el.manager_start_date) > 30);
      const teamResultSorting4 = filter?.filter(el => el.work_status !== "holiday")
      setManagerFilterWeekend(teamResultSorting4);
      setManagersFilter(filter);
      return
    }
  }, [managerType, managers]);

  useEffect(() => {

    const teamResultSorting = mobLeaders?.sort(function (a, b) {
      if ((a.bp_num === b.bp_num) && (a.bp_plan > b.bp_plan)) {
        return 1;
      }
      if ((a.bp_num === b.bp_num) && (a.bp_plan <= b.bp_plan)) {
        return -1;
      }
      return 0;
    })

    const teamResultSorting2 = teamResultSorting?.sort(function (a, b) {
      if ((a.work_status === "not_work") && (b.work_status !== "not_work")) {
        return 1;
      }
      if ((a.work_status !== "not_work") && (b.work_status === "not_work")) {
        return -1;
      }
      return 0;
    });

    const teamResultSorting3 = teamResultSorting2?.sort(function (a, b) {
      if ((a.work_status === "holiday") && (b.work_status !== "holiday")) {
        return 1;
      }
      if ((a.work_status !== "holiday") && (b.work_status === "holiday")) {
        return -1;
      }
      return 0;
    })

    setMobFilterWeekend(mobLeaders?.filter(el => el.work_status !== "holiday"));
    setMobManagers(teamResultSorting3);
  }, [mobLeaders]);

  useEffect(() => {

    const teamResultSorting = experts?.sort(function (a, b) {
      if ((a.bp_num === b.bp_num) && (a.bp_plan > b.bp_plan)) {
        return 1;
      }
      if ((a.bp_num === b.bp_num) && (a.bp_plan <= b.bp_plan)) {
        return -1;
      }
      return 0;
    })

    const teamResultSorting2 = teamResultSorting?.sort(function (a, b) {
      if ((a.work_status === "not_work") && (b.work_status !== "not_work")) {
        return 1;
      }
      if ((a.work_status !== "not_work") && (b.work_status === "not_work")) {
        return -1;
      }
      return 0;
    });

    const teamResultSorting3 = teamResultSorting2?.sort(function (a, b) {
      if ((a.work_status === "holiday") && (b.work_status !== "holiday")) {
        return 1;
      }
      if ((a.work_status !== "holiday") && (b.work_status === "holiday")) {
        return -1;
      }
      return 0;
    })
    setExpertFilterWeekend(experts?.filter(el => el.work_status !== "holiday"));
    setExpertManagers(teamResultSorting3);
  }, [experts]);

  function handleButton(e) {
    const id = e.currentTarget.id;
    setManagerType(id)
  }


  function handleViewWeekend() {
    if (viewWeekend) {
      setViewWeekend(false)
    } else {
      setViewWeekend(true)
    }
  }

  return (
    <div className={s.container}>

      <div style={{ order: (role === 'frmanager' || role === 'mobleader') && '1' }} className={`${s.managers} ${dark && s.dark}`}>
        <div className={s.header}>
          <p className={s.title}>Бизнес-консультанты <sup>{consultFilterWeekend?.length} чел</sup></p>
          <div className={`${s.buttons} ${dark && s.buttons_dark}`}>
            <div onClick={handleButton} id='all' className={`${s.button} ${dark && s.button_dark} 
                                                           ${managerType === 'all' && !dark && s.button_active}
                                                           ${managerType === 'all' && dark && s.button_active_dark}`

            }>Все</div>
            <div onClick={handleButton} id='trainees' className={`${s.button} ${dark && s.button_dark} 
                                                                ${managerType === 'trainees' && !dark && s.button_active}
                                                                ${managerType === 'trainees' && dark && s.button_active_dark}`
            }>Стажеры</div>
            <div onClick={handleButton} id='consultants' className={`${s.button} ${dark && s.button_dark} 
                                                                    ${managerType === 'consultants' && !dark && s.button_active}
                                                                    ${managerType === 'consultants' && dark && s.button_active_dark}`
            }>Консультанты</div>
          </div>
        </div>

        <ul style={{ height: `${(viewWeekend ? managersFilter : managerFilterWeekend).length * heigthItem}px` }} className={s.list}>
          {(managersFilter)?.map((el, index) => {
            return <ManagerResult key={el.id} avatar={el.avatar} id={el.id} name={el.name} surname={el.surname} status={el.work_status}
              bp={el.bp_num} bpPlan={el.bp_plan} call={el.call_num} callPlan={el.call_plan}
              level={el.level} mistakes={el.mistakes} timeEnd={el.time_end_work} loader={loader} managerStatus={managerStatus} rate={el.rate}
              schedule={el.schedule.id} pause={el.pause_time} pauseDuration={el.pause_duration} type={'leader'}
              loginNum={el.login_num} loginPlan={el.login_plan} lids={el.base_day_clients} lidsPlan={el.base_day_limit} activePoint={activePoint} callTime={el.average_call_time} 
              shedule={el.schedule_work}/>
          })}
        </ul>
       {/*  {!viewWeekend && managersFilter.length !== managerFilterWeekend.length && <p className={s.button_weekend} onClick={handleViewWeekend}>Показать больше</p>}
        {viewWeekend && managersFilter.length !== managerFilterWeekend.length && <p className={s.button_weekend} onClick={handleViewWeekend}>Скрыть</p>} */}
      </div>

      {/* <div style={{ order: role === 'mobleader' ? '0' : role === 'frmanager' ? '2' : '' }} className={`${s.expert} ${dark && s.dark}`}>
        <p className={s.title}>Мобильные консультанты <sup>{mobFilterWeekend?.length} чел</sup></p>

        <ul className={s.list}>
          {mobManagers?.map((el, index) => {
            return <ManagerResult key={el.id} avatar={el.avatar} id={el.id} name={el.name} surname={el.surname} status={el.work_status}
              bp={el.bp_num} bpPlan={el.bp_plan} call={el.call_num} callPlan={el.call_plan}
              level={el.level} mistakes={el.mistakes} timeEnd={el.time_end_work} loader={loader} managerStatus={managerStatus}
              rate={el.rate} schedule={el.schedule.id} pause={el.pause_time} pauseDuration={el.pause_duration} type={'mobleader'}
              loginNum={el.login_num} loginPlan={el.login_plan} lids={el.base_day_clients} lidsPlan={el.base_day_limit} activePoint={activePoint} callTime={el.average_call_time} />
          })}
        </ul>
      </div> */}

      <div style={{ order: role === 'frmanager' ? '0' : role === 'mobleader' ? '2' : '' }} className={`${s.expert} ${dark && s.dark}`}>
        <p className={s.title}>Эксперты <sup>{expertFilterWeekend?.length} чел</sup></p>

        <ul className={s.list}>
          {expertManagers?.map((el, index) => {
            return <ManagerResult avatar={el.avatar} key={el.id} id={el.id} name={el.name} surname={el.surname} status={el.work_status}
             /*  bp={el.zoom_num} */ zoom={el.zoom_num} anketa={el.anketa_send}  /* bpPlan={el.zoom_plan} */ call={el.call_num} callPlan={el.call_plan} newClients={el.new_clients_num}
              level={el.level} mistakes={el.mistakes} timeEnd={el.time_end_work} loader={loader} managerStatus={managerStatus} rate={el.rate}
              typeManager={'expert'} pause={el.pause_time} pauseDuration={el.pause_duration} type={'frmanager'} activePoint={activePoint} callTime={el.average_call_time} shedule={el.schedule_work}/>
          })}
        </ul>
      </div>
    </div>
  )
};

export default ManagersDay;