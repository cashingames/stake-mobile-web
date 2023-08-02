import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reduceBoostCount } from '../../features/Auth/AuthSlice';
import { boostReleased, consumeBoost, pauseGame, skipQuestion } from '../../features/Games/TriviaChallengeStaking/TriviaChallengeGameSlice';
import logToAnalytics from '../../utils/analytics';
import { formatNumber } from '../../utils/stringUtl';
import './ChallengeProgressWidget.scss'
import ProgressBar from '@ramonak/react-progress-bar';
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

    const emptyBoosts = [
        {
            "id": 1,
            "icon": '/images/timefreeze-boost.png',
            "count": 0,
            "boostName": 'TIME FREEZE'
        },
        {
            "id": 2,
            "icon": '/images/skip-boost.png',
            "count": 0,
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
        <div className='challenge-progress-boost'>
            <GameTopicProgress practiceMode={practiceMode} cashMode={cashMode} />
            <div>
                {cashMode &&
                    <ChallengeStakingBoosts boosts={boosts} boostsToDisplay={boostsToDisplay} boostApplied={boostApplied} emptyBoosts={emptyBoosts} />
                }
                {practiceMode &&
                    <ChallengePracticeBoosts practiceBoosts={practiceBoosts} boostApplied={practiceBoostApplied} />
                }
            </div>
        </div>
    )
}

function GameTopicProgress({ practiceMode, cashMode }) {
    const gameCategory = useSelector(state => state.game.gameCategory.name);
    const index = useSelector(state => state.triviaChallenge.currentQuestionIndex);
    const total = useSelector(state => state.triviaChallenge.totalQuestions);


    return (
        <div className='challenge-topic-progress'>
            <div className='category-container'>
                <span className='category-name'>{gameCategory}</span>
                <div className='questions-answered-container'>
                    <AnsweredGameProgress index={index} total={total} />
                    <p className='question-answered'>{`${index + 1}/${total}`}</p>
                </div>

            </div>
            {practiceMode &&
                <DemoDetails />
            }
            {cashMode &&
                <StakeDetails />
            }
        </div>
    )
}

function AnsweredGameProgress({ index, total }) {
    return (
        <ProgressBar completed={((index + 1) / total) * 100} maxCompleted={100}
            isLabelVisible={false} baseBgColor='#F2C8BC' bgColor='#E15220' height='12px' width='130px' borderRadius='32px' />
    )
}

const StakeDetails = () => {
    const amountStaked = useSelector(state => state.triviaChallenge.amountStaked);

    return (
        <div className='staking-container'>
            <div className='stake-container'>
                <span className='stake-header'>STK.</span>
                <span className='stake-amount'>&#8358;{amountStaked}</span>
            </div>
            <div></div>
        </div>
    )
}

const DemoDetails = () => {
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const user = useSelector(state => state.auth.user);
    return (
        <div className='staking-container'>
            <div className='stake-container'>
                <img src='/images/star.png' alt='start' className='star' />
                <span className='stake-amount'>Demo Game</span>
            </div>
            <SelectedPlayers user={user} challengeDetails={challengeDetails} />
        </div>

    )

}

const SelectedPlayers = ({ user, challengeDetails }) => {
    const username = user.username?.charAt(0) + user.username?.charAt(1)
    const opponentName = challengeDetails.opponent?.username?.charAt(0) + challengeDetails.opponent?.username?.charAt(1)
    return (
        <div className="players-details">
            <SelectedPlayer playerAvatar={username} />
            <SelectedPlayer playerAvatar={opponentName} backgroundColor='#FEECE7' />
        </div>
    )
}

const SelectedPlayer = ({ playerAvatar, backgroundColor }) => {
    return (
        <div className='player-container' style={{ backgroundColor: backgroundColor }}>
            <span className='avatar-text'>{playerAvatar}</span>
        </div>
    )
}


const ChallengeStakingBoosts = ({ boosts, boostsToDisplay, boostApplied, emptyBoosts }) => {

    return (
        <>

            {boosts?.length > 0 ?
                <div className='available-boosts-icons'>
                    {
                        boostsToDisplay().map((boost, index) =>
                            boost.count >= 1 &&
                            <ChallengeStakingBoost boost={boost} key={index} onConsume={boostApplied} />
                        )
                    }
                </div>

                :
                <NoBoost emptyBoosts={emptyBoosts} />
            }
        </>
    )
}

const NoBoost = ({ emptyBoosts }) => {
    return (
        <div className='available-boosts-icons'>
            {
                emptyBoosts.map((practiceBoost, index) =>
                    <ChallengePracticeBoost practiceBoost={practiceBoost} key={index} />
                )
            }
        </div>
    )
}

const ChallengePracticeBoosts = ({ practiceBoosts, boostApplied }) => {
    return (
        <div className='available-boosts-icons'>
            {
                practiceBoosts.map((practiceBoost, index) =>
                    <ChallengePracticeBoost practiceBoost={practiceBoost} key={index} onConsume={boostApplied} />
                )
            }
        </div>
    )
}

const ChallengeStakingBoost = ({ boost, onConsume }) => {
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