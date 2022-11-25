import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { getToken } from '../../../features/Auth/AuthSlice';
import './LandingHeader.scss'

function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const isAuth = getToken()

  return (
    <div className='landingHeader'>
        <img src='/images/logo-small.png' alt='logo' className='landingLogo' />
        { isAuth ? <div className='linkContainer'>
          <Link to="/dashboard" className='link'>Dashboard</Link>
        </div> : 
        <div>
          <Link to="/" className='link'>Login</Link>
        </div>
        }
    </div>
  )
}

export default LandingHeader