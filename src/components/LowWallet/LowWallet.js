import React from 'react';
import FundWalletComponent from '../FundWalletComponent/FundWalletComponent';
import { IoCloseOutline } from 'react-icons/io5';

import './LowWallet.scss'

function LowWallet({ open, onClose }) {

  return (

    <RenderLowWallet onClose={onClose} />
  )
}

function RenderLowWallet({ onClose }) {
  return (
    <>
      <div className='lowWallet'>
      <IoCloseOutline size={20} color='#292D32' onClick={onClose} style={{cursor:'pointer'}}/>
        <img src='/images/sad-face-emoji.png' alt='sad face emoji' className='emoji' />
        <p className='noGameText'>Sorry,</p>
        <p className='noGameText'>You do not have enough balance to peform this operation</p>
      </div>

      <FundWalletComponent close={onClose} />
    </>
  )
}

export default LowWallet