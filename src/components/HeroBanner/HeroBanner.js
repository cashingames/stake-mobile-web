import React from 'react'
import LiveTrivia from '../LiveTrivia/LiveTrivia'
import UserItems from '../UserItems/UserItems'
import UserPoints from '../UserPoints/UserPoints'
import  { Player } from '@lottiefiles/react-lottie-player'
import Wallet from '../../assets/wallet.json'
import './HeroBanner.scss'

function HeroBanner() {
  return (
    <div className='heroBanner'>
      <div className='heroWallet'>
      <Player
        src={Wallet} alt='wallet'
        autoplay
        loop
        style={{height:'50px'}}/>
        <p>&#8358;100.00</p>
      </div>
        <LiveTrivia />
        <UserPoints />
        <UserItems />
    </div>
  )
}

export default HeroBanner

