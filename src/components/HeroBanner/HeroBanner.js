import React from 'react'
import LiveTrivia from '../LiveTrivia/LiveTrivia'
import UserItems from '../UserItems/UserItems'
import UserPoints from '../UserPoints/UserPoints'
import  { Player, player } from '@lottiefiles/react-lottie-player'
import image1 from '../../assets/wallet.json'
import './HeroBanner.scss'

function HeroBanner() {
  return (
    <div className='heroBanner'>
      <div className='heroWallet'>
      <Player
        src={image1} alt='wallet'
        className="player" 
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

