import React from 'react'
// import {Player} from '@lottiefiles/react-lottie-player'
// import Boost from '../../assets/boost.json'
import './GameAppHeader.scss'
import AnonymousRouteHeader from '../AnonymousRouteHeader/AnonymousRouteHeader'

function GameAppHeader({ onPress }) {
    return (
        <div className='gameInHeader'>
            <div></div>
            {/* <div className='boostContainer' onClick={openBoost}>
                <p className='gameInText'>Power Ups</p>
                <Player src={Boost}
                    alt='boost'
                    autoplay
                    loop
                    className='player'
                    style={
                        {height: '40px', width:'40px'}
                    }/>
            </div> */}
            <AnonymousRouteHeader title='Wallet' styleProp='password-header' />
            <button onClick={onPress} className='exitGame'>Exit</button>
        </div>
    )
}

export default GameAppHeader