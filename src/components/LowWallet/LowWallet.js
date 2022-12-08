import React from 'react';
import FundWallet from '../Wallet/FundWallet/FundWallet';
import './LowWallet.scss'

function LowWallet() {
  return (
    <>
    <div className='lowWallet'>
        <img src='/images/sad-face-emoji.png' alt='sad face emoji' className='emoji'/>
        <p className='noGameText'>Sorry,</p>
        <p className='noGameText'>You do not have enough balance to stake this Amount</p>
    </div>
    <FundWallet />
    </>
  )
}

export default LowWallet