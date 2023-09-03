import React from 'react'
import './LandingBanner.scss'

function LandingBanner() {
  return (
    <div className='landingBanner'>
      <div className='banner__container-img'>
        <img src='/images/banner-img.png' alt='banner' className='banner__image' />
      </div>
      <div className="banner__container-question">
        <p className='banner__text-title'>Why Play Games on Cashingames</p>
        <div className='banner__container-answer'>
          <AnswerSection img='/images/members.png' text1='90 Million +' text2='Games' />
          <AnswerSection img='/images/safe.png' text1='100% Safe' text2='& secure' />
          <AnswerSection img='/images/c-service.png' text1='24/7' text2='Support'  />
          <AnswerSection img='/images/payment.png' text1='Instant' text2='Withdrawals'  />
        </div>
      </div>
      {/* <img src='/images/banner-bg.png' alt='banner' className='banner__image-bg' /> */}
    </div>
  )
}

export default LandingBanner

const AnswerSection = ({ img, text1, text2}) => {
  return (
    <div className='banner__answer'>
      <img src={img} alt='banner' className='banner__icon' />
      <p className='banner__text'>{text1}</p>
      <p className='banner__text-small'>{text2}</p>
    </div>
  )
}