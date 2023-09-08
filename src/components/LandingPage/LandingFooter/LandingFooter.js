
import React from 'react'
import { Link } from 'react-router-dom'
import './LandingFooter.scss'

function LandingFooter() {
    return (
        <div>
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
                    <div className='terms' style={{ color: "#fff", fontSize: '.6rem', textAlign: 'center', fontFamily: 'gotham-medium' }}>
                        <p className='terms__text'>© Copyright 2023 | Cashingames</p>
                    </div>
                </div>
            </div>

            <div className='mobile_landing_cta'>
                <p className='cta_question' style={{ marginTop: '.6rem' }}>Ready to claim your </p>
                <p className='cta_question'>football fortune?</p>
                <p className='cta_action'>Sign up now and join</p>
                <p className='cta_action'>the ranks of</p>
                <p className='cta_action'>Cashingames</p>
                <p className='cta_action'>champions!</p>
                <Link to="/sign-up" className='link'>Sign Up</Link>
                <img src='/images/landing_cg_logo_footer.png' alt='logo' className='footer_logo' />
                <div className='download_and_news'>
                    <img src='/images/footer_shape.png' alt='logo' className='footer_shape' />
                    <div className='footer_icons'>
                        <a href="https://play.google.com/store/apps/details?id=com.cashingames.cashingames"><img src='/images/google_play_footer.png' alt='logo' className='icons' /></a>
                        <a href="https://apps.apple.com/ng/app/cashingames/id6443878628"><img src='/images/apple_store_footer.png' alt='logo' className='icons' style={{ marginBottom: '3rem' }} /></a>
                    </div>
                </div>
                <div className='newsletter'>
                    <span className='newsletter_text'>Newsletter</span>
                    <form className='news_letter_form'>
                        <input />
                    </form>
                    <Link to="/sign-up" className='f_link'>Sign Up</Link>
                </div>
                <div className='copyright_faq_privacy'>
                   <a className='copyright_terms_text'>Terms & Conditions</a>
                   <a className='copyright_terms_text'>|</a>
                   <a className='copyright_terms_text'>FAQ</a>
                   <a className='copyright_terms_text'><p>Privacy Policy</p></a>
                   <a className='copyright_terms_text'><p>© Copyright 2023 | Cashingames</p></a>
                </div>
            </div>

        </div>

    )
}

export default LandingFooter
