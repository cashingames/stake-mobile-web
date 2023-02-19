import { Spinner } from 'react-activity';
import { formatCurrency } from '../../utils/stringUtl'
import { useGetRecentWinnersQuery } from '../../services/stakers-api';

import './WinnersScroller.scss';

export default function WinnersScroller() {
    const { data = [], isLoading, isFetching } = useGetRecentWinnersQuery()

    console.log('winners', data)

    if (isLoading || isFetching) {
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
        <>
            <div className='winning-table'>
                <div className='winning-table-caption'>Top winners</div>
                {data?.map((winner) => <Winner
                    key={winner.id}
                    winner={winner}
                />)}
                {data.length === 0 &&
                    <p className='no-winners'>No Winners</p>
                }
            </div>
        </>
    );
}


const Winner = ({ winner }) => {
    return (
        <div className='winner-section'>
            <div className='winner-identity'>
                <img src={winner.avatar ? winner.avatar : "/images/user-icon.png"}
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

