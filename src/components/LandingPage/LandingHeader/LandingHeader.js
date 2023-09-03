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
        <img src='/images/header-bg.png' alt='logo' className='landing-header_bg' />
      </div>
      <div className='header__container-welcome-text'>
        <h2 className='header__welcome-text'>Welcome to Cashingames</h2>
        <p className='header__content-text'>Where Football Knowledge Turns into Fortune!</p>
        <p className='header__content-text2'>Compete in Nigeria's most exciting football trivia games and win cash rewards.</p>
      </div>
    </>
  )
}

export default LandingHeader