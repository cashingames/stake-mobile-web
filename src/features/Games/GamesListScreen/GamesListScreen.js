import React from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import './GamesListScreen.scss'
import AppHeader from "../../../components/AppHeader/AppHeader";
import { useDispatch, useSelector } from "react-redux";
import logToAnalytics from "../../../utils/analytics";
import { setGameMode, setGameType } from "../../../features/Games/GameSlice";


const GamesListScreen = () => {
    let navigate = useNavigate();

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <ScreenHeader title='All Games' styleProp='games-header' iconProp='games-back' onClick={navigateHandler} />
            <div style={
                { backgroundImage: "url(/images/game-play-background.png)" }
            }
                className='games-list-container'>
                <GamesCards />
            </div>
            <AppHeader heading='Games' style={{ color: '#000000' }} />

        </>
    )
}

const GamesCards = () => {
    return (
        <div className="main-games-container">
            <TriviaChallengeCard />
            <TriviaBetCard />
            <JackpotBetCard />
            <TriviaRoomsCard />
        </div>
    )
}

const TriviaBetCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectTriviaMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')
    };

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/challenge-player.png' alt='challenge mode'/>
            </div>
            <p className="game-mode-desc">Challenge a player</p>
            <button className="play-btn" onClick={selectTriviaMode}>
                <p className="play-button-text">Play now</p>
            </button>
        </div>
    )
}

const TriviaChallengeCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[1]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectChallengeMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        logToAnalytics("trivia_challenge_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
        navigate('/select-category')
    };

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/single-player.png' alt="sigle player mode" />
            </div>
            <p className="game-mode-desc">Single Player</p>
            <button className="play-btn"  onClick={selectChallengeMode}>
            <p className="play-button-text">Play now</p>
            </button>
        </div>
    )
}

const JackpotBetCard = () => {

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/money-dynamic-color.png' alt="Jackpot bet" />
            </div>
            <p className="game-mode-desc">Jackpot Card</p>
            <button className="play-btn" style={{backgroundColor:  '#EA8663'}}>
            <p className="play-button-text">Coming soon</p>
            </button>
        </div>

    )
}


const TriviaRoomsCard = () => {

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/notify-heart-dynamic-color.png' alt="trivia room" />
            </div>
            <p className="game-mode-desc">Trivia rooms</p>
            <button className="play-btn" style={{backgroundColor: '#EA8663'}}>
            <p className="play-button-text">Coming soon</p>
            </button>
        </div>

    )
}



export default GamesListScreen
