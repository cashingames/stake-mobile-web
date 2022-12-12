import React from 'react'
import './Details.scss'

function Details({username, fullName, gamesPlayed, ranking, winRate, challenges}) {
    return (
        <>
            <div className='detailContainer'>
                <div className='detailCase'>
                    <p className='text'>Nickname</p>
                    <p className='value'>{username}</p>
                </div>
                <div className='detailCase'>
                    <p className='text'>Real Name</p>
                    <p className='value'>{fullName}</p>
                </div>
            </div>
            <div className='detailContainer'>
                <div className='detailCase'>
                    <p className='text'>Games Played</p>
                    <p className='value'>{gamesPlayed}</p>
                </div>
                <div className='detailCase'>
                    <p className='text'>Global Ranking</p>
                    <p className='value'>{ranking}</p>
                </div>
            </div>
            <div className='detailContainer'>
                <div className='detailCase'>
                    <p className='text'>Win Rate</p>
                    <p className='value'>{winRate}</p>
                </div>
                <div className='detailCase'>
                    <p className='text'>Challenges Played</p>
                    <p className='value'>{challenges}</p>
                </div>
            </div>
        </>

    )
}

export default Details
