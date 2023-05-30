import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ScreenHeader from '../../components/ScreenHeader/ScreenHeader'
import { formatCurrency } from '../../utils/stringUtl'
import { fetchUserTransactions } from '../CommonSlice'
import LoaderScreen from '../LoaderScreen/LoaderScreen'
import './TransactionScreen.scss'

function TransactionScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const transactions = useSelector(state => state.common.userTransactions);

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchUserTransactions())
            .then(() => {
                setLoading(false);
            })
    }, [dispatch]);

    const navigateHandler = () => {
        navigate('/wallet')
    }
    if (loading) {
        return <LoaderScreen />
    }

    return (
        <>
            <ScreenHeader title='Transactions' styleProp='transaction' onClick={navigateHandler} />
            {transactions.mainTransactions.length > 0 || transactions.bonusTransactions.length > 0 ?
                <>
                    {
                        transactions.mainTransactions.map((item, i) => <Transaction key={i} item={item}

                        />)
                    }
                     {
                        transactions.bonusTransactions.map((item, i) => <Transaction key={i} item={item}

                        />)
                    }
                </> :
                <div className='noTransactionContainer'>
                    <img src='/images/cart-icon1.png' alt='cart' className='unavailable' />
                    <p className='noTransactionText'>No available transaction. Buy boost , buy game plan and fund your wallet to see transactions</p>
                </div>
            }
        </>
    )
}

const Transaction = ({ item }) => {
    return (
        <div className='transactionDetails'>
            <div className='narationDetails'>
                <div className='naration'>
                    <p className='narationTitle'>{item.type}</p>
                </div>
                <p className={`${item.type === 'DEBIT' ? 'transactionAmountWithdraw' : 'transactionAmountReceived'}`}> &#8358;{formatCurrency(item.amount)}</p>
            </div>
            <div className='typeAndDate'>
                <p className='transactionType'>{item.description}</p>
                <p className='transactionType'>{item.transactionDate}</p>
            </div>
        </div>
    )
}

export default TransactionScreen