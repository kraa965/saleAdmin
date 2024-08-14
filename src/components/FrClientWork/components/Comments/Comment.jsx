import s from './Comments.module.scss';
import { memo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ModalImage from './ModalImage/ModalImage';
import { ReactComponent as Attention } from '../../image/clients/attention.svg';
import { ReactComponent as Arrow } from '../../image/clients/arrow-right.svg';
//selector
import { selectorExperts } from '../../../MyClientsFRmanager/store/reducer/Experts/selector';
//utils
import { handleDateForComment } from '../../utils/dates';
//сomponent
import CallRecord from './Record';




const TransferManager = ({ el, experts, loadClose }) => {
    const [expertTo, setExpertTo] = useState('');
    const [expertFrom, setExpertFrom] = useState('');


    useEffect(() => {
        const resTo = experts.find(item => item.id == el.to_person_id);
        const resFrom = experts.find(item => item.id == el.person_id);
        resTo && setExpertTo(resTo);
        resFrom && setExpertFrom(resFrom);
    }, [el, experts])


    return (
        <div style={{ display: expertFrom == '' ? 'none' : '' }} className={s.comment}>
            <div className={s.block}>
                <p className={s.text_from}>{expertFrom.name} {expertFrom.surname}</p>
                <Arrow />
                <p className={s.text_to}>{expertTo.name} {expertTo.surname}</p>
            </div>

            <div className={s.loader}>
                <span className={`${loadClose && s.hiden}`}>{handleDateForComment(el?.date)}</span>
            </div>
        </div>
    )
}

const Comment = ({ loadClose, loadVisible, el, id, index }) => {
    const experts = useSelector(selectorExperts).experts;
    const [openImage, setOpenImage] = useState(false);
    const [requestCall, setRequestCall] = useState(false);

    useEffect(() => {
        if (el.type == 'callme') {
            setRequestCall(true)
        } else {
            setRequestCall(false)
        }
    }, [el])


    const handleOpenImg = () => {
        setOpenImage(true);
    }
    return (
        <>
            {el.is_manual == 1 && <li id={id} className={`${s.comment} ${requestCall && s.comment_attention}`}>
                <div className={s.icon}>
                    {requestCall && <Attention />}
                </div>
                <div>
                    <div className={s.loader}>
                        <p className={`${loadClose && s.hiden}`}>
                            {!requestCall && el?.comment}
                            {requestCall && 'Клиент запросил звонок'}
                        </p>
                    </div>

                    <div className={`${s.images} ${(el?.files?.length > 0 || (el.fileForView?.length > 0 && el.fileForView?.[0])) && s.images_open}`}>
                        {(el.fileForView?.[0] ? el.fileForView : el?.files)?.map((el) => {

                            return <div onClick={handleOpenImg} className={s.image}>
                                <img className={s.image_inner} src={el?.id ? `https://api2.skilla.ru/file/${el.file}` : el}></img>
                                {openImage && <ModalImage img={el?.id ? `https://api2.skilla.ru/file/${el.file}` : el} setOpenImage={setOpenImage} />}
                            </div>
                        })}
                    </div>


                    <div className={s.loader}>
                        <span className={`${loadClose && s.hiden}`}>{handleDateForComment(el?.date)}</span>
                    </div>
                </div>
            </li>
            }

            {el.mango_id !== 0 && <CallRecord el={el} loadClose={loadClose} experts={experts} index={index} />}
            {el.type == 'change_manager' && <TransferManager el={el} loadClose={loadClose} experts={experts} />}
        </>

    )
};

export default memo(Comment);