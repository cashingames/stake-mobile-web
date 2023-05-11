import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logEvent } from 'firebase/analytics';
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
import WalletDialog from '../../components/WalletDialog/WalletDialog';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

function WalletScreen() {
  const analytics = firebaseConfig();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [withdraw, setWithdraw] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openWalletDialogue, setOpenWalletDialogue] = useState(false);
  const [alertMessage, setAlert] = useState('');
  const [withdrawAlert, setWithdrawAlert] = useState('');


  //Bottom sheet close function
  const closeBS = () => {
    setOpen(false)
  }

  const closeAlert = () => {
    setOpenDialogue(false)
  }

  const closeWalletAlert = () => {
    setOpenWalletDialogue(false)
    withdrawBalance()
  }

  const withdrawValidation = () => {
    setOpenWalletDialogue(true)
    setWithdrawAlert('Fund kept in withdrawable balance for more than a month will be rendered invalid and non-withdrawable. Ensure you withdraw your winnings before the deadline.')
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

  const navigateHandler = () => {
    navigate('/dashboard');
}

  return (
    <>
      <ScreenHeader title='Wallet' styleProp='wallet-screen-header' iconProp='games-back' onClick={navigateHandler} />
      <div className='walletScreen' style={{ backgroundImage: "url(/images/vector-coin-background.jpg)" }}>
        <WalletBalance balance={user.walletBalance} />
        <Withdrawable withdrawableBalance={user.withdrawableBalance}
          bookBalance={user.bookBalance} withdraw={withdraw}
          onPress={withdrawValidation}
        />
        <TransactionLink />
      </div>

      {/* Bottom sheet component */}
      <BottomSheet open={open} onClose={closeBS}
        BSContent={<WithdrawnBalance />}
      />
      <Dialogue open={openDialogue} handleClose={closeAlert} dialogueMessage={alertMessage} />
      <WalletDialog open={openWalletDialogue} handleClose={closeWalletAlert} dialogueMessage={withdrawAlert} />

    </>
  )
}

export default WalletScreen