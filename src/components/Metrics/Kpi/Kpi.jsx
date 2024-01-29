import s from './Kpi.module.scss';
import { ReactComponent as IconChewron } from '../../../image/iconChewron.svg';
import { ReactComponent as IconEdit } from '../../../image/iconEdit.svg';
import { ReactComponent as IconSave } from '../../../image/iconSave.svg';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';

function Kpi() {
    const [type, setType] = useState(2);
    const [editVis, setEditVis] = useState(false);
    const [edit, setEdit] = useState(false);
    const [anim, setAnim] = useState(false);
    const [bpValue, setBpValue] = useState(0);
    const [bpConv, setBpConv] = useState(0);
    const [zoomConv, setZoomConv] = useState(0);
    const [questConv, setQuestConv] = useState(0);
    const [payConv, setPayConv] = useState(0);
    const [check, setCheck] = useState(0);
    const [listOpen, setListOpen] = useState(false);
    const [countMonth, setCountMonth] = useState(6);
    const dark = useSelector(menuSelector).dark;

    function handleVisible() {
        setEditVis(true)
    }

    function handleHidden() {
        setEditVis(false)
    }

    function handleEdit() {
        if (edit) {
            setEdit(false);
            setType(2);
            setTimeout(() => {
                setAnim(false)
            }, 100)
        } else {
            setEdit(true)
            setType(3);
            setTimeout(() => {
                setAnim(true)
            }, 100)
        }
    }

    function handleInput(e) {
        const id = e.target.id;
        const value = e.target.value;
        if (id === 'bp' && value <= 10000) {
            setBpValue(value);
            console.log(value)
            return
        }

        if (id === 'bpconv' && value <= 100) {
            setBpConv(value);
            return
        }

        if (id === 'zoom' && value <= 100) {
            setZoomConv(value);
            return
        }


        if (id === 'questionary' && value <= 100) {
            setQuestConv(value);
            return
        }

        if (id === 'pays' && value <= 100) {
            setPayConv(value);
            return
        }

        if (id === 'check' && value <= 1000000) {
            setCheck(value);
            return
        }

    }

    function handleOpenList(e) {
        if (listOpen) {
            setListOpen(false)
        } else {
            setListOpen(true)
        }
    }

    function handleSelect(e) {
        const id = Number(e.target.id);
        setCountMonth(id);
        setListOpen(false)
    }

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h2>KPI по месяцам</h2>
                <div onClick={handleOpenList} className={`${s.selection} ${dark && s.selection_dark} ${listOpen && s.selection_open}`}>
                    <p >{countMonth} месяцев</p>
                    <ul className={`${s.list} ${dark && s.list_dark} ${listOpen && s.list_open}`}>
                        <li className={`${countMonth === 6 && !dark && s.active} ${countMonth === 6 && dark && s.active_dark}`} onClick={handleSelect} id='6'>6 месяцев</li>
                        <li className={`${countMonth === 9 && !dark && s.active} ${countMonth === 9 && dark && s.active_dark}`} onClick={handleSelect} id='9'>9 месяцев</li>
                        <li className={`${countMonth === 12 && !dark && s.active} ${countMonth === 12 && dark && s.active_dark}`} onClick={handleSelect} id='12'>12 месяцев</li>
                        <li className={`${countMonth === 15 && !dark && s.active} ${countMonth === 15 && dark && s.active_dark}`} onClick={handleSelect} id='15'>15 месяцев</li>
                    </ul>
                    <IconChewron />
                </div>
            </div>
            <div className={s.table}>
                <div className={`${s.subs} ${dark && s.subs_dark}`}>

                    <div className={s.sub_month}>
                        <p>Месяц</p>
                    </div>

                    <div className={s.sub_lk}>
                        <p>Входы в ЛК</p>
                    </div>

                    <div className={s.sub_bp}>
                        <p>Открытые БП</p>
                    </div>

                    <div className={s.sub_zoom}>
                        <p>Zoom-встречи</p>
                    </div>

                    <div className={s.sub_questionary}>
                        <p>Одобрено анкет</p>
                    </div>

                    <div className={s.sub_pays}>
                        <p>Оплаты</p>
                    </div>

                    <div className={s.sub_proceeds}>
                        <p>Выручка</p>
                    </div>

                    <div className={s.sub_check}>
                        <p>Средний чек</p>
                    </div>
                </div>
                <div  style={{cursor: type === 1 ? 'default' : ''}} onMouseEnter={handleVisible} onMouseLeave={handleHidden} className={`${s.line} ${dark && s.line_dark}`}>
                    <div className={`${s.item} ${s.item_month}`}>
                        <p>Октябрь 2023</p>
                    </div>
                    <div className={`${s.item} ${s.item_lk}`}>
                        <p>9999</p>
                        {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                            <div style={{ width: '70%' }} className={s.inner}></div>
                        </div>}
                    </div>
                    <div className={`${s.item} ${s.item_bp}`}>
                        <div className={s.block}>
                            {type !== 3 && <p className={!anim && anim}>{addSpaceNumber(bpValue)}</p>}
                            {type === 3 && <input type='number' onChange={handleInput} id='bp' className={`${s.input} ${s.input_bp} ${anim && s.input_anim}`} value={bpValue || ''}></input>}
                            {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                <div style={{ width: '70%' }} className={s.inner}></div>
                            </div>}
                        </div>
                        <div className={`${s.percent} ${dark && s.percent_dark}`}>
                            {type !== 3 && <p>{addSpaceNumber(bpConv)}</p>}
                            {type === 3 && <input type='number' className={`${s.input} ${s.input_percent} ${anim && s.input_anim}`}
                                onChange={handleInput} id='bpconv' value={bpConv || ''}></input>}
                            <p>%</p>
                        </div>
                    </div>
                    <div className={`${s.item} ${s.item_zoom}`}>
                        <div className={s.block}>
                            <p>9999</p>
                            {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                <div style={{ width: '70%' }} className={s.inner}></div>
                            </div>}
                        </div>
                        <div className={`${s.percent} ${dark && s.percent_dark}`}>
                            {type !== 3 && <p>{addSpaceNumber(zoomConv)}</p>}
                            {type === 3 && <input type='number' className={`${s.input} ${s.input_percent} ${anim && s.input_anim}`}
                                onChange={handleInput} id='zoom' value={zoomConv || ''}></input>}
                            <p>%</p>
                        </div>
                    </div>
                    <div className={`${s.item} ${s.item_questionary}`}>
                        <div className={s.block}>
                            <p>9999</p>
                            {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                <div style={{ width: '70%' }} className={s.inner}></div>
                            </div>}
                        </div>
                        <div className={`${s.percent} ${dark && s.percent_dark}`}>
                            {type !== 3 && <p>{addSpaceNumber(questConv)}</p>}
                            {type === 3 && <input type='number' className={`${s.input} ${s.input_percent} ${anim && s.input_anim}`}
                                onChange={handleInput} id='questionary' value={questConv || ''}></input>}
                            <p>%</p>
                        </div>
                    </div>
                    <div className={`${s.item} ${s.item_pays}`}>
                        <div className={s.block}>
                            <p>9999</p>
                            {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                                <div style={{ width: '70%' }} className={s.inner}></div>
                            </div>}
                        </div>
                        <div className={`${s.percent} ${dark && s.percent_dark}`}>
                            {type !== 3 && <p>{addSpaceNumber(payConv)}</p>}
                            {type === 3 && <input type='number' className={`${s.input} ${s.input_percent} ${anim && s.input_anim}`}
                                onChange={handleInput} id='pays' value={payConv || ''}></input>}
                            <p>%</p>
                        </div>
                    </div>
                    <div className={`${s.item} ${s.item_proceeds}`}>
                        <p>9999</p>
                        {type === 1 && <div className={`${s.progress} ${dark && s.progress_dark}`}>
                            <div style={{ width: '70%' }} className={s.inner}></div>
                        </div>}
                    </div>
                    <div className={`${s.item} ${s.item_check}`}>
                        {type === 1 && <p>420 000</p>}
                        {type === 2 && <p>{addSpaceNumber(check)}</p>}
                        {type === 3 && <input type='number' onChange={handleInput} id='check'
                            style={{ marginRight: '-12px', textAlign: 'end' }}
                            className={`${s.input} ${anim && s.input_anim}`}
                            value={check || ''}></input>}
                    </div>
                    {type !== 1 && <div onClick={handleEdit} className={`${s.edit} ${editVis && s.edit_visible}`}>
                        {!edit && <IconEdit />}
                        {edit && <IconSave />}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
};

export default Kpi;