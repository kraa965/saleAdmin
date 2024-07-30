import { useRef, useState } from 'react';
import s from './ManagerCard.module.scss';
import { useEffect } from 'react';
import AddCard from './AddCard/AddCard';
import EditCard from './EditCard/EditCard';

function ManagerCard({ setAddWindow, typeEdit, manager, restoreWindow, setRestoreWindow }) {
    const [anim, setAnim] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const modalRef = useRef();

    const handleCloseModal = (e) => {
        const target = e.target;
        if(modalRef?.current && !modalRef?.current?.contains(target) && !e.target.closest('.base-Popper-root') && !disabled) {
            setAnim(false)
            setTimeout(() => {
                restoreWindow && setRestoreWindow(false)
                setAddWindow(false)
            }, 200);
            return
        }
    }

   

    useEffect(() => {
        setAnim(true);
        document.addEventListener('mousedown', handleCloseModal);
        return () => document.removeEventListener('mousedown', handleCloseModal);
    }, [disabled]);

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div ref={modalRef} className={`${s.card} ${anim && s.card_anim}`}>
                {!typeEdit && !restoreWindow && <AddCard setAddWindow={setAddWindow} setAnim={setAnim} disabled={disabled} setDisabled={setDisabled}/>}
                {typeEdit && !restoreWindow && <EditCard setAddWindow={setAddWindow} setAnim={setAnim} manager={manager} restoreWindow={restoreWindow}/>}
                {typeEdit && restoreWindow && <EditCard setAddWindow={setAddWindow} setAnim={setAnim} manager={manager} restoreWindow={restoreWindow}/>}
            </div>
        </div>

    )
};

export default ManagerCard;