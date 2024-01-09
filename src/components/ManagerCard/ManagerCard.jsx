import { useState } from 'react';
import s from './ManagerCard.module.scss';
import { useEffect } from 'react';
import AddCard from '../AddCard/AddCard';

function ManagerCard({setAddWindow, typeEdit}) {
    const [anim, setAnim] = useState(false);

    useEffect(() => {
        setAnim(true)
    }, []);

    return (
        <div className={`${s.window} ${anim && s.window_anim}`}>
            <div className={`${s.overlay} ${anim && s.overlay_anim}`}></div>
            <div className={`${s.card} ${anim && s.card_anim}`}>
                {typeEdit && <AddCard setAddWindow={setAddWindow} setAnim={setAnim}/>}
            </div>
        </div>

    )
};

export default ManagerCard;