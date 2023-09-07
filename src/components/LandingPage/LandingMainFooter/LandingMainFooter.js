
import React from 'react'
import Carousel from "nuka-carousel"

import './LandingMainFooter.scss'

function LandingMainFooter() {
    return (
        <div>
            <div className='mainFooter' style={{ background: "url('/images/footer-bg.png')" }}>
                <div className='mainfooter__container'>
                    <p className='mainfooter__text-title'>Become a Millionaire Today!</p>
                    <div className='mainfooter__testimony'>
                        <div className='mainfooter__testimony-testimony1'>
                            <p className='testimony1__text'>TESTIMONIAL</p>
                            <p className='testimony__title'>What Our Gamers Say</p>
                        </div>
                        <div className='mainfooter__testimony-testimony1'>
                            <p className='testimony1__text'>It was a great experience</p>
                            <img src='/images/ratings.png' alt='ratings' />
                            <p className='testimony1__testimony'>When I won N1,000,000 playing Cashingames, I was over the moon! This game takes football trivia to a whole new level with the betting feature. It's not just about answering questions; it's about strategy and timing too!</p>

                            <p className='testimony1__testimony'>Cashingames is more than just a game; it's an opportunity. I started with a small bet and ended up winning $700! Being able to challenge friends
                                and earn big rewards makes this game a must-play for any football enthusiast.</p>
                        </div>
                    </div>
                    <div className='carousel_container'>
                        <Carousel autoplay={true} withoutControls={true} wrapAround={true}>
                            <div className='testimony__slide'>
                                <p className='testimony__name'>Emmanuel R.</p>
                                <p className='testimony1__testimony'>I couldn't believe it when I won 100,000 on Cashingames! As a lifelong football fan, I've always trusted my knowledge, and this game finally rewarded me for it. Thanks to the challenge mode, I turned my passion into a serious payday!</p>
                            </div>
                            <div className='testimony__slide'>
                                <p className='testimony__name'>Adekunle B.</p>
                                <p className='testimony1__testimony'>Cashingames turned my love for football into real cash. Winning 200,000 was an incredible feeling. The excitement of betting on my answers and competing against friends added a whole new level of fun to the game!</p>
                            </div>
                            <div className='testimony__slide'>
                                <p className='testimony__name'>Niyi M.</p>
                                <p className='testimony1__testimony'>I've played trivia games before, but nothing like Cashingames. I won 170,000 by putting my football knowledge to the test. The challenge mode brought out my competitive side, and now I can proudly say I'm a Cashingames champion!</p>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
            <div className='mainMobileFooter'>
                <img className='testimonial' src='/images/mobile_testimonials.png' alt='testimonial'/>
                <img className='spherical_dots' src='/images/spherical_dots.png' alt='dots'/>
              
            </div>
        </div>
    )
}

export default LandingMainFooter