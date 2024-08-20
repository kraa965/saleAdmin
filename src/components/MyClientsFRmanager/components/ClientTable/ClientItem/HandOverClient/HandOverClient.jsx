import s from './HandOverClient.module.scss';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as IconChewron } from '../../../../image/clients/iconChewron.svg';
import avatar from '../../../../image/avatar.png';
//selector 
import { selectorExperts } from '../../../../store/reducer/Experts/selector';
//API
import { transferClient } from '../../../../Api/Api';
//slice
import { setHandOverClients } from '../../../../store/reducer/Updater/slice';
//component 
import LoaderButton from '../../../../../LoaderButton/LoaderButton';

const HandOverClient = ({ id, setHandOver }) => {
    const role = document.getElementById('root_leader').getAttribute('role');
    const experts = useSelector(selectorExperts).experts;
    const consultants = useSelector(selectorExperts).consultants;
    const [anim, setAnim] = useState(false);
    const [openList, setOpenList] = useState(false);
    const [managers, setManagers] = useState([]);
    const [manager, setManager] = useState({});
    const [loader, setLoader] = useState(false);
    const dispatch = useDispatch();
    const modalRef = useRef();
    const listRef = useRef();
    console.log(experts)
  

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
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

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);

        return () => document.removeEventListener('mousedown', closeModal);
    }, [openList]);

    const closeModal = (e) => {
        e.stopPropagation()



        if (modalRef.current && !modalRef.current.contains(e.target) && !openList) {
            handleCloseModal();
            return
        }

        if (listRef.current && !listRef.current.contains(e.target)) {
            setOpenList(false);
            return
        }


    }

    const handleOpenList = () => {
        openList ? setOpenList(false) : setOpenList(true);
    }

    const handleChooseExpert = (e) => {
        const id = e.currentTarget.id;
        const choseExpert = managers?.find(el => el.id == id);
        setManager(choseExpert);
        setOpenList(false)
    }

    const handleTransferClient = () => {
        setLoader(true)
        dispatch(setHandOverClients({ id, name: `${manager.name} ${manager.surname}` }))
        handleCloseModal();
        transferClient({ id, manager: manager.id })
            .then(res => {
                console.log(res);
                setLoader(false);
                dispatch(setHandOverClients({ id, name: `${manager.name} ${manager.surname}` }))
                handleCloseModal();
            })
            .catch(err => console.log(err))
    }

    const handleCloseModal = () => {
        setAnim(false);

        setTimeout(() => {
            setHandOver(false)
        }, 200)
    }


    return (
        <div ref={modalRef} className={`${s.modal} ${anim && s.modal_open}`}>
            <h3>{role == 'frmanager' ? 'Передача эксперту' : 'Назначить консультанта'}</h3>
            <div ref={listRef} onClick={handleOpenList} className={s.expert}>
                <div className={s.block}>
                    <div className={s.avatar}>
                        <img src={manager.avatar_mini ? manager.avatar_mini : avatar}></img>
                    </div>
                    <p className={s.name}>{manager.name} {manager.surname}</p>
                </div>

                <ul className={`${s.experts} ${openList && s.experts_open}`}>
                    {managers?.map(el => {
                        return <li onClick={handleChooseExpert} id={el.id} key={el.id}>
                            <div className={s.avatar}>
                                <img src={el.avatar_mini ? el.avatar_mini : avatar}></img>
                            </div>
                            {el.name} {el.surname}</li>
                    })}
                </ul>

                <div className={`${s.arrow} ${openList && s.arrow_open}`}>
                    <IconChewron />
                </div>
            </div>
            <div className={s.buttons}>
                <button onClick={handleCloseModal} className={s.button_close}>Закрыть</button>
                <button onClick={handleTransferClient} className={s.button}><p>Передать клиента</p>{loader && <LoaderButton color={'#fff'} />}</button>
            </div>
        </div>
    )
};

export default HandOverClient;