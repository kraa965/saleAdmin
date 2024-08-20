import s from './HandOverClient.module.scss';
import { useEffect, useState, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconBackForward } from '../../image/work/widget/iconBackForward.svg';
import { ReactComponent as IconChewron } from '../../image/clients/iconChewron.svg';
//Api
import { transferClient } from '../../Api/Api';
//slice
import { setHeight } from '../../store/reducer/Widget/slice';
import { setClientId } from '../../store/reducer/Client/slice';
//selector
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorExperts } from '../../../MyClientsFRmanager/store/reducer/Experts/selector';

import LoaderButton from '../../components/LoaderButton/LoaderButton';

const HandOverWidget = ({ setWidget, prevWidget, setEndType, isNewClient }) => {
    const role = document.getElementById('root_leader').getAttribute('role');
    const client_id = useSelector(selectorClient).client_id;
    const experts = useSelector(selectorExperts).experts;
    const consultants = useSelector(selectorExperts).consultants;
    const [anim, setAnim] = useState(false);
    const [loader, setLoader] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [managers, setManagers] = useState([]);
    const [manager, setManager] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listRef = useRef();
    console.log(role)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
            dispatch(setHeight(208));
        })
    }, []);


    useEffect(() => {
        if (role == 'frmanager') {
            setManagers(experts);
            setManager(experts[1])
            return
        }

        if (role == 'leader') {
            setManagers(consultants);
            setManager(consultants[1])
            return
        }
    }, [role, experts, consultants])


    const handleBack = () => {
        setWidget(prevWidget)
    }

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true);
    }


    const handleTransferClient = () => {
        setLoader(true)
        transferClient({ id: client_id, manager: manager.id })
            .then(res => {
                setWidget('end');
                setEndType('handOver');
                setLoader(false);
                dispatch(setClientId(''));
                navigate('/leader/dashboard/clients');

            })
            .catch(err => console.log(err))

    }

    const handleChooseExpert = (e) => {
        const id = e.currentTarget.id;
        const choseExpert = managers.find(el => el.id == id);
        setManager(choseExpert);
        setOpenList(false)
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);

        return () => document.removeEventListener('mousedown', closeModal);
    }, [openList]);

    const closeModal = (e) => {
        e.stopPropagation()
        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false);
            return
        }


    }


    return (
        <div className={`${s.modal} ${anim && s.modal_anim}`}>
            {!isNewClient && <h3>{role == 'frmanager' ? 'Передача эксперту' : 'Назначить консультанта'}</h3>}
            {isNewClient && <h3>{role == 'frmanager' ? 'Назначить эксперта' : 'Назначить консультанта'}</h3>}
            <div ref={listRef} onClick={handleOpenList} className={s.expert}>
                <div className={s.block}>
                    <div className={s.avatar}>
                        <img src={manager.avatar_mini ? manager.avatar_mini : ''}></img>
                    </div>
                    <p className={s.name}>{manager.name} {manager.surname}</p>
                </div>

                <ul className={`${s.experts} ${openList && s.experts_open}`}>
                    {managers.map(el => {
                        return <li onClick={handleChooseExpert} id={el.id} key={el.id}>
                            <div className={s.avatar}>
                                <img src={el.avatar_mini ? el.avatar_mini : ''}></img>
                            </div>
                            {el.name} {el.surname}</li>
                    })}
                </ul>

                <div className={`${s.arrow} ${openList && s.arrow_open}`}>
                    <IconChewron />
                </div>
            </div>
            <div className={s.buttons}>
                <button onClick={handleBack} className={s.button_second}><IconBackForward /> Назад</button>
                <button onClick={handleTransferClient} className={s.button}>
                    {!isNewClient && <p>Передать клиента</p>}
                    {isNewClient && <p>Назначить эксперта</p>}
                    {loader && <LoaderButton color={'#fff'} />}</button>
            </div>
        </div>
    )
};

export default HandOverWidget;