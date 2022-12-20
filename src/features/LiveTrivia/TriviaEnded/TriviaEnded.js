import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import AnimatedClock from '../../../components/AnimatedClock/AnimatedClock'
import Winnings from '../../../components/Winnings/Winnings'
import { formatNumber } from '../../../utils/stringUtl'
import { getCommonData } from '../../CommonSlice'
import { getLiveTriviaLeaders } from '../../Games/GameSlice'
import './TriviaEnded.scss'
function TriviaEnded() {

    const navigate = useNavigate()
    const location = useLocation();
    const dispatch = useDispatch();
    const triviaLeaders = useSelector(state => state.game.triviaLeaders)
    const withStaking = useSelector(state => state.game.withStaking);
    const amountWon = useSelector(state => state.game.amountWon);

    const reviewStaking = () => {
        navigate("/review-stake")
    }

    const goToLeaderboard = () => {
        navigate('/trivia-leaderboard', { state: { triviaId: location.state.triviaId } })
    }

    const goHome = () => {
        navigate("/dashboard")
    }

    useEffect(() => {
        dispatch(getCommonData())
        dispatch(getLiveTriviaLeaders(
            location.state.triviaId
        ))
            .then(unwrapResult)
            .then((originalPromiseResult) => {
                // console.log('fetched')
            })
            .catch((rejectedValueOrSerializedError) => {
                // console.log(rejectedValueOrSerializedError)
            })
        // eslint-disable-next-line
    }, []);

    return (
        <div className='triviaEndedCase'>
            <ResultContainer />
            {withStaking &&
                <Winnings amountWon={amountWon} onPress={reviewStaking} />
            }
            <TriviaParticipants triviaLeaders={triviaLeaders} />
            <TriviaButton leaderboard={goToLeaderboard} home={goHome} />
        </div>
    )
}

export default TriviaEnded


const ResultContainer = () => {
    return (
        <div className='resultCase'>
            <AnimatedClock />
            <p className='resultMessag'>Thanks for completing the live trivia session today.
                View the final leaderboard at the end of the trivia to know your final position and
                stay tuned for upcoming live trivia sessions</p>
        </div>
    )
}

const TriviaParticipants = ({ triviaLeaders }) => {
    return (
        <div >{triviaLeaders.map((player, i) => <TriviaParticipant key={i} player={player} position={formatNumber(i + 1)} />)}</div>

    )
}


const TriviaParticipant = ({ position, player }) => {
    return (
        <div className='participant'>
            <div className='positionName'>
                <p className='position'>{position}</p>
                <p className='username'>{player.username}</p>
            </div>
            <p className='username'>{player.points}pts</p>
        </div>
    )
}



function TriviaButton({ leaderboard, home }) {
    return (
        <div className='triviaBtnCase'>
            <button className='homeBtn' onClick={leaderboard}>
                <p className='gameText'>
                    Leaderboard
                </p>
            </button>
            <button className='homeBtn' onClick={home}>
                <p className='gameText'>
                    Home
                </p>
            </button>
        </div>
    )
}
