import s from './Cells.module.scss';
import Cell from './Cell/Cell';

function Cells({ num, arr, dark }) {
    return (
        <div className={s.cells}>
            {arr.map((el) => {
                return <Cell num={num} cell={el} type={el} dark={dark}/>
            })}
        </div>
    )
};

export default Cells;