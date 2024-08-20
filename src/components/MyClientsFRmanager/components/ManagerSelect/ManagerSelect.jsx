import s from './ManagerSelect.module.scss';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';
import avatar from '../../../../image/avatar.png';
import { selectorExperts } from '../../store/reducer/Experts/selector';
import { useRef } from 'react';

const ManagerSelect = ({ manager, setManager }) => {
    const consultants = useSelector(selectorExperts).consultants;
    const [managerData, setManagerData] = useState({});
    const [openList, setOpenList] = useState(false);
    const listRef = useRef();
    console.log(manager)

    useEffect(() => {
        const result = consultants.find(el => el.id == manager)
        setManagerData(result)
    }, [manager])

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true)
    }

    const handleChoseManager = (e) => {
        const id = e.currentTarget.id;
        setManager(id)
    }

    function closeModal(e) {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false)
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, []);

    return (
        <div onClick={handleOpenList} ref={listRef} className={`${s.expert} ${openList && s.expert_open}`}>
            <div className={s.block}>
                {manager != 0 && <div className={s.avatar}>
                    <img src={managerData?.avatar_mini ? managerData?.avatar_mini : avatar}></img>
                </div>}
                {manager != 0 && <p className={s.name}>{managerData?.name} {managerData?.surname}</p>}
                {manager == 0 && <p>Все консультанты</p>}
            </div>

            <ul className={`${s.experts} ${openList && s.experts_open}`}>
                <li onClick={handleChoseManager} id={0}>Все консультанты</li>
                {consultants.map(el => {
                    return <li onClick={handleChoseManager} id={el.id} key={el.id}>
                        <div className={s.avatar}>
                            <img src={el.avatar_mini ? el.avatar_mini : avatar}></img>
                        </div>
                        {el.name} {el.surname}</li>
                })}
            </ul>


            <IconChewron />

        </div>
    )
};

export default ManagerSelect;