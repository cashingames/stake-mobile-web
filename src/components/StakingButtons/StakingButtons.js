import React from 'react';
import './StakingButtons.scss'


const StakingButtons = ({onPressStake, gameMode}) => {
    return (
            <button onClick={onPressStake} className={gameMode.name === 'STAKING' ? 'stake-mode' : 'ProceedButton'}>
                <p className='text'>Proceed</p>
            </button>
            
    )
}
export default StakingButtons;