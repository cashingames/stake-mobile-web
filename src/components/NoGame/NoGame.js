import React from 'react';
// import { useNavigate } from 'react-router-dom';
import GoToStore from '../GoToStore/GoToStore';
import './NoGame.scss';


const NoGame = ({ onClose, onPress }) => {
    // const navigate = useNavigate();
    const visitStore = () => {
        onClose();
        alert('this is store')
        // navigate('/dashboard')
    }


    return (
        <div className='noGames'>
            <img src="/images/sad-face-emoji.png" alt="sad-emoji" className="sad-emoji" />
            <p className='noGamesText'>Sorry,</p>
            <p className='noGamesText'>You have exhausted your games</p>
            <>
                <GoToStore onPress={visitStore} />
                <p className='orText'>or</p>
                <p className='stakeCashText'>Click on stake cash and stand a chance of winning double of the amount staked</p>
                <button onClick={onPress} className='stakeButton'>
                    <p className='buttonText'>Stake Cash</p>
                </button>
            </>
        </div>
    )
}

export default NoGame;
