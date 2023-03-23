import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import HeroBanner from '../../components/HeroBanner/HeroBanner'
import SelectGame from '../../components/SelectGame/SelectGame';

import WinnersScroller from './WinnersScroller'

import './dashboard.scss'

function DashBoardScreen() {

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

export default DashBoardScreen;