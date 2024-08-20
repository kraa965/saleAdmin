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

const ClientItemAllLeader = ({ client, id, type, activeTabList }) => {
    const consultants = useSelector(selectorExperts).consultants;
    const experts = useSelector(selectorExperts).experts;
    const [anim, setAnim] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [lastComment, setLastComment] = useState('');
    const [status, setStatus] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [missedCall, setMissedCall] = useState(client.events_call !== 0 ? true : false);
    const [reqCall, setReqCall] = useState(client.is_call_me !== 0 ? true : false);
    const [viewHandOver, setViewHandOver] = useState(false);
    const [handOver, setHandOver] = useState(false);
    const [handOverExpert, setHandOverExpert] = useState('');
    const [managerReject, setManagerReject] = useState('');
    const [actualManager, setActualManager] = useState('');
    const [materialDate, setMaterialDate] = useState('');
    const [openBpDate, setOpenBpDate] = useState('');
    const [bpDate, setBpDate] = useState('');
    const dispatch = useDispatch();
    const updater = useSelector(selectorUpdater);
    const client_id = useSelector(selectorClient).client_id;
    const navigate = useNavigate();

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
    }, [client]);

    useEffect(() => {
        if (client.is_call_me == 0) {
            setReqCall(false)
        } else {
            setReqCall(true)
        }
    }, [client]);


    useEffect(() => {
        setLastComment(client.last_comment ? client.last_comment : '')
    }, [client])


    useEffect(() => {
        const menu = client?.lk_menus;
        const material = menu?.find(el => el.menu_id == 2 && el.status == 'finished');
        const openBp = menu?.find(el => el.menu_id == 4 && (el.status == 'enabled' || el.status == 'finished'));
        const bp = menu?.find(el => el.menu_id == 4 && el.status == 'finished');
        setMaterialDate(material ? material.date_change : '');
        setOpenBpDate(openBp ? openBp.date_change : '');
        setBpDate(bp ? bp.date_change : '')
    }, [client])

    useEffect(() => {
        if (updater.handOverClients.find(el => el.id == id)) {
            const name = updater.handOverClients.findLast(el => el.id == id).name;
            setHandOverExpert(name)

            return
        }
    }, [client, updater]);

    useEffect(() => {
        if (client?.has_manager) {
            const result = experts?.find(el => el.id == client?.has_manager.id);
            result ? setActualManager(`${client.manager_last !== 0 ? client.manager_last : 'Нет'}`) : setActualManager(`${client?.has_manager.name} ${client?.has_manager.surname}`)
            return
        }

        if (!client?.has_manager) {
            setActualManager(`${client.manager_last !== 0 ? client.manager_last : 'Нет'}`);
            return
        }

    }, [client, experts])

    const handleOpenTooltip = () => {
        setTooltip(true)
    }

    const handleCloseTooltip = () => {
        setTooltip(false)
    }

    const handleViewHandOver = () => {
        !handOver && setViewHandOver(true)
    }

    const handleHidenHandOver = () => {
        !handOver && setViewHandOver(false)
    }

    const handleOpenModal = () => {
        setHandOver(true);
        setViewHandOver(false)
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

    console.log(handOverExpert)

    return (

        <div id={id} onMouseEnter={handleViewHandOver} onMouseLeave={handleHidenHandOver} className={`${s.item} ${handOver && s.item_hover} ${anim && s.item_anim} ${handOverExpert !== '' && type !== 'fr' && s.item_dis}`}>
            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.empty} ${s.empty_all}`}>
                    {missedCall && <IconMissingCall />}
                    {reqCall && <Attention />}
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.data}>
                    <p>{statusText} {handleStageTime(client.date)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={`${s.client} ${s.client_all}`}>
                    <p>{client.name}</p> <span>{client.city}</span>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{client.date_log_lk ? handleStageTime(client.date_log_lk) : ''}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{materialDate == '' ? '' : handleStageTime(materialDate)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage2}>
                    <p>{openBpDate == '' ? '' : handleStageTime(openBpDate)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage2}>
                    <p>{bpDate == '' ? '' : handleStageTime(bpDate)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.task} ${s.task_all}`}>
                    <p>{handleTaskTime(client.next_connect)}</p>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    <p>{handleDateDifference(client.last_connect)}</p>
                </div>
            </Link>


            {/*   <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`} className={`${s.comment_link} ${s.comment_small2} ${type == 'fr' && s.comment_link_fr}`}>
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
            </Link> */}



            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                {client.status !== 3 && <p className={s.handover_name2}>{handOverExpert !== '' ? handOverExpert : actualManager}</p>}
                {client.status == 3 && <p className={s.handover_name2}>{handOverExpert !== '' ? handOverExpert : actualManager}</p>}
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.source} ${s.source_open}`}>
                    <p>{client.from_site}</p>
                </div>
            </Link>



            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.stage}>
                    {client.status == 3 ? <p>Отказ{/* {handleStageTime(client.reject_date)} */}</p> : <p></p>}
                </div>
            </Link>

            

            {(handOverExpert == '') && <div className={`${s.handover}`}>{/* <p>передать</p> */}<button onClick={handleOpenModal} className={`${s.button} ${!viewHandOver && s.button_hiden}`}><IconHandOver /></button>
                {handOver && <div className={`${s.modal} ${handOver && s.modal_open}`}><HandOverClient id={id} setHandOver={setHandOver} /></div>}
            </div>
            }


        </div>

    )
};

export default memo(ClientItemAllLeader);