import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './WalletScreen.scss';
import AnonymousRouteHeader from '../../components/AnonymousRouteHeader/AnonymousRouteHeader';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
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
  const transactions = useSelector(state => state.common.userTransactions);
  const depositBalance = Number.parseFloat(user.walletBalance) - Number.parseFloat(user.withdrawableBalance)
  // console.log(transactions)
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
    dispatch(getUser());
    dispatch(fetchUserTransactions()).then(() => setLoading(false));
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
        transactions={transactions}
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

const TransactionsContainer = ({ transactions, loading, mainWalletActive, bonusWalletActive, winningsWalletActive }) => {
  let navigate = useNavigate();
  const [allTransactions, setAllTransactions] = useState(true);
  const [creditTransactions, setCreditTransactions] = useState(false);
  const [debitTransactions, setDebitTransactions] = useState(false);

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
      return transactions.mainTransactions.filter(x => x.type.toUpperCase() !== "DEBIT");
    }
    return transactions.mainTransactions;
  }

  const mainDebitTransactions = () => {
    if (mainWalletActive) {
      return transactions.mainTransactions.filter(x => x.type.toUpperCase() !== "CREDIT");
    }
    return transactions.mainTransactions;
  }
  const winningsCreditTransactions = () => {
    if (winningsWalletActive) {
      return transactions.withdrawalsTransactions.filter(x => x.type.toUpperCase() !== "DEBIT");
    }
    return transactions.withdrawalsTransactions;
  }
  const winningsDebitTransactions = () => {
    if (winningsWalletActive) {
      return transactions.withdrawalsTransactions.filter(x => x.type.toUpperCase() !== "CREDIT");
    }
    return transactions.withdrawalsTransactions;
  }
  const bonusCreditTransactions = () => {
    if (bonusWalletActive) {
      return transactions.bonusTransactions.filter(x => x.type.toUpperCase() !== "DEBIT");
    }
    return transactions.bonusTransactions;
  }
  const bonusDebitTransactions = () => {
    if (bonusWalletActive) {
      return transactions.bonusTransactions.filter(x => x.type.toUpperCase() !== "CREDIT");
    }
    return transactions.bonusTransactions;
  }

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
          <div style={
            { backgroundImage: "url(/images/coins-background.png)" }
          } className='transactions-background'>
            {mainWalletActive && allTransactions &&
              <>
                {
                  transactions.mainTransactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.mainTransactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                  transactions.withdrawalsTransactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.withdrawalsTransactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                  transactions.bonusTransactions.length > 0 ?
                    <div className='transactionsSubContainer'>
                      {
                        transactions.bonusTransactions.map((transaction, i) => <FundTransactions key={i} transaction={transaction}
                        />)
                      }
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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
                      <button className='button-container' onClick={() => navigate('/transactions')}>
                        <span className='buttonText'>View more</span>
                        <IoChevronForwardOutline size={20} color='#fff' className='icon' />
                      </button>
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