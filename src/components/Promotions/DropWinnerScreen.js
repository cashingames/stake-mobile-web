import React from "react";
import ScreenHeader from "../ScreenHeader/ScreenHeader";
import { useLocation, useNavigate } from "react-router-dom";
import './DropWinnerScreen.scss'
import { formatCurrency } from "../../utils/stringUtl";
import logToAnalytics from "../../utils/analytics";
import { useDispatch, useSelector } from "react-redux";
import { setCashMode, setGameMode, setGameType } from "../../features/Games/GameSlice";


const backendUrl = process.env.REACT_APP_API_ROOT_URL;
const DropWinnerScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(state => state.auth.user);
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);


    const navigateHandler = () => {
        navigate('/cash-drop');
    }

    const stakeNow = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        dispatch(setCashMode(true));
        logToAnalytics("drop_stake_now_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
        })
        navigate('/select-category')
    }

    return (
        <div className="drop-winner-container ">
            <div>
                <ScreenHeader title={location.state.winner_rank} styleProp='winner-header' iconProp='backIcon' onClick={navigateHandler} />
                <div className="winner-details-container">
                    <img
                        src={location.state.winner_avatar ? `${backendUrl}/${location.state.winner_avatar}` : "/images/user-icon.png"}
                        alt='avatar'
                        className='winner-avatar'
                    />
                    <img
                        src={`${backendUrl}/${location.state.winner_badge}`}
                        alt='badge'
                        className='badge-avatar'
                    />
                    <div className="winner-names">
                        <span className="winner-fullname">{location.state.winner_username}</span>
                    </div>
                </div>
                <div className="drop-container" style={{ backgroundColor: location.state.drop_background }}>
                    <div className="badge-container">
                        <img
                            src={`${backendUrl}/${location.state.winner_badge}`}
                            alt='banner'
                            className='badge-avatar'
                        />
                    </div>
                    <div className="drop-details">
                        <span className="drop-name">{location.state.won_drop}</span>
                        <div className="amount-container">
                            <span className="amount-digit">{formatCurrency(location.state.drop_amount)}</span>
                            <span className="amount-currency">NGN</span>
                        </div>
                    </div>
                    <div className="stake-container">
                        <span className="stake-text">Winner</span>
                    </div>
                </div>
            </div>
            <button className='button-container' type='submit' onClick={stakeNow}>
                <span className='buttonText'>Stake Now</span>
            </button>
        </div>
    )
}
export default DropWinnerScreen;