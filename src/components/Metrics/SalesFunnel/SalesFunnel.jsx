import s from './SalesFunnel.module.scss';
import { ReactComponent as IconWallet } from '../../../image/iconWallet.svg';
import { ReactComponent as IconChekk } from '../../../image/iconChekk.svg';
import { ReactComponent as IconChewron } from '../../../image/iconChewron.svg';
import GraphFunnel from '../../Graphs/GraphFunnel/GraphFunnel';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../../store/reducer/menu/selector';

function SalesFunnel() {
    const arr = [1, 2, 3, 4, 5];
    const [openList, setOpenList] = useState(false);
    const [countList, setCountList] = useState(1);
    const dark = useSelector(menuSelector).dark;
    const modalRef = useRef();
    function handleChoose(e) {
        const id = Number(e.target.id);
        setCountList(id)
        setOpenList(false)
    }

    function handleOpenList() {
        if (openList) {
            setOpenList(false)
        } else {
            setOpenList(true)
        }
    }

    return (
        <div className={`${s.funnel} ${dark && s.funnel_dark}`}>
            <h2>Воронка продаж</h2>
            <div className={`${s.container_graph} ${dark && s.container_graph_dark}`}>
                <div className={s.header}>
                    <h3>Январь</h3>
                    <div onClick={handleOpenList} className={`${s.month} ${dark && s.month_dark} ${openList && s.month_open}`}>
                        {countList === 1 && <p>текущий месяц</p>}
                        {countList === 3 && <p>3 месяца</p>}
                        {countList === 6 && <p>6 месяцев</p>}
                        {countList === 9 && <p>9 месяцев</p>}
                        {countList === 12 && <p>12 месяцев</p>}
                        <IconChewron />
                        <ul className={`${s.list} ${dark && s.list_dark} ${openList && s.list_open}`}>
                            <li className={ `${countList === 1 && !dark && s.active} ${countList === 1 && dark && s.active_dark}`} onClick={handleChoose} id='1'>текущий месяц</li>
                            <li className={ `${countList === 3 && !dark && s.active} ${countList === 3 && dark && s.active_dark}`} onClick={handleChoose} id='3'>3 месяца</li>
                            <li className={ `${countList === 6 && !dark && s.active} ${countList === 6 && dark && s.active_dark}`} onClick={handleChoose} id='6'>6 месяцев</li>
                            <li className={ `${countList === 9 && !dark && s.active} ${countList === 9 && dark && s.active_dark}`} onClick={handleChoose} id='9'>9 месяцев</li>
                            <li className={ `${countList === 12 && !dark && s.active} ${countList === 12 && dark && s.active_dark}`} onClick={handleChoose} id='12'>12 месяцев</li>
                        </ul>
                    </div>
                </div>
                <div className={s.subs}>
                    {arr.map((el) => {
                        return <div className={`${s.sub} ${dark && s.sub_dark}`}>
                            <div className={s.block_text}>
                                <p>Входы в ЛК <sup>80%</sup></p>
                                <p style={{ fontWeight: '600' }}>1000 <span>из 1200</span></p>
                            </div>

                            <div className={`${s.bage} ${dark && s.bage_dark}`}>
                                <p>19%</p>
                            </div>
                        </div>
                    })}

                </div>
                <div className={s.graph}>
                    <GraphFunnel countList={countList} />
                </div>
                <div className={s.totals}>
                    <div className={s.total}>
                        <div>
                            <IconWallet /><p>Выручка</p><sup>100%</sup>
                        </div>
                        <span>18 450 000 ₽</span>
                    </div>

                    <div className={s.total}>
                        <div>
                            <IconChekk /><p>Средний чек</p><sup>100%</sup>
                        </div>
                        <span>450 000 ₽</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesFunnel;