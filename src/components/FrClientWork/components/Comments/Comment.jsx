import s from './Comments.module.scss';
import Loader from '../Loader/Loader';
import LoaderSub from '../Loader/LoaderSub';
import ModalImage from './ModalImage/ModalImage';
import { ReactComponent as IconMissingCall } from '../../image/clients/iconMissingCall.svg';
import { ReactComponent as Attention } from '../../image/clients/attention.svg';
//utils
import { handleDateForComment } from '../../utils/dates';
import { useState, useEffect } from 'react';

const Comment = ({ loadClose, loadVisible, el, id }) => {
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
            {<li id={id} className={`${s.comment} ${requestCall && s.comment_attention}`}>
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

        </>

    )
};

export default Comment;