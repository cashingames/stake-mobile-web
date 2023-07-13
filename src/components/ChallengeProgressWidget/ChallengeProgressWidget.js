import React, { useState } from 'react'
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
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);
    const [updatepracticeFreezeCount, setUpdatePracticeFreezeCount] = useState(20);
    const [updatepracticeSkipCount, setUpdatePracticeSkipCount] = useState(20);

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

    const practiceBoosts = [
        {
            "id": 1,
            "icon": '/images/timefreeze-boost.png',
            "count": updatepracticeFreezeCount,
            "boostName": 'TIME FREEZE'
        },
        {
            "id": 2,
            "icon": '/images/skip-boost.png',
            "count": updatepracticeSkipCount,
            "boostName": 'SKIP'
        }
    ]

    const practiceBoostApplied = (data) => {
        const boostName = data.boostName.toUpperCase();
        if (boostName === 'TIME FREEZE') {
            setUpdatePracticeFreezeCount(data.count - 1)
            dispatch(pauseGame(true));
            setTimeout(() => {
                dispatch(pauseGame(false))
                dispatch(boostReleased())
            }, 10000);
        }
        if (boostName === 'SKIP') {
            setUpdatePracticeSkipCount(data.count - 1)
            dispatch(skipQuestion());
            dispatch(boostReleased());
        }
    }


    return (
        <div className='gameProgressBoost'>
            {cashMode &&
                <ChallengeStakingBoosts boosts={boosts} boostsToDisplay={boostsToDisplay} boostApplied={boostApplied} />
            }
            {practiceMode &&
                <ChallengePracticeBoosts practiceBoosts={practiceBoosts} boostApplied={practiceBoostApplied} />
            }
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

const ChallengePracticeBoosts = ({ practiceBoosts, boostApplied }) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div className='availableBoosts'>
            <div className='boostInfo'>
                <p className='boostTitle'>{user.username}, score higher with boost</p>
            </div>
            <div className='available-boosts-icons'>
                {
                    practiceBoosts.map((practiceBoost, index) =>
                        <ChallengePracticeBoost practiceBoost={practiceBoost} key={index} onConsume={boostApplied} />
                    )
                }
            </div>

        </div>

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

const ChallengePracticeBoost = ({ practiceBoost, onConsume }) => {
    return (
        <div className='boostContainer' onClick={() => onConsume(practiceBoost)}>
            <div className='availableBoost'>
                <img
                    src={practiceBoost.icon}
                    alt='bomb' className='boostIcon' />
                <p className='boostCount'>x{formatNumber(practiceBoost.count)}</p>
            </div>
        </div>
    )
}

export default ChallengeProgressWidget