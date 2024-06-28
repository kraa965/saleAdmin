import s from './Window.module.scss';
import ResultOverlay from '../Result/ResultOverlay';
import Sales from '../Sales/Sales';
import Team from '../Team/Team';
import Skills from '../Skills/Skills';
import AppStock from '../Stock/components/AppStock/AppStock';
import AppPurchase from '../Purchases/components/AppPurchase/AppPurchase';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { menuSelector } from '../../store/reducer/menu/selector';
import Shedule from '../Schedule/Schedule';
import Metrics from '../Metrics/Metrics';
import AppMyCLients from '../MyClientsFRmanager/components/AppMyCLients/AppMyCLients';
import Clients from '../MyClientsFRmanager/components/Clients/Clients';
import ClientsFrAll from '../MyClientsFRmanager/components/Clients/ClientsFrAll';
import FrClientWork from '../FrClientWork/FrClientWork';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Window({ role }) {
    const menu = useSelector(menuSelector).menu;
    const dark = useSelector(menuSelector).dark;
    const location = useLocation();
    const path = location?.pathname;

    return (
        <div className={`${s.window} ${path == '/leader/dashboard' && s.window_dash} ${dark && s.dark}`}>
            <div className={s.container}>
                <Routes>
                <Route path="/experts/work/*" element={<FrClientWork />} />
                    <Route path="/leader/dashboard/experts/work/*" element={<FrClientWork />} />
                    <Route path="*" element={<ResultOverlay />} />
                    <Route path="/leader/dashboard/" element={<ResultOverlay />} />
                    <Route path="/leader/dashboard/sales" element={<Sales />} />
                    <Route path="/leader/dashboard/team" element={<Team />} />
                    <Route path="/leader/dashboard/skills" element={<Skills />} />
                    <Route path="/leader/dashboard/shedule" element={<Shedule role={role} />} />
                    <Route path="/leader/dashboard/metrics" element={<Metrics />} />
                    <Route path="/leader/dashboard/stock" element={<AppStock />} />
                    <Route path="/leader/dashboard/purchases" element={<AppPurchase />} />
                    <Route path="/leader/dashboard/myclients" element={<Clients />} />
                    <Route path="/leader/dashboard/clients" element={<ClientsFrAll />} />

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