import s from './Window.module.scss';
import Result from '../Result/Result';
import Sales from '../Sales/Sales';
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
        </div>
    )
}

export default Window;