import React from 'react'
import { Link } from 'react-router-dom'
import './LandingBanner.scss'

function LandingBanner() {
  return (
    <div className='landingBanner'>
      <div className='bannerTextContainer'>
        <h2 className='bannerText'><span className='red'>Think you have what it takes </span> <br />to win big? <br />Put your skills to the test <br />with our thrilling staking games</h2>
        <div className='stores-icon'>
          <a href="https://apps.apple.com/ng/app/cashingames/id6443878628">
            <img width="100px" height="30px" src="/images/apple_store_icon.png" alt="logo" className="social-img" /></a>
        </div>
        <p className='bannerText2'>Show you are the true <br /> champion today!</p>
        <div className='clipContainer'>
          <div className='bubble'></div>
          <div className='clickMe'>
            <Link to='/login' className='linkUp'>
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