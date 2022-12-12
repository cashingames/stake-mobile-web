import React from 'react';
import FundWalletComponent from '../FundWalletComponent/FundWalletComponent';
import './LowWallet.scss'

function LowWallet({close}) {
  return (
    <>
    <div className='lowWallet'>
        <img src='/images/sad-face-emoji.png' alt='sad face emoji' className='emoji'/>
        <p className='noGameText'>Sorry,</p>
        <p className='noGameText'>You do not have enough balance to stake this Amount</p>
    </div>
    <FundWalletComponent close={close} />
    </>
  )
}

export default LowWallet