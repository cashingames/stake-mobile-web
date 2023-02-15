import { useState, useEffect } from 'react';
import { Spinner } from 'react-activity'
import { useDispatch } from 'react-redux'
import { getStakeWinners } from '../../features/CommonSlice'
import { formatCurrency } from '../../utils/stringUtl'
import './WinnersScroller.scss';



export default function WinnersScroller() {

    const dispatch = useDispatch();

    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        dispatch(getStakeWinners()).then((response) => {
            setWinners(response.payload);
            setLoading(false);
        }, err => {
            setLoading(false);
            setWinners([]);
        });

    }, [dispatch]);

    if (loading) {
        return (
            <div className='no-winning-table'>
                <Spinner
                    color='#fff'
                    size={10}
                />
            </div>
        )
    }

    return (
        <div className='winning-table'>
            {winners?.map((winner) => <Winner
                key={winner.id}
                winner={winner}
            />)}
            {winners.length === 0 &&
                <p className='no-winners'>No Winners</p>
            }
        </div>
    );
}


const Winner = ({ winner }) => {
    return (
        <div className='winner-section'>
            <div className='winner-identity'>
                <img src={winner.avatar  ? winner.avatar  : "/images/user-icon.png"}
                    alt='pic'
                    className='winner-avatar'
                    />
                <p className='winner-name'>{winner.username}</p>
            </div>
            <p className='winner-amount'>&#8358;{formatCurrency(winner.amountWon)}</p>
            <p className='winner-score'>{winner.correctCount}/10</p>
        </div>
    )
}

