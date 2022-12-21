import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import BottomSheet from '../../components/BottomSheet/BottomSheet'
import TransactionLink from '../../components/Wallet/TransactionLink/TransactionLink'
import WalletBalance from '../../components/Wallet/WalletBalance/WalletBalance'
import Dialogue from '../../components/Dialogue/Dialogue'
import Withdrawable from '../../components/Wallet/Withdrawable/Withdrawable'
import WithdrawnBalance from '../../components/Wallet/WithdrawnBalance/WithdrawnBalance'
import { getUser } from '../Auth/AuthSlice'
import { withdrawWinnings } from '../CommonSlice'
import './WalletScreen.scss'
import LoaderScreen from '../LoaderScreen/LoaderScreen'

function WalletScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const [withdraw, setWithdraw] = useState(false)
  const [open, setOpen] = useState(false)
  const [openDialogue, setOpenDialogue] = useState(false)
  const [alertMessage, setAlert] = useState('')
  const [loading, setLoading] = useState(true);


  //disable browser back button
  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  })


  useEffect(() => {
    dispatch(getUser()).then(() => { setLoading(false) });
  }, [dispatch]);

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
      .then(async response => {
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

  if (loading) {
    return <LoaderScreen backgroundColor="wallet-background-color" />
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