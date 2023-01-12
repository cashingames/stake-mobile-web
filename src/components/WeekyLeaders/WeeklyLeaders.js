import React, { useEffect } from 'react'
import './WeeklyLeaders.scss'
import { formatNumber } from '../../utils/stringUtl'
import { useDispatch, useSelector } from 'react-redux'
import { getWeeklyLeadersByDate } from '../../features/CommonSlice';
import PrizePoolTitle from '../PrizePoolTitle/PrizePoolTitle'
import { setGameMode } from '../../features/Games/GameSlice';
import { useNavigate } from 'react-router-dom'

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function WeeklyLeaderBoard({gameModes}) {
    const leaders = useSelector(state => state.common.weeklyLeaderboard.leaderboard)
    const topLeaders = leaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const navigateHandler = () => {
        navigate('/weekly-leaders')
    }

    const gameModeSelected = gameModes.find(mode => mode.name === 'EXHIBITION')

    const playGame = () => {
        dispatch(setGameMode(gameModeSelected));
        navigate('/select-category')
    }
    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - today.getDay()));

    const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const firstDay = startDate.toDateString()
    const lastDay = endDate.toDateString()

    useEffect(() => {
        dispatch(getWeeklyLeadersByDate({
            startDate,
            endDate
        }));
        // eslint-disable-next-line
    }, [])


    return (
        <>
            <div className='weekly-challengers-container'>
                <div className='wrapper'>
                    <p className='topChallengeTitle'>Top Players for the week</p>
                    <p className='viewMore-text' onClick={navigateHandler}>View More</p>
                </div>
                <div className='topChallenge-cover'>
                    <div className='modal-top'>
                    <p className='modal-date'>{firstDay} - {lastDay}</p>
                    <PrizePoolTitle styleProp='view-text' />
                    </div>
                    <div className='topChallengerContainer'>
                        <WeeklyChallenger
                            stageImageUrl="/images/month-pod3.png"
                            username={`${thirdLeader.username}`}
                            avatar={thirdLeader.avatar}
                            styleProp='others'
                            avatarCase='other-avatar-case'
                            avatarProp='otherAvatar'
                            stage='stage'
                            points={`${formatNumber(thirdLeader.points ? `${thirdLeader.points}` : 0)} pts`}

                        />
                        <WeeklyChallenger
                            stageImageUrl="/images/month-pod1.png"
                            username={`${firstLeader.username}`}
                            avatar={firstLeader.avatar}
                            styleProp='winner'
                            avatarProp='avatar'
                            stage='winner-stage'
                            avatarCase='winner-avatar-case'
                            points={`${formatNumber(firstLeader.points ? `${firstLeader.points}` : 0)} pts`}

                        />
                        <WeeklyChallenger
                            stageImageUrl="/images/month-pod2.png"
                            username={`${secondLeader.username}`}
                            avatar={secondLeader.avatar}
                            styleProp='others'
                            avatarCase='other-avatar-case'
                            avatarProp='otherAvatar'
                            stage='stage'
                            points={`${formatNumber(secondLeader.points ? `${secondLeader.points}` : 0)} pts`}
                        />
                    </div>
                <div className='btn-case'>
                <button className='plays-btn' onClick={playGame}>Play now</button>
                </div>
                </div>
            </div>
        </>
    )
}

const WeeklyChallenger = ({ username, avatar, stageImageUrl, styleProp, avatarProp, points, stage, avatarCase }) => {

    return (
        <div className='weekly-position-container'>
            <div className={styleProp}>
                <div className={avatarCase}>
                <img
                src={avatar ? `${backendUrl}/${avatar}` : "/images/user-icon.png"}
                className={avatarProp} alt='user avatar'
                onError={(e) => e.target.style.display='none'} />
                </div>

                <p className='leaderName'>{username}</p>
                <p className='leader-points'>{points}</p>
            </div>
            <img
                src={stageImageUrl}
                className={stage}
                alt='stage'
            />
        </div>
    )
}

export default WeeklyLeaderBoard

