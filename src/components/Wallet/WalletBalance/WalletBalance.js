import {Player} from '@lottiefiles/react-lottie-player'
import React from 'react'
import MoneyBag from '../../../assets/moneybag.json'
import './WalletBalance.scss'

function WalletBalance() {
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
            <p className='userBalance'>&#8358;100.00</p>
            <button className='fundWalletBtn'>
                Fund Wallet
            </button>
        </div>
    )
}

export default WalletBalance
