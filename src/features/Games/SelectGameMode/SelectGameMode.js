import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { IoCheckmarkCircle, IoChevronForward, IoEllipseOutline } from "react-icons/io5";
import './SelectGameMode.scss'


const SelectGameMode = ({ playTriviaForFree, playTriviaForCash,playChallengeForFree, playChallengeForCash}) => {
    const [earn, setEarn] = useState(false);
    const [practice, setPractice] = useState(false);
    const gameMode = useSelector(state => state.game.gameMode);
    const gameModeName = gameMode?.name

    const toggleFreeMode = () => {
        setEarn(false);
        setPractice(true);
    }

    const toggleEarn = () => {
        setEarn(true);
        setPractice(false);
    }

    const chooseMode = () => {
        if (earn && gameModeName === 'EXHIBITION') {
            playTriviaForCash()
        }
        if (practice && gameModeName === 'EXHIBITION') {
            playTriviaForFree()
        }
        if (earn && gameModeName === 'CHALLENGE') {
            playChallengeForCash()
        }
        if (practice && gameModeName === 'CHALLENGE') {
            playChallengeForFree()
        }
    }

    return (
        <div className='select-mode-container'>
            {gameModeName === 'EXHIBITION' &&
                <p className='game-mode-title'>Single player trivia bet</p>
            }
            {gameModeName === 'CHALLENGE' &&
                <p className='game-mode-title'>Challenge a player</p>
            }
            <div>
                <div className='game-mode'>
                    {practice ? <IoCheckmarkCircle className='icon' color={practice ? '#00FFA3' : '#D9D9D9'} size={22} onClick={toggleFreeMode}/> : <IoEllipseOutline size={22} color={practice ? '#00FFA3' : '#D9D9D9'}  onClick={toggleFreeMode}/>}
                    <p className='game-mode-text'>Practice for free</p>
                </div>
                <div className='game-mode'>
                    {earn ? <IoCheckmarkCircle className='icon' color={earn ? '#00FFA3' : '#D9D9D9'} size={22} onClick={toggleEarn}/> : <IoEllipseOutline size={22} color={earn ? '#00FFA3' : '#D9D9D9'}  onClick={toggleEarn}/>}
                    <p className='game-mode-text'>Play to earn</p>
                </div>
            </div>
            <button className='instruction-btn'>
                <p className='btn-text'>Game instructions</p>
                 <IoChevronForward className='icon' color='#072169' size={22} onClick={toggleEarn} />
            </button>
            <button className='game-btn' disabled={!earn && !practice} onClick={chooseMode}>
                <p className='btn-text'>Click to continue</p>
            </button>
        </div>
    )
}



export default SelectGameMode