import React from 'react'
import { useNavigate } from "react-router-dom";
import './ChallengeStakingBottomSheet.scss'

function ChallengeStakingBottomSheet({onPress,onStake}) {

   
  return (
    <div className='csbCase'>
        <div className='csbImg'>
            <img src='images/thinking-face.png' alt='thinking emoji' />
        </div>
        <div className='csbTextCase'>
            <p className='csbText'> Double your winnings by staking an amount for this challenge </p>
        </div>
        <div className='csbBtnCase'>
            <button className='csbStakeBtn' onClick={onStake}>
                Stake Cash
            </button>
            <button className='csbProceedButton' onClick={onPress}>
                Play for Free
            </button>
        </div>
    </div>
  )
}

export default ChallengeStakingBottomSheet