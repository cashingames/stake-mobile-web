import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SelectGame from '../../components/SelectGame/SelectGame'
import { getUser } from './../Auth/AuthSlice'
import { getCommonData, getStakeWinners, } from '../../features/CommonSlice'
import './dashboard.scss'
import { formatCurrency } from '../../utils/stringUtl'


function DashBoardScreen() {

  const dispatch = useDispatch();
  const stakeWinners = useSelector(state => state.common.stakeWinners)


  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })

  useEffect(() => {
    dispatch(getUser());
    dispatch(getCommonData())
    dispatch(getStakeWinners())
    // dispatch(fetchFeatureFlags())
  }, [dispatch]);

  return (
    <>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
      <div className='dashboard-screen' style={{ backgroundImage: "url(/images/sport-background.png)" }}>
        <div className='dashboard-content'>
          <HeroBanner />
          <SelectGame />
          <WinningTable stakeWinners={stakeWinners} />
        </div>
      </div>
    </>
  )
}

const WinningTable = ({ stakeWinners }) => {
  return (

    <div className='winning-table'>
      {stakeWinners.length > 0 ?
        <div>
          {stakeWinners.map((stakeWinner, i) => <Winner key={i} stakeWinner={stakeWinner}
          />)}
          {/* <p className='view-more'>Click to view more</p> */}

        </div>
        :
        <div className='no-winners-container'>
          <p className='no-winners'>No Winners</p>
        </div>
      }
    </div>
  )
}

const Winner = ({ stakeWinner }) => {
  return (
    <div className='winner-section'>
      <div className='winner-identity'>
        <img src="/images/user-icon.png"
          alt='avatar'
          className='winner-avatar'
          onError={(e) => e.target.style.display = 'none'} />
        <p className='winner-name'>Abimbola</p>
      </div>
      <p className='winner-amount'>&#8358;{formatCurrency(stakeWinner.amount_won)}</p>
      {/* <div> */}
      <p className='winner-score'>{stakeWinner.correct_count}/10</p>
      {/* </div> */}
    </div>
  )
}

export default DashBoardScreen