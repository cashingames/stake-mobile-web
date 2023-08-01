import React from 'react'
import './FinalScore.scss'

function FinalScore({ totalCount, correctCount, wrongCount, pointsGained }) {
  return (
    <div className='final-score-case'>
      <span className='point-text-header'>Game statistics</span>
      <div className='scoreContainer'>
        <span className='point-text'>Questions answered</span>
        <span className='point-number'>{totalCount}</span>
      </div>
      <div className='scoreContainer'>
        <span className='point-text'>Answered correctly</span>
        <span className='point-number'>{correctCount}</span>
      </div>
      <div className='scoreContainer'>
        <span className='point-text'>Answered wrongly</span>
        <span className='point-number'>{wrongCount}</span>
      </div>
      <div className='scoreContainer'>
        <span className='point-text'>Points earned</span>
        <span className='point-number'>{pointsGained}pts</span>
      </div>
    </div>
  )
}

export default FinalScore