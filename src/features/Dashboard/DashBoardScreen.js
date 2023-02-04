import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SelectGame from '../../components/SelectGame/SelectGame'
import { getUser } from './../Auth/AuthSlice'
import { getCommonData, } from '../../features/CommonSlice'
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
    // dispatch(fetchFeatureFlags())
  }, [dispatch]);

  return (
    <>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
      <HeroBanner />
      <SelectGame />
    </>
  )
}

export default DashBoardScreen