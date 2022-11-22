import React from 'react';
import { IoArrowForwardSharp } from "react-icons/io5";
import './TransactionLink.scss'

function TransactionLink() {
  return (
    <div className='transactionLink'>
        <button className='transactionBtn'>
            <p className='transactionText'>See Transactions</p>
            <IoArrowForwardSharp  className='icon'/>
        </button>
    </div>
  )
}

export default TransactionLink