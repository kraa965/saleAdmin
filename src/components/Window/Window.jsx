import s from './Window.module.scss';
import ResultOverlay from '../Result/ResultOverlay';
import Sales from '../Sales/Sales';
import Team from '../Team/Team';
import Skills from '../Skills/Skills';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { menuSelector } from '../../store/reducer/menu/selector';
import Shedule from '../Schedule/Schedule';
import Metrics from '../Metrics/Metrics';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Window({role}) {
    const menu = useSelector(menuSelector).menu;
    const dark = useSelector(menuSelector).dark;
    const location = useLocation();
    const path = location?.pathname;

    return (
        <div className={`${s.window} ${path == '/leader/dashboard' && s.window_dash} ${dark && s.dark}`}>
            <div className={s.container}>

                <Routes>
                    <Route path="*" element={<ResultOverlay />} />
                    <Route path="/leader/dashboard/" element={<ResultOverlay />} />
                    <Route path="/leader/dashboard/sales" element={<Sales />} />
                    <Route path="/leader/dashboard/team" element={<Team />} />
                    <Route path="/leader/dashboard/skills" element={<Skills />} />
                    <Route path="/leader/dashboard/shedule" element={<Shedule role={role}/>} />
                    <Route path="/leader/dashboard/metrics" element={<Metrics />} />
                    {/* {menu === 'result' && <Result />}
                        {menu === 'sales' && <Sales />} */}
                    {/* {menu === 'team' && <Team />}
                    {menu === 'skills' && <Skills />}
                    {menu === 'shedule' && <Shedule />}
                    {menu === 'metrics' && <Metrics />} */}
                </Routes>

            </div>
        </div>
    )
}

export default Window;