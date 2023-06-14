import React, { useEffect } from "react";
import { Player } from '@lottiefiles/react-lottie-player';
import HourGlass from '../../../../assets/hour-glass.json';
import { doc, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { initializeFirestore } from "../../../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import './ChallengeWaitingScreen.scss';
import { setChallengeDetails } from "../TriviaChallengeGameSlice";

const backendUrl = process.env.REACT_APP_API_ROOT_URL;
const db = initializeFirestore();



const ChallengeWaitingScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const documentId = useSelector(state => state.triviaChallenge.documentId);
    const challengeDetails = useSelector(state => state.triviaChallenge.challengeDetails);

    // disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    useEffect(() => {
        if (!documentId)
            return;

        const unsub = onSnapshot(doc(db, documentId), (doc) => {
            const data = doc.data()
            console.log("Current data: ", data);

            if (data.opponent.status === "COMPLETED") {
                dispatch(setChallengeDetails(data));
                navigate('/challenge-ended');
            }

        });
        return () => unsub();
        // eslint-disable-next-line 
    }, [documentId])

    return (
        <div className="game-waiting-container" style={{ backgroundImage: "url(/images/coins-background.png)" }}>
            <p className="message">Great, you finished first</p>
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
            <SelectedPlayers challengeDetails={challengeDetails} />
            <p className="message">Waiting for your opponent to finish</p>
            <p className="message">Loading....</p>
        </div>
    )
}

const SelectedPlayers = ({ challengeDetails }) => {
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

export default ChallengeWaitingScreen;