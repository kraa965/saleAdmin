import { useRef, useState } from 'react';
import s from './ManagerCard.module.scss';
import { useEffect } from 'react';
import AddCard from './AddCard/AddCard';
import EditCard from './EditCard/EditCard';

function ManagerCard({ setAddWindow, typeEdit }) {
    const [anim, setAnim] = useState(false);
    const modalRef = useRef();

    const handleCloseModal = (e) => {
        const target = e.target;
        if(modalRef?.current && !modalRef?.current?.contains(target) && !e.target.closest('.base-Popper-root')) {
            setAnim(false)
            setTimeout(() => {
                setAddWindow(false)
            }, 200);
            return
        }
    }

   

    useEffect(() => {
        setAnim(true);
        document.addEventListener('mousedown', handleCloseModal);
        return () => document.removeEventListener('mousedown', handleCloseModal);
    }, []);

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div ref={modalRef} className={`${s.card} ${anim && s.card_anim}`}>
                {!typeEdit && <AddCard setAddWindow={setAddWindow} setAnim={setAnim} />}
                {typeEdit && <EditCard setAddWindow={setAddWindow} setAnim={setAnim} />}
            </div>
        </div>

    )
};

export default ManagerCard;