import React from 'react'
// import { formatCurrency } from '../../utils/stringUtl'
import './FinalScore.scss'

function FinalScore({ totalCount, correctCount, wrongCount, pointsGained }) {
  return (
    <div className='final-score-case'>
      <span className='point-text-header'>Game play statistics</span>
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
      {/* <div className='sub-containers'>
        <p className='finalScoreText'>Amount won:</p>
        <p className='score'>&#8358;{
          formatCurrency(amountWon)}</p> */}
      {/* </div>
      <div className='sub-containers'>
        <p className='finalScoreText'>Amount staked:</p>
        <p className='score'>&#8358;{
          formatCurrency(amountStaked)}</p>
      </div>
      <div className='sub-containers'>
        <p className='finalScoreText'>No of correct answers:</p>
        <p className='score'>{correctCount}</p>
      </div>
      <div className='sub-containers'>
        <p className='finalScoreText'>No of wrong answers:</p>
        <p className='score'>{wrongCount}</p>
      </div>
      <div className='score-button-container'>
      <button onClick={onPress} className='score-button'>Review stake</button> */}
      {/* </div> */}
    </div>
  )
}

export default FinalScore