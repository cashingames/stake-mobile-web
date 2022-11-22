import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppHeader from '../../components/AppHeader/AppHeader'
import TransactionLink from '../../components/Wallet/TransactionLink/TransactionLink'
import WalletBalance from '../../components/Wallet/WalletBalance/WalletBalance'
import Withdrawable from '../../components/Wallet/Withdrawable/Withdrawable'
import { getUser } from '../Auth/AuthSlice'
import { withdrawWinnings } from '../CommonSlice'
import './WalletScreen.scss'

function WalletScreen() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const [withdraw, setWithdraw] = useState(false)

  const withdrawBalance = () => {
    setWithdraw(true)
    withdrawWinnings()
        .then(async response => {
          alert("Withdraw successful");
            // openBottomSheet();
            setWithdraw(false)
            dispatch(getUser())
        },
            err => {
                if (!err || !err.response || err.response === undefined) {
                    alert("Your Network is Offline.");
                    setWithdraw(false)
                }
                else if (err.response.status === 400) {
                    alert(err.response.data.message);
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
    </>
  )
}

export default WalletScreen