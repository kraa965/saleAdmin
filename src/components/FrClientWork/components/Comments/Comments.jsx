import s from './Comments.module.scss';
import { ReactComponent as IconMissingCall } from '../../image/clients/iconMissingCall.svg';
import { ReactComponent as Attention } from '../../image/clients/attention.svg';
import { ReactComponent as IconReject } from '../../image/clients/iconReject.svg';
import { ReactComponent as Icon7Days } from '../../image/clients/icon7Days.svg';
import { ReactComponent as Icon14Days } from '../../image/clients/icon14Days.svg';
import Comment from './Comment';
import CommentNew from './CommentNew';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
//selector
import { selectorWork } from '../../store/reducer/Work/selector';
import { selectorClient } from '../../store/reducer/Client/selector';
import { selectorExperts } from '../../../MyClientsFRmanager/store/reducer/Experts/selector';
//component
import CommentsSceleton from './CommentsSceleton/CommentsSceleton';

const Comments = ({ loadClose, loadVisible }) => {
    const comments = useSelector(selectorWork).comments;
    const missCall = useSelector(selectorClient).missCall;
    const callMe = useSelector(selectorClient).callMe;
    const clientStatus = useSelector(selectorClient).clientStatus;
    const dayWithoutMove = useSelector(selectorClient).dayWithoutMove;
    const managerLast = useSelector(selectorClient).managerLast;
    const experts = useSelector(selectorExperts).experts;
    const rejectComment = useSelector(selectorClient).rejectComment;
    const [anim, setAnim] = useState(false)
    const [openList, setOpenList] = useState(false);
    const [firstListLength, setFirstListLength] = useState(/* JSON.parse(localStorage.getItem('length')) || */ 7);
    const [height, setHeight] = useState(560);
    const [heightHiden, setHeightHiden] = useState(177);
    const [lastExpert, setLastExpert] = useState('');
    const heightRef = useRef();
    const heightHiddenRef = useRef();
    console.log(comments)

    useEffect(() => {
        setHeight(heightRef?.current?.offsetHeight);
        setHeightHiden(heightHiddenRef?.current?.offsetHeight)
    });

    useEffect(() => {
        setTimeout(() => {
            setAnim(true);
        })
    }, []);

    useEffect(() => {
        !loadClose && setFirstListLength(comments.length);
        !loadClose && localStorage.setItem('length', comments.length);
    }, [comments.length, loadClose])

    useEffect(() => {
        const result = experts.find(el => el.id == managerLast);
        setLastExpert(result ? `${result.name} ${result.surname}` : '')
    }, [experts, managerLast])

    /* useEffect(() => {
        setTimeout(() => {
            setComments(prevState => [{ text: 'комментарий новый', time: '11 марта' }, ...prevState])
        }, 5500)
    }, []) */
    const handleOpenList = () => {
        if (openList) {
            setOpenList(false);
        } else {
            setOpenList(true);
        }
    }
    return (
        <>
            <div className={`${s.bage} ${s.bage_green} ${clientStatus == 10 && !loadClose && s.bage_vis}`}><p>Клиент стал партнером</p></div>
            <div className={`${s.bage} ${s.bage_reject} ${clientStatus == 3 && !loadClose && s.bage_vis}`}><IconReject /> <div><p>Клиент отказался от сотрудничества</p>
                {lastExpert !== '' && <span>Последний эксперт: {lastExpert}</span>}
                {lastExpert == '' && managerLast !== 0 && <span>Последний консультант: {managerLast}</span>}
                {rejectComment !== '' && rejectComment && <span>Причина отказа: {rejectComment}</span>}
            </div></div>
            <div className={`${s.bage} ${dayWithoutMove > 14 && clientStatus == 1 && !loadClose && s.bage_vis}`}><Icon14Days /> <p>По клиенту не было движения больше 14 дней</p></div>
            <div className={`${s.bage} ${s.bage_request} ${dayWithoutMove > 7 && clientStatus == 1 && dayWithoutMove <= 14 && !loadClose && s.bage_vis}`}><Icon7Days /> <p>По клиенту не было движения больше 7 дней</p></div>
            <div className={`${s.bage} ${missCall && !loadClose && s.bage_vis}`}><IconMissingCall /> <p>Пропущенный звонок</p></div>
            <div className={`${s.bage} ${s.bage_request} ${callMe && clientStatus == 1 && !loadClose && s.bage_vis}`}><Attention /> <p>Запрошен звонок</p></div>
            <div className={`${s.comments} ${anim && s.comments_anim} ${firstListLength == 0 && s.comments_hiden}`}>
                <div className={s.header}>
                    <p>История</p>
                    {firstListLength > 3 && <button onClick={handleOpenList}>{openList ? 'скрыть' : 'Показать все'}</button>}
                </div>
                <ul ref={heightRef} className={`${s.list_hiden}`}>
                    {comments.slice(0, 100).map((el) => {
                        return <Comment el={el} key={el.id} />
                    })}
                </ul>

                <ul ref={heightHiddenRef} className={`${s.list_hiden}`}>
                    {comments.slice(0, 7).map((el) => {
                        return <Comment el={el} key={el.id} />
                    })}
                </ul>

                <ul style={{ maxHeight: openList ? `${height}px` : `${heightHiden}px` }} className={`${s.list} ${anim && s.list_anim} ${openList && s.list_open}`}>
                    {comments.slice(0, 100).map((el, index) => {
                        /*  return (index == 0 || index == 1) && firstListLength < comments.length ?
                             <CommentNew key={el.id} el={el} id={index} loadClose={loadClose} loadVisible={loadVisible} />
                             : */
                        return <Comment key={el.id} el={el} index={index} id={el.id} loadClose={loadClose} loadVisible={loadVisible} />
                    })}
                </ul>
                {loadClose && <CommentsSceleton loadClose={loadClose} />}
            </div>
        </>
    )
};

export default Comments;