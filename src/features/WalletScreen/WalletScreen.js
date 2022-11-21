import React from 'react'
import AppHeader from '../../components/AppHeader/AppHeader'
import TransactionLink from '../../components/Wallet/TransactionLink/TransactionLink'
import WalletBalance from '../../components/Wallet/WalletBalance/WalletBalance'
import Withdrawable from '../../components/Wallet/Withdrawable/Withdrawable'
import './WalletScreen.scss'

function WalletScreen() {
  return (
    <>
        <AppHeader />
        <div className='walletScreen' style={{backgroundImage: "url(/images/vector-coin-background.jpg)"}}>
          <WalletBalance />
          <Withdrawable />
          <TransactionLink />
        </div>
    </>
  )
}

export default WalletScreen