import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import './ChallengeMatchingScreen.scss';
import { useDispatch, useSelector } from "react-redux";
import { initializeFirestore } from "../../../../firebaseConfig";
import DoubleDialog from "../../../../components/DoubleButtonDialog/DoubleDialogButton";
import { useNavigate } from "react-router-dom";
import { setChallengeDetails } from "../TriviaChallengeGameSlice";
import logToAnalytics from "../../../../utils/analytics";

const backendUrl = process.env.REACT_APP_API_ROOT_URL;
const db = initializeFirestore();



const ChallengeMatchingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [dataUpdated, setDataUpdated] = useState(false);
    const [challengeInfo, setChallengeInfo] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [openAlert, setOpenAlert] = useState(false);
    const user = useSelector(state => state.auth.user);
    const boosts = useSelector(state => state.common.boosts);
    const gameType = useSelector(state => state.game.gameType);
    const documentId = useSelector(state => state.triviaChallenge.documentId);



    useEffect(() => {
        const unsub = onSnapshot(doc(db, documentId), (doc) => {
            const data = doc.data()

            if (data.status === "MATCHED" && data.opponent.status !== "COMPLETED") {
                logToAnalytics("trivia_challenge_stake_matched", {
                    'documentId': documentId,
                    'opponentName': data.opponent.username,
                    'username': data.username,
                });
                logToAnalytics("trivia_challenge_stake_start_initiated", {
                    'documentId': documentId,
                    'opponentName': data.opponent.username,
                    'username': data.username,
                });
                dispatch(setChallengeDetails(data));
                setChallengeInfo(data);
                setDataUpdated(true);
                setTimeout(() => {
                    navigate('/challenge-game');
                }, 5000);
            }

        }, error => {
        });
        return () => unsub();
        // eslint-disable-next-line 
    }, [documentId])


    const closeAlert = () => {
        setOpenAlert(false)
    }

    const cancelConfirmation = () => {
        setOpenAlert(true)
        setAlertMessage('Are you sure you want to cancel this challenge?')
    }

    const endChallenge = () => {
        setOpenAlert(false)
        navigate('/dashboard')
    }

    // disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    const handleGameBoardTabClosing = () => {
        navigate('/dashboard')
    }

    const alertUserBeforeClosinigGame = (event) => {
        event.preventDefault();
        event.returnValue = '';
    }
    useEffect(() => {
        window.addEventListener('beforeunload', alertUserBeforeClosinigGame)
        window.addEventListener('unload', handleGameBoardTabClosing)
        return () => {
            window.removeEventListener('beforeunload', alertUserBeforeClosinigGame)
            window.removeEventListener('unload', handleGameBoardTabClosing)
        }
    })

    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    return (
        <div style={{ backgroundImage: "url(/images/game-play-background.png)" }} className="challenge-matching-container">
            {!dataUpdated ?
                <div className="finding-container">
                    <p className="message">
                        Finding a player...
                    </p>
                    <img src='/images/finding-bar.png' alt='versus' />
                </div>

                :
                <p className="message">
                    Nice, you have been matched
                </p>
            }
            <div className='purchase-boost'>
                <p className='boost-text'>Score high points using boosts</p>
                <div className='boost-container'>
                    {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                </div>
            </div>
            <div className="message-container">
                <SelectedPlayers user={user} dataUpdated={dataUpdated} challengeDetails={challengeInfo} />
            </div>

            {!dataUpdated &&
                <button className="cancel-button" onClick={cancelConfirmation}>Cancel</button>
            }
            <DoubleDialog handleClose={closeAlert} open={openAlert} dialogueMessage={alertMessage} onClick={endChallenge} />

        </div>
    )
}

const SelectedPlayers = ({ user, dataUpdated, challengeDetails }) => {
    return (
        <div className="players-container">
            <SelectedPlayer playerName={user.username} playerAvatar={user.avatar ? `${backendUrl}/${user.avatar}` : "/images/user-icon.png"} />
            <img src='/images/versus.png' alt='versus' />
            {dataUpdated ?
                <SelectedPlayer playerName={challengeDetails.opponent.username} playerAvatar={challengeDetails.opponent.avatar ? `${backendUrl}/${challengeDetails.opponent.avatar}` : "/images/user-icon.png"} />
                :
                <SelectedPlayer playerName='....' playerAvatar="/images/question.png" />
            }
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

const BoostCardDetails = ({ boost }) => {
    return (
        <div className='boost-card-container'>
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <div className='boost-details-container'>
                <div className='boost-name-count'>
                    {/* <p className='boost-name'>{boost.name}</p> */}
                    <p className='boost-description'>{boost.description}</p>
                </div>
            </div>
        </div>
    )
}

export default ChallengeMatchingScreen;