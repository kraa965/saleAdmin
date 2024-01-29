import s from './SheduleWork.module.scss';
import { ReactComponent as IconEmployee } from '../../image/iconEmployee.svg';
import { useEffect, useRef, useState } from 'react';
import Cells from '../Cells/Cells';
import avatarDef from '../../image/avatar.png';
const arr = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
const employes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]


function SheduleWork({dark}) {
    const graphRef = useRef();
    const headerRef = useRef();
    const windowRef = useRef();
  
    useEffect(() => {
        
        graphRef.current && graphRef.current.addEventListener('wheel', function(event) {
            event.preventDefault()
            const delta = event.wheelDelta;
            windowRef.current.scrollLeft +=  delta > 0 ? 234 : -234;
            headerRef.current.scrollLeft +=  delta > 0 ? 234 : -234;
           
           
        })
          
    },[graphRef])
       
    return (
        <div className={`${s.workshedule} ${dark && s.workshedule_dark}`}>

            <div className={s.employes}>
                <div className={`${s.header_employes} ${dark && s.header_employes_dark}`}>
                    <p className={`${s.text_sub} ${dark && s.text_sub_dark}`}>Сотрудник</p>
                </div>
                <div className={`${s.list} ${dark && s.list_dark}`}>
                    {employes.map((el) => {
                        return <div className={s.employee}>
                                   <div className={s.avatar}>
                                        <img src={avatarDef}></img>
                                   </div>
                                   <div className={s.block_text}>
                                    <p>Мария Царук <sup>lvl {el}</sup></p>
                                    <span>5/2</span>
                                   </div>
                               </div>
                    })}
                </div>
            </div>

            <div ref={graphRef} className={s.graph}>
                <div ref={headerRef} className={`${s.header_graph} ${dark && s.header_graph_dark}`}>
                    {arr.map((el) => {
                        return <div className={s.sub}>
                            <p className={`${s.text_sub} ${dark && s.text_sub_dark}`}>
                                {el === 1 && 'Понедельник'}
                                {el === 2 && 'Вторник'}
                                {el === 3 && 'Среда'}
                                {el === 4 && 'Четверг'}
                                {el === 5 && 'Пятница'}
                                {el === 6 && 'Суббота'}
                                {el === 7 && 'Воскресение'}

                                <sup>{el}</sup></p>
                            <div><IconEmployee /><p className={`${s.text_sub} ${dark && s.text_sub_dark}`}>99</p></div>
                        </div>
                    })}
                </div>

                <div ref={windowRef} className={`${s.window} ${dark && s.window_dark}`}>
                    {employes.map((el) => {
                        return <Cells num={el} arr={arr} dark={dark}/>
                    })}
                </div>

            </div>
        </div>
    )
};

export default SheduleWork;