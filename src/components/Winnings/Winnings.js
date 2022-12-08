import React from 'react'
import { Link } from 'react-router-dom'
import StakeWinnings from '../StakeWinnings/StakeWinnings'
import './Winnings.scss'

function Winnings() {
  return (
    <div className='winningCase'>
        <StakeWinnings />
        <Link to='/' className='reviewStake'>Review Stake</Link>
    </div>
  )
}

export default Winnings