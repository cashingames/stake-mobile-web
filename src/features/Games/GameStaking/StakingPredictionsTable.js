
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { getGameStakes } from '../GameSlice';

import './StakingPredictionsTable.scss'

export default function StakingPredictionsTable({ stake, usePreviousOdds }) {

    const dispatch = useDispatch();
    const gameStakes = useSelector(state => state.game.gameStakes);

    const correctCount = useSelector(state => state.game.correctCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (usePreviousOdds)
            return;

        setLoading(true);
        dispatch(getGameStakes()).then(() => { setLoading(false) });
    }, [dispatch, usePreviousOdds])


    if (loading)
        return <LoaderScreen backgroundColor="store-background-color" />

    return (
        <div className="staking-predictions-table">
            <p>How to win</p>
            <div className='odds-header'>
                <p>Outcome</p>
                <p className='odd-header'>Odds</p>
                <p>Payout</p>
            </div>
            <div className='odds'>
                {gameStakes.map((gameStake, i) => <StakingPredictionsRow key={i} gameStake={gameStake} position={i + 1}
                // eslint-disable-next-line
                    stake={stake} styleProp={correctCount == (gameStake.score) ? 'winnerStyle' : ''} />)}
            </div>
        </div>

    )
}

const StakingPredictionsRow = ({ stake, gameStake, styleProp }) => {
    return (
        <div className={`stake-sub ${styleProp}`}>
            
            <div className="stake-score-container">
                <IoCheckmarkCircleOutline size={15} />
                <span className="stake-score-digit">{gameStake.score}</span>
            </div>
            <div className="stake-number">
                <IoTimeOutline size={15} color='#FF932F' />
                <span className="stake-odd-digit">x{gameStake.odd}</span>
            </div>
            <p className="stake-winnings">NGN {stake * gameStake.odd}</p>
        </div>
    )
}