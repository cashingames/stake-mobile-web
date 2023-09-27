
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

import { useDispatch, useSelector } from 'react-redux';
import { selectActiveRounds, selectNextToDrop, selectWinners, useGetCashdropsQuery } from './cashdropSlice';
import { setCashMode, setGameMode, setGameType } from '../Games/GameSlice';
import logToAnalytics from '../../utils/analytics';
import { formatCurrency } from '../../utils/stringUtl';
import LoaderScreen from '../LoaderScreen/LoaderScreen';

import './CashdropsScreen.scss';

const backendUrl = process.env.REACT_APP_API_ROOT_URL;

export default function CashdropsScreen() {
    const navigate = useNavigate();
    const { isLoading } = useGetCashdropsQuery(); //trigger the cashdrop query

    return (
        <div className='cashdrops-container'>
            <ScreenHeader
                title='Cash drop'
                styleProp='cash-header'
                iconProp='backIcon'
                onClick={() => navigate('/dashboard')} />

            <p className="header-text">Three lucky winners win the pools every week! Will it be you?</p>

            {isLoading && <LoaderScreen />}
            {!isLoading && <>
                <RenderCashdrops />
                <RenderRecentWinners />
            </>
            }
        </div>
    )
}


const RenderRecentWinners = () => {
    const winners = useSelector(selectWinners);

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
