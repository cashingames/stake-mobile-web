import React from 'react'
import './WithdrawnBalance.scss'

function WithdrawnBalance() {
  return (
    <div className='withdrawn'>
        <img src='/images/thumbs_up.png' alt='thumbs up' className='withdrawnImg' />
        <p className='successText'>Congratulations</p>
        <p className='successText'>Your withdrawal request is being processed to your bank account</p>
    </div>
  )
}

export default WithdrawnBalance