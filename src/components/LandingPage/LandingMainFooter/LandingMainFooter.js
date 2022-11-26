
import React from 'react'
import { Link } from 'react-router-dom'
import AuthTitle from '../../AuthTitle/AuthTitle'
import './LandingMainFooter.scss'

function LandingMainFooter() {
    return (
        <div className='mainFooter'>
            <img src='/images/bonus.png' alt='bonus'/>
            <AuthTitle titleText='Welcome Bonus' styleProp='authHeader'/>
            <p className='mainFooterText'>Join our live trivia and</p>
            <p className='mainFooterText'>win amazing prizes</p>
            <Link to='/sign-up'>
                <button className='singupLink'>
                 Register here</button>
            </Link>
        </div>
    )
}

export default LandingMainFooter