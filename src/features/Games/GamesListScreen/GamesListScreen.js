import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import './GamesListScreen.scss'
import AppHeader from "../../../components/AppHeader/AppHeader";
import Dialogue from '../../../components//Dialogue/Dialogue'
import { useDispatch, useSelector } from "react-redux";
import logToAnalytics from "../../../utils/analytics";
import SelectGameMode from "../SelectGameMode/SelectGameMode"
import { setCashMode, setGameMode, setGameType, setPracticeMode } from "../../../features/Games/GameSlice";
import BottomSheet from "../../../components/BottomSheet/BottomSheet";


const GamesListScreen = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const user = useSelector(state => state.auth.user);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    const closeAlert = () => {
        setOpenAlert(false)
    }

    const openBottomSheet = () => {
        setOpen(true)
    }

    const closeBottomSheet = () => {
        setOpen(false)
    }

    const playTriviaForCash = () => {
        dispatch(setPracticeMode(false));
        dispatch(setCashMode(true));
        logToAnalytics("trivia_play_with_cash_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        })
        closeBottomSheet()
        navigate('/select-category')
    }
    
    const playChallengeForCash = () => {
        dispatch(setPracticeMode(false));
        dispatch(setCashMode(true));
        logToAnalytics("challenge_play_with_cash_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        })
        closeBottomSheet()
       navigate('/select-category')
    }

    const playChallengeForFree = () => {
        dispatch(setCashMode(false));
        dispatch(setPracticeMode(true));
        logToAnalytics("challenge_play_for_free_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        })
        closeBottomSheet()
        navigate('/select-category')
    }

    const playTriviaForFree = () => {
        closeBottomSheet()
        setOpenAlert(true)
        setAlertMessage('This mode is unavailable')
    }


    return (
        <>
            <ScreenHeader title='All Games' styleProp='games-header' iconProp='games-back' onClick={navigateHandler} />
            <div style={
                { backgroundImage: "url(/images/game-play-background.png)" }
            }
                className='games-list-container'>
                <GamesCards openBottomSheet={openBottomSheet}/>
            </div>
            <AppHeader heading='Games' style={{ color: '#000000' }} />
            <BottomSheet open={open} closeBottomSheet={closeBottomSheet}
                BSContent={<SelectGameMode  
                    playTriviaForCash={playTriviaForCash}
                    playTriviaForFree={playTriviaForFree}
                    playChallengeForCash={playChallengeForCash}
                    playChallengeForFree={playChallengeForFree}/>}
            />
             <Dialogue open={openAlert} handleClose={closeAlert} dialogueMessage={alertMessage} />
        </>
    )
}

const GamesCards = ({openBottomSheet}) => {
    return (
        <div className="main-games-container">
             <TriviaBetCard openBottomSheet={openBottomSheet}/>
            <TriviaChallengeCard openBottomSheet={openBottomSheet}/>
            <JackpotBetCard />
            <TriviaRoomsCard />
        </div>
    )
}

const TriviaBetCard = ({openBottomSheet}) => {
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectTriviaMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        openBottomSheet()
        logToAnalytics("trivia_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
    };

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/single-player.png' alt='challenge mode' />
            </div>
            <p className="game-mode-desc">Single player</p>
            <button className="play-btn" onClick={selectTriviaMode}>
                <p className="play-button-text">Play now</p>
            </button>
        </div>
    )
}

const TriviaChallengeCard = ({openBottomSheet}) => {
    const dispatch = useDispatch();
    const gameMode = useSelector(state => state.common.gameModes[1]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

    const selectChallengeMode = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        openBottomSheet()
        logToAnalytics("trivia_challenge_staking_selected", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'gamemode': gameMode.displayName,
        });
    };

    return (
        <div className="trivia-bet-container">
            <div className="image-container">
                <img className="game-icon" src='/images/challenge-player.png' alt="sigle player mode" />
            </div>
            <p className="game-mode-desc">Challenge a Player</p>
            <button className="play-btn" onClick={selectChallengeMode}>
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
            <button className="play-btn" style={{ backgroundColor: '#EA8663' }}>
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
            <button className="play-btn" style={{ backgroundColor: '#EA8663' }}>
                <p className="play-button-text">Coming soon</p>
            </button>
        </div>

    )
}



export default GamesListScreen
