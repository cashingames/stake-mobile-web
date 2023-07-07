import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5'
import './dashboard.scss'
import { useSelector } from 'react-redux';
import UserWalletAccounts from '../../components/UserWalletAccounts/UserWalletAccounts';
import { useNavigate } from 'react-router-dom';
import GamesCards from '../../components/GamesCard/GamesCards';
import LeaderboardCards from '../../components/LeaderboardCards/LeaderboardCards';
import AppHeader from '../../components/AppHeader/AppHeader';
import logToAnalytics from '../../utils/analytics';



function DashBoardScreen() {
  const user = useSelector(state => state.auth.user);
  const username = user.username?.charAt(0)


  return (
    <>
      <div className='dashboard-screen'>
        <UserProfile user={user} username={username} />
        <UserWalletAccounts user={user} />
        <GamesCards />
        <LeaderboardCards />
      </div>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
    </>
  )
}

const UserProfile = ({ user, username }) => {
  let navigate = useNavigate();
  const goToProfile = () => {
    navigate('/profile')
  }

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
          <div className='user-avatar'>
            <span className='avatar-text'>{username}</span>
          </div>
        <div className='name-main-container'>
          <div className='name-container'>
            <p className='welcome-text'>Hello, </p>
            <p className='username-text' onClick={goToProfile}> {user.username}</p>
            <IoChevronForwardOutline size={18} className='icon' />
          </div>
        </div>
      </div>
      <div className='balance-container' onClick={goToWallet}>
        <span className='balance-currency'>My Wallet</span>
        <IoChevronForwardOutline size={18} className='icon' color='#072169' />
      </div>
    </div>
  )
}

export default DashBoardScreen;