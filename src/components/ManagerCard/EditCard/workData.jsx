import { useEffect, useRef, useState } from 'react';
import s from './EditCard.module.scss';
import { ReactComponent as ArrowInput } from '../../../image/ArrowInput.svg';
import { ReactComponent as IconCalendarSmall } from '../../../image/iconCalendarSmall.svg';
//utils
import { handleMonth, handleRangeDateYear } from '../../../utils/dates';

const WorkData = ({ shedule1, shedule2, shedule3, setShedule2, setShedule3, ip, dateStart, offense }) => {
    const [list1, setList1] = useState(false);
    const [list2, setList2] = useState(false);
    const [valueShedule, setValueShedule] = useState('5/2 (10:00-19:00)');
    const [valueShedule2, setValueShedule2] = useState('5/2 (10:00-19:00)');
    const [valueShedule3, setValueShedule3] = useState('5/2 (10:00-19:00)');
    const modalRef = useRef();
    const modalRef2 = useRef();
    const role = document.getElementById('root_leader').getAttribute('role');
    console.log(shedule1, shedule2, shedule3)

    useEffect(() => {
        if (shedule1.work_schedule_id == 1 && shedule1.time_start.slice(0, 5) == '10:00') {
            setValueShedule('5/2 (10:00-19:00)');
            return
        }

        if (shedule1.work_schedule_id == 1 && shedule1.time_start.slice(0, 5) == '09:00') {
            setValueShedule('5/2 (9:00-18:00)');
            return
        }

        if (shedule1.work_schedule_id == 1 && shedule1.time_start.slice(0, 5) == '08:00') {
            setValueShedule('5/2 (8:00-17:00)');
            return
        }

        if (shedule1.work_schedule_id == 2) {
            setValueShedule('2/2 (8:00-20:00)');
            return
        }


    }, [shedule1]);

    useEffect(() => {
        if (shedule2.work_schedule_id == 1 && shedule2.time_start.slice(0, 5) == '10:00') {
            setValueShedule2('5/2 (10:00-19:00)');
            return
        }

        if (shedule2.work_schedule_id == 1 && shedule2.time_start.slice(0, 5) == '09:00') {
            setValueShedule2('5/2 (9:00-18:00)');
            return
        }

        if (shedule2.work_schedule_id == 1 && shedule2.time_start.slice(0, 5) == '08:00') {
            setValueShedule2('5/2 (8:00-17:00)');
            return
        }

        if (shedule2.work_schedule_id == 2) {
            setValueShedule2('2/2 (8:00-20:00)');
            return
        }
    }, [shedule2]);


    useEffect(() => {
        if (shedule3.work_schedule_id == 1 && shedule3.time_start.slice(0, 5) == '10:00') {
            setValueShedule3('5/2 (10:00-19:00)');
            return
        }

        if (shedule3.work_schedule_id == 1 && shedule3.time_start.slice(0, 5) == '09:00') {
            setValueShedule3('5/2 (9:00-18:00)');
            return
        }

        if (shedule3.work_schedule_id == 1 && shedule3.time_start.slice(0, 5) == '08:00') {
            setValueShedule3('5/2 (8:00-17:00)');
            return
        }

        if (shedule3.work_schedule_id == 2) {
            setValueShedule3('2/2 (8:00-20:00)');
            return
        }
    }, [shedule3]);

    const handleOpenList = () => {
        if (list1) {
            setList1(false)
        } else {
            setList1(true)
            setList2(false)
        }
    }

    const handleOpenList2 = () => {
        if (list2) {
            setList2(false)
        } else {
            setList2(true)
            setList1(false)
        }
    }

    const handleSelectSheduel = (e) => {
        const id = e.currentTarget.id;
        localStorage.setItem('shedule2', JSON.stringify(id));
        if (id == 1) {
            setShedule2({
                time_end: "19:00",
                time_start: "10:00",
                work_schedule_id: 1
            });
            return
        }

        if (id == 2) {
            setShedule2({
                time_end: "08:00",
                time_start: "20:00",
                work_schedule_id: 2
            });
            return
        }

        if (id == 3) {
            setShedule2({
                time_end: "18:00",
                time_start: "09:00",
                work_schedule_id: 1
            });
            return
        }

        if (id == 4) {
            setShedule2({
                time_end: "17:00",
                time_start: "08:00",
                work_schedule_id: 1
            });
            return
        }
        setList1(false);
    }

    const handleSelectSheduel2 = (e) => {
        const id = e.currentTarget.id;
        localStorage.setItem('shedule3', JSON.stringify(id));

        if (id == 1) {
            setShedule3({
                time_end: "19:00",
                time_start: "10:00",
                work_schedule_id: 1
            });
            return
        }

        if (id == 2) {
            setShedule3({
                time_end: "08:00",
                time_start: "20:00",
                work_schedule_id: 2
            });
            return
        }

        if (id == 3) {
            setShedule3({
                time_end: "18:00",
                time_start: "09:00",
                work_schedule_id: 1
            });
            return
        }

        if (id == 4) {
            setShedule3({
                time_end: "17:00",
                time_start: "08:00",
                work_schedule_id: 1
            });
            return
        }
        setList2(false);
    }

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && modalRef2.current && !modalRef.current.contains(e.target) && !modalRef2.current.contains(e.target)) {
            setList1(false);
            setList2(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);
    return (
        <div className={s.data}>
            <div style={{ marginBottom: '30px' }} className={s.container_shedule}>
                <div className={s.block_3}>
                    <p className={s.sub}>{handleMonth(0)}</p>
                    <div id='1' className={`${s.select} ${s.select_dis}`}>
                        <input value={valueShedule || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                    </div>
                </div>

                <div className={s.block_3}>
                    <p className={s.sub}>{handleMonth(1)}</p>
                    <div ref={modalRef} id='2' onClick={handleOpenList} className={`${s.select} ${list1 && s.select_open}`}>
                        <input onClick={handleOpenList} value={valueShedule2 || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${list1 && s.list_open}`}>
                            <div id='1' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 1 && s.itemlist_active}`}><p>5/2 (10:00-19:00)</p></div>
                            <div id='3' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 3 && s.itemlist_active}`}><p>5/2 (9:00-18:00)</p></div>
                            <div id='4' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 4 && s.itemlist_active}`}><p>5/2 (8:00-17:00)</p></div>
                            <div id='2' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 2 && s.itemlist_active}`}><p>2/2 (8:00-20:00)</p></div>
                        </div>
                    </div>
                </div>

                <div className={s.block_3}>
                    <p className={s.sub}>{handleMonth(2)}</p>
                    <div ref={modalRef2} id='3' onClick={handleOpenList2} className={`${s.select} ${list2 && s.select_open}`}>
                        <input onClick={handleOpenList2} value={valueShedule3 || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${list2 && s.list_open}`}>
                            <div id='1' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 1 && s.itemlist_active}`}><p>5/2 (10:00-19:00)</p></div>
                            <div id='3' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 3 && s.itemlist_active}`}><p>5/2 (9:00-18:00)</p></div>
                            <div id='4' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 4 && s.itemlist_active}`}><p>5/2 (8:00-17:00)</p></div>
                            <div id='2' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 2 && s.itemlist_active}`}><p>2/2 (8:00-20:00)</p></div>
                        </div>
                    </div>
                </div>

                <p className={`${s.sub} ${s.sub_work}`}>Изменяйте график до начала календарного месяца</p>
            </div>

            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Фикс</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={role == 'mobleader' ? '40 000' : '60 000' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <p>руб</p>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>Премия за надежность</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={offense >= 2 ? 0 : role == 'mobleader' ? '10 000' : '20 000' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <p>руб</p>
                    </div>
                </div>

                <div className={s.block_small}>
                    <p className={s.sub}>Нарушения</p>
                    <div className={`${s.select} ${s.select_small} ${s.select_dis}`}>
                        <input style={{ paddingRight: '1px' }} value={`${offense}` || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                    </div>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={`${s.block} ${s.block_2}`}>
                    <p className={s.sub}>Разрешенный IP адрес</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={ip || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                    </div>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={`${s.block} ${s.block_2}`}>
                    <p className={s.sub}>Дата начала работы</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={handleRangeDateYear(dateStart) || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <IconCalendarSmall />
                    </div>
                </div>

                {/*  <p className={`${s.sub} ${s.sub_work}`}>Сотрудник добавлен 21 декабря 2023</p> */}
            </div>
        </div>
    )
};

export default WorkData;