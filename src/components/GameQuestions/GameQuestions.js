import React from 'react'
import GameOption from '../GameOptions/GameOption'
import './GameQuestions.scss'
import { useDispatch, useSelector } from 'react-redux';
import { questionAnswered } from '../../features/Games/GameSlice';

function GameQuestions() {

  const dispatch = useDispatch();
  const displayedQuestion = useSelector(state => state.game.displayedQuestion);
  const displayedOptions = useSelector(state => state.game.displayedOptions);

  const optionSelected = (option) => {
    dispatch(questionAnswered(option));
}

  return (
    <>
        <div className='gameQuestionsCase'>
            <p className='gameQuestions'>{displayedQuestion.label}</p>
        </div>
        <div>
        {displayedOptions.map((option, i) => <GameOption option={option} key={i} onSelected={() => optionSelected(option)} />)}
        </div>
    </>
  )
}

export default GameQuestions