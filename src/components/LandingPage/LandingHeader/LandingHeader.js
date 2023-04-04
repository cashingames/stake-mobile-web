import React from 'react'
import { Link } from 'react-router-dom';
import './LandingHeader.scss'

function LandingHeader() {
  // const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='landingHeader'>
      <img src='/images/logo-small.png' alt='logo' className='landing-logo' />
      <div className='auth-container'>
        <div className='link-container'>
          <Link to="/sign-up" className='link'>Register</Link>
        </div>
        <div className='link-container'>
          <Link to="/login" className='link'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default LandingHeader