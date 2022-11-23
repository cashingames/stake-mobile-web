import React from 'react';
import {formatCurrency} from '../../../utils/stringUtl'
import './FundWallet.scss'

function FundWallet({amount, setAmount, setOpen}) {

    const startFunding = () => {
        const amountEntered = amount.trim().length === 0 ? 0 : Number.parseFloat(amount)
        if(amountEntered < 100){
            setOpen(true)
            return
        }
    }
  return (
    <>
        <div className='fundWalletContainer'>
                <div className='balance'>
                    <p className='availableAmount'>
                        Bal: &#8358;{
                        formatCurrency(100)
                    } </p>
                    <p className='walletTitle'>How much do you want to deposit ? (&#8358;)</p>
                    <input 
                        value={amount}
                        autoFocus={true}
                        placeholder='500'
                        type='number'
                        onChange={(e) => setAmount(e.target.value)}
                        className='fundAmount'/>
                    <div className='flag'>
                        <img src='/images/naija_flag.png' alt='nigeria flag' />
                        <p className='flagText'>NGN</p>
                    </div>
                </div>
            </div>
            <div className='actionBtnContainer' onClick={startFunding}>
            <div className='actionBtn'>
                <p className='text'>Fund Wallet</p>
            </div>
            </div>
            </>
  )
}

export default FundWallet