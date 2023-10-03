
import React from 'react'
import './LandingMainFooter.scss'
import Carousel from 'nuka-carousel'
import PrimaryButton from '../../Buttons/PrimaryButton'
import { Link } from 'react-router-dom'

function LandingMainFooter() {
     return (
        <div>
            <div className='mainFooter' >
                <div className='mainfooter__container'>
                    <img className='desktop_testimonials' src='/images/desktop_testimonials.png' alt='testimonials' />
                </div>
            </div>

            <div className='mainMobileFooter'>
                <img className='mobilefooter__shape' src='/images/footer-shape.png' alt="shape"/>
                <div className='mobilefooter_heading'>
                    <p className='mobilefooter_heading_text'>Become a <br /> Millionaire Today!</p>
                </div>
                <p className='mobilefooter__testimonial_text'>Testimonial</p>
                <div className='mobilefooter__testimonies'>
                    <p className='mobilefooter_testimonies_title'>What Our Gamers Say</p>
                    <div className='testimonies'>
                        <div className='testimonies_bg'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="295" viewBox="0 0 360 295" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2898 294.193C26.4084 294.174 21.3536 293.993 16.1252 293.648C-26.7628 290.774 -46.8438 259.569 -47 234.475V233.888C-46.9953 230.58 -46.5984 227.279 -45.8142 224.027C-38.9157 196.094 -12.7453 175.528 28.371 154.728C59.9922 138.733 75.2313 115.611 93.2805 71.9285C116.496 15.7418 191.833 -16.7854 240.491 8.92925C307.691 44.4318 265.264 108.658 335.956 113.824C408.906 119.155 446.02 167.617 427.105 205.624C412.424 235.124 363.989 258.322 272.35 250.163C209.194 244.537 170.592 258.03 133.921 271.524C103.335 282.779 74.0954 294.033 33.0655 294.194L31.2898 294.193Z" fill="#E25C2E" />
                            </svg>
                            <div className='testimonies__container-card'>
                                <Carousel autoplay={true} withoutControls={true} wrapAround={true}>
                                    <Card
                                        title='Emmanuel R.'
                                        body="'I couldn't believe it when I won 100,000 on Cashingames! As a lifelong football fan, I've always trusted my knowledge, and this game finally rewarded me for it. Thanks to the challenge mode, I turned my passion into a serious payday!" />
                                    <Card
                                        title='Adekunle B.'
                                        body="Cashingames turned my love for football into real cash. Winning 200,000 was an incredible feeling. The excitement of betting on my answers and competing against friends added a whole new level of fun to the game!" />
                                    <Card
                                        title='Niyi M.'
                                        body="I've played trivia games before, but nothing like Cashingames. I won 170,000 by putting my football knowledge to the test. The challenge mode brought out my competitive side, and now I can proudly say I'm a Cashingames champion!" />

                                </Carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mobilefooter__second'>
                <div className='mobilefooter__second-img'>
                    <img className='img' src='/images/base-32.png' alt='testimonials' />
                </div>
                <div className='mobile__second_cta'>
                    <p className='header'>Ready to claim your football fortune?</p>
                    <p className='body'>Sign up now and join the ranks of Cashingames champions!</p>
                </div>
                <div className='btn__case'>
               <PrimaryButton className="sign_btn" text={<Link to="/sign-up" className='link'>Sign Up</Link>} />
               </div>
            </div>
        </div>
    )
}

export default LandingMainFooter

const Card = ({ title, body }) => {
    return (
        <div className='info__card'>
            <div className='info__card-head'>
                <p className='info__card-text-title' >{title}</p>
                <img width="23px" height="25px" src='/images/sign.png' alt="puntuation" />
            </div>
            <div className='info__card-body'>
                <p className='info__card-text'>{body}</p>
            </div>
        </div>
    )
}