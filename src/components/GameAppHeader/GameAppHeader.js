import React from 'react'
import {Player} from '@lottiefiles/react-lottie-player'
import Boost from '../../assets/boost.json'
import './GameAppHeader.scss'

function GameAppHeader() {
    return (
        <div className='gameInHeader'>
            <div className='boostContainer'>
                <p className='gameInText'>Power Ups</p>
                <Player src={Boost}
                    alt='boost'
                    autoplay
                    loop
                    className='player'
                    style={
                        {height: '40px', width:'40px'}
                    }/>
            </div>
            <p className='exitGame'>Exit</p>
        </div>
    )
}

export default GameAppHeader