import React from 'react'
import { useNavigate } from 'react-router-dom'
import OtherLeaders from '../../../components/OtherLeaders/OtherLeaders'
import PrizePoolTitle from '../../../components/PrizePoolTitle/PrizePoolTitle'
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader'
import './WeeklyLeaderboards.scss'

function WeeklyLeaderboard() {

    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    return (
        <>
            <ScreenHeader title='Leaderboard' styleProp='weeklyLeaders-header' onClick={navigateHandler} />
            <div className='weeklyLeader-containter'>
            <PrizePoolTitle />
            <WeeklyGlobalLeaders />
            </div>
        </>
    )
}

export default WeeklyLeaderboard


const WeeklyGlobalLeaders = () => {
    return(
        <div>
            <WeeklyTopLeaders />
            <div className='rank-linear'>
                <p className='rank-text'>Your current rank</p>
                <div className='position-point'>
                    <p className='user-point'>2 pts</p>
                    <div className='user-rank-case'>
                        <p className='user-rank-text'>668</p>
                    </div>
                </div>
            </div>
            <OtherLeaders />
            <OtherLeaders />
            <OtherLeaders />

        </div>
    )
}

const WeeklyTopLeaders = () => {
    return(
        <div className='weeklyTopLeaders-container'>
            <WeeklyLeaders 
                name='John'
                points={54}
                position={2}
                avatarProp='second-avatar'
                positionProp='second-position'
            />
            <WeeklyLeaders 
                name='John'
                points={54}
                position={1}
                avatarProp='avatar'
                positionProp='first-position'
            />
            <WeeklyLeaders 
                name='JohnFriedp'
                points={54}
                position={3}
                avatarProp='third-avatar'
                positionProp='third-position'
            />
        </div>
    )
}


const WeeklyLeaders = ({name, points, position, avatarProp, positionProp}) => {
    return(
        <div className='weekly-winners'>
            <div className='avatar-container'>
            <img
                src="/images/user-icon.png"
                className={avatarProp} alt='avatar'
                onError={(e) => e.target.style.display='none'}
            />
            <div className={positionProp}>
                <p className='weeklyLeaders-position'>{position}</p>
            </div>
            </div>
            <p className='leader-name'>{name}</p>
            <p className='point'>{points}pts</p>
        </div>
    )
}