
import React from 'react'
import {Link} from 'react-router-dom'
import {FaFacebook, FaInstagramSquare, FaTwitter } from 'react-icons/fa'
import './LandingFooter.scss'

function LandingFooter() {
    return (
        <div className='LandingFooter'>
            <div className='footerLogo'>
                <img src='/images/logo-small.png' alt='logo'/>
            </div>
            <div className='footerLinksContainer'>
                    <Link to='/terms' className='footerLink'>Terms and Conditions</Link>
                    <Link to='/faq' className='footerLink'>FAQ</Link>
                    <Link to='/policy' className='footerLink'>Privacy Policy</Link>
            </div>
            <div className='socialMediaLinks'>
                <div className='copyrightsText'>
                    <p>Copyright Cashingames.</p>
                    <p>All Rights Reserved.</p>
                </div>
                <div className='footerSocialIcons'>
                    <a href='/#' className='icon'><FaTwitter /></a>
                    <a href='/#' className='icon'><FaFacebook /></a>
                    <a href='/#' className='icon'><FaInstagramSquare /></a>                    
                </div>
            </div>
        </div>
    )
}

export default LandingFooter