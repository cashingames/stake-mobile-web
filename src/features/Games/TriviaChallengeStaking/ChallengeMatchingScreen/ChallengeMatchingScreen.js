import React, { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { Player } from '@lottiefiles/react-lottie-player';
import HourGlass from '../../../../assets/hour-glass.json';
import './ChallengeMatchingScreen.scss';
import { useDispatch, useSelector } from "react-redux";
import { initializeFirestore } from "../../../../firebaseConfig";
import DoubleDialog from "../../../../components/DoubleButtonDialog/DoubleDialogButton";
import { useNavigate } from "react-router-dom";
import { setChallengeDetails } from "../TriviaChallengeGameSlice";

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


    console.log("this is the document we are working with", documentId)

    useEffect(() => {
        // eslint-disable-next-line 
        const unsub = onSnapshot(doc(db, documentId), (doc) => {
            const data = doc.data()
            console.log("Current data: ", data);

            if (data.status === "MATCHED" && data.opponent.status !== "COMPLETED") {
                dispatch(setChallengeDetails(data));
                setChallengeInfo(data);
                setDataUpdated(true);
                setTimeout(() => {
                    console.log("game loading", "navigating after 5 seconds")
                    navigate('/challenge-game');
                }, 5000);
            }

        });
        // eslint-disable-next-line 
    }, [])

    // const unsub = onSnapshot(doc(db, documentId), (doc) => {
    //     const data = doc.data()
    //     console.log("Current data: ", data);

    //     if (data.status === "MATCHED" && data.opponent.status !== "COMPLETED") {
    //         dispatch(setChallengeDetails(data));
    //         setChallengeInfo(data);
    //         setDataUpdated(true);
    //         setTimeout(() => {
    //             console.log("game loading", "navigating after 5 seconds")
    //             navigate('/challenge-game');
    //         }, 5000);
    //     }

    // });

    // unsub();


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

    useEffect(() => {

        //if no gameType name, it means the user navigated to this page directly
        if (gameType.name === undefined)
            navigate('/dashboard');
    }, [gameType.name, navigate]);


    return (
        <div className="challenge-matching-container">
            {!dataUpdated ?
                <p className="message">
                    Finding an opponent...
                </p>
                :
                <p className="message">
                    Nice, you have been matched
                </p>
            }
            <div className="animation-container">
                <Player src={HourGlass}
                    alt='Game Board'
                    autoplay
                    loop
                    className='player'
                    style={
                        {
                            height: '180px',
                            width: '180px'
                        }
                    } />
            </div>
            <div className="message-container">
                <SelectedPlayers user={user} dataUpdated={dataUpdated} challengeDetails={challengeInfo} />
            </div>
            <div className='purchase-boost'>
                <p className='boost-text'>Score higher with boosts</p>
                <div className='boost-container'>
                    {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                </div>
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
        <div style={{ backgroundImage: "url(/images/challenge-stage.png)" }} className="players-container">
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
                    <p className='boost-name'>{boost.name}</p>
                </div>
            </div>
        </div>
    )
}

export default ChallengeMatchingScreen;