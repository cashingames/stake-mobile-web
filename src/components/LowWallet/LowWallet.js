import React from 'react';
import FundWalletComponent from '../FundWalletComponent/FundWalletComponent';
import BottomSheet from '../BottomSheet/BottomSheet';

import './LowWallet.scss'

function LowWallet({ open, onClose }) {

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      BSContent={<RenderLowWallet onClose={onClose} />}
    />
  )
}

function RenderLowWallet(onClose) {
  return (
    <>
      <div className='lowWallet'>
        <img src='/images/sad-face-emoji.png' alt='sad face emoji' className='emoji' />
        <p className='noGameText'>Sorry,</p>
        <p className='noGameText'>You do not have enough balance to peform this operation</p>
      </div>

      <FundWalletComponent close={onClose} />
    </>
  )
}

export default LowWallet