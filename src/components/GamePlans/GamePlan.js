import React from 'react'
import PlanCardDetails from '../PlanCardDetails/PlanCardDetails'
import './GamePlan.scss'

function GamePlan() {
  return (
    <div className='storeItems'>
        <p className='storeItemsTitle'>Buy Games</p>
        <p className='description'>You can only play 5 free games daily. Buy Games to enjoy playing without interruptions</p>
        <div className='storeCards'>
            <GamePlanCard />
        </div>
    </div>
  )
}

export default GamePlan

function GamePlanCard() {
    return(
        <div className='storeItemsContainer'>
            <PlanCardDetails />
        </div>
    )
}