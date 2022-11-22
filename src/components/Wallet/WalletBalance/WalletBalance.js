import {Player} from '@lottiefiles/react-lottie-player'
import React from 'react'
import MoneyBag from '../../../assets/moneybag.json'
import { formatCurrency } from '../../../utils/stringUtl'
import './WalletBalance.scss'

function WalletBalance({balance}) {
    return (
        <div className='walletBalContainer'>
            <p className='balanceText'>Deposit Balance</p>
            <div>
                <Player
                    src={MoneyBag} alt='money bag'
                    autoplay
                    loop
                    style={{height:'50px'}}
                />
            </div>
            <p className='userBalance'>&#8358;{formatCurrency(balance)}</p>
            <div className='fundWalletBtn'>
                Fund Wallet
            </div>
        </div>
    )
}

export default WalletBalance
