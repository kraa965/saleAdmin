import { useEffect, useState, useRef, memo } from 'react';
import s from './Profile.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import GraphProfile from '../GraphProfile/GraphProfile';
import WorkTime from '../WorkTime/WorkTime';
import ProfileModal from '../ProfileModal/ProfileModal';
import { ReactComponent as IconPlus } from '../../image/iconPlus.svg';
//API
import { getProfileStatistics } from '../../Api/Api';



function Profile({ setOpenProfile, name, surname, id, avatar, level, dark, type, setTimer, setPauseUpdate, bpPlan, shedule }) {
    const [anim, setAnim] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState('');
    const [load, setLoad] = useState(true);
    const [newClient, setNewClient] = useState({});
    const [newClientTotal, setNewClientTotal] = useState([]);
    const [call, setCall] = useState({});
    const [callTotal, setCallTotal] = useState([]);
    const [zoom, setZoom] = useState({});
    const [zoomTotal, setZoomTotal] = useState([]);
    const [anketa, setAnketa] = useState({});
    const [anketaTotal, setAnketaTotal] = useState([]);
    const [reject, setReject] = useState([]);
    const [rejectTotal, setRejectTotal] = useState([]);
    const [event, setEvent] = useState([]);
    const [eventTotal, setEventTotal] = useState([]);
    const [lk, setLk] = useState([]);
    const [lkTotal, setLkTotal] = useState([]);
    const [bp, setBp] = useState([]);
    const [bpTotal, setBpTotal] = useState([]);

    const role = document.getElementById('root_leader').getAttribute('role');
   console.log(event)
    const profileRef = useRef();
    const modalRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        }, 100);
    }, []);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = "8px";
        return () => {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0";
        };
    }, []);


    useEffect(() => {
        setLoad(true)
        getProfileStatistics(id)
            .then(res => {
                console.log(res)
                const data = res.data.data;
                const expert = data.experts;
                const consultant = data.consultants;
                setNewClient(expert.receive_new_clients.dates);
                setNewClientTotal(expert.receive_new_clients.total);
                setCall(expert.calls.dates);
                setCallTotal(expert.calls.total);
                setZoom(expert.zoom_finish.dates);
                setZoomTotal(expert.zoom_finish.total);
                setAnketa(expert.anketa_send.dates);
                setAnketaTotal(expert.anketa_send.total);

                setReject(expert.clients_reject.dates);
                setRejectTotal(expert.clients_reject.total);

                setEvent(expert.discipline.dates);
                setEventTotal(expert.discipline.total);

                setLk(consultant.login_lk.dates);
                setLkTotal(consultant.login_lk.total);

                setBp(consultant.open_bp.dates);
                setBpTotal(consultant.open_bp.total);

                setTimeout(() => {
                    setLoad(false)
                }, 100)
            })
            .catch(err => console.log(err))
    }, [type, id]);

    function handleClose() {
        setAnim(false)
        setTimeout(() => {
            setOpenProfile(false);
        }, 400)
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function closeModal(e) {
        e.stopPropagation()
        if (profileRef.current && !profileRef.current.contains(e.target) && !openModal) {
            handleClose();
            return
        }

        if (modalRef.current && !modalRef.current.contains(e.target)) {
            handleCloseModal();
            return
        }
    }

    useEffect(() => {
        document.addEventListener('mouseup', closeModal);

        return () => document.removeEventListener('mouseup', closeModal);
    }, [openModal]);

    function handleOpenModal(e) {
        const id = e.currentTarget.id;
        setOpenModal(true)
        setModalType(id)
    }

    return (
        <div className={`${s.window}`}>
            <div className={`${s.overlay} ${dark && s.overlay_dark} ${anim && s.overlay_anim}`}></div>
            <div ref={profileRef} className={`${s.profile} ${dark && s.profile_dark} ${anim && s.profile_anim}`}>
                <div className={`${s.overlay_profile} ${openModal && s.overlay_profile_open}`}></div>
                <div onClick={handleClose} className={s.close}>
                    <IconClose />
                </div>
                <div className={s.header}>
                    <div className={s.container}>
                        <div className={s.avatar}>
                            <img src={avatar}></img>
                        </div>

                        <div className={s.container_column}>
                            <p className={s.name}>{name} {surname}</p>
                            <p className={s.level}>
                                {level === 1 && 'Новичок звонила'}
                                {level === 2 && 'Подающий надежды'}
                                {level === 3 && 'Ученик джедая'}
                                {level === 4 && 'Джедай'}
                                {level === 5 && 'Мастер продаж'}
                                {level === 6 && 'Гуру продаж'}
                                {level === 7 && 'Крепкий орешек'}
                                {level === 8 && 'Баба Гануш'}
                                {level === 9 && 'Магистр продаж'}
                                {level === 10 && 'Бесспорный лидер'}
                                {level === 11 && 'Волк с Уолл-стрит'}
                                {level === 12 && 'Бог продаж'}
                            </p>
                        </div>
                    </div>

                    <div className={s.bage}>
                        <p></p>
                    </div>
                </div>
                <div className={s.container_graph}>
                    <GraphProfile dark={dark} type={'new'} indicator={newClient} indicatorTotal={newClientTotal} load={load} planDay={-10} shedule={shedule}/>
                    <GraphProfile dark={dark} type={'call'} indicator={call} indicatorTotal={callTotal} load={load} planDay={30} shedule={shedule}/>
                    {type == 'leader' && <GraphProfile dark={dark} type={'lk'} indicator={lk} indicatorTotal={lkTotal} load={load} planDay={15} shedule={shedule}/>}
                    {type == 'leader' && <GraphProfile dark={dark} type={'bp'} indicator={bp} indicatorTotal={bpTotal} load={load} planDay={bpPlan} shedule={shedule}/>}
                    {type == 'frmanager' && <GraphProfile dark={dark} type={'zoom'} indicator={zoom} indicatorTotal={zoomTotal} load={load} planDay={3} shedule={shedule}/>}
                    {type == 'frmanager' && <GraphProfile dark={dark} type={'anketa'} indicator={anketa} indicatorTotal={anketaTotal} load={load} planDay={2} shedule={shedule}/>}
                    <GraphProfile dark={dark} type={'reject'} indicator={reject} indicatorTotal={rejectTotal} load={load} planDay={-10} shedule={shedule}/>
                    <GraphProfile dark={dark} type={'event'} indicator={event} indicatorTotal={eventTotal} load={load} planDay={-10} shedule={shedule}/>
                   {/*  <GraphProfile dark={dark} />
                    <GraphProfile dark={dark} />
                    <GraphProfile dark={dark} /> */}
                </div>
                {/*   <WorkTime dark={dark} /> */}
                {type === role && <div className={s.buttons}>
                    <button id='resort' onClick={handleOpenModal} className={`${s.resort} ${dark && s.resort_dark}`}>Время отдыха</button>
                    <button id='event' onClick={handleOpenModal} className={s.event}><IconPlus /> Создать событие</button>
                </div>
                }
            </div>
            {openModal && <ProfileModal modalRef={modalRef} setOpenModal={setOpenModal} type={modalType} dark={dark} id={id} setTimer={setTimer} setPauseUpdate={setPauseUpdate} />}
        </div>

    )
};

export default memo(Profile);