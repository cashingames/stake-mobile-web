
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

import './CashdropsScreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveRounds, selectNextToDrop, selectWinners, useGetCashdropsQuery } from './cashdropSlice';
import { setCashMode, setGameMode, setGameType } from '../Games/GameSlice';
import logToAnalytics from '../../utils/analytics';
import { formatCurrency } from '../../utils/stringUtl';
const backendUrl = process.env.REACT_APP_API_ROOT_URL;

export default function CashdropsScreen() {
    const navigate = useNavigate();
    useGetCashdropsQuery(); //trigger the cashdrop query

    return (
        <div className='cashdrops-container'>
            <ScreenHeader
                title='Cash drop'
                styleProp='cash-header'
                iconProp='backIcon'
                onClick={() => navigate('/dashboard')} />

            <p className="header-text">Three lucky winners win the pools every week! Will it be you?</p>

            <RenderCashdrops />

            <RenderRecentWinners />
            {/* <div className="drops-container">
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
            </div> */}
        </div>
    )
}


const RenderRecentWinners = () => {
    const winners = useSelector(selectWinners);
    // const winners = [{
    //     "first_name": "Jedidiah",
    //     "last_name": "Sampson",
    //     "username": "sampsonjedidiah84",
    //     "avatar": null,
    //     "icon": "icons\/silver_cashdrop_icon.png",
    //     "cashdropsName": "Silver",
    //     "backgroundColor": "#EAEAEA",
    //     "cashdropRoundId": "6",
    //     "pooledAmount": "1926"
    // },
    // {
    //     "first_name": "Jedidiah",
    //     "last_name": "Sampson",
    //     "username": "sampsonjedidiah84",
    //     "avatar": null,
    //     "icon": "icons\/bronze_cashdrop_icon.png",
    //     "cashdropsName": "Bronze",
    //     "backgroundColor": "#EECCAB",
    //     "cashdropRoundId": "9",
    //     "pooledAmount": "514"
    // },
    // {
    //     "first_name": "Jedidiah",
    //     "last_name": "Sampson",
    //     "username": "sampsonjedidiah84",
    //     "avatar": null,
    //     "icon": "icons\/bronze_cashdrop_icon.png",
    //     "cashdropsName": "Bronze",
    //     "backgroundColor": "#EECCAB",
    //     "cashdropRoundId": "7",
    //     "pooledAmount": "510"
    // },
    // {
    //     "first_name": "Seyifunmi Esther",
    //     "last_name": "Ojo",
    //     "username": "Seyijayprod",
    //     "avatar": null,
    //     "icon": "icons\/gold_cashdrop_icon.png",
    //     "cashdropsName": "Gold",
    //     "backgroundColor": "#F3E9C7",
    //     "cashdropRoundId": "1",
    //     "pooledAmount": "4925"
    // },
    // {
    //     "first_name": "Seyifunmi Esther",
    //     "last_name": "Ojo",
    //     "username": "Seyijayprod",
    //     "avatar": null,
    //     "icon": "icons\/bronze_cashdrop_icon.png",
    //     "cashdropsName": "Bronze",
    //     "backgroundColor": "#EECCAB",
    //     "cashdropRoundId": "5",
    //     "pooledAmount": "518"
    // },
    // {
    //     "first_name": "Uwajimgba",
    //     "last_name": "Nzubechi",
    //     "username": "zee",
    //     "avatar": null,
    //     "icon": "icons/silver_cashdrop_icon.png",
    //     "cashdropsName": "Silver",
    //     "backgroundColor": "#EAEAEA",
    //     "cashdropRoundId": "2",
    //     "pooledAmount": "1950"
    // },
    // {
    //     "first_name": "Temitopeoluwa David",
    //     "last_name": "Omodunbi",
    //     "username": "topeszn",
    //     "avatar": null,
    //     "icon": "icons/bronze_cashdrop_icon.png",
    //     "cashdropsName": "Bronze",
    //     "backgroundColor": "#EECCAB",
    //     "cashdropRoundId": "4",
    //     "pooledAmount": "512"
    // },
    // {
    //     "first_name": "Temitopeoluwa David",
    //     "last_name": "Omodunbi",
    //     "username": "topeszn",
    //     "avatar": null,
    //     "icon": "icons/bronze_cashdrop_icon.png",
    //     "cashdropsName": "Bronze",
    //     "backgroundColor": "#EECCAB",
    //     "cashdropRoundId": "3",
    //     "pooledAmount": "510"
    // },
    // ];

    return (
        <>
            <span className="winners-header">Recent winners</span>

            {winners.length === 0 && <p className="empty-text">No winners yet</p>}
            {winners.length > 0 && <div className="winners-container">
                {
                    winners.map((winner, i) => <RenderRecentWinner key={i} winner={winner} />)
                }
            </div>}
        </>
    );

}

const RenderRecentWinner = ({ winner }) => {
    return (
        <div className="winner-container">
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
            <div className="name">{winner.username}</div>
        </div>
    );
}

const RenderCashdrops = () => {

    const rounds = useSelector(selectActiveRounds);
    console.log(rounds);
    return (
        <div className='cashdrops-list'>
            {rounds.map((drop, i) =>
                <RenderCashdropPool key={drop.cashdropId} drop={drop} />)
            }
        </div>
    )
}

const RenderCashdropPool = ({ drop }) => {
    const nextDropId = useSelector(selectNextToDrop);
    const isDropping = nextDropId === drop.cashdropId;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const gameMode = useSelector(state => state.common.gameModes[0]);
    const gameType = useSelector(state => state.common.gameTypes[0]);
    const user = useSelector(state => state.auth.user);

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
            <RenderDropDetails drop={drop} isDropping={isDropping} />

            <div onClick={stakeNow} className="stake-container">
                <span className="stake-text">Stake now</span>
            </div>
        </div>
    )
}
const RenderDropDetails = ({ drop, isDropping }) => {
    return (
        <div className="drop-details">
            <span>
                {isDropping &&
                    <span className="hot-text">
                        <img
                            src="/images/fire-icon.png"
                            alt='banner' className='hot-icon' />Hot Now</span>
                }
            </span>

            <span className="drop-name">{drop.cashdropName} Cash Drop</span>

            <div className="amount-container">
                <span className="amount-currency">NGN</span>
                <span className="amount-digit">&nbsp;{formatCurrency(drop.pooledAmount)}</span>
            </div>
        </div>
    );
}
