import s from './CityPartners.module.scss';
import { useSelector } from 'react-redux';
import { useState } from 'react';
//selector
import { selectorPartners } from '../../store/reducer/Partners/selector';
import { selectorApp } from '../../store/reducer/App/selector';
//components
import OfficeItem from './OfficeItem/OfficeItem';
import CompanyItem from './CompanyItem/CompanyItem';
import OfficeItemSceleton from './Skeletons/OfficeItemSceleton/OfficeItemSceleton';
import CompanyItemSceleton from './Skeletons/CompanyItemSceleton/CompanyItemSceleton';

const CityPartners = () => {
    const loadPartners = useSelector(selectorApp)?.loadPartners;
    const offices = useSelector(selectorPartners).offices;
    const companies = Object.values(useSelector(selectorPartners)?.companies);
    const [openOffice, setOpenOffice] = useState(0);
    const [openCompany, setOpenCompany] = useState(0);

    console.log(loadPartners)
    return (
        <div style={{height: loadPartners ? '438px' : ''}} className={s.container}>
            <div className={s.block}>
                <h2 className={s.title}>Партнерские офисы <sup>{offices.length}</sup></h2>
                <ul className={s.list}>
                    {offices.map((el) => {
                        return el.office_adress !== '' && <OfficeItem key={el.id} office={el} openOffice={openOffice} setOpenOffice={setOpenOffice} />
                    })
                    }
                </ul>

                <ul className={`${s.list} ${s.list_sceleton} ${!loadPartners && s.list_sceleton_hiden}`}>
                    {[...Array(4)].map((el, i) => {
                        return <OfficeItemSceleton key={i} />
                    })}
                </ul>
            </div>
            <div className={s.block}>
                <h2 className={s.title}>Заказчики <sup>{companies.length}</sup></h2>
                <ul className={s.list}>
                    {companies?.map((el) => {
                        return <CompanyItem key={el.id} company={el} openCompany={openCompany} setOpenCompany={setOpenCompany} />
                    })
                    }
                </ul>

                <ul className={`${s.list} ${s.list_sceleton} ${!loadPartners && s.list_sceleton_hiden}`}>
                    {[...Array(4)].map((el, i) => {
                        return <CompanyItemSceleton key={i} />
                    })}
                </ul>
            </div>
        </div>
    )
};

export default CityPartners;