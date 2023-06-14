import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../../../utils/analytics";
import { getUser } from "../../../Auth/AuthSlice";
import { clearSession } from "../TriviaChallengeGameSlice";
import './ChallengeEndGameScreen.scss';
import GameButton from "../../../../components/GameButton/GameButton";
// import BoostPopUp from "../../../../components/BoostPopUp/BoostPopUp";


const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const ChallengeEndGameScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const [loading, setLoading] = useState(false);
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
        navigate("/select-category")
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
                {/* <div className="end-game-container" style={{ opacity: [showModal ? 0.6 : 1] }}> */}
                <SelectedPlayers challengeDetails={challengeDetails} />
                {Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">You won the challenge</p>
                }
                {Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">You lost the challenge</p>
                }
                {Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">Draw, you can try again</p>
                }
                <WinningAmount challengeDetails={challengeDetails} />
                <FinalScoreBoard challengeDetails={challengeDetails} />
                <GameButton goHome={goHome} playAgain={onPlayButtonClick} disabled={loading} />

            </div>
            {/* <BoostPopUp showModal={showModal} setShowModal={setShowModal} /> */}
        </div>
    )
}

const SelectedPlayers = ({  challengeDetails }) => {
    return (
        <div className="players-container">
            <SelectedPlayer playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
            <img src='/images/versus.png' alt='versus' />
                <SelectedPlayer playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar }) => {
    return (
        <div className='player-container'>
            <div className='avatar-container'>
                <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} />
            </div>
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}


const WinningAmount = ({ challengeDetails }) => {
    // const amount = useSelector(state => state.triviaChallenge.challengeDetails.amount_won);

    return (
        <div className="winnings-container">
            <span className="winnings-header">Scores</span>
            <div className="score-count-container">
                <div className="user-count-container">
                    <span className="count-name">You</span>
                    <span className="score-count">{challengeDetails.score}</span>
                </div>
                <div className="user-count-container">
                    <span className="count-name">{challengeDetails.opponent.username}</span>
                    <span className="score-count">{challengeDetails.opponent.score}</span>
                </div>
            </div>
        </div>
    )
}

const FinalScoreBoard = ({ challengeDetails }) => {
    return (
        <div className='final-score-case'>
            <span className='point-text-header'>Game play statistics</span>
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