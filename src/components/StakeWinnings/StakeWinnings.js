import React from 'react';
import { formatCurrency } from '../../utils/stringUtl';
import './StakeWinnings.scss';
import { useSelector } from 'react-redux';

function StakeWinnings({ amountWon }) {
  const practiceMode = useSelector(state => state.game.practiceMode);
  const cashMode = useSelector(state => state.game.cashMode);
  return (
    <div className='stkWinningsCase'>
      {cashMode &&
        <p className='winningsText'>Winnings</p>
      }
      {practiceMode &&
        <p className='winningsText'>Demo amount won</p>
      }
      <p className='cash'>NGN {formatCurrency(amountWon)}</p>
    </div>
  )
}

export default StakeWinnings;