import React from 'react'
import { formatCurrency } from '../../../utils/stringUtl'
import './Withdrawable.scss'

function Withdrawable({bookBalance,withdrawableBalance,onPress,withdraw}) {
  return (
    <div className='withdrawable'>
        <div className='withdrawableContainer'>
            <div className='earnings'>
              <p className='earningText'>
                Withdrawable Balance
              </p>
              <p className='earningsAmount'>
              &#8358;{formatCurrency(withdrawableBalance)}
              </p>
              <button className='earningsBtn' onClick={onPress} disabled={withdraw}>Withdraw</button>
            </div>
            <div className='earnings'>
              <p className='earningText'>
                Pending Winnings
              </p>
              <p className='earningsAmount'>
              &#8358;{formatCurrency(bookBalance)}
              </p>
              <p className='note'>Note: Your pending winnings becomes withdrawable after 1hour</p>
            </div>
        </div>

    </div>
  )
}

export default Withdrawable