import { useEffect, useRef, useState } from 'react';
import s from './EditCard.module.scss';
import { ReactComponent as ArrowInput } from '../../../image/ArrowInput.svg';
import { ReactComponent as IconCalendarSmall } from '../../../image/iconCalendarSmall.svg';

const WorkData = ({ shedule1, shedule2, shedule3, setShedule2, setShedule3 }) => {
    const [list1, setList1] = useState(false);
    const [list2, setList2] = useState(false);
    const modalRef = useRef();
    const modalRef2 = useRef();

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
        setShedule2(id);
        setList1(false);
    }

    const handleSelectSheduel2 = (e) => {
        const id = e.currentTarget.id;
        setShedule3(id);
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
            <div style={{ marginBottom: '30px' }} className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Апрdfgdель</p>
                    <div id='1' className={`${s.select} ${s.select_dis}`}>
                        <input value={shedule1 == 0 ? '5/2' : '2/2' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>Апрель</p>
                    <div ref={modalRef} id='2' onClick={handleOpenList} className={`${s.select} ${list1 && s.select_open}`}>
                        <input onClick={handleOpenList} value={shedule2 == 0 ? '5/2' : '2/2' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${list1 && s.list_open}`}>
                            <div id='0' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 0 && s.itemlist_active}`}><p>5/2</p></div>
                            <div id='1' onClick={handleSelectSheduel} className={`${s.itemlist} ${shedule2 == 1 && s.itemlist_active}`}><p>2/2</p></div>
                        </div>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>Апрель</p>
                    <div ref={modalRef2} id='3' onClick={handleOpenList2} className={`${s.select} ${list2 && s.select_open}`}>
                        <input onClick={handleOpenList2} value={shedule3 == 0 ? '5/2' : '2/2' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                        <div className={`${s.list} ${list2 && s.list_open}`}>
                            <div id='0' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 0 && s.itemlist_active}`}><p>5/2</p></div>
                            <div id='1' onClick={handleSelectSheduel2} className={`${s.itemlist} ${shedule3 == 1 && s.itemlist_active}`}><p>2/2</p></div>
                        </div>
                    </div>
                </div>

                <p className={`${s.sub} ${s.sub_work}`}>Изменяйте график до начала календарного месяца</p>
            </div>

            <div className={s.container_string}>
                <div className={s.block}>
                    <p className={s.sub}>Фикс</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={'60 000' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <p>руб</p>
                    </div>
                </div>

                <div className={s.block}>
                    <p className={s.sub}>Премия за надежность</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={'15 000' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <p>руб</p>
                    </div>
                </div>

                <div className={s.block_small}>
                    <p className={s.sub}>Нарушения</p>
                    <div className={`${s.select} ${s.select_small} ${s.select_dis}`}>
                        <input style={{ paddingRight: '1px' }} value={2 || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <ArrowInput />
                    </div>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={`${s.block} ${s.block_2}`}>
                    <p className={s.sub}>Разрешенный IP адрес</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={`193.439.349.232` || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                    </div>
                </div>
            </div>

            <div className={s.container_string}>
                <div className={`${s.block} ${s.block_2}`}>
                    <p className={s.sub}>Дата начала работы</p>
                    <div className={`${s.select} ${s.select_dis}`}>
                        <input value={'02.02.2024' || ''} className={`${s.input} ${s.input_select}`} placeholder='' type='text'></input>
                        <IconCalendarSmall />
                    </div>
                </div>

                <p className={`${s.sub} ${s.sub_work}`}>Сотрудник добавлен 21 декабря 2023</p>
            </div>
        </div>
    )
};

export default WorkData;