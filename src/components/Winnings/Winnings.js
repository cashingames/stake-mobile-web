import React from 'react';
import StakeWinnings from '../StakeWinnings/StakeWinnings';
import './Winnings.scss'
import { IoChevronForwardOutline } from 'react-icons/io5';

function Winnings({ amountWon, onPress, walletSource }) {
  return (
    <div className='winningCase'>
      <StakeWinnings amountWon={amountWon} />
      {walletSource === 'deposit_balance' &&
        <button onClick={onPress} className='reviewStakeContainer'>
          <span className='reviewStake'>Review Stake</span>
          <IoChevronForwardOutline size={20} color='#E05C28' className='icon' />
        </button>
      }
    </div>
  )
}

export default Winnings