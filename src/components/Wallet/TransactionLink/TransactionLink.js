import React from 'react';
import { IoArrowForwardSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import './TransactionLink.scss'

function TransactionLink() {
  return (
    <div className='transactionLink'>
        <Link to="/transactions" className='link'><button className='transactionBtn'>
            <p className='transactionText'>See Transactions</p>
            <IoArrowForwardSharp  className='icon'/>
        </button></Link>
    </div>
  )
}

export default TransactionLink