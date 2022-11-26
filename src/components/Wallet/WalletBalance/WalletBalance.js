import { Player } from '@lottiefiles/react-lottie-player'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import MoneyBag from '../../../assets/moneybag.json'
import { formatCurrency } from '../../../utils/stringUtl'
import './WalletBalance.scss'

function WalletBalance({ balance }) {
    let navigate = useNavigate();
    const goToFundWallet = () => {
        navigate('/fund-wallet')
    }
    return (
        <div className='walletBalContainer'>
            <p className='balanceText'>Deposit Balance</p>
            <div>
                <Player
                    src={MoneyBag} alt='money bag'
                    autoplay
                    loop
                    style={{ height: '50px' }}
                />
            </div>
            <p className='userBalance'>&#8358;{formatCurrency(balance)}</p>
            <div onClick={goToFundWallet} className='fundWalletBtn'>
                <p className='fwBtn'>Fund Wallet</p>
            </div>
        </div>
    )
}

export default WalletBalance
