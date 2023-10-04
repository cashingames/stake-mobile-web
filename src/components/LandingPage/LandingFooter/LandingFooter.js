
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
                <div className='mobile__landing-bg'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="1231" viewBox="0 0 360 1231" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1460.33 427.793C1460.33 427.793 1008.24 -283.382 569.332 128.181C130.423 539.744 0.271861 434.56 -261.967 129.741C-524.206 -175.078 -1141.54 144.067 -1199.29 443.396C-1257.05 742.725 -1149.4 1227.19 -1149.4 1227.19L188.877 1231L1321.33 1229.88L1460.33 427.793Z" fill="url(#paint0_linear_235_881)" />
                        <defs>
                            <linearGradient id="paint0_linear_235_881" x1="835.74" y1="1337.11" x2="395.82" y2="476.942" gradientUnits="userSpaceOnUse">
                                <stop offset="0.614583" stop-color="#044E92" />
                                <stop offset="1" stop-color="#E25C2E" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
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
