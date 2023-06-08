import React from 'react'
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from 'react-redux';

function AnsweredGameProgress() {
    const index = useSelector(state => state.game.currentQuestionPosition);
    const total = useSelector(state => state.game.totalQuestionCount);
    return (
        <ProgressBar completed={((index + 1) / total) * 100} maxCompleted={100}
            isLabelVisible={false} baseBgColor='#F2C8BC' bgColor='#E15220' height='12px' width='130px' />
    )
}

export default AnsweredGameProgress
