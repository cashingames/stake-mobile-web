import React from 'react'
import {Player} from '@lottiefiles/react-lottie-player'
import Clock from '../../assets/game-over.json'


function AnimatedClock() {
    return (
        <div>
            <Player src={Clock}
                alt='money bag'
                autoplay
                loop
                style={
                    {height: '120px'}
                }/>
        </div>
    )
}

export default AnimatedClock
