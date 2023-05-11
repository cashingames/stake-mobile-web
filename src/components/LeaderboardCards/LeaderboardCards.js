import React from "react";
import './LeaderboardCards.scss';
import logToAnalytics from "../../utils/analytics";
import { useNavigate } from "react-router-dom";

const LeaderboardCards = () => {
    return (
        <div className="leaders-container">
            <BoostsCard />
            <TopLeaderboards />
            <ChallengeLeaderboard />
        </div>
    )
}

const TopLeaderboards = () => {
    return (
        <div className="top-leaders-container">
            <p className="top-leaders-header">Leaderboard</p>
            <img
                src="/images/leader-coin.png"
                alt='crown'
                className='avatar'
            />
            <p className="top-leaders-text">Top leaders based on earnings</p>
            <div className="play-button">
                <p className="play-button-text">Coming Soon!!</p>
            </div>
        </div>
    )
}

const ChallengeLeaderboard = () => {
    return (
        <div className="challenge-container">
            <p className="top-leaders-header">Challenges</p>
            <img
                src="/images/challenge-coin.png"
                alt='crown'
                className='avatar'
            />
            <p className="top-leaders-text">Daily & weekly challenges</p>
            <div className="challenge-button">
                <p className="play-button-text">Coming Soon!!</p>
            </div>
        </div>
    )
}

const BoostsCard = () => {
    const navigate = useNavigate();

    const goToStore = () => {
        logToAnalytics("boost_card_clicked");
        navigate('/store')
    };

    return (
        <div className="boosts-container" onClick={goToStore}>
            <p className="top-leaders-header">Boost</p>
            <img
                src="/images/boost-chest.png"
                alt='crown'
                className='avatar'
            />
            <p className="top-leaders-text">Bonuses, Time freeze & Skips</p>
            <div className="boost-button">
                <p className="play-button-text">Learn More</p>
            </div>
        </div>
    )
}

export default LeaderboardCards;