
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { formatCurrency, formatNumber } from "../../../utils/stringUtl";
import { Player } from '@lottiefiles/react-lottie-player';
import Boost from '../../../assets/boost.json';
import './GameLoading.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;


export default function GameLoading() {

    const navigate = useNavigate();
    const boosts = useSelector(state => state.common.boosts);
    const loading = useSelector(state => state.game.startingGame);
    console.log(loading)

    useEffect(() => {
        if (!loading) {
            navigate('/games/staking/play/1')
        }
    }, [navigate, loading])

    return (
        <div className="game-loading">
            <p className="game-loading-text">Preparing your game board</p>
            <Player src={Boost}
                alt='boost'
                autoplay
                loop
                className='player'
                style={
                    { height: '200px', width: '200px' }
                } />
            <div className="boost-container">
                <p className="boost-instruction">Do you know that you can score higher by using boosts?</p>
                {boosts.map((boost, i) => <BoostCardDetails key={i} boost={boost} />)}
                <p className="boost-instruction">Boost are available in the store</p>
            </div>
        </div>
    )
}

const BoostCardDetails = ({ boost }) => {
    return (
        <div className="boost-card-container">
            <img src={`${backendUrl}/${boost.icon}`} className="boost-icon" alt='boost' />
            <div className='boostDetailsContainer'>
                <div className='boostNameCount'>
                    <p className='storeItemName'>{boost.name}</p>
                    <p className='boostCount'> x{formatNumber(boost.pack_count)}</p>
                </div>
                <p className='boostDescription'>{boost.description}</p>
            </div>
            <p className='cashPrice'>&#8358;{formatCurrency(boost.currency_value)}</p>
        </div>
    )
}