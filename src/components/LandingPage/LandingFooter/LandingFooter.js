
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
                        <p className='footer__text'>Sign up now and join the ranks of Cashingames </p>
                        <p className='footer__text'>champions!</p>
                    </div>
                    <div className='footer__dots'>
                        <img className='desktop_spherical_dots' src='/images/spherical_dots.png' alt='dots' />
                    </div>
                </div>
                <div className='footer__container2' style={{ background: "url('/images/footer-bg2.png')", backgroundPosition: "center" }}>
                    <div className='footer__container-img'>
                        <div className='footer__app-logo'>
                            <img src='/images/cs-logo.png' alt='logo' className='footer2__image' />
                            <a href="https://apps.apple.com/ng/app/cashingames/id6443878628"><img src='/images/ios.png' alt='logo' className='store_icon' /></a>
                        </div>
                        <div className='footer__newsletter'>
                            <p className='newsletter_text'>Newsletter</p>
                            <form className='newsletter__form'>
                                <input placeholder='enter your email' />
                            </form>
                            <button>Sign Up</button>
                        </div>
                    </div>

                    <div className='terms' style={{ color: "#fff", fontSize: '.6rem', textAlign: 'center', fontFamily: 'gotham-light' }}>
                        <div>
                            <p className='terms__text'>© Copyright 2023 | Cashingames</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row' }} >
                            <Link to="/terms" className='terms__text'>Terms & Conditions | </Link>
                            <Link to="/terms" className='terms__text'>FAQ | </Link>
                            <Link to="/privacy" className='terms__text'>Privacy Policy</Link>
                        </div>

                    </div>
                </div>
            </div>

            <div className='logo_case'>
                <img className='logo' src='/images/footer-logo.png' alt='logo' />
            </div>
            <div className='mobile_landing_cta'>
                <div className='download_and_news'>
                    <div className='footer_icons'>
                        <a href="https://apps.apple.com/ng/app/cashingames/id6443878628"><img src='/images/apple_store_footer.png' alt='logo' className='icons' style={{ marginBottom: '3rem' }} /></a>
                    </div>
                </div>
                <div className='newsletter'>
                    <span className='newsletter_text'>Newsletter</span>
                    <form className='news_letter_form'>
                        <input
                            placeholder='Enter your email' />
                    </form>
                    <Link to="/" className='f_link'>Sign Up</Link>
                </div>
                <div className='copyright_faq_privacy'>
                    <Link to="/terms" className='copyright_terms_text'>Terms & Conditions</Link>
                    <Link to="/terms" className='copyright_terms_text'>|</Link>
                    <Link to="/terms" className='copyright_terms_text'>FAQ</Link>
                    <Link to="/privacy" className='copyright_terms_text'><p>Privacy Policy</p></Link>
                </div>
                <Link to="/" className='copyright_terms_text'><p>© Copyright 2023 | Cashingames</p></Link>
            </div>

        </div>

    )
}

export default LandingFooter
