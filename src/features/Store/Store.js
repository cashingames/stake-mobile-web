import React from 'react'
import GameBoost from '../../components/GameBoost/GameBoost'
import GamePlan from '../../components/GamePlans/GamePlan'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import UserItems from '../../components/UserItems/UserItems'
import './Store.scss'

function Store() {
  return (
    <>
        <ScreenHeader title='Store' />
        <div className='storeContainer'>
            <UserItems />
            <GamePlan />
            <GameBoost />
        </div>
    </>
  )
}

export default Store