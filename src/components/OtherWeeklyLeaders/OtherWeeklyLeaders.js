import React from 'react'
import './OtherLeaders.scss'

function OtherLeaders() {
    return (
        <div className='otherLeader-container'>
            <div className='avatar-case'>
            <div className='avatar-container'>
                <img
                    src="/images/user-icon.png"
                    className='avatar' alt='avatar'
                    onError={(e) => e.target.style.display = 'none'}
            />
            </div>
            <div className='user-points'>
                <p className='user'>Johnpoe</p>
                <p className='points'>21 pts</p>
            </div>
            </div>
            <div className='rank-case'>
                <p className='rank'>4</p>
            </div>
        </div>
    )
}

export default OtherLeaders