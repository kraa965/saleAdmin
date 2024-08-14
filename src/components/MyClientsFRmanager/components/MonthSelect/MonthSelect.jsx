import s from './MonthSelect.module.scss';
import { useEffect, useRef, useState } from 'react';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';
//utils
import { handleMonthList } from '../../utils/dates';

const MonthSelect = ({date, setDate, hidden}) => {
    const [openList, setOpenList] = useState(false);
    const [month, setMonth] = useState(JSON.parse(localStorage.getItem('monthName')) || 'За все время');
    const [monthId, setMonthId] = useState(0);
    const monthList = handleMonthList();
    const modalRef = useRef();
    console.log(monthList)



    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true);
    }

    const handleChoseMonth = (e) => {
        const id = e.currentTarget.id;
        const value = e.currentTarget.textContent;
        setMonth(value);
        localStorage.setItem('monthName', JSON.stringify(value))
       id == 0 ? setDate('') : setDate(id);
       id == 0 ? localStorage.setItem('dateSort', JSON.stringify('')) : localStorage.setItem('dateSort', JSON.stringify(id));
        setOpenList(false)
    }

    function closeModal(e) {
        e.stopPropagation()
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    return (
        <div ref={modalRef} className={`${s.select} ${hidden && s.select_hidden}`}>
            <div className={s.sub}>
                <p>Дата перехода клиента</p>
            </div>
            <div onClick={handleOpenList} className={`${s.header} ${openList && s.header_open}`}><p>{month}</p><IconChewron /></div>
            <ul  className={`${s.list} ${openList && s.list_open}`}>
                <li const onClick={handleChoseMonth} id='0'>За все время</li>
                {monthList.reverse().map(el => {
                    return <li onClick={handleChoseMonth} id={el.date}>{el.dateText}</li>
                })}
            </ul>
        </div>
    )
};

export default MonthSelect;