import React from 'react'
import { Link } from 'react-router-dom';
import './LandingHeader.scss'

function LandingHeader() {
  // const [isOpen, setIsOpen] = useState(false)
  

  return (
    <div className='landingHeader'>
        <img src='/images/logo-small.png' alt='logo' className='landingLogo' />
        <div className='linkContainer'>
          <Link to="/login" className='link'>Sign In</Link>
        </div>
    </div>
  )
}

export default LandingHeader