import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SelectGame from '../../components/SelectGame/SelectGame'
import { getUser } from './../Auth/AuthSlice'
import { fetchFeatureFlags, getCommonData } from '../../features/CommonSlice'
// import { formatCurrency } from '../../utils/stringUtl'
// import { Spinner } from 'react-activity'
import WinnersScroller from './WinnersScroller'

import './dashboard.scss'


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
    dispatch(fetchFeatureFlags())
  }, [dispatch]);

  return (
    <>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
      <div className='dashboard-screen' style={{ backgroundImage: "url(/images/sport-background.png)" }}>
        <div className='dashboard-content'>
          <HeroBanner />
          <SelectGame />
          <WinnersScroller />
        </div>
      </div>
    </>
  )
}

export default DashBoardScreen