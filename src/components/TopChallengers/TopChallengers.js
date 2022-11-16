import { Person } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'
import './TopChallengers.scss'

function TopChallengers() {
  return (
    <div className='topChallengers'>
        <p className='topChallengeTitle'>Top Challengers</p>
        <div className='topChallengerContainer'>
            <div className='positionContainer'>
                <img src='/images/third-crown.png' alt='crown' className='crown'/>
                <Avatar>
                    <Person />
                </Avatar>
                <p className='leaderName'>Remy</p>
                <img src='/images/third-stage.png' alt='third position' className='positionImage'/>
            </div>
            <div className='positionContainer'>
                <img src='/images/first-crown.png' alt='crown' className='crown'/>
                <Avatar>
                    <Person />
                </Avatar>
                <p className='leaderName'>Remy</p>
                <img src='/images/first-stage.png' alt='first position' className='positionImage'/>
            </div>
            <div className='positionContainer'>
                <img src='/images/second-crown.png' alt='crown' className='crown'/>
                <Avatar>
                    <Person />
                </Avatar>
                <p className='leaderName'>Remy</p>
                <img src='/images/second-stage.png' alt='third position' className='positionImage' />
            </div>
        </div>
    </div>
  )
}

export default TopChallengers