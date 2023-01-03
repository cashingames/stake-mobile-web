import React from 'react'
import './ResultContainer.scss'

function ResultContainer({playerScore}) {
  return (
    <>
     {playerScore.challengerStatus === "COMPLETED" &&
        playerScore.opponentStatus === "COMPLETED" &&
    <div className='resultsCase'>
        <p className='frText'>The final result is </p>
        <div className='playerResultCase'>
            <p className='playerScore'>{playerScore.challengerPoint}</p>
            <p className='colon'>:</p>
            <p className='opponentScore'>{playerScore.opponentPoint}</p>
        </div>
    </div>
    }
    </>
  )
}

export default ResultContainer