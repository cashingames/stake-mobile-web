import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';

function AnsweredGameProgress() {
    const index = useSelector(state => state.game.currentQuestionPosition);
    const total = useSelector(state => state.game.totalQuestionCount);
    return (
        <div style={{ width: 60, height: 60 }}>
            <CircularProgressbar
            strokeWidth={8}
            value={index + 1} 
            text={`${index + 1} / ${total}`} 
            styles={buildStyles({
                textColor:'#fff',
            })}
            />
        </div>
    )
}

export default AnsweredGameProgress
