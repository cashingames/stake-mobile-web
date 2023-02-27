
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { getGameStakes } from '../GameSlice';

import { formatCurrency } from "../../../utils/stringUtl";

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
        <table className="staking-predictions-table">
            <caption>How to win</caption>
            <thead>
                <tr>
                    <th>Outcome</th>
                    <th>Odds</th>
                    <th>Payout</th>
                </tr>
            </thead>
            <tbody>
                {odds.map((odd) => <StakingPredictionsRow
                    key={odd.id}
                    stake={stake}
                    odd={odd}
                    styleProp={highlightCorrect(odd.score)}  />)
                }
            </tbody>
        </table>
    )
}

const StakingPredictionsRow = ({ stake, odd, styleProp }) => {
    const textStyleProp = styleProp ? 'winner-text': null;
    return (
        <tr className={styleProp}>
            <td className={textStyleProp}><IoCheckmarkCircleOutline size={15} /><span>{odd.score}</span></td>
            <td className={textStyleProp}><IoTimeOutline size={15} color='#FF932F' /><span className="odds">x{odd.odd}</span></td>
            <td className={textStyleProp}>&#8358;{formatCurrency(stake * odd.odd)}</td>
        </tr>
    )
}