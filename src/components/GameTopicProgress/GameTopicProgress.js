import React from 'react'
import './GameTopicProgress.scss'
import { useSelector } from 'react-redux'
import AnsweredGameProgress from '../AnsweredGameProgress/AnsweredGameProgress'

function GameTopicProgress({ onComplete }) {
    const gameCategory = useSelector(state => state.game.gameCategory.name);
    const index = useSelector(state => state.game.currentQuestionPosition);
    const total = useSelector(state => state.game.totalQuestionCount);
    const cashMode = useSelector(state => state.game.cashMode);
    const practiceMode = useSelector(state => state.game.practiceMode);


    return (
        <div className='topic-progress'>
            <div className='category-container'>
                <span className='category-name'>{gameCategory}</span>
                {practiceMode &&
                    <DemoDetails />
                }
                {cashMode &&
                    <StakeDetails />
                }
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

const DemoDetails = () => {

    return (
        <div className='stake-container'>
            <img src='/images/star.png' alt='start' className='star' />
            <span className='stake-amount'>Demo Game</span>
        </div>
    )

}

export default GameTopicProgress