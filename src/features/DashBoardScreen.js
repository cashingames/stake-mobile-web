import React from 'react'
import AppHeader from '../components/AppHeader/AppHeader'
import HeroBanner from '../components/HeroBanner/HeroBanner'
import SelectGame from '../components/SelectGame/SelectGame'
import TopChallengers from '../components/TopChallengers/TopChallengers'
import TopPlayers from '../components/TopPlayers/TopPlayers'
function DashBoardScreen() {
  return (
    <div>
        <AppHeader />
        <HeroBanner />
        <SelectGame />
        <TopChallengers />
        <TopPlayers />
    </div>
  )
}

export default DashBoardScreen