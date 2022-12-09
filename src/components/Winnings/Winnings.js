import React from 'react';
import StakeWinnings from '../StakeWinnings/StakeWinnings';
import './Winnings.scss'

function Winnings({amountWon, onPress}) {
  return (
    <div className='winningCase'>
        <StakeWinnings amountWon={amountWon} />
        <button onClick={onPress} className='reviewStake'>Review Stake</button>
    </div>
  )
}

export default Winnings