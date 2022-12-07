import React from 'react'
import { useSelector } from 'react-redux';
import './AvailableBoostSession.scss'

function AvailableBoostSession() {
    const gameMode = useSelector(state => state.game.gameMode);

    console.log(gameMode)

    return (
        <div className='availableBoosts'>
            <div className='boostInfo'>
                <p className='boostTitle'>BOOST</p>
            </div>
            <AvailableBoost />
        </div>
    )
}

export default AvailableBoostSession

const AvailableBoost = () => {
    return(
        <>
             <div className='boostContainer'>
                <div className='boostActive'>
                    <img src='/images/bomb.png' alt='bomb'/>
                    <p className='boostCount'>x2</p>
                </div>
                <p className='boostName'>Bomb</p>
            </div>
            <div className='boostContainer'>
                <div className='boostActive'>
                    <img src='/images/time_freeze.png' alt='freeze'/>
                    <p className='boostCount'>x5</p>
                </div>
                <p className='boostName'>Time Freeze</p>
            </div>
        </>
    )
}