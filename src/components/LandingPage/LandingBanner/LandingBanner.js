import React from 'react'
import { Link } from 'react-router-dom'
import AuthBanner from '../../AuthBanner/AuthBanner'
import './LandingBanner.scss'

function LandingBanner() {
  return (
    <div className='landingBanner'>
      <div className='bannerTextContainer'>
        <h2 className='bannerText'><span className='red'>Play and</span> compete <br/>with family and <br />friends</h2>
        <p className='bannerText2'>Show you are the true <br /> champion today!</p>
        <div className='clipContainer'>
          <div className='bubble'></div>
          <div className='clickMe'>
          <Link to='/sign-up' className='linkUp'>
            <div className='play'>
              <img src='/images/play.png' alt='play' />
            </div>
            <p className='clickText'>CLICK TO PLAY</p>
            </Link>

            </div>
        </div>
        <div className='bubble2'></div>
        <div className='bubble3'></div>
        <div className='bubble4'></div>
      </div>
        <img src='/images/landingImg.png' alt='banner' className='landingBannerImage' />
    </div>
  )
}

export default LandingBanner