import React from 'react'
// import {Player} from '@lottiefiles/react-lottie-player'
// import Boost from '../../assets/boost.json'
import './GameAppHeader.scss'
import AnonymousRouteHeader from '../AnonymousRouteHeader/AnonymousRouteHeader'

function GameAppHeader({ onPress, gameTitle }) {
    return (
        <div className='gameInHeader'>
            <div></div>
            <AnonymousRouteHeader title={gameTitle} styleProp='password-header' />
            <button onClick={onPress} className='exitGame'>Exit</button>
        </div>
    )
}

export default GameAppHeader