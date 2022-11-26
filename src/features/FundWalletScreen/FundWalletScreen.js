import React, { useState } from 'react'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import FundWallet from '../../components/Wallet/FundWallet/FundWallet'
import './FundWalletScreen.scss'

function FundWalletScreen() {

 
    return (
        <>
            <div>
                <ScreenHeader title='Fund Wallet' styleProp='fundWallet' />
            </div>
            <FundWallet />
        </>
    )
}

export default FundWalletScreen
