import React from 'react'
import './GameAppHeader.scss'

function GameAppHeader({ onPress, gameTitle, styleProp }) {
    return (
        <div className={`gameInHeader ${styleProp}`}>
            <div onClick={onPress} className='exit-game'>
                <span className='exit-text'>Exit Game</span>
            </div>
            <p className='title'>{gameTitle}</p>
            <div></div>
        </div>
    )
}

export default GameAppHeader