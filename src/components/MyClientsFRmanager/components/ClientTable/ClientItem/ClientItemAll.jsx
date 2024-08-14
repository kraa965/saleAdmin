import s from './ClientItem.module.scss';
import { ReactComponent as IconComment } from '../../../image/clients/iconComment.svg';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ReactComponent as IconStar } from '../../../image/work/IconStar.svg';
import { ReactComponent as IconStarActive } from '../../../image/work/IconStarActive.svg';
import { ReactComponent as IconZoomSmall } from '../../../image/clients/iconZoomSmall.svg';
import { ReactComponent as IconMissingCall } from '../../../image/clients/iconMissingCall.svg';
import { ReactComponent as Attention } from '../../../image/clients/attention.svg';
import { ReactComponent as IconHandOver } from '../../../image/clients/iconHandOver.svg';
//utils
import { handleTaskTime, handleStageTime, handleDateDifference } from '../../../utils/dates';
import { addSpaceNumber } from '../../../utils/addSpaceNumber';
//API
import { addFavorite } from '../../../Api/Api';
//slice
import { setAddFavorite, setRemoveFavorite } from '../../../store/reducer/MyClients/slice';
import {
    setUpdateFavorites,
    setDeleteUpdateFavorites,
    setUpdateNoFavorites,
    setDeleteUpdateNoFavorites
} from '../../../store/reducer/Updater/slice';
import { setClientId } from '../../../../FrClientWork/store/reducer/Client/slice';
//selector
import { selectorUpdater } from '../../../store/reducer/Updater/selector';
import { selectorClient } from '../../../../FrClientWork/store/reducer/Client/selector';
import { selectorExperts } from '../../../store/reducer/Experts/selector';
//components
import HandOverClient from './HandOverClient/HandOverClient';

