import React from 'react';
import './StakingButtons.scss'


const StakingButtons = ({onPressStake,onPressProceed}) => {
    return (
        <div className='buttons'>
            <button onClick={onPressStake} className='stakeButton'>
                <p className='text'>Stake Cash</p>
            </button>
            <button onClick={onPressProceed} className='proceedButton'>
                <p className='text'>Proceed</p>
            </button>
        </div>
    )
}
export default StakingButtons;