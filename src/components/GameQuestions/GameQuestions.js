import React from 'react'
import { Base64 } from "js-base64";
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
            <p className='gameQuestions'>{Base64.decode(displayedQuestion.label)}</p>
        </div>
        <div>
        {displayedOptions.map((option, i) => <GameOption option={option} key={i} onSelected={() => optionSelected(option)} />)}
        </div>
    </>
  )
}

export default GameQuestions