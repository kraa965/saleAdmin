import { useRef, useState, useEffect } from 'react';
import s from './Client.module.scss';
import DatePicker from '../../utils/DatePicker/DatePicker';
import TooltipBar from '../TooltipBar/TooltipBar';
import { ReactComponent as IconCloseModal } from '../../image/iconCloseModal.svg';
import { ReactComponent as IconCalendarSmall } from '../../image/iconCalendarSmall.svg';
import { useSelector } from 'react-redux';
import { menuSelector } from '../../store/reducer/menu/selector';
import { addSpaceNumber } from '../../utils/addSpaceNumber';
import { setDayOfWeek, monthAndWeek, setDateDay } from '../../utils/dates';
import { postSum, postStudy, postSumRecived } from '../../Api/Api';
import Bar from './Bar';

function Client({ progress, name, surname, sum, city, source, expert, interne, dateStudy, acceptDate, id, setUpdate, crmLogin }) {
    const [step, setStep] = useState(1);
    const [modalConfirmSum, setModalConfirmSum] = useState(false);
    const [modalReceivedSum, setModalReceivedSum] = useState(false);
    const [anim, setAnim] = useState(false);
    const [sumValue, setSumValue] = useState(sum || 0);
    const [sumError, setSumError] = useState('');
    const [modalStudy, setModalStudy] = useState(false);
    const [studyErr, setStudyErr] = useState(false);
    const [recivedErr, setRecivedErr] = useState(false);
    const [queryDate, setQueryDate] = useState(setDateDay(0) || '');
    const [loader, setLoader] = useState(false);
    const [buttonStudyHiden, setButtonStudyHiden] = useState(false);
    const dark = useSelector(menuSelector).dark;
    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    const dateText = monthAndWeek(acceptDate).dateClient;
    const role = document.getElementById('root_leader').getAttribute('role');
   
    useEffect(() => {
        if(crmLogin) {
            setButtonStudyHiden(true)
        } else {
            setButtonStudyHiden(false)
        }
    }, [crmLogin])

    useEffect(() => {
        if (progress?.[0].status == 'cancel') {
            setStep(0);
            return
        }
        if (progress?.[0].status == 'done' && progress?.[1].status !== 'done') {
            setStep(1);
            return
        }

        if (progress?.[1].status == 'done' && progress?.[2].status !== 'done' && progress?.[3].status !== 'done') {
            setStep(2);
            return
        }


        if (progress?.[2].status == 'done' && progress?.[3].status !== 'done') {
            setStep(3);
            return
        }

        if (progress?.[3].status == 'done' && progress?.[4].status !== 'done') {
            setStep(4);
            return
        }

        if (progress?.[4].status === 'done') {
            setStep(5);
            return
        }

    }, [progress])

    function handleСonfirmButton() {
        if (modalConfirmSum) {
            setAnim(false);
            setTimeout(() => {
                setModalConfirmSum(false);
                setSumValue(sum);
                setSumError('');
                setQueryDate(setDateDay(0));
            }, 200)
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

    function handleSumValue(e) {
        const value = e.target.value;
        setSumError('');
        setSumValue(value);
    }

    function handleConfirmSum(e) {
        if ((e.type == 'click' || e.keyCode == 13) && sumValue > sum) {
            setSumError(`Сумма не может быть больше ${addSpaceNumber(sum)}`);
            return
        }
        if ((e.type == 'click' || e.keyCode == 13) && sumValue <= sum) {
            setLoader(true)
            postSum(id, sumValue)
                .then((res) => {
                    setStep(3);
                    setUpdate(prevState => prevState + 1);
                    setTimeout(() => {
                        setAnim(false);
                    }, 300)

                    setTimeout(() => {
                        setModalConfirmSum(false);
                        setLoader(false)
                    }, 500);
                })
                .catch(err => { setSumError('Ошибка при подтверждении суммы, попробуй еще раз') })
            return
        }
    }

    function handleStudy() {
        setStudyErr(false);
        setLoader(true);
        postStudy(id)
            .then((res) => {
                setUpdate(prevState => prevState + 1);
                setButtonStudyHiden(true);
                setTimeout(() => {
                    setAnim(false);
                }, 300)

                setTimeout(() => {
                    setLoader(false)
                    handleModalStudy();
                }, 500);
            })
            .catch(err => setStudyErr(true))
    }

    function handleModalStudy() {
        if (modalStudy) {
            setAnim(false)
            setTimeout(() => {
                setModalStudy(false)
            }, 200)
        } else {
            setModalStudy(true);
            setTimeout(() => {
                setAnim(true)
            })
        }
    }

    function handleSumRecived(e) {
        setLoader(true)
        postSumRecived(id, queryDate)
            .then((res) => {
                setUpdate(prevState => prevState + 1);
                setStep(5);
                setTimeout(() => {
                    setAnim(false);
                }, 300)

                setTimeout(() => {
                    setLoader(false);
                    setModalReceivedSum(false);
                    setModalConfirmSum(false);
                    setQueryDate(setDateDay(0));
                }, 500);
            })
            .catch(err => setRecivedErr(true));

    }
    //закрытия модалки при клике вне элемента
    function closeModal(e) {
        if (modalRef?.current && !modalRef?.current?.contains(e.target) && !buttonRef?.current?.contains(e.target) && !e.target.closest('.ant-picker-dropdown')) {
            setAnim(false);
            setTimeout(() => {
                setModalConfirmSum(false);
                setModalReceivedSum(false);
                setModalStudy(false);
                setSumValue(sum);
                setSumError('');
                setQueryDate(setDateDay(0));
            }, 200)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', closeModal);
        return () => document.removeEventListener('mousedown', closeModal);
    }, []);

    return (
        <div className={`${s.client} ${dark && s.client_dark}`}>
            {(role === 'leader' || role === 'frmanager') ?
                <a style={{ height: '100%' }} href={`https://lk.skilla.ru/frmanager/req/?id=${id}`}>
                    <div className={s.name}>
                        <p className={s.text}>{name} {surname}</p>
                        <p className={s.sub}>{city}</p>
                    </div>
                </a>
                :
                <div className={s.name}>
                    <p className={s.text}>{name} {surname}</p>
                    <p className={s.sub}>{city}</p>
                </div>
            }


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


            <div className={s.container_big}>
                <div className={s.progress}>
                    <div className={s.container}>
                        {progress?.map((el, index) => {
                            return <Bar key={index + 1} id={index + 1} el={el} dark={dark} step={step} />
                        })}

                    </div>
                </div>

                <div className={s.pay}>
                    {step === 2  && role === 'frmanager' && <button ref={buttonRef} onClick={handleСonfirmButton} className={`${s.button} ${dark && s.button_dark}`}>Подтвердить сумму</button>}
                    {step === 3 && !buttonStudyHiden && role === 'frmanager' && <button onClick={handleModalStudy} className={`${s.button} ${dark && s.button_dark}`}>Прибыл на обучение</button>}
                    {(step == 3 || step == 4) && progress?.[4].status !== 'done' && role === 'frmanager' && <button ref={buttonRef} onClick={handleReceivedButton} className={`${s.button} ${dark && s.button_dark}`}>Средства поступили</button>}
                    {step == 5 && <p className={s.sub}>{dateStudy && setDayOfWeek(dateStudy).day} {dateStudy && setDayOfWeek(dateStudy).fMonth2}</p>}
                </div>
            </div>


            {modalConfirmSum &&
                <div onKeyDown={handleConfirmSum} className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                    <div ref={modalRef} className={`${s.confirm} ${dark && s.confirm_dark}`}>
                        <div className={s.button_close}>
                            <p className={s.title}>Подтверждение суммы</p>
                            <IconCloseModal onClick={handleСonfirmButton} />
                        </div>
                        <p className={`${s.confirm_sub} ${dark && s.confirm_sub_dark}`}>Сумма оплаты</p>
                        <div className={`${s.block} ${dark && s.block_dark} ${sumError !== '' && s.block_err} `}>
                            <input type='number' onChange={handleSumValue} value={sumValue || ''} className={s.input}></input>
                            <p>руб</p>
                            <span>{sumError}</span>
                        </div>

                        <button onClick={handleConfirmSum} className={s.button_confirm}>{loader ? 'Подтверждаем...' : 'Подтвердить'}</button>
                    </div>
                </div>
            }

            {modalStudy &&
                <div className={`${s.modal} ${anim && s.modal_anim} ${dark && s.modal_dark}`}>
                    <div ref={modalRef} className={`${s.confirm} ${dark && s.confirm_dark}`}>
                        <div className={s.button_close}>
                            <p className={s.title}>Подтвердить прибытие на обучение</p>
                            <IconCloseModal onClick={handleModalStudy} />
                        </div>
                        <div className={s.buttons}>
                            <button onClick={handleStudy} className={s.button_confirm}>{loader ? 'Подтверждаем...' : 'Подтвердить'}</button>
                            <button onClick={handleModalStudy} className={s.button_cancle}>Отмена</button>
                        </div>
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
                        <button onClick={handleSumRecived} className={s.button_confirm}>{loader ? 'Подтверждаем...' : 'Подтвердить'}</button>
                    </div>
                </div>
            }
        </div>
    )
};

export default Client;