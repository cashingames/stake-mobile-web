
import React from 'react'
import { Link } from 'react-router-dom'
import './LandingFooter.scss'

function LandingFooter() {
    return (
        <div className='footer__container'>
            <div className='footer__link-container'>
                <button className='link-container'>
                    <Link to="/sign-up" className='link'>Sign Up</Link>
                </button>
                <div className='footer__container-text'>
                    <p className='footer__text-title'>Ready to claim your football fortune? </p>
                    <p className='footer__text'>Sign up now and join the ranks of Cashingames champions!</p>
                </div>
            </div>
            <div className='footer__container2' style={{ background: "url('/images/footer-bg2.png')" }}>
                <div className='footer__container-img'>
                    <img src='/images/cs-logo.png' alt='logo' className='footer2__image' />
                    <img src='/images/playstore.png' alt='playstore' className='footer2__image' />
                    <img src='/images/ios.png' alt='logo' className='footer2__image' />
                </div>
                <div className='footer__newsletter'>
                    <p className='newsletter_text'>Newsletter</p>
                    <form className='newsletter__form'>
                        <input />
                    </form>
                    <button>Sign Up</button>
                </div>
                <hr />
                <div className='terms' style={{color: "#fff", fontSize: '.6rem', textAlign:'center', fontFamily:'gotham-medium'}}>
                    <p className='terms__text'>© Copyright 2023 | Cashingames</p>
                </div>
            </div>
        </div>
    )
}

export default LandingFooter
