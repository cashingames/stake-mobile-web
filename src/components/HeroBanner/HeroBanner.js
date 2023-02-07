import React from 'react'
import UserPoints from '../UserPoints/UserPoints'
import { Player } from '@lottiefiles/react-lottie-player'
import Wallet from '../../assets/wallet.json'
import './HeroBanner.scss';
import { useSelector } from 'react-redux'

function HeroBanner() {
  return (
    <div className='heroBanner'>
      <NairaIcon />
      <UserPoints />
    </div>
  )
}

function NairaIcon() {
  const walletBalance = useSelector(state => state.auth.user.walletBalance ?? 0);
  return (
    <div className='heroWallet'>
      <Player
        src={Wallet} alt='wallet'
        autoplay
        loop
        style={{ height: '49px', width: '49px' }} />
      <p>&#8358;{walletBalance}</p>
    </div>
  )
}

export default HeroBanner

