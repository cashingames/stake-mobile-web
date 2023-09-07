
import React from 'react'
import Carousel from "nuka-carousel"
import './LandingInfo.scss'

function LandingInfo() {
  return (
    <div className='info__container'>
      <div className='info__container-image'>
        <img src='/images/highlight.png' alt='logo' className='info__image-main' />
      </div>
      <div className='info__container-card'>
        <Carousel autoplay={true} withoutControls={true} wrapAround={true}>
          <Card img='images/info-icon.png'
            title='Challenge Your Rivals, Seize Glory!'
            body='Looking for a real thrill? Engage in epic one-on-one battles with other players in our electrifying Challenge Mode. Put your stakes on the line, outsmart your opponent with your football wisdom, and seize all the glory – and the winnings!' />

          <Card img='images/info-icon2.png'
            style={{ background: 'linear-gradient(179.54deg, #0086CD -43.26%, #E25C2E 63.87%)' }}
            cardColor={{ color: "#fff" }}
            cardColor2={{ color: "#fff" }}
            title='Bet On Your Knowledge, Win Big!'
            body='In Football Trivia Showdown, every answer you get right is a step closer to victory and big winnings. Place your bets and back your insights as you answer questions ranging from historical moments to current players and stats. The more you know, the more you win!' />

          {/* <Card img='images/info-icon3.png'
            title='Join the Cashingames Community'
            body='Excitement Guaranteed: Immerse yourself in an electrifying gaming experience that combines football passion with the thrill of betting.' />
            <div className='info__img-carosel'>
              <img src='/images/mobile.png' alt='logo'/>
          </div> */}
        </Carousel>
      </div>

    </div>
  )
}

export default LandingInfo

const Card = ({ style, title, img, body, cardColor, cardColor2 }) => {
  return (
    <div className='info__card' style={style}>
      <div className='info__card-img-container'>
        <img src={img} alt='logo' className='info__card-img' />
      </div>
      <div className='info__card-body'>
        <p className='info__card-text-title' style={cardColor}>{title}</p>
        <p className='info__card-text' style={cardColor2}>{body}</p>
      </div>
    </div>
  )
}