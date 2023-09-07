import React from 'react'
import './LandingBanner.scss'

function LandingBanner() {
  return (
    <div className='landingBanner'>
      <div className='banner__container-img'>
        <img src='/images/banner-img.png' alt='banner' className='banner__image' />
        <img src='/images/mobile-banner-image.png' alt='banner' className='mobile_banner_image' />
      </div>
      <div className="banner__container-question">
        <div className='banner__container-answer'>
          <img src='/images/why_play_desktop.png' alt='banner' className='why_play_desktop' />
          <img src='/images/why_play_mobile.png' alt='banner' className='why_play_mobile' />
        </div>
      </div>
    </div>
  )
}

export default LandingBanner
