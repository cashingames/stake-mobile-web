import React from 'react';
import './StakingButtons.scss'


const StakingButtons = ({onPressStake,onPressProceed}) => {
    return (
        <div className='buttons'>
            <button onClick={onPressProceed} className='stakeButton'>
                <p className='text'>Play exhibition</p>
            </button>
            <button onClick={onPressStake} className='proceedButton'>
                <p className='text'>Proceed</p>
            </button>
            
        </div>
    )
}
export default StakingButtons;