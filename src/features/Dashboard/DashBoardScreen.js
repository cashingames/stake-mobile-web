import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SelectGame from '../../components/SelectGame/SelectGame'
import { getUser } from './../Auth/AuthSlice'
import { getCommonData, } from '../../features/CommonSlice'
import './dashboard.scss'
import { formatCurrency } from '../../utils/stringUtl'


function DashBoardScreen() {

  const dispatch = useDispatch();

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
    // dispatch(fetchFeatureFlags())
  }, [dispatch]);

  return (
    <>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
      <div className='dashboard-screen' style={{ backgroundImage: "url(/images/sport-background.png)" }}>
        <div className='dashboard-content'>
          <HeroBanner />
          <SelectGame />
          <WinningTable />
        </div>
      </div>
    </>
  )
}

const WinningTable = () => {
  return (
    <div className='winning-table'>
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <Winner />
      <p className='view-more'>Click to view more</p>
    </div>
  )
}

const Winner = () => {
  return (
    <div className='winner-section'>
      <div className='winner-identity'>
        <img src="/images/user-icon.png"
          alt='avatar'
          className='winner-avatar'
          onError={(e) => e.target.style.display = 'none'} />
        <p className='winner-name'>Abimbola</p>
      </div>
      <p className='winner-amount'>&#8358;{formatCurrency(10000)}</p>
      {/* <div> */}
        <p className='winner-score'>10/10</p>
      {/* </div> */}
    </div>
  )
}

export default DashBoardScreen