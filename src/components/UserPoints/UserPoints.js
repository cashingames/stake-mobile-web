import React from 'react'
import './UserPoints.scss'

function UserPoints() {
  return (
    <div className='userPoints'>
        <div className='pointsNumber'>
            <p>3</p>
            <p>pts</p>
            <p>TOTAL</p>
        </div>
        <div className='pointsNumber'>
            <p>0</p>
            <p>pts</p>
            <p>TODAY</p>
        </div>
        <img src='images/point-trophy.png' alt='trophy' className='trophy'/>
    </div>
  )
}

export default UserPoints