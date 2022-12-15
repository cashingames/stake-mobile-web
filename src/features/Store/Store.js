import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import GameBoost from '../../components/GameBoost/GameBoost'
import GamePlan from '../../components/GamePlans/GamePlan'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import UserItems from '../../components/UserItems/UserItems'
import { getUser } from '../Auth/AuthSlice'
import { getCommonData } from '../CommonSlice'
import './Store.scss'

function Store() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const plans = useSelector(state => state.common.plans);
  const boosts = useSelector(state => state.common.boosts);

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCommonData())
  }, [dispatch]);

  const navigateHandler = () => {
    navigate('/dashboard')
}

  return (
    <>
      <ScreenHeader title='Store'onClick={navigateHandler} styleProp='storeHeader'/>
      <div className='storeContainer'>
        <UserItems />
        <GamePlan user={user} plans={plans} />
        <GameBoost boosts={boosts} user ={user} />
      </div>
    </>
  )
}

export default Store