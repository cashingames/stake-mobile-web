import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OtherLeaders from '../../../components/OtherLeaders/OtherLeaders';
import PrizePoolTitle from '../../../components/PrizePoolTitle/PrizePoolTitle';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import { formatNumber } from '../../../utils/stringUtl';
import { getWeeklyLeadersByDate } from '../../CommonSlice';
import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import './WeeklyLeaderboards.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function WeeklyLeaderboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const leaders = useSelector(state => state.common.weeklyLeaderboard.leaderboard);
    const userRank = useSelector(state => state.common.weeklyLeaderboard.userRank)

    const [loading, setLoading] = useState(true);

    const today = new Date();
    const startDate = new Date(today.setDate(today.getDate() - today.getDay()));

    const endDate = new Date(today.setDate(today.getDate() - today.getDay() + 6));

    const navigateHandler = () => {
        navigate('/dashboard')
    }

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        dispatch(getWeeklyLeadersByDate({
            startDate,
            endDate
        })).then(() => setLoading(false));
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <LoaderScreen backgroundColor="background-color" color='#FFFF' />
    }

    return (
        <>
            <ScreenHeader title='Leaderboard' styleProp='weeklyLeaders-header' onClick={navigateHandler} />
            <div className='weeklyLeader-containter'>
                <PrizePoolTitle />
                <WeeklyGlobalLeaders leaders={leaders} userRank={userRank}  />
            </div>
        </>
    )
}

export default WeeklyLeaderboard


const WeeklyGlobalLeaders = ({ leaders,userRank }) => {
    return (
        <div>
            <WeeklyTopLeaders leaders={leaders} />
            <div className='rank-linear'>
                <p className='rank-text'>Your current rank</p>
                <div className='position-point'>
                    <p className='user-point'>{userRank.points} pts</p>
                    <div className='user-rank-case'>
                        <p className='user-rank-text'>{userRank.rank}</p>
                    </div>
                </div>
            </div>
            <OtherLeaders leaders={leaders} />

        </div>
    )
}

const WeeklyTopLeaders = ({ leaders }) => {
    const topLeaders = leaders?.slice(0, 3) ?? null;
    const firstLeader = topLeaders[0] ?? { username: "..." };
    const secondLeader = topLeaders[1] ?? { username: "..." };
    const thirdLeader = topLeaders[2] ?? { username: "..." };
    return (
        <div className='weeklyTopLeaders-container'>
            <WeeklyLeaders
                name={`${thirdLeader.username}`}
                points={`${formatNumber(thirdLeader.points ? `${thirdLeader.points}` : 0)} pts`}
                position={2}
                avatar={thirdLeader.avatar}
                avatarProp='second-avatar'
                positionProp='second-position'
            />
            <WeeklyLeaders
                name={`${firstLeader.username}`}
                points={`${formatNumber(firstLeader.points ? `${firstLeader.points}` : 0)} pts`}
                position={1}
                avatar={firstLeader.avatar}
                avatarProp='avatar'
                positionProp='first-position'
            />
            <WeeklyLeaders
                name={`${secondLeader.username}`}
                points={`${formatNumber(secondLeader.points ? `${secondLeader.points}` : 0)} pts`}
                position={3}
                avatar={secondLeader.avatar}
                avatarProp='third-avatar'
                positionProp='third-position'
            />
        </div>
    )
}


const WeeklyLeaders = ({ name, points, position, avatarProp, positionProp, avatar }) => {
    return (
        <div className='weekly-winners'>
            <div className='avatar-container'>
                <img
                    src={avatar ? `${backendUrl}/${avatar}` : "/images/user-icon.png"}
                    className={avatarProp} alt='avatar'
                />
                <div className={positionProp}>
                    <p className='weeklyLeaders-position'>{position}</p>
                </div>
            </div>
            <p className='leader-name'>{name}</p>
            <p className='point'>{points}</p>
        </div>
    )
}