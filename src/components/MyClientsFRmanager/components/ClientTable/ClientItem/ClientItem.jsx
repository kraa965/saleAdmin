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
import { ReactComponent as IconWhatsapp } from '../../../image/clients/iconWhatsapp.svg';
//utils
import { handleTaskTime, handleDateDifference } from '../../../utils/dates';
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
import { setNotification } from '../../../../FrClientWork/store/reducer/Messenger/slice';
//selector
import { selectorUpdater } from '../../../store/reducer/Updater/selector';
import { selectorClient } from '../../../../FrClientWork/store/reducer/Client/selector';
import { selectorMessenger } from '../../../../FrClientWork/store/reducer/Messenger/selector';
//components
import HandOverClient from './HandOverClient/HandOverClient';

const ClientItem = ({ client, id, type, activeTabList }) => {
    const [anim, setAnim] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [favorite, setFavorite] = useState(false);
    const [viewFavorite, setViewFavorite] = useState(false);
    const [lastRoadDate, setLastRoadDate] = useState('');
    const [lastComment, setLastComment] = useState('');
    const [status, setStatus] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [missedCall, setMissedCall] = useState(client.events_call !== 0 ? true : false);
    const [reqCall, setReqCall] = useState(client.is_call_me !== 0 ? true : false);
    const [newMessage, setNewMessage] = useState(client.is_new_msg !== 0 ? true : false)
    const [handOver, setHandOver] = useState(false);
    const [handOverExpert, setHandOverExpert] = useState('');
    const [coursStatus, setCoursStatus] = useState(false);
    const [coursDate, setCoursDate] = useState('');
    const dispatch = useDispatch();
    const updater = useSelector(selectorUpdater);
    const client_id = useSelector(selectorClient).client_id;
    const messageFromSocket = useSelector(selectorMessenger).notification;
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
        if (client.is_new_msg == 1) {
            setNewMessage(true)
        } else {
            setNewMessage(false)
        }
    }, [client])

    useEffect(() => {
        if (messageFromSocket?.client?.id) {
            messageFromSocket?.client?.id == id && setNewMessage(true)
            return
        }
    }, [messageFromSocket])



    useEffect(() => {
        const result = client?.lk_menus?.find(el => el.menu_id == 12)
        result?.status == 'finished' ? setCoursStatus(true) : setCoursStatus(false)


        result?.status == 'finished' ? setCoursDate(result.date_change) : setCoursDate('')
    }, [client])
    console.log(client.lk_menus.find(el => el.menu_id == 12), coursStatus)



    useEffect(() => {
        setLastComment(client.last_comment ? client.last_comment : '')
    }, [client])

    useEffect(() => {
        const cleanRoad = client?.lk_road_logs?.filter(el => el.type == 'ClientOpenPlan' ||
            el.type == 'ReqZoom' || el.type == 'ClientZoomSet' ||
            el.type == 'ClientZoomFinish' || el.type == 'SendForm' ||
            el.type == 'ClientAnketaAccept' || el.type == 'ContractСancelled' ||
            el.type == 'ClientContractSign' || el.type == 'ClientPrepaid');
        const lastRoad = cleanRoad?.at(-1);
        const bpStage = client.lk_menus.find(el => el.menu_id == 4 && el.status == 'finished')  

        bpStage && lastRoad?.type == 'ClientOpenPlan' ? setLastRoadDate(bpStage?.date_change) :setLastRoadDate(lastRoad?.date)


        if (lastRoad?.type == 'ClientOpenPlan') {
            setStatus(1);
            setStatusText('Бизнес-план');
            return
        }

        if (lastRoad?.type == 'ReqZoom') {
            setStatus(2.1);
            setStatusText('Клиент запросил Zoom');
            return
        }

        if (lastRoad?.type == 'ClientZoomSet') {
            setStatus(2.2);
            setStatusText('Запись на Zoom-встречу');
            return
        }

        if (lastRoad?.type == 'ClientZoomReject') {
            setStatus(3.1);
            setStatusText('Zoom не состоялся');
            return
        }

        if (lastRoad?.type == 'ClientZoomFinish') {
            setStatus(3.2);
            setStatusText('Проведена встреча');
            return
        }

        if (lastRoad?.type == 'SendForm' && cleanRoad[0].type !== 'ClientAnketaAccept') {
            setStatus(4.1);
            setStatusText('Проверь анкету клиента');
            return
        }

        if (lastRoad?.type == 'SendForm' && cleanRoad[0].type == 'ClientAnketaAccept') {
            setStatus(4.3);
            setStatusText('Анкета кандидата');
            return
        }

        if (lastRoad?.type == 'FormReject') {
            setStatus(4.2);
            setStatusText('Анкета отклонена');
            return
        }


        if (lastRoad?.type == 'ClientAnketaAccept' && !coursStatus) {
            setStatus(4.3);
            setStatusText('Анкета кандидата');
            return
        }

        if (lastRoad?.type == 'ClientAnketaAccept' && coursStatus) {
            setStatus(5);
            setStatusText('Вводный курс');
            return
        }


        if (lastRoad?.type == 'ContractСancelled') {
            setStatus(6.1);
            setStatusText('Договор не подписан');
            return
        }

        if (lastRoad?.type == 'ClientContractSign') {
            setStatus(6.2);
            setStatusText('Договор подписан');
            return
        }

        if (lastRoad?.type == 'ClientPrepaidReject') {
            setStatus(7.1);
            setStatusText('Предоплата не внесена');
            return
        }

        if (lastRoad?.type == 'ClientPrepaid') {
            setStatus(7.2);
            const comment = lastRoad?.comment;
            const regex = /[0-9]/g;
            const sum = comment?.match(regex)?.join('').slice(0, -2);
            setStatusText(`Предоплата ${addSpaceNumber(sum)} ₽`);
            return
        }

    }, [client, coursStatus]);

    useEffect(() => {

        if (updater.updateFavorites.find(el => el == id)) {
            setFavorite(true)
            return
        }

        if (updater.updateNoFavorites.find(el => el == id)) {
            setFavorite(false)
            return
        }

        if (client.favorite == 1) {
            setFavorite(true)
            return
        }

        if (client.favorite == 0) {
            setFavorite(false)
            return
        }
    }, [client])

    useEffect(() => {
        if (updater.handOverClients.find(el => el.id == id)) {
            const name = updater.handOverClients.findLast(el => el.id == id).name;
            setHandOverExpert(name)

            return
        }
    }, [client, updater]);

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
        /*     dispatch(setClientId(id)); */
        messageFromSocket?.client?.id == id && dispatch(setNotification({}))
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

        <div id={id} onMouseEnter={handleViewFavorite} onMouseLeave={handleHidenFavorite} className={`${s.item} ${anim && s.item_anim} ${reqCall && s.item_req} ${missedCall && s.item_attention} ${handOver && s.item_hover}`}>
            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={s.empty}>
                    {newMessage && <IconWhatsapp />}
                    {missedCall && !newMessage && <IconMissingCall />}
                    {reqCall && !newMessage && <Attention />}
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.client}>
                    <p>{client.name}</p> <span>{client.city}</span>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={s.task}>
                    <p>{handleTaskTime(client.next_connect)}</p>
                    {client.next_connect == client.zoom_date && client.next_connect !== '0000-00-00 00:00:00' && <div className={s.zoom}>
                        <IconZoomSmall />
                    </div>}
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.task}>
                    {client.manager_last !== 0 && <p>{handleDateDifference(client.last_connect)}</p>} <span></span>
                </div>
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div onClick={handleOpenClient} className={s.step}>
                    <div className={s.bars}>
                        <div className={`${s.bar} ${status == 2.1 && s.bar_yellow} ${status >= 2.2 && s.bar_green}`}></div>
                        <div className={`${s.bar}  ${status >= 3.2 && s.bar_green}`}></div>
                        <div className={`${s.bar} ${status == 4.1 && s.bar_yellow} ${status == 4.2 && s.bar_red} ${status >= 4.3 && s.bar_green}`}></div>
                        <div className={`${s.bar} ${status >= 5 && s.bar_green}`}></div>
                        <div className={`${s.bar}  ${status == 6.1 && s.bar_red} ${status >= 6.2 && s.bar_green}`}></div>
                        <div className={`${s.bar} ${status == 7.1 && s.bar_red} ${status >= 7.2 && s.bar_green}`}></div>
                    </div>

                    <div className={s.step_text}>
                        <p>{statusText}</p>

                        {!coursStatus && <sup>{handleDateDifference(lastRoadDate)}</sup>}
                        {coursStatus && <sup>{handleDateDifference(coursDate)}</sup>}
                    </div>

                </div>
            </Link>


            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`} className={`${s.comment_link} ${activeTabList == 8 && type == 'fr' && s.comment_small} ${type == 'fr' && s.comment_link_fr}`}>
                {handOverExpert == '' && <div className={`${s.comment} ${activeTabList == 8 && type == 'fr' && s.comment_small} ${type == 'fr' && s.comment_fr}`} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                    {lastComment !== '' && <IconComment />}
                    <p className={s.text}>{lastComment}</p>
                    {lastComment.length > ((type == 'fr' || activeTabList == 1) ? 25 : 45) && <div className={`${s.tooltip} ${tooltip && s.tooltip_open}`}>
                        <p>{lastComment}</p>
                        <div></div>
                    </div>
                    }
                </div>
                }
            </Link>

            <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <div className={`${s.source} ${activeTabList == 8 && type == 'fr' && s.source_open}`}>
                    <p>{client.from_site}</p>
                </div>
            </Link>

            {type !== 'fr' && <div className={`${s.favorite} ${!viewFavorite && !favorite && s.favorite_hiden}`}>
                <IconStar onClick={handleFavorite} className={`${s.icon} ${!favorite && s.icon_active}`} />
                <IconStarActive onClick={handleFavorite} className={`${s.icon_2} ${favorite && s.icon_active}`} />
            </div>
            }

            {type == 'fr' && (client.manager !== 0 || handOverExpert !== '') && <Link onClick={handleOpenClient} to={`/leader/dashboard/experts/work/client=${id}`}>
                <p className={s.handover_name}>{handOverExpert !== '' ? handOverExpert : `${client?.has_manager?.name} ${client?.has_manager?.surname}`}</p>
            </Link>
            }

            {(handOverExpert == '' || type == 'fr') && handleDateDifference(lastRoadDate) !== 'Сегодня' && <div className={`${s.handover}`}>{/* <p>передать</p> */}<button onClick={handleOpenModal} className={`${s.button} ${!viewFavorite && s.button_hiden}`}><IconHandOver /></button>
                {handOver && <div className={`${s.modal} ${handOver && s.modal_open}`}><HandOverClient id={id} setHandOver={setHandOver} /></div>}
            </div>
            }

            {handOverExpert !== '' && type !== 'fr' && <p className={s.handover_name}>{`${handOverExpert}`}</p>}
        </div>

    )
};

export default memo(ClientItem);