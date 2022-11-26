
import React from 'react'
import { Link } from 'react-router-dom'
import './LandingInfo.scss'

function LandingInfo() {
  return (
    <div className='landingInfoContainer'>
        <div className='landingImage'>
            <img src='/images/infoImage1.png' alt='First' className='img1'/>
        </div>
        <div className='landingImage2'>
            <img src='/images/infoImage2.png' alt='second' className='img2'/>
            <div className='extraInfo'>
              <h4 className='extraInfoTitle'>Multiplayer Level Games</h4>
              <p className='extraInfoText'>Compete with your friends, foes, family and other Cashingamers and show them who is Number 1!!</p>
              <Link to='/sign-up'>
                <button className='singupLink'>Register</button>
              </Link>
            </div>
        </div>
        <div className='landingImage3'>
            <img src='/images/infoImage3.png' alt='Third' className='img3'/>
        </div>
        </div>
  )
}

export default LandingInfo