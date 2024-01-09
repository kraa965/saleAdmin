import { useRef, useState, useEffect } from 'react';
import s from './Client.module.scss';
import DatePicker from '../../utils/DatePicker/DatePicker';
import TooltipBar from '../TooltipBar/TooltipBar';
import { ReactComponent as IconCloseModal } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconCalendarSmall } from '../../image/iconCalendarSmall.svg';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { setDayOfWeek } from '../../utils/dates';
import { monthAndWeek } from '../../utils/dates';

function Client({ step, stepFail, name, surname, sum, city, source, expert, interne, dateStudy, acceptDate, id }) {
    const [tooltip1, setTooltip1] = useState(false);
    const [tooltipFail1, setTooltipFail1] = useState(false);
    const [tooltip2, setTooltip2] = useState(false);
    const [tooltipFail2, setTooltipFail2] = useState(false);
    const [tooltip3, setTooltip3] = useState(false);
    const [tooltip4, setTooltip4] = useState(false);
    const [tooltip5, setTooltip5] = useState(false);
    const [modalConfirmSum, setModalConfirmSum] = useState(false);
    const [modalReceivedSum, setModalReceivedSum] = useState(false);
    const [anim, setAnim] = useState(false);
    const [queryDate, setQueryDate] = useState('');

    const dark = useSelector(menuSelector).dark;
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    const dateText = monthAndWeek(acceptDate).dateClient;

    function handleOpenTooltip(e) {
        const id = e.target.id;
        if (id == '1' && stepFail !== 1) {
            setTooltip1(true);
            return
        }

        if (id == '1' && stepFail === 1) {
            setTooltipFail1(true);
            return
        }

        if (id == '2' && stepFail !== 2) {
            setTooltip2(true);
            return
        }

        if (id == '2' && stepFail === 2) {
            setTooltipFail2(true);
            return
        }

        if (id == '3') {
            setTooltip3(true);
            return
        }

        if (id == '4') {
            setTooltip4(true);
            return
        }

        if (id == '5') {
            setTooltip5(true);
            return
        }

    }

    function handleCloseTooltip(e) {
        const id = e.target.id;
        if (id == '1' && stepFail !== 1) {
            setTooltip1(false);
            return
        }

        if (id == '1' && stepFail === 1) {
            setTooltipFail1(false);
            return
        }

        if (id == '2' && stepFail !== 2) {
            setTooltip2(false);
            return
        }

        if (id == '2' && stepFail === 2) {
            setTooltipFail2(false);
            return
        }

        if (id == '3') {
            setTooltip3(false);
            return
        }

        if (id == '4') {
            setTooltip4(false);
            return
        }

        if (id == '5') {
            setTooltip5(false);
            return
        }
    }

    function handleСonfirmButton() {
        if (modalConfirmSum) {
            setModalConfirmSum(false);
            setAnim(false)
        } else {
            setModalConfirmSum(true);
            setTimeout(() => { setAnim(true) })
        }
    }

    function handleReceivedButton() {
        if (modalReceivedSum) {
            setModalReceivedSum(false)
            setAnim(false)
        } else {
            setModalReceivedSum(true)
            setTimeout(() => { setAnim(true) })
        }
    }
    //закрытия модалки при клике вне элемента
    function closeModal(e) {
        if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
            setModalConfirmSum(false);
            setModalReceivedSum(false);
            setAnim(false);
        }
    }

    useEffect(() => {
        document.addEventListener('click', closeModal);

        return () => document.removeEventListener('click', closeModal);
    }, []);

    return (
        <div className={`${s.client} ${dark && s.client_dark}`}>
            <a href={`https://lk.skilla.ru/frmanager/req/?id=${id}`}>
                <div className={s.name}>
                    <p className={s.text}>{name} {surname}</p>
                    <p className={s.sub}>{city}</p>
                </div>
            </a>


            <div className={s.sum}>
                <p className={s.text}>{addSpaceNumber(sum)}</p>
            </div>

          

            <div className={s.source}>
                <p className={s.text}>{source}</p>
                <p className={s.text_date}>{dateText}</p>
            </div>

            <div className={s.managers}>
                <p className={s.text}>{expert.name} {expert.surname}</p>
                <p className={s.sub}>{interne.name} {interne.surname}</p>
            </div>

            {/* <div className={s.study}>
                <p className={s.text}>{dateStudy && setDayOfWeek(dateStudy).day} {dateStudy && setDayOfWeek(dateStudy).fMonth2}</p>
            </div> */}

            <div className={s.progress}>
                <div className={s.container}>
                    {[...Array(5)].map((el, index) => {
                        return <div id={`${index + 1}`} /* onMouseEnter={handleOpenTooltip} onMouseLeave={handleCloseTooltip} */
                            className={`${s.bar} ${dark && s.bar_dark} ${index + 1 <= step && s.green} ${index + 1 === stepFail && s.red}`}
                        >
                        </div>
                    })}
                   
                </div>
                <p className={s.text}>{dateStudy && setDayOfWeek(dateStudy).day} {dateStudy && setDayOfWeek(dateStudy).fMonth2}</p>
                {tooltip1 && <TooltipBar type={'1'} />}
                {tooltip2 && <TooltipBar type={'2'} />}
                {tooltip3 && <TooltipBar type={'3'} />}
                {tooltip4 && <TooltipBar type={'4'} sign={1} />}
                {tooltip5 && <TooltipBar type={'5'} />}
                {tooltipFail1 && <TooltipBar type={'1fail'} />}
                {tooltipFail2 && <TooltipBar type={'2fail'} />}
            </div>

            {/* <div className={s.pay}>
                {step === 2 && stepFail !== 2 && <button ref={buttonRef} onClick={handleСonfirmButton} className={`${s.button} ${dark && s.button_dark}`}>Подтвердить сумму</button>}
                {step === 3 && <button className={`${s.button} ${dark && s.button_dark}`}>Прибыл на обучение</button>}
                {step === 4 && <button ref={buttonRef} onClick={handleReceivedButton} className={`${s.button} ${dark && s.button_dark}`}>Средства поступили</button>}
                <p className={s.text}>{dateStudy && setDayOfWeek(dateStudy).day} {dateStudy && setDayOfWeek(dateStudy).fMonth2}</p>
            </div> */}

            {modalConfirmSum &&
                <div className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                    <div ref={modalRef} className={`${s.confirm} ${dark && s.confirm_dark}`}>
                        <div className={s.button_close}>
                            <p className={s.title}>Подтверждение суммы</p>
                            <IconCloseModal onClick={handleСonfirmButton} />
                        </div>
                        <p className={`${s.confirm_sub} ${dark && s.confirm_sub_dark}`}>Сумма оплаты</p>
                        <div className={`${s.block} ${dark && s.block_dark}`}>
                            <input className={s.input}></input>
                            <p>руб</p>
                        </div>
                        <button className={s.button_confirm}>Подтвердить</button>
                    </div>
                </div>
            }

            {modalReceivedSum &&
                <div className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                    <div ref={modalRef} className={`${s.confirm} ${dark && s.confirm_dark}`}>
                        <div className={s.button_close}>
                            <p className={s.title}>Подтверждение поступления средств</p>
                            <IconCloseModal onClick={handleReceivedButton} />
                        </div>
                        <p className={s.confirm_sub}>Дата</p>
                        <div className={s.data}>
                            <DatePicker dark={dark} queryDate={queryDate} setQueryDate={setQueryDate} />
                        </div>
                        <button className={s.button_confirm}>Подтвердить</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default Client;