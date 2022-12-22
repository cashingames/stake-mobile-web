import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';

export default function SupportAnswer() {
    const location = useLocation();
    const navigate = useNavigate();

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })

    const navigateHandler = () => {
        navigate('/help')
    }

    const question = JSON.parse(location.state.question);
    const answer = JSON.parse(location.state.answer);

    return (
        <>
            <ScreenHeader title='Support' onClick={navigateHandler} styleProp='storeHeader' />
            <div>
                <p>{question}</p>
                <p>{answer}</p>
            </div>
        </>
    );
}