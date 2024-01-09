import s from './AddCard.module.scss';
import { ReactComponent as IconClose } from '../../image/iconCloseModal.svg';
import { ReactComponent as Patch } from '../../image/patch.svg';
import PersonalData from '../PersonalData/PersonalData';
function AddCard({setAddWindow, setAnim}) {

    function handleCloseWindow() {
        setAnim(false)
        setTimeout(() => {
            setAddWindow(false)
        }, 200)
        
    }
    return(
        <div className={s.add}>
            <div className={s.header}>
                <div className={s.conteiner_header}>
                    <p className={s.title}>Новый сотрудник</p>
                    <div onClick={handleCloseWindow} className={s.button_close}><IconClose/></div>
                </div>
                <div className={s.progress}>
                    <div className={`${s.path} ${s.path_active}`}>
                        <p>Личные данные</p>
                        <Patch/>
                    </div>
                    <div className={`${s.path}`}>
                        <p>Условия работы</p>
                        <Patch/>
                    </div>
                    <div className={`${s.path}`}>
                        <p>Фотография</p>
                        <Patch/>
                    </div>
                </div>
            </div>

            <PersonalData/>  

        </div>
    )
};

export default AddCard;