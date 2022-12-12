import React from 'react';
import { formatCurrency } from '../../utils/stringUtl';
import './StakeWinnings.scss';

function StakeWinnings({amountWon}) {
  return (
    <div className='stkWinningsCase'>
        <p className='winningsText'>You have won</p>
        <p className='cash'> &#8358;{formatCurrency(amountWon)}! </p>
    </div>
  )
}

export default StakeWinnings;