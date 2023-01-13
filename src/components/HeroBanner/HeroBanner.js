import React, { useEffect, useState } from 'react'
import UserItems from '../UserItems/UserItems'
import UserPoints from '../UserPoints/UserPoints'
import { Player } from '@lottiefiles/react-lottie-player'
import Wallet from '../../assets/wallet.json'
import './HeroBanner.scss';
import LiveTriviaCard from '../../features/LiveTrivia/LiveTriviaCard'
import { useDispatch, useSelector } from 'react-redux'
import { getLiveTriviaStatus } from '../../features/LiveTrivia/LiveTriviaSlice'
import { isTrue } from '../../utils/stringUtl'

function HeroBanner() {
  const user = useSelector(state => state.auth.user);
  const [show, setShow] = useState(false);
  const trivia = useSelector(state => state.liveTrivia.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLiveTriviaStatus())

  }, [dispatch]);

  useEffect(() => {
    setShow(isTrue(trivia));
  }, [trivia]);

  return (
    <div className='heroBanner'>
      <div className='heroWallet'>
        <Player
          src={Wallet} alt='wallet'
          autoplay
          loop
          style={{ height: '50px' }} />
        <p>&#8358;{user.walletBalance}</p>
      </div>
      {show ?
        <LiveTriviaCard trivia={trivia} />
        :
        null
      }
      <UserPoints user={user} />
      <UserItems />
    </div>
  )
}

export default HeroBanner

