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
    // const [loadingMore, setLoadingMore] = useState(false);
    const transactions = useSelector(state => state.common.userTransactions);
    console.log(transactions)
    // const [pageNumber, setPageNumber] = useState();

    // const loadMoreTransactions = useSelector(state => state.common.loadMoreTransactions);
    // const getPageNo = () => parseInt(transactions.length / 10) + 1;


    //   useEffect(() => {
    //     setPageNumber(getPageNo());
    // }, [])

    const navigate = useNavigate()

    useEffect(() => {
        // if (!pageNumber) {
        //     return;
        // }
        // if (!loadMoreTransactions) {
        //     setLoadingMore(false)
        //     setLoading(false)
        //     return;
        // }

        // setLoadingMore(true)
        dispatch(fetchUserTransactions())
            .then(() => {
                // console.log("fetching page ", pageNumber)
                setLoading(false);
                // setLoadingMore(false)
            })
    }, [dispatch]);

    const navigateHandler = () => {
        navigate('/wallet')
    }

    // const loadMoreItems = () => {
    //   console.log("loading more")
    //   if (!loadMoreTransactions)
    //       return;
    //   //check if length of transactions has changed
    //   setPageNumber(getPageNo())
    // }
    if (loading) {
        return <LoaderScreen />
    }

    return (
        <>
            <ScreenHeader title='Transactions' styleProp='transaction' onClick={navigateHandler} />
            {transactions.length > 0 ?
                <>
                    {
                        transactions.map((item, i) => <Transaction key={i} item={item}

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