import React from 'react'
import './GameTopicProgress.scss'
import { useSelector } from 'react-redux'
import AnsweredGameProgress from '../AnsweredGameProgress/AnsweredGameProgress'

function GameTopicProgress({ onComplete }) {
    const gameCategory = useSelector(state => state.game.gameCategory.name);
    const index = useSelector(state => state.game.currentQuestionPosition);
    const total = useSelector(state => state.game.totalQuestionCount);
    const highestOdd = 10


    return (
        <div className='topic-progress'>
            <div className='topic-container'>
                <div className='category-container'>
                    <span className='category-name'>{gameCategory}</span>
                    <div className='questions-answered-container'>
                        <AnsweredGameProgress />
                    </div>
                    <span className='questions-answered'>{`${index + 1}/${total}`}</span>
                </div>
                <div className='odd-container'>
                    <span className='odd-title'>Odds</span>
                    <span className='odd-text'>{highestOdd}</span>
                </div>
            </div>
        </div>
    )
}

export default GameTopicProgress