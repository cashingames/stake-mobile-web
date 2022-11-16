import React from 'react'
import DashBoardHeader from '../components/DashBoardHeader/DashBoardHeader'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import SelectGame from '../components/SelectGame/SelectGame'
import TopChallengers from '../components/TopChallengers/TopChallengers'
import TopPlayers from '../components/TopPlayers/TopPlayers'
function DashBoardScreen() {
  return (
    <div>
        <DashBoardHeader />
        <HeroBanner />
        <SelectGame />
        <TopChallengers />
        <TopPlayers />
    </div>
  )
}

export default DashBoardScreen