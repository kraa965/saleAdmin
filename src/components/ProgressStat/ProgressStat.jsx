import s from './ProgressStat.module.scss';
import { ReactComponent as TooltipIcon } from '../../image/tooltipIcon.svg';
import IndicatorDay from '../IndicatorDay/IndicatorDay';
import { menuSelector } from '../../store/reducer/menu/selector';
import { useSelector } from 'react-redux';
import Tooltip from '../Tooltip/Tooltip';
import { useState } from 'react';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { monthAndWeek } from '../../utils/dates';
import Loader from '../Loader/Loader';

function ProgressStat({ title, type, indicators, loader, day, activePoint }) {
    const dark = useSelector(menuSelector).dark;
    const [tooltip, setTooltip] = useState(false);
    const arrStat = Object.entries(indicators);
    const dateText = monthAndWeek(indicators?.average_accept_interval).dateStat;
    const consBp = type == 'consult' ? arrStat[2]?.[1]?.num : arrStat[3]?.[1]?.num;
    const newClient = arrStat[4]?.[1].num;

    function handleOpenTooltip() {
        setTooltip(true)
    }

    function handleCloseTooltip() {
        setTooltip(false)
    }

    return (
        <div className={`${s.progress} ${(type === 'team' || type === 'applicants') && s.progress_team} ${dark && s.progress_dark}`}>
            <div className={`${s.header} ${(type === 'team' || type === 'applicants') && s.header_team}`}>
                <p>{title}</p>
                {type !== 'team' && type !== 'applicants' &&
                    <div style={{ cursor: 'pointer', position: 'relative' }} onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip}>
                        <TooltipIcon />
                        {tooltip && <Tooltip type={type} day={day} />}
                    </div>
                }

            </div>

            {(type == 'default' || type == 'mob' || type == 'consult') &&
                <div className={s.indicators}>
                    {arrStat.slice(0, 2).map(el => {
                        return <IndicatorDay activePoint={activePoint} title={el[0]} quantity={el[1].plan === 0 ? 0 : el[1].num} total={el[0] == 'bp_view' ? Math.ceil(el[1].plan * 1.2) : el[1].plan} loader={loader} />
                    })}
                    <div className={s.consultbp}>
                        <p>Открытых бизнес-планов на консультанта</p>
                        <p>{consBp}</p>
                        {loader && <Loader />}
                    </div>


                    {type !== 'mob' && type !== 'consult' && activePoint == 0 && <div className={s.consultbp}>
                        <p>Новых клиентов</p>
                        <p>{newClient}</p>
                        {loader && <Loader />}
                    </div>
                    }
                </div>
            }

            {type === 'expert' &&
                <div className={s.indicators}>
                    <IndicatorDay title={'zoom'} activePoint={activePoint} quantity={indicators?.zoom?.num} total={indicators?.zoom?.plan} loader={loader} type={'expert'} />
                    <IndicatorDay title={'anketa'} activePoint={activePoint} quantity={indicators?.anketa?.num} total={indicators?.anketa?.plan} loader={loader} type={'expert'} />
                    <IndicatorDay title={'sales'} activePoint={activePoint} quantity={indicators?.sales?.num} total={indicators?.sales?.plan} loader={loader} type={'expert'} />
                    {activePoint == 0 && <div className={s.consultbp}>
                        <p>Новые клиенты записанные к экспертам</p>
                        <p>{indicators?.record?.num ? indicators?.record?.num : 0}</p>
                        {loader && <Loader />}
                    </div>
                    }

                </div>
            }

            {type === 'team' &&
                <div className={s.indicators}>
                    <IndicatorDay title={'consul'} quantity={indicators?.zoom?.num} total={indicators?.zoom?.plan} loader={loader} />
                    <IndicatorDay title={'expert'} quantity={indicators?.anketa?.num} total={indicators?.anketa?.plan} loader={loader} />
                    <IndicatorDay title={'intern'} quantity={indicators?.sales?.num} total={indicators?.sales?.plan} loader={loader} />
                </div>
            }

            {type === 'applicants' &&
                <div className={s.indicators}>
                    <IndicatorDay title={'reg'} quantity={indicators?.zoom?.num} total={indicators?.zoom?.plan} loader={loader} />
                    <IndicatorDay title={'first'} quantity={indicators?.anketa?.num} total={indicators?.anketa?.plan} loader={loader} />

                </div>
            }

            {type === 'expert' && !day &&
                <div className={s.expert}>
                    <div className={s.block}>
                        {loader && <Loader />}
                        <p>Средний чек</p>
                        <p>{addSpaceNumber(indicators?.average_check)} руб</p>
                    </div>
                    <div className={s.block}>
                        {loader && <Loader />}
                        <p>Время принятия решения</p>
                        <p>{dateText}</p>
                    </div>
                </div>
            }
        </div>
    )
};

export default ProgressStat;