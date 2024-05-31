import s from './Log.module.scss';
import { ReactComponent as IconArrow } from '../../image/iconArrowSend.svg';
import { useEffect, useRef, useState } from 'react';
import avatar from '../../image/avatarDef2.png'
import { dateNow, timeForLog, handleComparisonDate, dateForLog } from '../../utils/date';
import Message from './Message';
import { sendLog, sendLogOrder } from '../../Api/Api';
import { setOrderUpdate, setUpdateOrder } from '../../store/reducer/purchaseUpdate/slice';
import { useDispatch } from 'react-redux';


function Log({ logs, setLogs, personView, id, role, windowRefImage, scrollTopHeight, type, send }) {
    const [text, setText] = useState('');
    const [heightComment, setHeightComment] = useState(40);
    const [messages, setMessages] = useState([{ text: 'Залупка одбренна', time: dateNow(), owner: 0, name: 'Админ' }, { text: 'Залупка одбренна', time: dateNow(), owner: 0, name: 'Админ' }]);
    const [timeNow, setTimeNow] = useState('');
    const [scrollVis, setScrollVis] = useState(false);
    const dispatch = useDispatch();
    const textRef = useRef();
    const textAreaRef = useRef();
    const chatRef = useRef();
    const windowRef = useRef();
    console.log(send)

    useEffect(() => {
        setMessages(logs)
        setTimeout(() => { chatRef.current?.scrollIntoView({ behavior: 'smooth', block: "end" }) }, 100)
    }, [logs, chatRef])
    function handleComment(e) {
        const comment = e.target.value;
        setText(comment);
        const height = textRef.current.offsetHeight;

        if (comment.length === 0) {
            setHeightComment(40);
        } else {
            setHeightComment(height);
        }
    }

    function handleSendMessage() {
        type == 'purchase' && sendLog({ id: id, comment: text })
            .then(res => {
                const data = res.data;
                console.log(res);
                setLogs([...logs, data.purchase.logs.at(-1)]);
            })
            .catch(err => console.log(err))

        type == 'order' && sendLogOrder({ id: id, comment: text })
            .then(res => {
                const data = res.data;
                console.log(res);
                setLogs([...logs, data.order.order_logs.at(-1)]);
            })
            .catch(err => console.log(err))

        setText('');
        textAreaRef.current.value = '';
        setHeightComment(40);
        setTimeout(() => {
            dispatch(setUpdateOrder());
            chatRef.current?.scrollIntoView({ behavior: 'smooth', block: "end" });
        })


    }

    function handleKeyEnter(e) {
        if (e.keyCode === 13) {
            e.preventDefault()
            handleSendMessage();
            textAreaRef.current.blur();
            textAreaRef.current.focus();
        }
    }


    return (
        <div className={s.log}>
            <div className={s.header}>
                <p>Журнал действий</p>
            </div>
            <div ref={windowRef} className={`${s.chat} ${scrollVis && s.chat_scroll}`}>
                {messages.map((el, index) => {
                    const prev = index >= 1 && el.person_id == messages?.[index - 1].person_id

                    if (handleComparisonDate(el.date, messages?.[index - 1]?.date)) {
                        return <Message text={el.comment} key={el.id} id={el.id} time={timeForLog(el.date)} avatar={el.person?.avatar == '' ? avatar : `https://lk.skilla.ru/images/persons/chat/${el.person?.avatar}`} owner={el.person_id == personView}
                            name={el.person?.name} surname={el.person?.surname} next={index >= 1 && el.person_id == personView && messages?.[index - 1].person_id}
                            prev={index >= 1 && el.person_id == messages?.[index - 1].person_id} index={index} type={el.type} subcomment={el.sub_comment} files={el.files} windowRef={windowRefImage} scrollTopHeight={scrollTopHeight} />
                    }

                    if (!handleComparisonDate(el.date, messages?.[index - 1]?.date)) {
                        return <div className={s.block_date}><p style={{ marginBottom: prev ? '20px' : '' }} className={s.date}>{dateForLog(el.date)}</p>
                            <Message text={el.comment} key={el.id} id={el.id} time={timeForLog(el.date)} avatar={el.person?.avatar == '' ? avatar : `https://lk.skilla.ru/images/persons/chat/${el.person?.avatar}`} owner={el.person_id == personView}
                                name={el.person?.name} surname={el.person?.surname} next={index >= 1 && el.person_id == personView && messages?.[index - 1].person_id}
                                prev={prev} index={index} type={el.type} subcomment={el.sub_comment} files={el.files} windowRef={windowRefImage} scrollTopHeight={scrollTopHeight} />
                        </div>
                    }
                })}
                <div ref={chatRef}></div>
            </div>

            {send && <div className={s.container_text}>
                <textarea onKeyDown={handleKeyEnter} ref={textAreaRef} style={{ height: `${heightComment}px` }} onChange={handleComment} placeholder='Написать комментарий'></textarea>
                <div className={s.invis} ref={textRef}><p>{text}</p></div>
                <button onClick={handleSendMessage}><IconArrow /></button>
            </div>
            }


        </div>
    )
}

export default Log;