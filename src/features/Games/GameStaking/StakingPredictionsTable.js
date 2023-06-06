
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { getGameStakes } from '../GameSlice';

import './StakingPredictionsTable.scss'

export default function StakingPredictionsTable({ stake, usePreviousOdds }) {

    const dispatch = useDispatch();
    const odds = useSelector(state => usePreviousOdds ? state.game.previousStakeOdds : state.game.stakeOdds);
    const correctCount = useSelector(state => state.game.correctCount);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (usePreviousOdds)
            return;

        setLoading(true);
        dispatch(getGameStakes()).then(() => { setLoading(false) });
    }, [dispatch, usePreviousOdds])


    const highlightCorrect = (score) => {

        if (correctCount === Number(score) && usePreviousOdds) {
            return 'amountWon'
        }
    }

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
                {odds.map((odd) => <StakingPredictionsRow
                    key={odd.id}
                    stake={stake}
                    odd={odd}
                    styleProp={highlightCorrect(odd.score)} />)
                }
            </div>
        </div>

    )
}

const StakingPredictionsRow = ({ stake, odd, styleProp }) => {
    const textStyleProp = styleProp ? 'winner-text' : null;
    return (
        <div className={styleProp}>
            <p className={textStyleProp}><IoCheckmarkCircleOutline size={15} /><span>{odd.score}</span></p>
            <p className={textStyleProp}><IoTimeOutline size={15} color='#FF932F' /><span className="odds">x{odd.odd}</span></p>
            <p className={textStyleProp}>NGN {stake * odd.odd}</p>
        </div>
    )
}