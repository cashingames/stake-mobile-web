import React from 'react';
import { formatCurrency } from '../../utils/stringUtl';
import './StakeWinnings.scss';

function StakeWinnings({amountWon}) {
  return (
    <div className='stkWinningsCase'>
        <p className='winningsText'>Winnings</p>
        <p className='cash'>NGN {formatCurrency(amountWon)}</p>
    </div>
  )
}

export default StakeWinnings;