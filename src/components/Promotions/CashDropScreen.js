import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ScreenHeader from "../ScreenHeader/ScreenHeader";
import { useNavigate } from "react-router-dom";
import './CashDropScreen.scss'
import logToAnalytics from "../../utils/analytics";
import { formatCurrency } from "../../utils/stringUtl";
import { setCashMode, setGameMode, setGameType } from "../../features/Games/GameSlice";



const CashDropScreen = () => {
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);

    const navigateHandler = () => {
        navigate('/dashboard');
    }

    const winners = [
        {
            "id": 1,
            "badgeImage": "/images/gold-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Gold winner",
            "dropName": 'Gold Cash Drop',
            "dropAmount" : 200000,
            "backgroundColor": '#F3E9C7'
        },
        {
            "id": 2,
            "badgeImage": "/images/silver-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Silver winner",
            "dropName": 'Silver Cash Drop',
            "dropAmount" : 123000,
            "backgroundColor": '#EAEAEA'
        },
        {
            "id": 3,
            "badgeImage": "/images/bronze-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Bronze winner",
            "dropAmount" : 25000,
            "backgroundColor": '#EECCAB'
        },
        {
            "id": 4,
            "badgeImage": "/images/silver-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Silver winner",
            "dropName": 'Silver Cash Drop',
            "dropAmount" : 123000,
            "backgroundColor": '#EAEAEA'
        },
        {
            "id": 5,
            "badgeImage": "/images/gold-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Gold winner",
            "dropName": 'Gold Cash Drop',
            "dropAmount" : 200000,
            "backgroundColor": '#F3E9C7'
        },
        {
            "id": 6,
            "badgeImage": "/images/bronze-badge.png",
            "firstName": 'Ugo',
            "lastName": 'Ada',
            "avatar": "/images/user-icon.png",
            "badgeRank": "Bronze winner",
            "dropName": 'Bronze Cash Drop',
            "dropAmount" : 25000,
            "backgroundColor": '#EECCAB'
        },
    ]
    const drops = [
        {
            "id": 1,
            "bannerImage": "/images/gold-badge.png",
            "name": 'Gold Cash Drop',
            "amount": 200000,
            "backgroundColor": '#F3E9C7'
        },
        {
            "id": 2,
            "bannerImage": "/images/silver-badge.png",
            "name": 'Silver Cash Drop',
            "amount": 123000,
            "backgroundColor": '#EAEAEA'
        },
        {
            "id": 3,
            "bannerImage": "/images/bronze-badge.png",
            "name": 'Bronze Cash Drop',
            "amount": 25000,
            "backgroundColor": '#EECCAB'

        },

    ]


    return (
        <div className='cashdrop-container'>
            <ScreenHeader title='Cash drop' styleProp='cash-header' iconProp='backIcon' onClick={navigateHandler} />
            <p className="drop-info-text">Three lucky winners win the pools every week! Will it be you?</p>
            <div className="drops-container">
                {
                    drops.map((drop, i) => <DropBanner key={i} drop={drop} user={user}
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

const DropBanner = ({ drop, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);

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
                    src={drop.bannerImage}
                    alt='banner'
                    className='badge-avatar'
                />
            </div>
            <div className="drop-details">
                <span className="drop-name">{drop.name}</span>
                <div className="amount-container">
                    <span className="amount-digit">{formatCurrency(drop.amount)}</span>
                    <span className="amount-currency">NGN</span>
                </div>
            </div>
            <div onClick={stakeNow} className="stake-container">
                <span className="stake-text">Stake now</span>
            </div>
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
        navigate('/drop-winner' , {
            state: {
                winner_rank: winner.badgeRank,
                winner_avatar: winner.avatar,
                winner_badge:winner.badgeImage,
                winner_firstname: winner.firstName,
                winner_lastname: winner.lastName,
                won_drop: winner.dropName,
                drop_amount: winner.dropAmount,
                drop_background:winner.backgroundColor
            }
        })
    }

    return (
        <div className="winner-container" onClick={viewWinner}>
            <img
                src={winner.avatar}
                alt='avatar'
                className='winner-avatar'
            />
            <img
                src={winner.badgeImage}
                alt='badge'
                className='badge-avatar'
            />
            <div className="winner-names">
                <span className="winner-fullname">{winner.firstName} {winner.lastName}</span>
            </div>
        </div>
    )
}
export default CashDropScreen;