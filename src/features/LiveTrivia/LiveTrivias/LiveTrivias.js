import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ScreenHeader from "../../../components/ScreenHeader/ScreenHeader";
import { fetchRecentLiveTrivia } from '../../CommonSlice'
import LoaderScreen from "../../LoaderScreen/LoaderScreen";
import LiveTriviaCard from "../LiveTriviaCard";
import { getLiveTriviaStatus } from "../LiveTriviaSlice";
import './LiveTrivias.scss'


const LiveTrivias = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const trivia = useSelector(state => state.common.trivias);

    useEffect(() => {
        dispatch(getLiveTriviaStatus())
        dispatch(fetchRecentLiveTrivia()).then(() => { setLoading(false) });
        // eslint-disable-next-line
    }, [dispatch]);

    //disable browser back button
    useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    })


    const navigateHandler = () => {
        navigate('/dashboard')
    }

    if (loading) {
        return <LoaderScreen backgroundColor="trivia-background-color" color='#FFFF' />
    }

    return (
        <>
            <ScreenHeader title='Live Trivias' onClick={navigateHandler} styleProp='triviaHeader' />
            <div className="trivias-container">
                <div>
                    {trivia.map((trivia, i) => <LiveTriviaCard key={i} trivia={trivia} />)}
                </div>
            </div>
        </>
    )
}
export default LiveTrivias;