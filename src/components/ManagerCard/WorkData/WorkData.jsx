import s from './WorkData.module.scss';
import { ReactComponent as ArrowInput } from '../../../image/ArrowInput.svg';
import DataPickerMiu from '../../../utils/DataPickerMiu/DataPickerMiu';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
//selector
import { addWorkSelector } from '../../../store/reducer/addWorker/selector';
//slice
import { setFormat, setStartDate, setShedule, setShedule2 } from '../../../store/reducer/addWorker/slice';
//utils
import { handleMonth } from '../../../utils/dates';


const WorkData = () => {
    const [workFormatPopup, setWorkFormatPopup] = useState(false);
    const [workShudelPopup, setWorkShudelPopup] = useState(false);
    const [workShudelPopup2, setWorkShudelPopup2] = useState(false);
    const [valueShedule, setValueShedule] = useState(1);
    const [valueShedule2, setValueShedule2] = useState(1);
    const workerInfo = useSelector(addWorkSelector)
    const dispatch = useDispatch();
    const modalRef = useRef();
    const modalRef2 = useRef();
    const modalRef3 = useRef();

    useEffect(() => {
        localStorage.setItem('startDateManager', JSON.stringify(workerInfo.startDate));
    }, [workerInfo.startDate]);

    useEffect(() => {
        if (workerInfo.shedule == 1) {
            setValueShedule('5/2 (10:00-19:00)');
            return
        }

        if (workerInfo.shedule == 2) {
            setValueShedule('2/2 (8:00-20:00)');
            return
        }

        if (workerInfo.shedule == 3) {
            setValueShedule('5/2 (9:00-18:00)');
            return
        }

        if (workerInfo.shedule == 4) {
            setValueShedule('5/2 (8:00-17:00)');
            return
        }
    }, [workerInfo.shedule])

    useEffect(() => {
        if (workerInfo.shedule2 == 1) {
            setValueShedule2('5/2 (10:00-19:00)');
            return
        }

        if (workerInfo.shedule2 == 2) {
            setValueShedule2('2/2 (8:00-20:00)');
            return
        }

        if (workerInfo.shedule2 == 3) {
            setValueShedule2('5/2 (9:00-18:00)');
            return
        }

        if (workerInfo.shedule2 == 4) {
            setValueShedule2('5/2 (8:00-17:00)');
            return
        }
    }, [workerInfo.shedule2])

    const handleOpenPopup = (e) => {
        const id = e.currentTarget.id;
        if (id == 'format' && !workFormatPopup) {
            setWorkFormatPopup(true);
            setWorkShudelPopup(false);
            setWorkShudelPopup2(false);
            return
        }

        if (id == 'format' && workFormatPopup) {
            setWorkFormatPopup(false);
            return
        }

        if (id == 'shedule' && !workShudelPopup) {
            setWorkShudelPopup(true);
            setWorkFormatPopup(false);
            setWorkShudelPopup2(false);
            return
        }

        if (id == 'shedule' && workShudelPopup) {
            setWorkShudelPopup(false);
            return
        }

        if (id == 'shedule2' && !workShudelPopup2) {
            setWorkShudelPopup2(true);
            setWorkShudelPopup(false);
            setWorkFormatPopup(false);
            return
        }

        if (id == 'shedule2' && workShudelPopup2) {
            setWorkShudelPopup2(false);
            return
        }
    }

    const handleWorkFormat = (e) => {
        const id = e.currentTarget.id;
        dispatch(setFormat(id));
        localStorage.setItem('format', JSON.stringify(id))
    }

    const handleShedule = (e) => {
        const id = e.currentTarget.id;
        dispatch(setShedule(id));
        localStorage.setItem('shedule', JSON.stringify(id))
    }

    const handleShedule2 = (e) => {
        const id = e.currentTarget.id;
        dispatch(setShedule2(id));
        localStorage.setItem('shedule2', JSON.stringify(id))
    }

    const closeModal = (e) => {
        e.stopPropagation()
        if (modalRef.current && modalRef2.current && modalRef3.current && !modalRef.current.contains(e.target)
            && !modalRef2.current.contains(e.target) && !modalRef3.current.contains(e.target)) {
            setWorkFormatPopup(false)
            setWorkShudelPopup(false)
            setWorkShudelPopup2(false)
            return
        }
    }
    useEffect(() => {
        document.addEventListener('click', closeModal);
        return () => document.removeEventListener('click', closeModal);
    }, []);

    return (
        <div className={s.work}>
            <p className={s.sub}>Формат работы</p>
            <div ref={modalRef} id={'format'} onClick={handleOpenPopup} className={`${s.select} ${s.select_dis} ${workFormatPopup && s.select_open}`}>
                <input value={workerInfo.format == 0 ? 'Офис' : 'Удаленный' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                <ArrowInput />
                <div className={`${s.list} ${workFormatPopup && s.list_open}`}>
                    <div id={0} onClick={handleWorkFormat} className={`${s.item} ${workerInfo.format == 0 && s.item_active}`}><p>Офис</p></div>
                    <div id={1} onClick={handleWorkFormat} className={`${s.item} ${workerInfo.format == 1 && s.item_active}`}><p>Удаленный</p></div>

                </div>
            </div>

            <p className={s.sub}>Дата начала работы</p>
            <DataPickerMiu date={workerInfo.startDate} setDate={setStartDate} />

            <div className={s.container}>
                <div className={s.block}>
                    <p className={s.sub}>График работы на {handleMonth(0)}</p>
                    <div ref={modalRef2} onClick={handleOpenPopup} id={'shedule'} className={`${s.select} ${workShudelPopup && s.select_open}`}>
                        <input value={valueShedule} className={`${s.input} ${s.input_select}`} placeholder='график' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${workShudelPopup && s.list_open}`}>
                            <div id='1' onClick={handleShedule} className={`${s.item} ${workerInfo.shedule == 1 && s.item_active}`}><p>5/2 (10:00-19:00)</p></div>
                            <div id='3' onClick={handleShedule} className={`${s.item} ${workerInfo.shedule == 3 && s.item_active}`}><p>5/2 (9:00-18:00)</p></div>
                            <div id='4' onClick={handleShedule} className={`${s.item} ${workerInfo.shedule == 4 && s.item_active}`}><p>5/2 (8:00-17:00)</p></div>
                            <div id='2' onClick={handleShedule} className={`${s.item} ${workerInfo.shedule == 2 && s.item_active}`}><p>2/2 (8:00-20:00)</p></div>

                        </div>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>График работы на {handleMonth(1)}</p>
                    <div ref={modalRef3} onClick={handleOpenPopup} id={'shedule2'} className={`${s.select} ${workShudelPopup2 && s.select_open}`}>
                        <input value={valueShedule2} className={`${s.input} ${s.input_select}`} placeholder='график' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${workShudelPopup2 && s.list_open}`}>
                            <div id='1' onClick={handleShedule2} className={`${s.item} ${workerInfo.shedule2 == 1 && s.item_active}`}><p>5/2 (10:00-19:00)</p></div>
                            <div id='3' onClick={handleShedule2} className={`${s.item} ${workerInfo.shedule2 == 3 && s.item_active}`}><p>5/2 (9:00-18:00)</p></div>
                            <div id='4' onClick={handleShedule2} className={`${s.item} ${workerInfo.shedule2 == 4 && s.item_active}`}><p>5/2 (8:00-17:00)</p></div>
                            <div id='2' onClick={handleShedule2} className={`${s.item} ${workerInfo.shedule2 == 2 && s.item_active}`}><p>2/2 (8:00-20:00)</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default WorkData;