const ClientItemAll = ({ client, id, type, activeTabList }) => {
    const experts = useSelector(selectorExperts).experts;
    const [anim, setAnim] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [viewFavorite, setViewFavorite] = useState(false);
    const [lastComment, setLastComment] = useState('');
    const [status, setStatus] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [missedCall, setMissedCall] = useState(client.events_call !== 0 ? true : false);
    const [reqCall, setReqCall] = useState(client.is_call_me !== 0 ? true : false);
    const [handOver, setHandOver] = useState(false);
    const [handOverExpert, setHandOverExpert] = useState('');
    const [bpDate, setBpDate] = useState('');
    const [zoomDate, setZoomDate] = useState('');
    const [anketaDate, setAnketaDate] = useState('');
    const [contractDate, setContractDate] = useState('');
    const [prepayDate, setPrepayDate] = useState('');
    const [managerReject, setManagerReject] = useState('');
    const dispatch = useDispatch();
    const updater = useSelector(selectorUpdater);
    const client_id = useSelector(selectorClient).client_id;
    const navigate = useNavigate();

    //Бизнес-план (1): - Сформирован бизнес-план (1) ClientOpenPlan
    //запись на ZOOM (2): - Клиент запросил Zoom(2.1) ReqZoom,  Запись на Zoom-встречу (2.2) ClientZoomSet
    //ZOOM (3): - Проведена встреча Zoom (3.2) ClientZoomFinish,  Zoom не состоялся (3.1) - парсим дату записи на ZOOM и сравниваем с текущей датой если текущая дата больше берем этот статус и последний статус < 3.2
    //ANKETA (4): - Проверь анкету клиента (4.1) SendForm,  Анкета отклонена (4.2) - ,  Анкета кандидата(4.3) ClientAnketaAccept
    //CONTRACT (6): - Договор не подписан (6.1) ContractСancelled,  Договор  (6.2) ClientContractSign
    //PREPAID (7): - Предоплата не внесена (7.1) - , Предоплата 90 000 ₽ (7.2) ClientPrepaid
    //REJECT (-1): - Отправлен в отказ (-1) ClientStatusReject

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, []);

    useEffect(() => {
        if (client.events_call == 0 || reqCall) {
            setMissedCall(false)
        } else {
            setMissedCall(true)
        }
    }, [client])

    useEffect(() => {
        if (client.is_call_me == 0) {
            setReqCall(false)
        } else {
            setReqCall(true)
        }
    }, [client])


    useEffect(() => {
        const comment = client.partnership_client_logs?.filter(el => el.is_manual == 1 && el.person_id !== 0 && el.comment !== '' && el.newsletter_id == 0 && el.is_sms == 0).at(-1)?.comment;
        comment && setLastComment(comment)
    }, [client])

    useEffect(() => {
        const bp = client?.lk_menus?.find(el => el.menu_id == 4 && el.status == 'finished');
        const zoom = client?.lk_road_logs?.find(el => el.type == 'ClientZoomFinish');
        const anketa = client?.lk_road_logs?.find(el => el.type == 'ClientAnketaAccept');
        const contract = client?.lk_road_logs?.find(el => el.type == 'ClientContractSign');
        const prepay = client?.lk_road_logs?.find(el => el.type == 'ClientPrepaid');
        /*  const rejectLog = client?.lk_road_logs?.find(el => el.type == 'ClientStatusReject');
         const rejectManager = experts.findLast(el => el.id == rejectLog?.person_id); */
        console.log(prepay?.date)
        setBpDate(bp ? bp.date_change : '')
        setZoomDate(zoom ? handleStageTime(zoom.date) : '')
        setAnketaDate(anketa ? handleStageTime(anketa.date) : '')
        setContractDate(contract ? handleStageTime(contract.date) : '')
        setPrepayDate(prepay ? handleStageTime(prepay.date) : '')
        /*   setManagerReject(rejectManager ? `${rejectManager.name} ${rejectManager.surname}` : '') */


    }, [client])

    useEffect(() => {
        if (updater.handOverClients.find(el => el.id == id)) {
            const name = updater.handOverClients.findLast(el => el.id == id).name;
            setHandOverExpert(name)

            return
        }
    }, [client, updater]);

    useEffect(() => {
        const result = experts.find(el => el.id == client?.manager_last);
        setManagerReject(result ? `${result.name} ${result.surname}` : '')
    }, [experts, client])

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }

    const handleFavorite = () => {
        if (favorite) {
            addFavorite({ id })
                .then(res => {
                    const client = res.data.client;
                    dispatch(setRemoveFavorite(client));
                    dispatch(setDeleteUpdateFavorites(id));
                    dispatch(setUpdateNoFavorites(id));
                    setFavorite(false);
                })
                .catch(err => {
                    console.log(err);
                })
        } else {

            addFavorite({ id })
                .then(res => {
                    const client = res.data.client;
                    dispatch(setAddFavorite(client));
                    dispatch(setUpdateFavorites(id));
                    dispatch(setDeleteUpdateNoFavorites(id));
                    setFavorite(true);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    const handleViewFavorite = () => {
        !handOver && setViewFavorite(true)
    }

    const handleHidenFavorite = () => {
        !handOver && setViewFavorite(false)
    }

    const handleOpenModal = () => {
        setHandOver(true)
        setViewFavorite(false)
    }

    const handleOpenClient = () => {
        dispatch(setClientId(id));
        console.log('нажал на строчку')
        navigate(`/leader/dashboard/experts/work/client=${id}`);
        if (client_id !== id) {
            localStorage.removeItem('widget');
            localStorage.removeItem('prevWidget');
            localStorage.removeItem('comment');
            localStorage.removeItem('tab');
            localStorage.removeItem('sms');
            localStorage.removeItem('screenShots')
            return
        }
    }

    return (

        <div id={id} onMouseEnter={handleViewFavorite} onMouseLeave={handleHidenFavorite} className={`${s.item} ${handOver && s.item_hover} ${anim && s.item_anim} ${handOverExpert !== '' && type !== 'fr' && s.item_dis}`}>
            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.empty} ${s.empty_all}`}>
                    {missedCall && <IconMissingCall />}
                    {reqCall && <Attention />}
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{statusText} {handleStageTime(bpDate)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={`${s.client} ${s.client_all}`}>
                    <p>{client.name}</p> <span>{client.city}</span>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{zoomDate}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{anketaDate}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{contractDate}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{prepayDate}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.task} ${s.task_all}`}>
                    <p>{handleTaskTime(client.next_connect)}</p>
                    {client.next_connect == client.zoom_date && client.next_connect !== '0000-00-00 00:00:00' && <div className={s.zoom}>
                        <IconZoomSmall />
                    </div>}
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{handleDateDifference(client.last_connect)}</p>
                </div>
            </Link>


            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`} className={`${s.comment_link} ${s.comment_small2} ${type == 'fr' && s.comment_link_fr}`}>
                {handOverExpert == '' && <div className={`${s.comment} ${s.comment_small2} ${type == 'fr' && s.comment_fr}`} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    {lastComment !== '' && <IconComment />}
                    <p className={s.text}>{lastComment}</p>
                    {lastComment.length > 22 && <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                        <p>{lastComment}</p>
                        <div></div>
                    </div>
                    }
                </div>
                }
            </Link>



            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                {client.status !== 3 && <p className={s.handover_name2}>{handOverExpert !== '' ? handOverExpert : `${client?.has_manager?.name ? client?.has_manager?.name : ''} ${client?.has_manager?.surname ? client?.has_manager?.surname : ''}`}</p>}
                {client.status == 3 && <p className={s.handover_name2}>{handOverExpert !== '' ? handOverExpert : `${managerReject}`}</p>}
            </Link>


            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    {client.status == 3 ? <p>{handleStageTime(client.reject_date)}</p> : <p></p>}
                </div>
            </Link>


            {(handOverExpert == '' || type == 'fr') && handleDateDifference(bpDate) !== 'Сегодня' && <div className={`${s.handover}`}>{/* <p>передать</p> */}<button onClick={handleOpenModal} className={`${s.button} ${!viewFavorite && s.button_hiden}`}><IconHandOver /></button>
                {handOver && <div className={`${s.modal} ${handOver && s.modal_open}`}><HandOverClient id={id} setHandOver={setHandOver} /></div>}
            </div>
            }


        </div>

    )
};

export default memo(ClientItemAll);