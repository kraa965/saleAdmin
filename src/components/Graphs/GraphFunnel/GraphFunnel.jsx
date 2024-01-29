import s from './GraphFunnel.module.scss';
import FunnelSection from './FunnelSection';
import { useEffect, useState } from 'react';
const arr = [45, 35, 28, 12, 5]
const plan = [98, 90, 70, 50, 37]
const currentPlan = [55, 45, 35, 20, 12]

function GraphFunnel({ countList }) {



    return (
        <div className={s.grpah}>

            {countList === 1 && arr.map((el, index) => {
                return <FunnelSection
                    countList={countList}
                    index={index}
                    number={el}
                    next={arr.length === index + 1 ? el : arr[index + 1]}
                    planLine={plan[index]}
                    nextPlanLine={plan.length === index + 1 ? plan[index] : plan[index + 1]}
                    currentPlanLine={currentPlan[index]}
                    nextCurrentPlanLine={currentPlan.length === index + 1 ? currentPlan[index] : currentPlan[index + 1]}
                />

            })}

            {countList === 3 && arr.map((el, index) => {
                return <FunnelSection
                    countList={countList}
                    index={index}
                    number={el}
                    next={arr.length === index + 1 ? el : arr[index + 1]}
                    planLine={plan[index]}
                    nextPlanLine={plan.length === index + 1 ? plan[index] : plan[index + 1]}
                    currentPlanLine={currentPlan[index]}
                    nextCurrentPlanLine={currentPlan.length === index + 1 ? currentPlan[index] : currentPlan[index + 1]}
                />

            })}

            {countList === 6 && arr.map((el, index) => {
                return <FunnelSection
                    countList={countList}
                    index={index}
                    number={el}
                    next={arr.length === index + 1 ? el : arr[index + 1]}
                    planLine={plan[index]}
                    nextPlanLine={plan.length === index + 1 ? plan[index] : plan[index + 1]}
                    currentPlanLine={currentPlan[index]}
                    nextCurrentPlanLine={currentPlan.length === index + 1 ? currentPlan[index] : currentPlan[index + 1]}
                />

            })}

            {countList === 9 && arr.map((el, index) => {
                return <FunnelSection
                    countList={countList}
                    index={index}
                    number={el}
                    next={arr.length === index + 1 ? el : arr[index + 1]}
                    planLine={plan[index]}
                    nextPlanLine={plan.length === index + 1 ? plan[index] : plan[index + 1]}
                    currentPlanLine={currentPlan[index]}
                    nextCurrentPlanLine={currentPlan.length === index + 1 ? currentPlan[index] : currentPlan[index + 1]}
                />

            })}

            {countList === 12 && arr.map((el, index) => {
                return <FunnelSection
                    countList={countList}
                    index={index}
                    number={el}
                    next={arr.length === index + 1 ? el : arr[index + 1]}
                    planLine={plan[index]}
                    nextPlanLine={plan.length === index + 1 ? plan[index] : plan[index + 1]}
                    currentPlanLine={currentPlan[index]}
                    nextCurrentPlanLine={currentPlan.length === index + 1 ? currentPlan[index] : currentPlan[index + 1]}
                />

            })}

        </div>
    )
};

export default GraphFunnel;