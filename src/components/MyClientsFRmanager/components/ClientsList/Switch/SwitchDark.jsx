import { useState } from 'react';
import './Switch.scss';

//selector


function SwitchDark({ rejectFilter, setRejectFilter }) {

    console.log(rejectFilter)

    const handleActive = () => {
        rejectFilter == 0 ? setRejectFilter(1) : setRejectFilter(0);
        rejectFilter == 0 ? localStorage.setItem('filterReject', 1) : localStorage.setItem('filterReject', 0)
    }
    return (
        <div onClick={handleActive} className={`switch switch_${rejectFilter == 1 ? 'on' : ''}`}>
            <div className={`inner`}></div>
        </div>
    )
};

export default SwitchDark;