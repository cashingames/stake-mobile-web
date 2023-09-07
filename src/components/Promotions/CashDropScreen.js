import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import ScreenHeader from "../ScreenHeader/ScreenHeader";
import { useNavigate } from "react-router-dom";
import './CashDropScreen.scss'
import logToAnalytics from "../../utils/analytics";
import { formatCurrency } from "../../utils/stringUtl";
import { setCashMode, setGameMode, setGameType } from "../../features/Games/GameSlice";
import { initializeFirestore } from "../../firebaseConfig";
import { updateCashdropPoolAmount } from "../../features/CommonSlice";

const backendUrl = process.env.REACT_APP_API_ROOT_URL;
const db = initializeFirestore();

const CashDropScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const drops = useSelector(state => state.common.cashdrops.cashdropRounds ?? []);
    const dropsPoolAmounts = useSelector(state => state.common.cashdropsPoolAmount ?? []);
    const winners = useSelector(state => state.common.cashdrops.cashdropWinners ?? []);
    const documentId = useSelector(state => state.common.cashdropsDocumentId);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, documentId), (doc) => {
            const data = doc.data()

            dispatch(updateCashdropPoolAmount(Object.values(data)))
        }, error => {
        });
        return () => unsub();
        // eslint-disable-next-line 
    }, [documentId])

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    return (
        <div className='cashdrop-container'>
            <ScreenHeader title='Cash drop' styleProp='cash-header' iconProp='backIcon' onClick={navigateHandler} />
            <p className="drop-info-text">Three lucky winners win the pools every week! Will it be you?</p>
            <div className="drops-container">
                {
                    drops.map((drop, i) => <DropBanner key={i} drop={drop} user={user} dropsPoolAmounts={dropsPoolAmounts}
                    />)
                }
            </div>
            <span className="winners-header">Recent winners</span>
            <div className="winners-container">
                {
                    winners.map((winner, i) => <RecentWinner key={i} winner={winner} user={user}
                    />)
                }
            </div>
        </div>
    )
}

const DropBanner = ({ drop, user, dropsPoolAmounts }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const toDropNext = useSelector(state => state.common.cashdrops.nextToDrop);

    const stakeNow = () => {
        dispatch(setGameMode(gameMode));
        dispatch(setGameType(gameType));
        dispatch(setCashMode(true));
        logToAnalytics("drop_stake_now_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'drop_title': drop.name,
        })
        navigate('/select-category')
    }

    return (
        <div className="drop-container" style={{ backgroundColor: drop.backgroundColor }}>
            <div className="badge-container">
                <img
                    src={`${backendUrl}/${drop.cashdropIcon}`}
                    alt='banner'
                    className='badge-avatar'
                />
            </div>
            <div className="drop-details">
                <span>
                 {Number(toDropNext) === Number(drop.cashdropId) &&
                    <span className="hot-text">
                        <img
                            src="/images/fire-icon.png"
                            alt='banner'className='hot-icon'/>Hot Now</span>
                   }
                </span>
               
                <span className="drop-name">{drop.cashdropName} Cash Drop</span>
                {
                    dropsPoolAmounts.map((pooledAmount, i) => <PooledAmount key={i} pooledAmount={pooledAmount} drop={drop}
                    />)
                }
            </div>
            <div onClick={stakeNow} className="stake-container">
                    <span className="stake-text">Stake now</span>
            </div>
        </div>
    )
}

const PooledAmount = ({ pooledAmount, drop }) => {
    return (

        <div className="amount-container">
            {
                Number(drop.cashdropId) === Number(pooledAmount.cashdrop_id) &&
                <div>
                    <span className="amount-digit">{formatCurrency(pooledAmount.cashdrop_amount)}</span>
                    <span className="amount-currency">NGN</span>
                </div>
            }

        </div>

    )
}
const RecentWinner = ({ winner, user }) => {
    const navigate = useNavigate();

    const viewWinner = () => {
        logToAnalytics("drop_winner_clicked", {
            'id': user.username,
            'phone_number': user.phoneNumber,
            'email': user.email,
            'drop_winner': winner.firstName,
        })
        navigate('/drop-winner', {
            state: {
                winner_rank: winner.cashdropsName + ' winner',
                winner_avatar: winner.avatar,
                winner_badge: winner.icon,
                winner_firstname: winner.first_name,
                winner_lastname: winner.last_name,
                winner_username: winner.username,
                won_drop: winner.cashdropsName,
                drop_amount: winner.pooledAmount,
                drop_background: winner.backgroundColor
            }
        })
    }

    return (
        <div className="winner-container" onClick={viewWinner}>
            <img
                src={winner.avatar ? `${backendUrl}/${winner.avatar}` : "/images/user-icon.png"}
                alt='avatar'
                className='winner-avatar'
            />
            <img
                src={`${backendUrl}/${winner.icon}`}
                alt='badge'
                className='badge-avatar'
            />
            <div className="winner-names">
                <span className="winner-fullname">{winner.username}</span>
            </div>
        </div>
    )
}
export default CashDropScreen;