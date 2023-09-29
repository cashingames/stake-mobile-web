import { useSelector } from 'react-redux';
import { IoChevronForwardOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import GamesCards from '../../components/GamesCard/GamesCards';
import AppHeader from '../../components/AppHeader/AppHeader';
import UserWalletAccounts from '../../components/UserWalletAccounts/UserWalletAccounts';
import DashboardCashdropCard from '../Cashdrops/DashboadCashdropCard';
import DashboardPromotionsCard from '../Promotions/DashboardPromotionsCard';
import logToAnalytics from '../../utils/analytics';

import './dashboard.scss'
import MoneyDisplay from '../../components/Finance/MoneyDisplay';

function DashBoardScreen() {


  return (
    <>
      <div className='dashboard-screen'>
        <UserProfile />
        <UserWalletAccounts />
        <GamesCards />
        <DashboardCashdropCard />
        <DashboardPromotionsCard />
      </div>
      <AppHeader heading='Home' style={{ color: '#000000' }} />
    </>
  )
}

const UserProfile = () => {
  const user = useSelector(state => state.auth.user);

  let navigate = useNavigate();
  const totalWalletBalance = Number.parseFloat(user.walletBalance) + Number.parseFloat(user.bonusBalance);
  const username = user.firstName === '' ? user.username?.charAt(0) : (user.firstName?.charAt(0) + user.lastName?.charAt(0));
  const firstname = user.firstName === '' ? user?.username : user?.firstName;

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
        <div className='name-main-container' onClick={goToProfile}>
          <div className='name-container'>
            <p className='welcome-text'>Hello </p>
            <p className='username-text'> {firstname}</p>
            <IoChevronForwardOutline size={18} className='icon' />
          </div>
        </div>
      </div>
      <div className='balance-container' onClick={goToWallet}>
        <MoneyDisplay amount={totalWalletBalance} />
        <IoChevronForwardOutline size={18} className='icon' color='#1c453b' />
      </div>
    </div>
  )
}

export default DashBoardScreen;