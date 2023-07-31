import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './WalletScreen.scss';
import AnonymousRouteHeader from '../../components/AnonymousRouteHeader/AnonymousRouteHeader';
import { formatCurrency } from '../../utils/stringUtl';
import { Spinner } from 'react-activity';
import { IoChevronForwardOutline, IoEllipse } from 'react-icons/io5';
import { IoRemove } from 'react-icons/io5';
import { IoAdd } from 'react-icons/io5';
import { getUser } from '../Auth/AuthSlice';
import { fetchUserTransactions } from '../CommonSlice';

function WalletScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const [loading, setLoading] = useState(true)
  const [mainWalletActive, setMainWalletActive] = useState(true);
  const [winningsWalletActive, setWinningsWalletActive] = useState(false);
  const [bonusWalletActive, setBonusWalletActive] = useState(false);
  const depositBalance = Number.parseFloat(user.walletBalance) - Number.parseFloat(user.withdrawableBalance)
  // const transactions = {
  //   bonusTransactions: [
  //     {
  //       "id": 1,
  //       "type": 'DEBIT',
  //       "amount": '500',
  //       "description": "Trivia challenge"
  //     },
  //     {
  //       "id": 2,
  //       "type": 'CREDIT',
  //       "amount": '700',
  //       "description": "Trivia challenge"
  //     }

  //   ],
  //   mainTransactions: [
  //     {
  //       "id": 1,
  //       "type": 'DEBIT',
  //       "amount": '200',
  //       "description": "Trivia challenge"
  //     },
  //     {
  //       "id": 2,
  //       "type": 'CREDIT',
  //       "amount": '800',
  //       "description": "Trivia challenge"
  //     }
  //   ]
  // }


  const toggleMainWallet = () => {
    setBonusWalletActive(false);
    setWinningsWalletActive(false);
    setMainWalletActive(true);
  }


  const toggleWinningsWallet = () => {
    setBonusWalletActive(false);
    setMainWalletActive(false);
    setWinningsWalletActive(true);
  }

  const toggleBonusWallet = () => {
    setMainWalletActive(false);
    setWinningsWalletActive(false);
    setBonusWalletActive(true);
  }

  const navigateHandler = () => {
    navigate('/dashboard');
  }

  useEffect(() => {
    dispatch(getUser()).then(() => setLoading(false));
  }, [dispatch]);

  return (
    <div className='wallet-screen-container'>
      <AnonymousRouteHeader title='Wallet' styleProp='password-header' noClose={true} onClick={navigateHandler} />
      <WalletsButtton toggleBonusWallet={toggleBonusWallet} toggleMainWallet={toggleMainWallet}
        mainWalletActive={mainWalletActive} bonusWalletActive={bonusWalletActive}
        toggleWinningsWallet={toggleWinningsWallet} winningsWalletActive={winningsWalletActive}
      />
      <WalletBalanceDetails balance={depositBalance} bonusBalance={user.bonusBalance} bonusWalletActive={bonusWalletActive}
        mainWalletActive={mainWalletActive} winningsWalletActive={winningsWalletActive} winningsBalance={user.withdrawableBalance} />
      <TransactionsContainer
        loading={loading}
        mainWalletActive={mainWalletActive}
        bonusWalletActive={bonusWalletActive}
        winningsWalletActive={winningsWalletActive}

      />
    </div>
  )
}

const WalletsButtton = ({ toggleMainWallet, toggleBonusWallet, mainWalletActive, bonusWalletActive, winningsWalletActive, toggleWinningsWallet }) => {
  return (
    <div className='wallets-buttton'>
      <div className='wallets'>
        <div className={mainWalletActive ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleMainWallet}>
          <p className={mainWalletActive ? 'wallet-text' : 'inactive-wallet-text'}>Deposits</p>
        </div>
        <div className={winningsWalletActive ? 'wallet-button' : 'inactive-bonus-wallet-text'} onClick={toggleWinningsWallet}>
          <p className={winningsWalletActive ? 'wallet-text' : 'inactive-wallet-text'}>Winnings</p>
        </div>
        <div className={bonusWalletActive ? 'bonuswallet-button' : 'inactive-bonus-wallet-text'} onClick={toggleBonusWallet}>
          <p className={bonusWalletActive ? 'wallet-text' : 'inactive-wallet-text'}>Bonus</p>
        </div>
      </div>
    </div>
  )
}

