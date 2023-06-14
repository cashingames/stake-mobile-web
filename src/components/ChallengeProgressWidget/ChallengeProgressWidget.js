import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reduceBoostCount } from '../../features/Auth/AuthSlice';
import { boostReleased, consumeBoost, pauseGame, skipQuestion } from '../../features/Games/TriviaChallengeStaking/TriviaChallengeGameSlice';
import logToAnalytics from '../../utils/analytics';
import { formatNumber } from '../../utils/stringUtl';
import './ChallengeProgressWidget.scss'
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function ChallengeProgressWidget({ challengeDetails }) {

    const dispatch = useDispatch();
    const boosts = useSelector(state => state.auth.user.boosts);
    const gameMode = useSelector(state => state.game.gameMode);
    const documentId = useSelector(state => state.triviaChallenge.documentId);

    const boostApplied = (data) => {
        console.log(data)
        dispatch(consumeBoost(data))
        dispatch(reduceBoostCount(data.id))
        const name = data.name.toUpperCase();
        if (name === 'TIME FREEZE') {
            dispatch(pauseGame(true));
            setTimeout(() => {
                dispatch(pauseGame(false))
                dispatch(boostReleased())
            }, 10000);
            logToAnalytics("trivia_challenge_freeze_boost_used", {
                'documentId': documentId,
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
        }
        if (name === 'SKIP') {
            dispatch(skipQuestion());
            dispatch(boostReleased());
            logToAnalytics("trivia_challenge_skip_boost_used", {
                'documentId': documentId,
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
        }
        // if (name === "BOMB") {
        //     dispatch(bombOptions());
        //     dispatch(boostReleased());
        //     analytics().logEvent("trivia_challenge_bomb_boost_used", {
        //         'documentId': documentId,
        //         'opponentName': challengeDetails.opponent.username,
        //         'username': challengeDetails.username,
        //     })
        // }
    }

    const boostsToDisplay = () => {
        //  bomb is only applicable to multiple choices
        if (gameMode.name === "CHALLENGE") {
            return boosts.filter(x => x.name.toUpperCase() !== "BOMB");
        }
        return boosts;
    }


    return (
        <div className='gameProgressBoost'>
            <ChallengeStakingBoosts boosts={boosts} boostsToDisplay={boostsToDisplay} boostApplied={boostApplied} />
        </div>
    )
}


const ChallengeStakingBoosts = ({ boosts, boostsToDisplay, boostApplied }) => {
    const user = useSelector(state => state.auth.user);

    return (
        <>

            {boosts?.length > 0 ?
                <div className='availableBoosts'>
                    <div className='boostInfo'>
                        <p className='boostTitle'>{user.username}, score higher with boost</p>
                    </div>
                    <div className='available-boosts-icons'>
                        {
                            boostsToDisplay().map((boost, index) =>
                                boost.count >= 1 &&
                                <ChallengeStakingBoost boost={boost} key={index} onConsume={boostApplied} />
                            )
                        }
                    </div>

                </div>
                :
                <></>
            }
        </>
    )
}

const ChallengeStakingBoost = ({ boost, showText, onConsume }) => {
    const activeBoost = useSelector(state => state.triviaChallenge.activeBoost);
    const isActive = activeBoost.id === boost.id;
    return (
        <div className='boostContainer' onClick={() => isActive ? {} : onConsume(boost)}>
            <div className={`availableBoost ${isActive ? 'boostActive' : {}}`}>
                <img
                    src={`${backendUrl}/${boost.icon}`}
                    alt='bomb' className='boostIcon' />
                <p className='boostCount'>x{formatNumber(boost.count)}</p>
            </div>
            {/* <p className='boostName'>{boost.name}</p> */}
        </div>
    )
}

export default ChallengeProgressWidget