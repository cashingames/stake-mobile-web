import React from 'react'
import './SeeRank.scss'

function SeeRank({onClick}) {
  return (
    <div onClick={onClick} className='leaderboardLink'>
        <div className='seeRank'>
            <img src='/images/leaderboard.png' alt='leaderboard' />
            <p className='rankText'>Check the leaderboard to see your rank</p>
        </div>
    </div>
  )
}

export default SeeRank