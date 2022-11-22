import React from 'react'
import './Withdrawable.scss'

function Withdrawable() {
  return (
    <div className='withdrawable'>
        <div className='withdrawableContainer'>
            <div className='earnings'>
              <p className='earningText'>
                Withdrawable Balance
              </p>
              <p className='earningsAmount'>
              &#8358;90.00
              </p>
              <button className='earningsBtn'>Withdraw</button>
            </div>
            <div className='earnings'>
              <p className='earningText'>
                Pending Winnings
              </p>
              <p className='earningsAmount'>
              &#8358;0.00
              </p>
              <p className='note'>Note: Your pending winnings becomes withdrawable after 1hour</p>
            </div>
        </div>

    </div>
  )
}

export default Withdrawable