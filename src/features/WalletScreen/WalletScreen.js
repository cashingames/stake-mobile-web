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
import { getUser, sendEmailOTP } from '../Auth/AuthSlice'
import { withdrawWinnings } from '../CommonSlice'
import firebaseConfig from '../../firebaseConfig';
import './WalletScreen.scss';
import { formatCurrency } from '../../utils/stringUtl';
import { useNavigate } from 'react-router-dom';

function WalletScreen() {
  const analytics = firebaseConfig();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [withdraw, setWithdraw] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [alertMessage, setAlert] = useState('');


  const [openAlert, setOpenAlert] = useState(false)
  const [dialogueMessage, setDialogueMessage] = useState('');
  const userTotalWithdrawal = user.totalWithdrawals;
  const totalWithdrawalAmountLimit = useSelector(state => Number.parseFloat(state.common.totalWithdrawalAmountLimit ?? 0));
  const isEmailVerified = user.isEmailVerified;
  
  //Bottom sheet close function
  const closeBS = () => {
    setOpen(false)
  }

  const closeAlert = () => {
    setOpenDialogue(false)
  }

  const closeDialogue = () => {
    dispatch(sendEmailOTP())
    setOpenAlert(false)
    navigate('/email-verification')
  }
  const withdrawBalance = () => {
    if(formatCurrency(userTotalWithdrawal) >= formatCurrency(totalWithdrawalAmountLimit) && !isEmailVerified ){
      setWithdraw(true)
      setOpenAlert(true)
      setDialogueMessage('Email not verified. Verify your email');
      setWithdraw(false)
    }else{
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
          else if (err.response.status === 400) {
            setOpenDialogue(true)
            setAlert(err.response.data.message);
            setWithdraw(false)

          }
        }

      )
    }
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
      <Dialogue open={openAlert} handleClose={closeDialogue} dialogueMessage={dialogueMessage} />
    </>
  )
}

export default WalletScreen