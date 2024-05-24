import s from './LoaderSceleton.module.scss';

const LoaderSceleton = ({load}) => {
    return (
        <div className={`${s.overlay}`}>
            <div className={`${s.loader}`}></div>
        </div>
    )
};

export default LoaderSceleton;
