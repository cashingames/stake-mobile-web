import React from 'react'
import './UserPoints.scss'

function UserPoints({user}) {
  return (
    <div className='userPoints'>
        <div className='pointsNumber'>
            <p>{user.points}</p>
            <p>pts</p>
            <p>TOTAL</p>
        </div>
        <div className='pointsNumber'>
            <p>{user.todaysPoints}</p>
            <p>pts</p>
            <p>TODAY</p>
        </div>
        <img src='images/point-trophy.png' alt='trophy' className='trophy'/>
    </div>
  )
}

export default UserPoints