import React from 'react'
// import {Player} from '@lottiefiles/react-lottie-player'
// import Boost from '../../assets/boost.json'
import './GameAppHeader.scss'
import AnonymousRouteHeader from '../AnonymousRouteHeader/AnonymousRouteHeader'

function GameAppHeader({ onPress, gameTitle }) {
    return (
        <div className='gameInHeader'>
            <button onClick={onPress} className='exitGame'>X</button>
            <AnonymousRouteHeader title={gameTitle} styleProp='password-header' />
            <div></div>
        </div>
    )
}

export default GameAppHeader