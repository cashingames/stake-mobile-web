import React from 'react'
import OtherLeaders from '../OtherLeaders/OtherLeaders'
import TopPlayers from '../TopPlayers/TopPlayers'
import './GlobalLeaders.scss'

function GlobalLeaders({leaders}) {
  return (
    <div className='global'>
        <p className='global-title'> Global Leaderboard</p>
        <TopPlayers leaders={leaders}/>
        <OtherLeaders styleProp='other-leaders' userStyleProp='global-user'/>
    </div>
  )
}

export default GlobalLeaders