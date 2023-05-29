import React from 'react';
import { useSelector } from 'react-redux';
import TransactionLink from '../../components/Wallet/TransactionLink/TransactionLink'
import WalletBalance from '../../components/Wallet/WalletBalance/WalletBalance'
import Withdrawable from '../../components/Wallet/Withdrawable/Withdrawable'
import { useNavigate } from 'react-router-dom';
import './WalletScreen.scss';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

function WalletScreen() {
  let navigate = useNavigate();
  const user = useSelector(state => state.auth.user);



  const withdrawValidation = () => {
    navigate('/withdraw-funds')
  }


  const navigateHandler = () => {
    navigate('/dashboard');
}

  return (
    <>
      <ScreenHeader title='Wallet' styleProp='wallet-screen-header' iconProp='games-back' onClick={navigateHandler} />
      <div className='walletScreen' style={{ backgroundImage: "url(/images/vector-coin-background.jpg)" }}>
        <WalletBalance balance={user.walletBalance} />
        <Withdrawable withdrawableBalance={user.withdrawableBalance}
          bookBalance={user.bookBalance} 
          onPress={withdrawValidation}
        />
        <TransactionLink />
      </div>

    </>
  )
}

export default WalletScreen