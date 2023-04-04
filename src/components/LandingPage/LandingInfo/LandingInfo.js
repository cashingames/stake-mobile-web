
import React from 'react'
import { Link } from 'react-router-dom'
import './LandingInfo.scss'

function LandingInfo() {
  return (
    <div className='landingInfoContainer'>
      <div className='landingImage'>
        <div className='img1Text'>
          <p className='text'>Daily Staking</p>
        </div>
        <div className='img1' style={{ backgroundImage: "url(/images/gameImage2.png)" }}>
          <Link to='/' className='img1Link'>Daily Staking</Link>
          <Link to='/' className='img1Link2'>Trivia Quest</Link>
        </div>
      </div>
      <div className='landingImage2'>
        <img src='/images/infoImage2.png' alt='second' className='img2' />
        <div className='extraInfo'>
          <h4 className='extraInfoTitle'>Multiplayer Level Games</h4>
          <p className='extraInfoText'>Compete and experience the thrill of betting on your knowledge of your favorite football team, Music, or General knowledge!</p>
          <Link to='/sign-up'>
            <button className='singupLink'>Register</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingInfo