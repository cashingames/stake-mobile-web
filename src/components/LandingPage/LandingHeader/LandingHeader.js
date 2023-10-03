import React from 'react'
import { Link } from 'react-router-dom';
import './LandingHeader.scss'

function LandingHeader() {
  // const [isOpen, setIsOpen] = useState(false)


  return (
    <>
      <div className='landingHeader'>
        <img src='/images/cs-logo.png' alt='logo' className='landing-logo' />
        <div className='auth-container'>
          <div className='link-container' style={{ backgroundColor: "#0086CD" }}>
            <Link to="/login" className='link'>Login</Link>
          </div>
          <div className='link-container'>
            <Link to="/sign-up" className='link'>Sign Up</Link>
          </div>
        </div>
        <img src='/images/header-bg.png' alt='bg' className='landing-header_bg' />
      </div>
      <div className='header__container-welcome-details'>
        <div className='header__container-welcome-text'>
          <img className='half_phone_image' src='/images/half_mobile.png' alt='half_phone_image' />
          <div className='header__welcome'>
            <p className='header__welcome-text'>Welcome to</p>
            <p className='header__welcome-text'>Cashingames</p>
          </div>
          <div className='header__content-1'>
            <p className='header__content-text'>Where Football Knowledge </p>
            <p className='header__content-text'>Turns into Fortune! </p>
            <div className='header__content-2'>
              <p className='header__content-text2' >Compete in Nigeria's most exciting football </p>
              <p className='header__content-text2' >trivia games and win cash rewards.</p>
            </div>
          </div>
        </div>
        <div className='header__container-welcome-image'>
          <img className='phone_image' src='/images/mobile.png' alt='phone_image' />

        </div>
      </div>

    </>
  )
}

export default LandingHeader