import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { reduceBoostCount } from '../../features/Auth/AuthSlice';
import { boostReleased, consumeBoost, pauseGame, skipQuestion } from '../../features/Games/TriviaChallengeStaking/TriviaChallengeGameSlice';
import { formatNumber } from '../../utils/stringUtl';
import ChallengeGameWidget from '../ChallengeGameWidget/ChallengeGameWidget';
import './ChallengeProgressWidget.scss'
const backendUrl = process.env.REACT_APP_API_ROOT_URL;


function ChallengeProgressWidget({ onComplete, challengeDetails }) {

    const dispatch = useDispatch();
    const boosts = useSelector(state => state.auth.user.boosts);
    const [showText, setShowText] = useState(true);
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
            // analytics().logEvent("trivia_challenge_freeze_boost_used", {
            //     'documentId': documentId,
            //     'opponentName': challengeDetails.opponent.username,
            //     'username': challengeDetails.username,
            // })
        }
        if (name === 'SKIP') {
            dispatch(skipQuestion());
            dispatch(boostReleased());
            // analytics().logEvent("trivia_challenge_skip_boost_used", {
            //     'documentId': documentId,
            //     'opponentName': challengeDetails.opponent.username,
            //     'username': challengeDetails.username,
            // })
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

    useEffect(() => {
        // Change the state every second or the time given by User.
        const interval = setInterval(() => {
            setShowText((showText) => !showText);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='gameProgressBoost'>
            <ChallengeGameWidget onComplete={onComplete} />
            <ChallengeStakingBoosts boosts={boosts} showText={showText} boostsToDisplay={boostsToDisplay} boostApplied={boostApplied} />
            <PlayersInfo challengeDetails={challengeDetails} />
        </div>
    )
}

const PlayersInfo = ({ challengeDetails }) => {
    return (
        <div className='players-container'>
            <UserInfo playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
            <p className='versus'>vs</p>
            <OpponentInfo playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
        </div>
    )
}

const UserInfo = ({ playerAvatar, playerName }) => {
    return (
        <div className='player-container'>
            <p className='user-name'>@{playerName}</p>
            <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className='player-avatar' />
        </div>
    )
}

const OpponentInfo = ({ playerAvatar, playerName }) => {
    return (
        <div className='player-container'>
            <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className='player-avatar' />
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}

const ChallengeStakingBoosts = ({ boosts, showText, boostsToDisplay, boostApplied }) => {
    return (
        <>

        {boosts?.length > 0 ?
            <div className='availableBoosts'>
                <div className='boostInfo'>
                    <p className='boostTitle'>BOOST</p>
                </div>
                {
                    boostsToDisplay().map((boost, index) =>
                        boost.count >= 1 &&
                        <ChallengeStakingBoost boost={boost} key={index} onConsume={boostApplied} showText={showText} />
                    )
                }

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
                alt='bomb' className={`boostIcon ${showText ? 'boostBlink' : 'boostNoBlink'}`} />
            <p className='boostCount'>x{formatNumber(boost.count)}</p>
        </div>
        <p className='boostName'>{boost.name}</p>
    </div>
    )
}

export default ChallengeProgressWidget