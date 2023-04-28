
import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa'
import './LandingFooter.scss'

function LandingFooter() {
    return (
        <div className='LandingFooter'>
            <div className='footerLogo'>
                <img src='/images/logo-small.png' alt='logo' className='logo' />
            </div>
            <div className='footerLinksContainer'>
                <Link to='/terms' className='footerLink'>Terms and Conditions</Link>
                <Link to='/' className='footerLink'>FAQ</Link>
                <Link to='/privacy' className='footerLink'>Privacy Policy</Link>
            </div>
            <div className='stores-icon'>
                <a href="https://play.google.com/store/apps/details?id=com.cashingames.cashingames">
                    <img width="100px" src="/images/googleplay_icon.png" alt="logo" height="40px" className="social-img" /></a>
                <a href="https://apps.apple.com/ng/app/cashingames/id6443878628">
                    <img width="100px" height="40px" src="/images/apple_store_icon.png" alt="logo" className="social-img" /></a>
            </div>
            <div className='socialMediaLinks'>
                <div className='copyrightsText'>
                    <p>Copyright Cashingames.</p>
                    <p>All Rights Reserved.</p>
                </div>
                <div className='footerSocialIcons'>
                    <a href='https://www.twitter.com/cashingamesng' className='icon'><FaTwitter /></a>
                    <a href='https://www.facebook.com/cashingames' className='icon'><FaFacebook /></a>
                    <a href='https://www.instagram.com/cashingames' className='icon'><FaInstagramSquare /></a>
                </div>
            </div>
            <Link to='/help-contact' className='contact-us'>Need help ? Contact us</Link>

        </div>
    )
}

export default LandingFooter