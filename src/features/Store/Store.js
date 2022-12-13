import React from 'react'
import GamePlan from '../../components/GamePlans/GamePlan'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import UserItems from '../../components/UserItems/UserItems'
import './Store.scss'

function Store() {
  return (
    <>
        <ScreenHeader title='Store' />
        <div className='storeContaier'>
            <UserItems />
            <GamePlan />
        </div>
    </>
  )
}

export default Store