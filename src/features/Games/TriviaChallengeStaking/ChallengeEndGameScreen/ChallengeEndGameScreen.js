import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../../../utils/analytics";
import { getUser } from "../../../Auth/AuthSlice";
import { clearSession } from "../TriviaChallengeGameSlice";
import './ChallengeEndGameScreen.scss';
import GameButton from "../../../../components/GameButton/GameButton";
import { formatCurrency } from "../../../../utils/stringUtl";
// import BoostPopUp from "../../../../components/BoostPopUp/BoostPopUp";




const ChallengeEndGameScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const [loading, setLoading] = useState(false);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);
    // const [showModal, setShowModal] = useState(false);


    const goHome = () => {
        navigate('/dashboard');
        dispatch(clearSession());
    };


    const onPlayButtonClick = () => {
        setLoading(true);
        logToAnalytics('trivia_challenge_play_again_clicked', {
            'id': user.username,
        });
        dispatch(clearSession());
        navigate("/games-list")
        setLoading(false);

    }

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch])


    useEffect(() => {
        logToAnalytics("trivia_challenge_stake_completed", {
            'opponentName': challengeDetails.opponent.username,
            'username': challengeDetails.username,
        })
        if (Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score)) {
            logToAnalytics("trivia_challenge_stake_won", {
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
            return
        }
        if (Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score)) {
            logToAnalytics("trivia_challenge_stake_lost", {
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
            return
        }
        if (Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score)) {
            logToAnalytics("trivia_challenge_stake_draw", {
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
            return
        }
        if (challengeDetails.opponent.is_bot === true) {
            logToAnalytics("trivia_challenge_stake_draw", {
                'opponentName': challengeDetails.opponent.username,
                'username': challengeDetails.username,
            })
            return
        }
        return
        // eslint-disable-next-line 
    }, [])

    // useEffect(() => {
    //     if ((Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score)) || (Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score))) {
    //         setShowModal(true)
    //     }
    // }, [challengeDetails])

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <div >
            <div className="end-game-container" style={{ backgroundImage: "url(/images/success-background.png)" }} >
                <SelectedPlayers challengeDetails={challengeDetails} user={user} />
                {Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">You won the challenge</p>
                }
                {Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">You lost the challenge</p>
                }
                {Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">Draw, you can try again</p>
                }
                <WinningAmount practiceMode={practiceMode} cashMode={cashMode} />
                <WinningScore challengeDetails={challengeDetails} practiceMode={practiceMode} cashMode={cashMode} />
                <FinalScoreBoard challengeDetails={challengeDetails} cashMode={cashMode} practiceMode={practiceMode} />
                <GameButton goHome={goHome} playAgain={onPlayButtonClick} disabled={loading} />

            </div>
            {/* <BoostPopUp showModal={showModal} setShowModal={setShowModal} /> */}
        </div>
    )
}

const SelectedPlayers = ({ challengeDetails, user }) => {
    const username = user.username?.charAt(0) + user.username?.charAt(1)
    const opponentName = challengeDetails.opponent?.username?.charAt(0) + challengeDetails.opponent?.username?.charAt(1)
    return (
        <div className="players-container">
            <SelectedPlayer playerName={user.username} playerAvatar={username} />
            <img src='/images/versus.png' alt='versus' className="versus" />
            <SelectedPlayer playerName={challengeDetails.opponent.username} playerAvatar={opponentName} backgroundColor='#FEECE7' />
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar, backgroundColor }) => {
    return (
        <div className='player-container'>
            <div className='user-avatar' style={{ backgroundColor: backgroundColor }}>
                <span className='avatar-text'>{playerAvatar}</span>
            </div>
            <p className='player-name'>{playerName}</p>
        </div>
    )
}


const WinningScore = ({ challengeDetails, cashMode, practiceMode }) => {
    let opponentUsername = challengeDetails.opponent.username;
    if (opponentUsername.length > 9) {
        opponentUsername = opponentUsername.slice(0, 5)+'...';
    }
    return (
        <div className="winnings-container">
            <div className="score-count-container">
                <div className="user-count-container">
                    <span className="count-name">You</span>
                    <span className="score-count">{challengeDetails.score}</span>
                </div>
                {cashMode &&
                    <span className="winnings-header">Scores</span>
                }
                {practiceMode &&
                    <span className="winnings-header">Demo Scores</span>
                }
                <div className="user-count-container">
                    <span className="count-name">{opponentUsername}</span>
                    <span className="score-count">{challengeDetails.opponent.score}</span>
                </div>
            </div>
        </div>
    )
}

const WinningAmount = ({ cashMode, practiceMode }) => {
    const amount = useSelector(state => state.triviaChallenge.challengeDetails.amount_won);

    return (
        <div className="amount-container">
            {cashMode &&
                <span className="winnings-header">Winnings</span>
            }
            {practiceMode &&
                <span className="winnings-header">Demo Winnings</span>
            }
            <span className="amount">NGN {formatCurrency(amount)}</span>
        </div >
    )
}

const FinalScoreBoard = ({ challengeDetails, cashMode, practiceMode }) => {
    return (
        <div className='final-score-case'>
            {cashMode &&
                <span className="point-text-header">Game play statistics</span>
            }
            {practiceMode &&
                <span className='point-text-header'>Demo game statistics</span>
            }
            <div className='scoreContainer'>
                <span className='point-text'>Questions answered</span>
                <span className='point-number'>{challengeDetails.questions?.length / 2}</span>
            </div>
            <div className='scoreContainer'>
                <span className='point-text'>Answered correctly</span>
                <span className='point-number'>{challengeDetails.score}</span>
            </div>
            <div className='scoreContainer'>
                <span className='point-text'>Points earned</span>
                <span className='point-number'>{challengeDetails.score}pts</span>
            </div>
        </div>
    )
}



export default ChallengeEndGameScreen;