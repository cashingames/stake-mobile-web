import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import './ChallengeMatchingScreen.scss';
import { useDispatch, useSelector } from "react-redux";
import { initializeFirestore } from "../../../../firebaseConfig";
import DoubleDialog from "../../../../components/DoubleButtonDialog/DoubleDialogButton";
import { useNavigate } from "react-router-dom";
import { setChallengeDetails } from "../TriviaChallengeGameSlice";
import logToAnalytics from "../../../../utils/analytics";
import { formatNumber } from "../../../../utils/stringUtl";

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
    const boosts = useSelector(state => state.auth.user.boosts);
    const gameType = useSelector(state => state.game.gameType);
    const documentId = useSelector(state => state.triviaChallenge.documentId);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);



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
        <div style={{ backgroundImage: "url(/images/match-background.png)", justifyContent: 'space-between' }} className="challenge-matching-container">
            <div>
            <ScreenHeader title='Challenge Player' styleProp='challenge-staking-header' />

                <div className='purchase-boost'>
                    <p className='boost-text'>Score high using boosts</p>
                    {cashMode &&
                        <>
                            {boosts?.length > 0 ?
                                <div className='boost-container'>
                                    {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                                </div>
                                :
                                <div className='boost-container'>
                                    <div className='boost-card-container'>
                                        <img
                                            src="/images/timefreeze-boost.png"
                                            className="boost-icon" alt='time freeze boost' />
                                        <p className="boost-name">x0</p>
                                    </div>
                                    <div className='boost-card-container'>
                                        <img
                                            src='/images/skip-boost.png'
                                            className="boost-icon" alt='Skip boost' />
                                        <p className="boost-name">x0</p>
                                    </div>
                                </div>
                            }
                        </>
                    }
                    {practiceMode &&
                        <DemoBoostCardDetails />
                    }
                </div>

                <div className="message-container">
                    <SelectedPlayers user={user} dataUpdated={dataUpdated} challengeDetails={challengeInfo} />
                </div>
                {!dataUpdated ?
                    <div className="finding-container">
                        <img src='/images/finding-bar.png' alt='versus' />

                        <p className="message">
                            Finding a player...
                        </p>
                    </div>

                    :
                    <div className="finding-container">
                        <img src='/images/matched-bar.png' alt='versus' />

                        <p className="message">
                            You have been matched
                        </p>
                    </div>
                }
            </div>
            <div>
                {!dataUpdated &&
                    <button className="cancel-button" onClick={cancelConfirmation}>Cancel</button>
                }
                {dataUpdated &&
                    <button className="cancel-button">Starting Game</button>
                }
                <DoubleDialog handleClose={closeAlert} open={openAlert} dialogueMessage={alertMessage} onClick={endChallenge} />
            </div>

        </div>
    )
}

const SelectedPlayers = ({ user, dataUpdated, challengeDetails }) => {
    const username = user.username?.charAt(0) + user.username?.charAt(1)
    const opponentName = challengeDetails.opponent?.username?.charAt(0) + challengeDetails.opponent?.username?.charAt(1)
    return (
        <div className="players-container">
            <SelectedPlayer playerName={user.username} playerAvatar={username} />
            <img src='/images/versus.png' alt='versus' />
            {dataUpdated ?
                <SelectedPlayer playerName={challengeDetails.opponent.username} playerAvatar={opponentName} backgroundColor='#FEECE7' />
                :
                <SelectedPlayer playerName='....' playerAvatar="?" backgroundColor='#FEECE7' />
            }
        </div>
    )
}

const SelectedPlayer = ({ playerName, playerAvatar, backgroundColor }) => {
    return (
        <div className='player-container'>
            <div className='user-avatar' style={{ backgroundColor: backgroundColor }}>
                <span className='avatar-text'>{playerAvatar}</span>
            </div>
            <p className='player-name'>@{playerName}</p>
        </div>
    )
}

const BoostCardDetails = ({ boost }) => {
    return (
        <div className='boost-card-container'>
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <p className='boost-name'>x{formatNumber(boost.count)}</p>
        </div>
    )
}
const DemoBoostCardDetails = () => {
    return (
        <div className='boost-container'>
            <div className='boost-card-container'>
                <img src='/images/timefreeze-boost.png' className="boost-icon" alt='boost' />
                <p className='boost-name'>x{formatNumber(20)}</p>
            </div>
            <div className='boost-card-container'>
                <img src='/images/skip-boost.png' className="boost-icon" alt='boost' />
                <p className='boost-name'>x{formatNumber(20)}</p>
            </div>
        </div>
    )
}

function ScreenHeader({ title, styleProp}) {
    return (
      <div className={`screenHeader ${styleProp}`}>
        <div></div>
        <p className='title'>{title}</p>
        <div></div>
      </div>
    )
  }

export default ChallengeMatchingScreen;