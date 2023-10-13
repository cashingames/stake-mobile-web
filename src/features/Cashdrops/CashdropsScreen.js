
import { useNavigate } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader';

import { useDispatch, useSelector } from 'react-redux';
import { selectActiveRounds, selectNextToDrop, selectWinners, useGetCashdropsQuery } from './cashdropSlice';
import { setCashMode, setGameMode, setGameType } from '../Games/GameSlice';
import logToAnalytics from '../../utils/analytics';
import { formatCurrency } from '../../utils/stringUtl';
import LoaderScreen from '../LoaderScreen/LoaderScreen';

import './CashdropsScreen.scss';
import { formattedDateHandler } from '../../utils/utils';

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
    console.log(winners)
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
            <div className="name">{winner.username}</div>
            <div className='winner__container_img'>
                <img
                    src={winner.avatar ? `${backendUrl}/${winner.avatar}` : "/images/user-icon.png"}
                    alt='avatar'
                    className='winner-avatar'
                />
                <div className='winner__badge'>
                    <img
                        src={`${backendUrl}/${winner.icon}`}
                        alt='badge'
                        className='badge-avatar'
                    />
                </div>
            </div>
            <p className='winner_amount'>NGN {winner.pooledAmount}</p>
            <div className='winner__date'>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M6.21684 7.70801C5.93339 7.70801 5.69444 7.61015 5.5 7.41444C5.30556 7.21872 5.20833 6.97914 5.20833 6.69569C5.20833 6.41223 5.30619 6.17329 5.50191 5.97884C5.69762 5.7844 5.9372 5.68718 6.22066 5.68718C6.50411 5.68718 6.74306 5.78503 6.9375 5.98075C7.13194 6.17646 7.22917 6.41605 7.22917 6.6995C7.22917 6.98295 7.13131 7.2219 6.93559 7.41634C6.73988 7.61079 6.5003 7.70801 6.21684 7.70801ZM1.875 9.16634C1.70833 9.16634 1.5625 9.10384 1.4375 8.97884C1.3125 8.85384 1.25 8.70801 1.25 8.54134V2.08301C1.25 1.91634 1.3125 1.77051 1.4375 1.64551C1.5625 1.52051 1.70833 1.45801 1.875 1.45801H2.55208V0.833008H3.22917V1.45801H6.77083V0.833008H7.44792V1.45801H8.125C8.29167 1.45801 8.4375 1.52051 8.5625 1.64551C8.6875 1.77051 8.75 1.91634 8.75 2.08301V8.54134C8.75 8.70801 8.6875 8.85384 8.5625 8.97884C8.4375 9.10384 8.29167 9.16634 8.125 9.16634H1.875ZM1.875 8.54134H8.125V4.06217H1.875V8.54134ZM1.875 3.43717H8.125V2.08301H1.875V3.43717Z" fill="#1C453B" />
                </svg>
                <p className='date'>{formattedDateHandler(winner.winningDate)}</p>
            </div>
        </div>
    );
}

const RenderCashdrops = () => {

    const rounds = useSelector(selectActiveRounds);
    console.log(rounds, 'hey');
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
