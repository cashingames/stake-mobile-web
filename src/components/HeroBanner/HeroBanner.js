import React from 'react'
import UserItems from '../UserItems/UserItems'
import UserPoints from '../UserPoints/UserPoints'
import  { Player } from '@lottiefiles/react-lottie-player'
import Wallet from '../../assets/wallet.json'
import './HeroBanner.scss';
import LiveTriviaCard from '../../features/LiveTrivia/LiveTriviaCard'
import { useSelector } from 'react-redux'

function HeroBanner({user, trivia}) {

  return (
    <div className='heroBanner'>
      <div className='heroWallet'>
      <Player
        src={Wallet} alt='wallet'
        autoplay
        loop
        style={{height:'50px'}}/>
        <p>&#8358;{user.walletBalance}</p>
      </div>
      <LiveTriviaCard trivia={trivia} />
        <UserPoints user={user} />
        <UserItems />
    </div>
  )
}

export default HeroBanner

