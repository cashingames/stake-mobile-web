import React from 'react'
import './FinalScore.scss'

function FinalScore({pointsGained}) {
  return (
    <div className='finalScoreCase'>
        <p className='finalScoreText'>Your final score point is</p>
        <p className='score'>{pointsGained}</p>
    </div>
  )
}

export default FinalScore