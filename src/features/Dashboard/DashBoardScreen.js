import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5'
import './dashboard.scss'
import { useSelector } from 'react-redux';
import UserWalletAccounts from '../../components/UserWalletAccounts/UserWalletAccounts';
import { useNavigate } from 'react-router-dom';
import GamesCards from '../../components/GamesCard/GamesCards';
import LeaderboardCards from '../../components/LeaderboardCards/LeaderboardCards';
import AppHeader from '../../components/AppHeader/AppHeader';
import { formatCurrency } from '../../utils/stringUtl';
import logToAnalytics from '../../utils/analytics';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function DashBoardScreen() {
  const user = useSelector(state => state.auth.user);


  return (
    <>
      <div className='dashboard-screen'>
        <UserProfile user={user} />
        <UserWalletAccounts user={user} />
        <GamesCards />
        <LeaderboardCards />
      </div>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
    </>
  )
}

const UserProfile = ({ user }) => {
  let navigate = useNavigate();
  const goToProfile = () => {
    navigate('/profile')
  }

  // const goToNotification = () => {
  //   navigate('/notifications')
  // }
  const goToWallet = () => {
    logToAnalytics('wallet_amount_clicked', {
      'username': user.username,
      'phone_number': user.phone_number,
      'email': user.email
  });
    navigate('/wallet')
  }

  return (
    <div className='profile-container'>
      <div className='profile-left'>
        <img
          src={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"}
          alt='user'
          className='user-avatar'
          onError={(e) => e.target.style.display = 'none'} />
        <div className='name-main-container'>
          <div className='name-container'>
            <p className='welcome-text'>Hello, </p>
            <p className='username-text' onClick={goToProfile}> {user.username}</p>
            <IoChevronForwardOutline size={18} className='icon' />
          </div>
          {/* <p className='greeting-text'>Welcome 🙌🏻</p> */}
        </div>
      </div>
      {/* <div className='notification-container' onClick={goToNotification}>
        {user.unreadNotificationsCount !== 0 ?
          <IoMailUnread size={33} color='#072169' className='icon' />
          :
          <IoMail size={33} color='#072169' className='icon' />
        }
        {user.unreadNotificationsCount !== 0 &&
          <div className='number-container'>
            <p className='number'>{user.unreadNotificationsCount}</p>
          </div>
        }
      </div> */}
      <div className='balance-container' onClick={goToWallet}>
        <span className='balance-currency'>NGN</span>
        <span className='balance-digit'>{formatCurrency(user.walletBalance ?? 0)}</span>
        <IoChevronForwardOutline size={18} className='icon' color='#072169' />
      </div>
    </div>
  )
}

export default DashBoardScreen;