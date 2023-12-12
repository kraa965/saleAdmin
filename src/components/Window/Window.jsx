import s from './Window.module.scss';
import Result from '../Result/Result';
import Sales from '../Sales/Sales';
import Team from '../Team/Team';
import Skills from '../Skills/Skills';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';

function Window() {
    const menu = useSelector(menuSelector).menu;
    const dark = useSelector(menuSelector).dark;
    console.log(menu)
    return (
        <div className={`${s.window} ${dark && s.dark}`}>
            {menu === 'result' && <Result/>}
            {menu === 'sales' && <Sales/>}
            {menu === 'team' && <Team/>}
            {menu === 'skills' && <Skills/>}
        </div>
    )
}

export default Window;