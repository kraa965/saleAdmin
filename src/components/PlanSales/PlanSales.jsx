import s from './PlanSales.module.scss';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import Loader from '../Loader/Loader';
import ExpertMonth from '../ExpertMonth/ExpertMonth';
import { useEffect, useState } from 'react';

function PlanSales({ experts, loader }) {
    const dark = useSelector(menuSelector).dark;
    const [expertsSort, setExpertSort] = useState([]);
    console.log(expertsSort)

    useEffect(() => {
        const expertsSort = experts?.sort(function (a, b) {
            if (Number(a.sale) <= Number(b.sale)) {
                return 1;
            }
            if (Number(a.sale) > Number(b.sale)) {
                return -1;
            }
        });

        setExpertSort(expertsSort)
    }, [experts, loader])

    return (
        <div className={`${s.paln} ${dark && s.paln_dark}`}>
            <p className={s.title}>Выполнение плана</p>
            <div className={s.managers}>
                {loader && <Loader />}
                {expertsSort?.map((el) => {
                    return <ExpertMonth el={el} />
                })}
            </div>
        </div>
    )
};

export default PlanSales;