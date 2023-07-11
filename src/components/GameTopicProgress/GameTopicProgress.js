import React from 'react'
import './GameTopicProgress.scss'
import { useSelector } from 'react-redux'
import AnsweredGameProgress from '../AnsweredGameProgress/AnsweredGameProgress'

function GameTopicProgress({ onComplete }) {
    const gameCategory = useSelector(state => state.game.gameCategory.name);
    const index = useSelector(state => state.game.currentQuestionPosition);
    const total = useSelector(state => state.game.totalQuestionCount);
    // const highestOdd = 10


    return (
        <div className='topic-progress'>
            <div className='category-container'>
                <span className='category-name'>{gameCategory}</span>
                <StakeDetails />
            </div>
            <div className='questions-answered-container'>
                <AnsweredGameProgress />
            </div>
            <span className='questions-answered'>{`${index + 1}/${total}`}</span>
        </div>
    )
}

const StakeDetails = () => {
    const amountStaked = useSelector(state => state.game.amountStaked);

    return (
        <div className='stake-container'>
            <span className='stake-header'>STK.</span>
            <span className='stake-amount'>NGN {amountStaked}</span>
        </div>
    )
}

export default GameTopicProgress