import React from 'react'
import './UserResultInfo.scss'

function UserResultInfo({pointsGained}) {
  return (
    <div className='infoCase'>
        <p className='resultInfoText'>You scored {pointsGained} points, Play again to climb up the leaderboard</p>
    </div>
  )
}

export default UserResultInfo