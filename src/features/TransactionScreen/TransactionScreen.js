import React, {useState }from 'react'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import { formatCurrency } from '../../utils/stringUtl'
import './TransactionScreen.scss'

function TransactionScreen() {
    const [debit] = useState(false)
    const [transaction] = useState(true)
  return (
    <>
        <ScreenHeader title='Transactions' styleProp='transaction'/>
        { transaction ? 
        <div className='transactionDetails'>
            <div className='narationDetails'>
                <div className='naration'>
                    <p className='narationTitle'>Debit</p>
                </div>
                <p className={`${debit ? 'transactionAmountWithdraw' : 'transactionAmountReceived'}`}> &#8358;{formatCurrency(300)}</p>
            </div>
            <div className='typeAndDate'>
                <p className='transactionType'>Staking winning of 90 cash</p>
                <p className='transactionType'>2022-11-07 12:25:56</p>
            </div>
        </div>
         :
            <div className='noTransactionContainer'>
                <img src='/images/cart-icon1.png' alt='cart' className='unavailable'/>
                <p className='noTransactionText'>No available transaction. Buy boost , buy game plan and fund your wallet to see transactions</p>
            </div>
    }
    </>
  )
}

export default TransactionScreen