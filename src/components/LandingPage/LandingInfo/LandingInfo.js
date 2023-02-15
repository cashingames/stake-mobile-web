
import React from 'react'
import { Link } from 'react-router-dom'
import './LandingInfo.scss'

function LandingInfo() {
  return (
    <div className='landingInfoContainer'>
      <div className='landingImage'>
        <div className='img1Text'>
          <p className='text'>Daily Challenge</p>
        </div>
        <div className='img1' style={{ backgroundImage: "url(/images/gameImage2.png)" }}>
          <Link to='/' className='img1Link'>Daily Challenge</Link>
          <Link to='/' className='img1Link2'>Quiz Quest</Link>
        </div>
      </div>
      <div className='landingImage2'>
        <img src='/images/infoImage2.png' alt='second' className='img2' />
        <div className='extraInfo'>
          <h4 className='extraInfoTitle'>Multiplayer Level Games</h4>
          <p className='extraInfoText'>Compete with your friends, foes, family and other Cashingamers and show them who is Number 1!!</p>
          <Link to='/sign-up'>
            <button className='singupLink'>Register</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingInfo