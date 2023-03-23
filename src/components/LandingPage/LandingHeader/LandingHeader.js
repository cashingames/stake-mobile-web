import React from 'react'
import { Link } from 'react-router-dom';
import './LandingHeader.scss'

function LandingHeader() {
  // const [isOpen, setIsOpen] = useState(false)


  return (
    <div className='landingHeader'>
      <img src='/images/logo-small.png' alt='logo' className='landingLogo' />
      <div className='stores-icon'>
        <Link to="https://play.google.com/store/apps/details?id=com.cashingames.cashingames">
          <img width="100px" src="/images/googleplay_icon.png" alt="logo" height="40px" className="social-img" /></Link>
        <Link to="https://apps.apple.com/ng/app/cashingames/id6443878628">
          <img width="100px" height="30px" src="/images/apple_store_icon.png" alt="logo" className="social-img" /></Link>
      </div>
      <div className='linkContainer'>
        <Link to="/login" className='link'>Sign In</Link>
      </div>

    </div>
  )
}

export default LandingHeader