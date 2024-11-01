import React from 'react'
import UserPoints from '../UserPoints/UserPoints'
import { Player } from '@lottiefiles/react-lottie-player'
import Wallet from '../../assets/wallet.json'
import './HeroBanner.scss';
import { useSelector } from 'react-redux'
import { formatCurrency } from '../../utils/stringUtl';

function HeroBanner() {
  return (
    <div className='hero-banner'>
      <NairaIcon />
      <UserPoints />
    </div>
  )
}

function NairaIcon() {
  const walletBalance = useSelector(state => state.auth.user.walletBalance ?? 0);
  return (
    <div className='hero-wallet'>
      <Player
        src={Wallet} alt='wallet'
        autoplay
        loop
        style={{ height: '49px', width: '49px' }} />
      <p>&#8358;{formatCurrency(walletBalance)}</p>
    </div>
  )
}

export default HeroBanner

