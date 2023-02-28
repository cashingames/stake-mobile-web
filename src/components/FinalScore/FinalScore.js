import React from 'react'
// import { formatCurrency } from '../../utils/stringUtl'
import './FinalScore.scss'

function FinalScore({ correctCount, amountWon, amountStaked,wrongCount,onPress,pointsGained }) {
  return (
    <div className='final-score-case'>
      <p className='point-text'>Points earned</p>
      <p className='point-number'>{pointsGained} pts</p>
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