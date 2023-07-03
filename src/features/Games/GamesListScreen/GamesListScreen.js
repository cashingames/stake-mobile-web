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
        <div className="trivia-bet-container" onClick={selectTriviaMode}>
            <img
                src="/images/trivia-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <img
                        src="/images/trivia-book.png"
                        alt='trivia'
                        className='book-avatar'
                    />
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Discover</p>
                        <p className="trivia-bet-header">Trivia Bet</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Play Now</p>
                </div>
            </div>
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
        <div className="trivia-bet-container" onClick={selectChallengeMode}>
            <img
                src="/images/challenge-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <img
                        src="/images/challenge-sword.png"
                        alt='trivia'
                        className='book-avatar'
                    />
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Challenge</p>
                        <p className="trivia-bet-header">A player</p>
                    </div>
                </div>
                <div className="play-button">
                    <p className="play-button-text">Play Now</p>
                </div>
            </div>
        </div>
    )
}

const TriviaRoomsCard = () => {

    return (
        <div className="trivia-bet-container">
            <img
                src="/images/rooms-banner.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="trivia-actions">
                <div className="sub-trivia-actions">
                    <img
                        src="/images/rooms-hat.png"
                        alt='trivia'
                        className='book-avatar'
                    />
                    <div className="trivia-actions-texts">
                        <p className="trivia-bet-headerI">Discover</p>
                        <p className="trivia-bet-header">Trivia Rooms</p>
                    </div>
                </div>
                <div className="play-buttoni">
                    <p className="play-button-text">Coming soon</p>
                </div>
            </div>
            {/* <p className="trivia-bet-header">Trivia Rooms</p>
            <img
                src="/images/rooms-hat.png"
                alt='trivia'
                className='trivia-avatar'
            />
            <div className="room-play-button">
                <p className="play-button-text">Coming Soon!!</p>
            </div> */}
        </div>
    )
}



export default GamesListScreen
