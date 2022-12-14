import React from 'react'
import { Link } from 'react-router-dom'
import './GameStorePurchaseFailed.scss'


function GameStorePurchaseFailed() {
  return (
    <div className='mainContainer'>
    <div className='boostPurchaseContainer'>
        <div className='failedImg'>
            <img src='/images/failure.png' alt='Failed' />
        </div>
            <p className='paymentHeader'>Purchased Failed</p>
            <p className='message'>Sorry, purchase failed. please try again</p>
    </div>
    <div className='failedCongratsBtn'>
        <Link to='/store' className='actionBtn'>Store</Link>
        <Link to='/' className='actionBtn'>Home</Link>
    </div>
</div>
  )
}

export default GameStorePurchaseFailed