import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import logToAnalytics from "../../../../utils/analytics";
import { formatCurrency, formatNumber } from '../../../../utils/stringUtl';
import { getUser } from "../../../Auth/AuthSlice";
import { clearSession } from "../TriviaChallengeGameSlice";
import './ChallengeEndGameScreen.scss';
import BoostPopUp from "../../../../components/BoostPopUp/BoostPopUp";


const backendUrl = process.env.REACT_APP_API_ROOT_URL;


const ChallengeEndGameScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);


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

    useEffect(() => {
        if ((Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score)) || (Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score))) {
            setShowModal(true)
        }
    }, [challengeDetails])

    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    return (
        <div >
            <div className="end-game-container" style={{ opacity: [showModal ? 0.6 : 1] }}>
                {Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">Congrats {user.username}</p>
                }
                {Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">Sorry {user.username}</p>
                }
                {Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score) &&
                    <p className="head-text">Draw, you can try again</p>
                }
                <ChallengePlayers challengeDetails={challengeDetails} />
                <WinningAmount challengeDetails={challengeDetails} />
                <FinalScoreBoard challengeDetails={challengeDetails} />
                <div className="game-buttons">
                    <GameButton onClick={goHome} buttonText='Return to home' />
                    <GameButton onClick={onPlayButtonClick} buttonText={loading ? 'loading...' : 'Play Again'} disabled={loading} />
                </div>
            </div>
            <BoostPopUp showModal={showModal} setShowModal={setShowModal} />
        </div>
    )
}

const ChallengePlayers = ({ challengeDetails }) => {
    return (
        <div className="players-container">
            {Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score) && <>
                <ChallengeWinner playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
                <ChallengeLoser playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
            </>
            }
            {Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score) && <>
                <ChallengeLoser playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
                <ChallengeWinner playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
            </>
            }
            {Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score) &&
                <>
                    <ChallengeWinner playerName={challengeDetails.username} playerAvatar={challengeDetails.avatar ? `${backendUrl}/${challengeDetails.avatar}` : "/images/user-icon.png"} />
                    <ChallengeLoser playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
                </>
            }
        </div>

    )
}

const ChallengeWinner = ({ playerName, playerAvatar }) => {
    return (
        <div className="player-info-container">
            <p className="username">{playerName}</p>
            <div className="avatar-container">
                <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className="winner-avatar" />
            </div>
        </div>
    )
}

const ChallengeLoser = ({ playerName, playerAvatar }) => {
    return (
        <div className="player-info-container">
            <p className="username">{playerName}</p>
            <img src={playerAvatar} alt='user' onError={(e) => e.target.style.display = 'none'} className="loser-avatar" />
        </div>
    )
}

const WinningAmount = ({ challengeDetails }) => {
    const amount = useSelector(state => state.triviaChallenge.challengeDetails.amount_won);

    return (
        <div className="winnings-container">
            {Number.parseFloat(challengeDetails.score) > Number.parseFloat(challengeDetails.opponent.score) &&
                <p className="winning-text">You have won <p className="winning-amount"> &#8358;{formatCurrency(amount)}!</p></p>
            }
            {Number.parseFloat(challengeDetails.score) < Number.parseFloat(challengeDetails.opponent.score) &&
                <p className="winning-text">You can try again</p>
            }
            {Number.parseFloat(challengeDetails.score) === Number.parseFloat(challengeDetails.opponent.score) &&
                <p className="winning-text">You have been refunded</p>
            }
        </div>
    )
}

const FinalScoreBoard = ({ challengeDetails }) => {
    return (
        <div className="score-container">
            <p className="score-text">Final score</p>
            <div className="score-count-container">
                <p className="winner-count">{challengeDetails.score}</p>
                <p className="colon">:</p>
                <p className="loser-count">{challengeDetails.opponent.score}</p>
            </div>
        </div>
    )
}

const GameButton = ({ buttonText, disabled, onClick }) => {
    return (
        <button className={`${disabled ? 'is-disabled' : 'game-button'}`} onClick={onClick}>{buttonText}</button>
    )
}


export default ChallengeEndGameScreen;