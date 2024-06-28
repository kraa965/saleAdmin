import s from './Container.module.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//components
import Clients from '../Clients/Clients';

const Container = ({ sidebarHiden }) => {
    return (
        <div className={`${s.container} ${sidebarHiden && s.container_hidden}`}>
            <Clients />
        </div>
    )
};

export default Container;