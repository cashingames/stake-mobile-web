import React from 'react'
import './ChallengeGameInstruction.scss'

function ChallengeGameInstruction({ staking }) {
    return (
        <div className='cgiContainer'>
            <p className='instructionHeader'>Ready to start winning? Let’s get started
                by reading the following instructions carefully.
            </p>
            <div className="cgiInstruction">
                <p className="unicode">{'\u0031'}.</p>
                <p className="instructionText">There are 10 questions per session.
                    You are required to answer these 10 questions in 60 seconds</p>
            </div>
            <div className="cgiInstruction">
                <p className="unicode">{'\u0032'}.</p>
                <p className="instructionText">Click on the “Next” button after answering each question to
                    progress to the next question.</p>
            </div>
            <div className="cgiInstruction">
                <p className="unicode">{'\u0033'}.</p>
                <p className="instructionText">At the end of the session, you will see
                    your total score against that of your competitor</p>
            </div>
            {staking &&
                <div>
                    <p className='cgiTerms'>Terms and Condition</p>
                    <div className="cgiInstruction">
                        <p className="unicode">{'\u0031'}.</p>
                        <p className="instructionText"> If you do not accept this challenge in 6hours, your opponent will be refunded and the challenge will be canceled.</p>
                    </div>
                    <div className="cgiInstruction">
                        <p className="unicode">{'\u0032'}.</p>
                        <p className="instructionText">This challenge is a winner-take-all challenge. The winner of the challenge wins 200 naira</p>
                    </div>
                    <div className="cgiInstruction">
                        <p className="unicode">{'\u0033'}.</p>
                        <p className="instructionText">If this challenge ends in a draw, the challenger and
                            the opponent would be credited individually with the amount staked (200 naira)</p>
                    </div>
                </div>
            }
            <button className='cgiBtn'>ok</button>

        </div>
    )
}

export default ChallengeGameInstruction