import React from 'react'
import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/stringUtl';
import './UserWalletBalance.scss'

function UserWalletBalance() {
    const userBalance = useSelector(state => state.auth.user.walletBalance);
  return (
    <div className='walletBalance'>
        <img src='/images/store-purse.png' alt='purse' className='purseIcon'/>
        <div className='userBalance'>
            <p className='balanceText'>Wallet Balance</p>
            <p className='balance'>&#8358;{formatCurrency(userBalance)}</p>
        </div>
    </div>
  )
}

export default UserWalletBalance