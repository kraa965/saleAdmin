import { useEffect, useState } from 'react';
import s from './AppMyCLients.module.scss';
import { useLocation } from 'react-router-dom';
//components
import Container from '../Container/Container';
import { useDispatch } from 'react-redux';

import { getTeam } from '../../../../Api/Api'


import { setExperts } from '../../store/reducer/Experts/slice';

const AppMyCLients = () => {
    const [sidebarHiden, setSideBarHiden] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const path = location.pathname;


    return (
        <div className={s.app}>
            <Container sidebarHiden={sidebarHiden} />
        </div>
    )
};

export default AppMyCLients;