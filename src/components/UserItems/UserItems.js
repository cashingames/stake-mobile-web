import React from 'react'
import  { Player } from '@lottiefiles/react-lottie-player'
import image1 from '../../assets/treasure-chest.json'
import './UserItems.scss'

function UserItems() {
  return (
    <div className='userItems'>
      <div className='animationContainer'>
        <Player
        src={image1} alt='wallet'
        autoplay
        loop
        className='player'
        style={{height:'100px'}}/>
        </div>
        <div className='textContainer'>
          <p className='text1'>You have 5 games left</p>
          <p className='text2'>3 Time Freeze, 6 skip</p>
        </div>
    </div>
  )
}

export default UserItems