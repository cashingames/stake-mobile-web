import React from 'react'
import { Link } from 'react-router-dom'
import './LandingBanner.scss'

function LandingBanner() {
  return (
    <div className='landingBanner'>
      <div className='bannerTextContainer'>
        <h2 className='bannerText'><span className='red'>Play trivia while </span> competing <br />with family and <br />friends</h2>
        <p className='bannerText2'>Show you are the true <br /> champion today!</p>

        {/* <div className='appImgCase'>
          <a href='https://apps.apple.com/ng/app/cashingames/id6443878628'><img src='/images/apple.png' alt='apple playstore' className='appImg' /></a>
          <a href='https://play.google.com/store/apps/details?id=com.cashingames.cashingames&pli=1'><img src='/images/google.png' alt='google playstore' className='appImg' /></a>
        </div> */}
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