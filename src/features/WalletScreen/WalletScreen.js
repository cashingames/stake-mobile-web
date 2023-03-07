import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logEvent } from 'firebase/analytics';

import AppHeader from '../../components/AppHeader/AppHeader'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import TransactionLink from '../../components/Wallet/TransactionLink/TransactionLink'
import WalletBalance from '../../components/Wallet/WalletBalance/WalletBalance'
import Dialogue from '../../components/Dialogue/Dialogue'
import Withdrawable from '../../components/Wallet/Withdrawable/Withdrawable'
import WithdrawnBalance from '../../components/Wallet/WithdrawnBalance/WithdrawnBalance'
import { getUser } from '../Auth/AuthSlice'
import { withdrawWinnings } from '../CommonSlice'
import firebaseConfig from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import './WalletScreen.scss';

function WalletScreen() {
  const analytics = firebaseConfig();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [withdraw, setWithdraw] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [alertMessage, setAlert] = useState('');

  //Bottom sheet close function
  const closeBS = () => {
    setOpen(false)
  }

  const closeAlert = () => {
    setOpenDialogue(false)
  }

  const withdrawBalance = () => {
    setWithdraw(true)
    withdrawWinnings()
      .then(response => {
        logEvent(analytics, 'winnings_withdrawn_successfully', {
          'product_id': user.username,
          'phone_number': user.phoneNumber,
          'email': user.email,
          'value': user.withdrawableBalance,
          'currency': 'NGN'
        });
        setOpen(true)
        setWithdraw(false)
        dispatch(getUser())
      },
        err => {
          if (!err || !err.response || err.response === undefined) {
            setOpenDialogue(true)
            setAlert("Your Network is Offline.");
            setWithdraw(false)
          }
          else if (err.response.data.errors.verifyEmailNavigation) {
            setOpenDialogue(true)
            navigate('/edit-profile')
            setAlert(err.response.data.message);
            setWithdraw(false)
          }
          else if (err.response.status === 400) {
            setOpenDialogue(true)
            setAlert(err.response.data.message);
            setWithdraw(false)

          }
        }

      )
  }

  return (
    <>
      <AppHeader heading='Wallet' />
      <div className='walletScreen' style={{ backgroundImage: "url(/images/vector-coin-background.jpg)" }}>
        <WalletBalance balance={user.walletBalance} />
        <Withdrawable withdrawableBalance={user.withdrawableBalance}
          bookBalance={user.bookBalance} withdraw={withdraw}
          onPress={withdrawBalance}
        />
        <TransactionLink />
      </div>

      {/* Bottom sheet component */}
      <BottomSheet open={open} closeBottomSheet={closeBS}
        BSContent={<WithdrawnBalance />}
      />
      <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
    </>
  )
}

export default WalletScreen