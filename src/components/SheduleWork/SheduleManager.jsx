import s from './SheduleWork.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconCalendarSmall2 } from '../../image/iconCalendarSmall2.svg';
import { ReactComponent as IconLevelsmall } from '../../image/iconLevelsmall.svg';
import { ReactComponent as IconEdit } from '../../image/iconEdit2.svg';
import { ReactComponent as Indicator } from '../../image/indicator.svg';
import avatarDef from '../../image/avatarDef.png';
import { handleFirstShift, handelNewManagerMonth } from '../../utils/dates';
import { setEditNew, setUpdate } from '../../store/reducer/shedule/slice';
import { scheduleSelector } from '../../store/reducer/shedule/selector';
import { useSelector, useDispatch } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import Loader from '../Loader/Loader';
import { addShiftPlan } from '../../Api/Api';


function SheduleManager({ el, update, date, sheduleTwoWeek, range }) {
    const [shiftPlan, setShiftPlan] = useState(15);
    const [loader, setLoader] = useState(false);
    const [switchOpen, setSwitchOpen] = useState(false);
    const [shiftNumActive, setShiftNumActive] = useState(15);
    const scheduleState = el?.manager?.schedule?.id === 2 ? true : false;
    const dayM = date.dayMonth;
    const managerShedule = date.monthIndex === 12 ? sheduleTwoWeek?.managers?.find(item => item.manager.id === el.manager.id).items : el.items;
    const shiftNum = date.monthIndex === 12 ? sheduleTwoWeek?.managers?.find(item => item.manager.id === el.manager.id).total.shift_number : el?.total?.shift_number;
    const firstDay = handleFirstShift(date.dateMonth)[0];
    const secondDay = handleFirstShift(date.dateMonth)[1];
    const [newManager, setNewManager] = useState(null);
    const dispatch = useDispatch();
    const editNew = useSelector(scheduleSelector)?.editNew;
    const modalRef = useRef();
    const dark = useSelector(menuSelector).dark;

    useEffect(() => {
        setShiftPlan(el?.total?.shift_plan)
    }, [el])

    useEffect(() => {
        if (managerShedule) {
            const arr = Object.values(managerShedule);
            const weekends = arr?.filter(el => el.is_work == 1 /* || el.status == 'unplanned_weekend' || el.status == 'vacation' */)
            const num = /* shiftNum - */ weekends?.length
            setShiftNumActive(num)
        }
    }, [managerShedule])

    function handleEditNew() {
        if (editNew.status === 0 && editNew.id === 0) {
            dispatch(setEditNew({ status: 1, id: el?.manager?.id }))
        } else if (editNew.status === 1 && editNew.id !== 0 && editNew.id !== el?.manager?.id) {
            dispatch(setEditNew({ status: 1, id: el?.manager?.id }))
        } else {
            dispatch(setEditNew({ status: 0, id: 0 }))
        }
    }

    useEffect(() => {
        if (handelNewManagerMonth(el?.manager.manager_start_date) /* && el?.manager.schedule.id === 2 */ && (date.monthIndex === 12 || date.monthIndex === 0)) {
            setNewManager(el?.manager)
        } else {
            setNewManager(null)
        }
    }, [el?.manager, date.monthIndex]);

    useEffect(() => {
        setLoader(true)
        setTimeout(() => {
            setLoader(false)
        }, 200)
    }, [date?.monthIndex])

    /*   useEffect(() => {
          if (scheduleState, managerShedule) {
              const firstShift = managerShedule[firstDay]?.is_work;
              const secondShift = managerShedule[secondDay]?.is_work
  
              if (dayM == 28) {
                  setShiftPlan(14);
                  return
              }
  
              if (dayM == 29) {
  
                  if (firstShift == 1) {
                      setShiftPlan(15)
                  } else {
                      setShiftPlan(14)
                  }
                  return
              }
  
              if (dayM == 30) {
                  if (firstShift == 1 && secondShift == 1) {
                      setShiftPlan(16)
                  } else if (firstShift == 0 && secondShift == 0) {
                      setShiftPlan(14)
                  } else {
                      setShiftPlan(15)
                  }
                  return
              }
  
              if (dayM == 31) {
                  if (secondShift === 1) {
                      setShiftPlan(16)
                  } else {
                      setShiftPlan(15)
                  }
                  return
              }
  
          }
      }, [update, date, scheduleState, managerShedule]) */

    function handleOpenSwitch() {
        if (switchOpen) {
            setSwitchOpen(false)
        } else {
            setSwitchOpen(true)
        }
    }

    function handleSwitch(e) {
        const id = Number(e.target.id);

        if (id !== shiftPlan) {
            
            addShiftPlan(date?.dateMonth, el?.manager.id, id)
            .then(res => {
                setShiftPlan(id)
                /* dispatch(setUpdate(1)) */
            })
           /*  id === 0 && setShiftPlan(15) */
        }
    }

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setSwitchOpen(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);



    return (
        <div key={el.manager.id} id={el.manager.id} className={s.employee}>
            <div className={s.avatar}>
                <img src={el.manager.avatar === '' ? avatarDef : el.manager.avatar}></img>
            </div>
            <div className={s.block_text}>
                <div className={s.block_name}>
                    <p className={s.text}>{el.manager.name} {el.manager.surname}</p>
                    {newManager && <div className={s.indicator}><Indicator /></div>}
                </div>
                <div className={s.block_icon}>
                    <div><IconCalendarSmall2 /><span>{el.manager.schedule.id === 1 ? '5/2' : '2/2'}</span></div>
                    <div><IconLevelsmall /><span>{el.manager.level}</span></div>
                    {scheduleState && date.monthIndex !== 12 && !range && <p onClick={handleOpenSwitch} className={`${s.text_shift} ${switchOpen && s.text_shift_dis} ${switchOpen && s.text_shift_open} ${switchOpen && dark && s.text_shift_open_dark} ${shiftNumActive >= shiftPlan && s.text_shift_green}`}>
                        {loader && <Loader />}
                        {shiftNumActive} из <span>{shiftPlan}</span></p>
                    }

                    {/* {newManager && date.monthIndex !== 12 && <div className={`${s.block_new} ${editNew.status === 1 && el?.manager?.id == editNew.id && s.block_new_active}`}>
                        <p className={`${s.text_shift} ${s.text_shift_new} ${shiftNum >= shiftPlan && s.text_shift_green}`}>{loader && <Loader />}{shiftNum} из {shiftPlan}</p>
                         <IconEdit onClick={handleEditNew}/>
                    </div>} */}
                </div>
            </div>

            {scheduleState && dayM == 29 && date.monthIndex !== 12 && !range && <div ref={modalRef} className={`${s.container__switch} ${dark && s.container__switch_dark} ${switchOpen && s.container__switch_vis}`}>
                <div className={`${s.overlay} ${dark && s.overlay_dark}`}></div>
                <div onClick={handleSwitch} className={`${s.switch} ${dark && s.switch_dark}`}>
                    <div className={` ${s.sections} ${s.sections_2}`}>
                        <div id='14' className={s.section}></div>
                        <div id='15' className={s.section}></div>
                    </div>
                    <div className={s.point} style={{ transform: `translateX(${shiftPlan === 15 ? 50 : 0}px)` }}></div>
                </div>
                <p id='14' onClick={handleSwitch} className={`${s.text_switch} ${shiftPlan === 14 && dark && s.text_switch_active_dark} ${shiftPlan === 14 && s.text_switch_active} ${s.text_switch_1}`}>14</p>
                <p id='15' onClick={handleSwitch} className={`${s.text_switch} ${shiftPlan === 15 && dark && s.text_switch_active_dark} ${shiftPlan === 15 && s.text_switch_active} ${s.text_switch_3}`}>15</p>
            </div>
            }

            {scheduleState && dayM == 30 && date.monthIndex !== 12 && !range && <div ref={modalRef} className={`${s.container__switch} ${dark && s.container__switch_dark} ${s.container__switch_l} ${switchOpen && s.container__switch_vis}`}>
                <div className={`${s.overlay} ${dark && s.overlay_dark} ${s.overlay_l}`}></div>
                <div onClick={handleSwitch} className={`${s.switch} ${dark && s.switch_dark}`}>
                    <div className={s.sections}>
                        <div id='14' className={s.section}></div>
                        <div id='15' className={s.section}></div>
                        <div id='16' className={s.section}></div>
                    </div>

                    <div className={s.point} style={{ transform: `translateX(${shiftPlan === 16 ? 100 : shiftPlan === 15 ? 50 : 0}px)` }}></div>
                </div>
                <p className={`${s.text_switch} ${shiftPlan === 14 && s.text_switch_active} ${shiftPlan === 14 && dark && s.text_switch_active_dark} ${s.text_switch_1}`}>14</p>
                <p className={`${s.text_switch} ${shiftPlan === 15 && s.text_switch_active} ${shiftPlan === 15 && dark && s.text_switch_active_dark} ${s.text_switch_2}`}>15</p>
                <p className={`${s.text_switch} ${shiftPlan === 16 && s.text_switch_active} ${shiftPlan === 16 && dark && s.text_switch_active_dark} ${s.text_switch_3}`}>16</p>
            </div>
            }

            {scheduleState && dayM == 31 && date.monthIndex !== 12 && !range && <div ref={modalRef} className={`${s.container__switch} ${dark && s.container__switch_dark} ${switchOpen && s.container__switch_vis}`}>
                <div className={`${s.overlay} ${dark && s.overlay_dark}`}></div>
                <div onClick={handleSwitch} className={`${s.switch} ${dark && s.switch_dark}`}>
                    <div className={` ${s.sections} ${s.sections_2}`}>
                        <div id='15' className={s.section}></div>
                        <div id='16' className={s.section}></div>
                    </div>
                    <div className={s.point} style={{ transform: `translateX(${shiftPlan === 16 ? 50 : 0}px)` }}></div>
                </div>

                <p id='15' onClick={handleSwitch} className={`${s.text_switch} ${shiftPlan === 15 && s.text_switch_active} ${shiftPlan === 15 && dark && s.text_switch_active_dark} ${s.text_switch_1}`}>15</p>
                <p id='16' onClick={handleSwitch} className={`${s.text_switch} ${shiftPlan === 16 && s.text_switch_active} ${shiftPlan === 16 && dark && s.text_switch_active_dark} ${s.text_switch_3}`}>16</p>
            </div>
            }
        </div>
    )
};

export default SheduleManager;
