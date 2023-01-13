import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScreenHeader from '../../../components/ScreenHeader/ScreenHeader';
import './SupportAnswers.scss'

export default function SupportAnswer() {
    const location = useLocation();
    const navigate = useNavigate();

    // //disable browser back button
    // useEffect(() => {
    //     window.history.pushState(null, null, window.location.href);
    //     window.onpopstate = function () {
    //         window.history.go(1);
    //     };
    // })

    const navigateHandler = () => {
        navigate('/support')
    }


    const question = JSON.parse(location.state.question);
    const answer = JSON.parse(location.state.answer);

    return (
        <>
            <ScreenHeader title='Details' onClick={navigateHandler} styleProp='detailHeader' />
            <div className='detailsContainer'>
                <p  className='dQuestion'>{question}</p>
                <p className='dAnswer'>{answer}</p>
            </div>
        </>
    );
}