const WalletBalanceDetails = ({ balance, bonusWalletActive, mainWalletActive, bonusBalance, winningsWalletActive, winningsBalance }) => {
  let navigate = useNavigate();


  return (
    <div className='details-container'>
      {mainWalletActive &&
        <div className='funding-container'>
          <div>
            <div className='total-header'>
              <div className='total-title-container'>
                <p className='total-title-text'>Balance</p>
              </div>
            </div>
            <div className='currency-header'>
              <span className='currency-text'>NGN</span>
              <span className='currency-amount'>{formatCurrency(balance)}</span>
            </div>
          </div>
          <div className='funding-button' onClick={() => navigate('/fund-wallet')}>
            <p className='funding-text'>Deposit</p>
            <IoChevronForwardOutline size={16} color='#fff' />
          </div>
        </div>
      }
      {winningsWalletActive &&
        <div className='funding-container'>
          <div>
            <div className='total-header'>
              <div className='total-title-container'>
                <p className='total-title-text'>Earned</p>
              </div>
            </div>
            <div className='currency-header'>
              <span className='currency-text'>NGN</span>
              <span className='currency-amount'>{formatCurrency(winningsBalance)}</span>
            </div>
          </div>
          <div className='funding-button' onClick={() => navigate('/withdraw-funds')}>
            <p className='funding-text'>Withdraw</p>
            <IoChevronForwardOutline size={16} color='#fff' />
          </div>
        </div>
      }
      {bonusWalletActive &&
        <div className='funding-container'>
          <div>
            <div className='total-header'>
              <div className='total-title-container'>
                <p className='total-title-text'>Bonus</p>
              </div>
            </div>
            <div className='currency-header'>
              <span className='currency-text'>NGN</span>
              <span className='currency-amount'>{formatCurrency(bonusBalance)}</span>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const TransactionsContainer = ({ loading, mainWalletActive, bonusWalletActive, winningsWalletActive }) => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.common.userTransactions);
  const [pageNumber] = useState(1);

  // const fetchMoreTransactions = () => {
  //   setPageNumber((prev) => prev + 1);
  // }

  const [allTransactions, setAllTransactions] = useState(true);
  const [creditTransactions, setCreditTransactions] = useState(false);
  const [debitTransactions, setDebitTransactions] = useState(false);

  useEffect(() => {
    if (mainWalletActive) { dispatch(fetchUserTransactions({ wallet_type: 'CREDIT_BALANCE', pageNo: pageNumber })) }
    else if (bonusWalletActive) { dispatch(fetchUserTransactions({ wallet_type: 'BONUS_BALANCE', pageNo: pageNumber })) }
    else if (winningsWalletActive) { dispatch(fetchUserTransactions({ wallet_type: 'WINNINGS_BALANCE', pageNo: pageNumber })) }
  }, [mainWalletActive, bonusWalletActive, winningsWalletActive, dispatch, pageNumber]);


  const toggleAllTransactions = () => {
    setCreditTransactions(false);
    setDebitTransactions(false);
    setAllTransactions(true);
  }

  const toggleCreditTransactions = () => {
    setAllTransactions(false);
    setDebitTransactions(false);
    setCreditTransactions(true);
  }


  const toggleDebitTransactions = () => {
    setAllTransactions(false);
    setCreditTransactions(false);
    setDebitTransactions(true);
  }

  const mainCreditTransactions = () => {
    if (mainWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "CREDIT");
    }
    return transactions;
  }

  const mainDebitTransactions = () => {
    if (mainWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "DEBIT");
    }
    return transactions;
  }
  const winningsCreditTransactions = () => {
    if (winningsWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "CREDIT");
    }
    return transactions;
  }
  const winningsDebitTransactions = () => {
    if (winningsWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "DEBIT");
    }
    return transactions;
  }
  const bonusCreditTransactions = () => {
    if (bonusWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "CREDIT");
    }
    return transactions;
  }
  const bonusDebitTransactions = () => {
    if (bonusWalletActive) {
      return transactions.filter(x => x.type.toUpperCase() === "DEBIT");
    }
    return transactions;
  }

  useEffect(() => {
    dispatch(getUser());
  },[dispatch]);

  return (
    <div className='transactions-container'>
      <p className='transactions-header'>Transaction History</p>
      <div className='wallets-button'>
        <div className='wallets'>
          <div className={allTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleAllTransactions}>
            <p className={allTransactions ? 'wallet-text' : 'inactive-wallet-texta'}>All</p>
          </div>
          <div className={creditTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleCreditTransactions}>
            <p className={creditTransactions ? 'wallet-text' : 'inactive-wallet-texti'}>Credit</p>
          </div>
          <div className={debitTransactions ? 'wallet-button' : 'inactive-wallet-button'} onClick={toggleDebitTransactions}>
            <p className={debitTransactions ? 'wallet-text' : 'inactive-wallet-texti'}>Debit</p>
          </div>
        </div>
      </div>
      {loading ?
        <Spinner
          color='#072169'
          size={10}
        />
        :
        <>
          <div className='transactions-background'>
            {mainWalletActive && allTransactions &&
              <>
                {
                  transactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={fetchMoreTransactions} >
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {mainWalletActive && creditTransactions &&
              <>
                {
                  mainCreditTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        mainCreditTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {mainWalletActive && debitTransactions &&
              <>
                {
                  mainDebitTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        mainDebitTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {winningsWalletActive && allTransactions &&
              <>
                {
                  transactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {winningsWalletActive && creditTransactions &&
              <>
                {
                  winningsCreditTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        winningsCreditTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {winningsWalletActive && debitTransactions &&
              <>
                {
                  winningsDebitTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        winningsDebitTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && allTransactions &&
              <>
                {
                  transactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && creditTransactions &&
              <>
                {
                  bonusCreditTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        bonusCreditTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
            {bonusWalletActive && debitTransactions &&
              <>
                {
                  bonusDebitTransactions().length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        bonusDebitTransactions().map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      {/* <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button> */}
                    </div>
                    :
                    <div className='noTransactionContainer'>
                      <p className='noTransaction'>No transaction records</p>
                    </div>
                }
              </>
            }
          </div>
        </>
      }
    </div>
  )
}

const FundTransactions = ({ transaction }) => {
  return (
    <div className='transactionDetails'>
      <div className='narationDetails'>
        <IoEllipse size={26} color={transaction.type === "DEBIT" ? '#EB2121' : '#00FFA3'} />
        <div className='typeAndDate'>
          <p className='transactionType'>{transaction.description}</p>
          <p className='transactionDate'>{transaction.transactionDate}</p>
        </div>
      </div>
      <div className='amountDetails'>
        {transaction.type === "DEBIT" ?
          <IoRemove size={20} color='072169' />
          :
          <IoAdd size={20} color='072169' />

        }
        <p className='transactionAmount'>&#8358;{formatCurrency(transaction.amount)}</p>
      </div>
    </div>
  )
}



export default WalletScreen