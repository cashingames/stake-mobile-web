
import React, { useEffect, useState, } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { IoCheckmarkCircleOutline, IoTimeOutline } from "react-icons/io5";

import LoaderScreen from '../../LoaderScreen/LoaderScreen';
import { getGameStakes } from '../GameSlice';

import { formatCurrency } from "../../../utils/stringUtl";

import './StakingPredictionsTable.scss'

export default function StakingPredictionsTable({ stake, usePreviousOdds, correctCount }) {

    const dispatch = useDispatch();
    const odds = useSelector(state => usePreviousOdds ? state.game.previousStakeOdds : state.game.stakeOdds);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        dispatch(getGameStakes()).then(() => { setLoading(false) });
    }, [dispatch])


    if (loading)
        return <LoaderScreen backgroundColor="store-background-color" />

    return (
        <table className="staking-predictions-table">
            <caption>How to win</caption>.
            <thead>
                <tr>
                    <th>Outcome</th>
                    <th>Odds</th>
                    <th>Payout</th>
                </tr>
            </thead>
            <tbody>
            {/* eslint-disable-next-line  */}
                {odds.map((odd, index) => <StakingPredictionsRow key={index} stake={stake} odd={odd} styleProp={correctCount == (odd.score) ? 'amountWon' : {}} />)}
            </tbody>
        </table>
    )
}

const StakingPredictionsRow = ({ stake, odd, styleProp }) => {
    return (
        <tr className={styleProp}>
            <td><IoCheckmarkCircleOutline size={16} /><span>{odd.score}</span></td>
            <td><IoTimeOutline size={15} color='#FF932F' /><span className="odds">x{odd.odd}</span></td>
            <td>&#8358;{formatCurrency(stake * odd.odd)}</td>
        </tr>
    )
}