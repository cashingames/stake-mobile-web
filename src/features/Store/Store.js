import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GameBoost from '../../components/GameBoost/GameBoost'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import './Store.scss'

function Store() {

  const navigate = useNavigate()

  const user = useSelector(state => state.auth.user)
  const boosts = useSelector(state => state.common.boosts);

  const navigateHandler = () => {
    navigate('/dashboard')
  }

  return (
    <>
      <ScreenHeader title='Store' onClick={navigateHandler} styleProp='store-header' iconProp='back' />
      <div className='storeContainer' style={
        { backgroundImage: "url(/images/game-play-background.png)" }
      }>
        <GameBoost boosts={boosts} user={user} />
      </div>
    </>
  )
}

export default Store