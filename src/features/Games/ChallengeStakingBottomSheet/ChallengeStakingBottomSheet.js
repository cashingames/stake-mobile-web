import React from 'react'
import { useState } from 'react'
import BottomSheet from '../../../components/BottomSheet/BottomSheet'
import ChallengeInviteSuccessText from '../ChallengeInviteSuccessText/ChallengeInviteSuccessText';
import './ChallengeStakingBottomSheet.scss'

function ChallengeStakingBottomSheet() {
    const [openSheet, setOpenSheet] = useState(false);

    const closeBS = () => {
        setOpenSheet(false)
    }
  return (
    <div className='csbCase'>
        <div className='csbImg'>
            <img src='images/thinking-face.png' alt='thinking emoji' />
        </div>
        <div className='csbTextCase'>
            <p className='csbText'> Double your winnings by staking an amount for this challenge </p>
        </div>
        <div className='csbBtnCase'>
            <button className='csbStakeBtn'>
                Stake Cash
            </button>
            <button className='csbProceedButton'>
                Play for Free
            </button>
        </div>
        <BottomSheet open={openSheet} closeBottomSheet={closeBS} BSContent={<ChallengeInviteSuccessText />} />
    </div>
  )
}

export default ChallengeStakingBottomSheet