import s from './Window.module.scss';
import Result from '../Result/Result';
import Sales from '../Sales/Sales';
import Team from '../Team/Team';
import Skills from '../Skills/Skills';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import Shedule from '../Schedule/Schedule';
import Metrics from '../Metrics/Metrics';

function Window() {
    const menu = useSelector(menuSelector).menu;
    const dark = useSelector(menuSelector).dark;

    return (
        <div className={`${s.window} ${dark && s.dark}`}>
            <div className={s.container}>
                {menu === 'result' && <Result />}
                {menu === 'sales' && <Sales />}
                {menu === 'team' && <Team />}
                {menu === 'skills' && <Skills />}
                {menu === 'shedule' && <Shedule />}
                {menu === 'metrics' && <Metrics />}
            </div>
        </div>
    )
}

export default Window;