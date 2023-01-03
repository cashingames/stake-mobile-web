import React from 'react'
import './ResultContainer.scss'

function ResultContainer({playerScore, opponentScore, status}) {
  return (
    <>
    {status &&
    <div className='resultsCase'>
        <p className='frText'>The final result is </p>
        <div className='playerResultCase'>
            <p className='playerScore'>{playerScore}</p>
            <p className='colon'>:</p>
            <p className='opponentScore'>{opponentScore}</p>
        </div>
    </div>
    }
    </>
  )
}

export default ResultContainer