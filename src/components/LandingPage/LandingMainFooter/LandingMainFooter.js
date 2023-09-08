
import React from 'react'
import './LandingMainFooter.scss'

function LandingMainFooter() {
    return (
        <div>
            <div className='mainFooter' >
                <div className='mainfooter__container'>
                    <img className='desktop_testimonials' src='/images/desktop_testimonials.png' alt='testimonials' />
                </div>
            </div>
            <div className='mainMobileFooter'>
                <img className='testimonial' src='/images/mobile_testimonials.png' alt='testimonial' />
                <img className='spherical_dots' src='/images/spherical_dots.png' alt='dots' />

            </div>
        </div>
    )
}

export default LandingMainFooter