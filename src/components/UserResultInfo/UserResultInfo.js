import React from 'react'
import './UserResultInfo.scss'

function UserResultInfo({pointsGained}) {
  return (
    <div className='infoCase'>
        <p className='resultInfoText'>You scored {pointsGained} points, Play more games to climb up the leaderboard and stand a chance to earn cash prizes every week!</p>
    </div>
  )
}

export default UserResultInfo